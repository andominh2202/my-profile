import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary]', error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container" style={{ paddingBlock: '64px', textAlign: 'center' }}>
          <h1>Đã xảy ra lỗi hiển thị</h1>
          <p style={{ marginTop: '12px', color: 'var(--text-secondary)' }}>
            Vui lòng tải lại trang để khôi phục trải nghiệm.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
