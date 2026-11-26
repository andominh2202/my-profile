import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { PROFILE } from '../data/profile';
import { useQualityLevel } from '../hooks/useQualityLevel';
import { useTheme } from '../hooks/useTheme';
import { copyToClipboard } from '../utils/clipboard';
import { Navbar, type NavItem } from '../components/navigation/Navbar';
import { HeroSection } from '../components/hero/HeroSection';
import { AboutSection } from '../components/profile/AboutSection';
import { GamerTagsSection } from '../components/gaming/GamerTagsSection';
import { SocialsSection } from '../components/social/SocialsSection';
import { MusicSection } from '../components/music/MusicSection';
import { GamesSection } from '../components/gaming/GamesSection';
import { ProjectsSection } from '../components/projects/ProjectsSection';
import { HobbiesSection } from '../components/profile/HobbiesSection';
import { ConnectSection } from '../components/contact/ConnectSection';
import { Footer } from '../components/common/Footer';
import { Toast } from '../components/common/Toast';
import { Preloader } from '../components/effects/Preloader';
import { CursorRing } from '../components/effects/CursorRing';

const AuroraScene = lazy(() =>
  import('../scenes/AuroraScene').then((m) => ({ default: m.AuroraScene }))
);

gsap.registerPlugin(ScrollTrigger);

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return 'PR';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[parts.length - 2].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export function App() {
  const { theme, toggleTheme } = useTheme();
  const quality = useQualityLevel();
  const [activeId, setActiveId] = useState('about');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState('');
  const lenisRef = useRef<Lenis | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const toastTimerRef = useRef<number | null>(null);
  const copyTimerRef = useRef<number | null>(null);

  const validTags = useMemo(
    () => PROFILE.gamerTags.filter((t) => t.value.trim().length > 0),
    []
  );
  const validProjects = useMemo(
    () => PROFILE.projects.filter((p) => p.title.trim().length > 0),
    []
  );

  const navItems: NavItem[] = useMemo(() => {
    const items: NavItem[] = [{ id: 'about', label: 'Giới thiệu' }];
    if (validTags.length > 0) items.push({ id: 'gamertags', label: 'Ingame', drawerLabel: 'Tên ingame' });
    if (PROFILE.socials.length > 0) items.push({ id: 'socials', label: 'Mạng xã hội' });
    items.push({ id: 'music', label: 'Nhạc', drawerLabel: 'Playlist nhạc' });
    if (PROFILE.games.length > 0) items.push({ id: 'games', label: 'Game', drawerLabel: 'Game yêu thích' });
    if (validProjects.length > 0) items.push({ id: 'projects', label: 'Dự án' });
    if (PROFILE.hobbies.length > 0) items.push({ id: 'hobbies', label: 'Sở thích' });
    items.push({ id: 'connect', label: 'Kết nối' });
    return items;
  }, [validTags.length, validProjects.length]);

  const handleCopy = useCallback(async (key: string, value: string) => {
    const ok = await copyToClipboard(value);
    if (ok) {
      setCopiedKey(key);
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
      copyTimerRef.current = window.setTimeout(() => setCopiedKey(null), 1800);
    }
    setToastMsg(ok ? `Đã copy: ${value}` : `Không copy được, hãy copy thủ công: ${value}`);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToastMsg(''), 2200);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    setActiveId(id);
    if (lenisRef.current && quality !== 'low') {
      lenisRef.current.scrollTo(target, { offset: id === 'top' ? 0 : -84 });
    } else {
      target.scrollIntoView({ behavior: quality === 'low' ? 'auto' : 'smooth' });
    }
  }, [quality]);

  // Lenis + GSAP Motion Engine + Scroll Progress
  useEffect(() => {
    if (quality === 'low') {
      document.querySelectorAll('.reveal').forEach((el) => {
        el.classList.add('is-revealed', 'is-settled');
      });
      return;
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const tickerFn = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      const words = document.querySelectorAll('#hero-name .kinetic-word');
      if (words.length) {
        gsap.from(words, {
          y: 18,
          opacity: 0,
          duration: 0.6,
          stagger: 0.07,
          ease: 'power3.out',
          clearProps: 'transform,opacity'
        });
      }

      const coverImg = document.getElementById('hero-cover');
      if (coverImg) {
        gsap.to(coverImg, {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });
      }

      document.querySelectorAll('.card.reveal').forEach((card) => {
        card.classList.add('is-revealed', 'is-settled');
        gsap.from(card, {
          y: 22,
          opacity: 0,
          duration: 0.55,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            once: true
          }
        });
      });
    });

    const onScroll = () => {
      const bar = progressRef.current;
      if (!bar) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      bar.style.transform = `scaleX(${ratio.toFixed(4)})`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      ctx.revert();
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [quality]);

  // Scrollspy
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-22% 0px -62% 0px', threshold: 0 }
    );
    sections.forEach((sec) => io.observe(sec));
    return () => io.disconnect();
  }, [navItems]);

  return (
    <>
      <a className="skip-link" href="#main">Bỏ qua tới nội dung chính</a>
      <Preloader />

      <Suspense
        fallback={
          <div className="bg-fx" aria-hidden="true">
            <span className="bg-fx__aurora bg-fx__aurora--cyan" />
            <span className="bg-fx__aurora bg-fx__aurora--violet" />
            <span className="bg-fx__aurora bg-fx__aurora--teal" />
            <span className="bg-fx__grid" />
          </div>
        }
      >
        <AuroraScene quality={quality} theme={theme} />
      </Suspense>

      <div ref={progressRef} className="scroll-progress" aria-hidden="true" />

      <Navbar
        nickname={PROFILE.nickname}
        initials={getInitials(PROFILE.name)}
        items={navItems}
        activeId={activeId}
        theme={theme}
        onToggleTheme={toggleTheme}
        onNavigate={scrollToSection}
      />

      <main id="main" className="container" tabIndex={-1}>
        <HeroSection
          profile={PROFILE}
          hasGamerTags={validTags.length > 0}
          copiedKey={copiedKey}
          quality={quality}
          onCopy={handleCopy}
          onNavigate={scrollToSection}
        />

        <div className="bento">
          <AboutSection profile={PROFILE} />
          <GamerTagsSection tags={validTags} copiedKey={copiedKey} onCopy={handleCopy} />
          <SocialsSection socials={PROFILE.socials} copiedKey={copiedKey} onCopy={handleCopy} />
          <MusicSection playlistUrl={PROFILE.spotify.playlistUrl} theme={theme} />
          <GamesSection games={PROFILE.games} quality={quality} />
          <ProjectsSection projects={validProjects} />
          <HobbiesSection hobbies={PROFILE.hobbies} />
          <ConnectSection
            profile={PROFILE}
            copiedKey={copiedKey}
            quality={quality}
            onCopy={handleCopy}
          />
        </div>
      </main>

      <Footer
        name={PROFILE.name}
        nickname={PROFILE.nickname}
        tagline={PROFILE.tagline}
        onBackToTop={() => scrollToSection('top')}
      />

      <CursorRing quality={quality} />
      <Toast message={toastMsg} />
    </>
  );
}
