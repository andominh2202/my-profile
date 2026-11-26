import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { QualityLevel, ThemeMode } from '../types/profile';

interface AuroraSceneProps {
  quality: QualityLevel;
  theme: ThemeMode;
}

const VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uRes;
  varying vec2 vUv;

  float auroraWave(vec2 p, float freq, float speed, float offset) {
    return sin(p.x * freq + uTime * speed + sin(p.y * 1.8 - uTime * 0.22 + offset));
  }

  void main() {
    vec2 p = (vUv - 0.5) * vec2(uRes.x / max(uRes.y, 1.0), 1.0);
    vec2 m = (uMouse - 0.5) * 0.35;

    float w1 = auroraWave(p + m, 2.3, 0.32, 0.0) * 0.5 + 0.5;
    float w2 = auroraWave(p * 1.35 - m * 0.8, 3.0, -0.25, 1.7) * 0.5 + 0.5;
    float w3 = auroraWave(p * 0.9 + vec2(0.0, m.y), 1.7, 0.18, 3.1) * 0.5 + 0.5;

    float curtain = smoothstep(0.1, 0.9, w1 * 0.6 + w2 * 0.4);
    float halo = smoothstep(1.05, 0.05, length(p - vec2(m.x * 0.7, -m.y * 0.7)));

    vec3 col = vec3(0.02, 0.031, 0.067);
    col += vec3(0.0, 0.898, 1.0) * (w1 * 0.12 * halo);
    col += vec3(0.0, 0.839, 0.710) * (w3 * 0.09);
    col += vec3(0.463, 0.341, 1.0) * (w2 * 0.14 * curtain);

    float alpha = clamp((w1 * 0.18 + w2 * 0.16) * halo, 0.0, 0.48);
    gl_FragColor = vec4(col, alpha);
  }
`;

export function AuroraScene({ quality, theme }: AuroraSceneProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || quality === 'low' || theme === 'light') return;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: 'low-power'
      });
    } catch {
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, quality === 'high' ? 1.5 : 1);
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.className = 'bg-fx__canvas is-ready';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uRes: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
    };

    const planeGeo = new THREE.PlaneGeometry(2, 2);
    const planeMat = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms,
      transparent: true,
      depthWrite: false
    });
    const planeMesh = new THREE.Mesh(planeGeo, planeMat);
    scene.add(planeMesh);

    const particleCount = quality === 'high' ? 110 : 48;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2;
      positions[i * 3 + 2] = 0;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x8bf5ff,
      size: quality === 'high' ? 0.012 : 0.014,
      transparent: true,
      opacity: 0.45,
      depthWrite: false
    });
    const points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    let targetX = 0.5;
    let targetY = 0.5;
    let rafId = 0;
    let paused = document.hidden;
    let lost = false;
    const start = performance.now();

    const onPointerMove = (ev: PointerEvent) => {
      targetX = ev.clientX / Math.max(window.innerWidth, 1);
      targetY = 1 - ev.clientY / Math.max(window.innerHeight, 1);
    };

    const onResize = () => {
      if (!renderer) return;
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.uRes.value.set(window.innerWidth, window.innerHeight);
    };

    const onVisibility = () => {
      paused = document.hidden;
      if (!paused && !rafId && !lost) {
        rafId = window.requestAnimationFrame(animate);
      }
    };

    const onContextLost = (ev: Event) => {
      ev.preventDefault();
      lost = true;
      if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };

    const animate = (now: number) => {
      if (paused || lost || !renderer) {
        rafId = 0;
        return;
      }
      uniforms.uTime.value = (now - start) * 0.001;
      uniforms.uMouse.value.x += (targetX - uniforms.uMouse.value.x) * 0.05;
      uniforms.uMouse.value.y += (targetY - uniforms.uMouse.value.y) * 0.05;
      points.rotation.z = uniforms.uTime.value * 0.015;
      renderer.render(scene, camera);
      rafId = window.requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);

    rafId = window.requestAnimationFrame(animate);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      if (renderer) {
        renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
        renderer.dispose();
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      }
      planeGeo.dispose();
      planeMat.dispose();
      pGeo.dispose();
      pMat.dispose();
    };
  }, [quality, theme]);

  return (
    <div className="bg-fx" aria-hidden="true" ref={containerRef}>
      <span className="bg-fx__aurora bg-fx__aurora--cyan" />
      <span className="bg-fx__aurora bg-fx__aurora--violet" />
      <span className="bg-fx__aurora bg-fx__aurora--teal" />
      <span className="bg-fx__grid" />
      <span className="bg-fx__noise" />
      <span className="bg-fx__vignette" />
    </div>
  );
}
