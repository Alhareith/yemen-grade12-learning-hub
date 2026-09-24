import { AlertTriangle, RotateCcw } from "lucide-react";
import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div dir="rtl" className="flex min-h-screen items-center justify-center bg-background p-8">
          <div className="flex w-full max-w-2xl flex-col items-center p-8 text-center">
            <AlertTriangle size={48} className="mb-6 shrink-0 text-rose-600" />

            <h2 className="mb-4 text-xl font-black text-slate-950">حدث خطأ غير متوقع.</h2>

            <div className="mb-6 w-full overflow-auto rounded-xl bg-muted p-4 text-right">
              <pre className="whitespace-break-spaces text-xs text-muted-foreground">
                {this.state.error?.stack}
              </pre>
            </div>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-bold text-primary-foreground transition hover:opacity-90"
            >
              <RotateCcw size={16} />
              إعادة تحميل الصفحة
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
