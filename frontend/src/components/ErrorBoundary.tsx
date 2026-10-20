import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-6">
          <div className="max-w-md w-full p-6 rounded-lg border border-border bg-card shadow-lg text-center space-y-4">
            <h2 className="text-2xl font-bold text-destructive">Něco se pokazilo</h2>
            <p className="text-sm text-muted-foreground">
              Při vykreslování stránky došlo k neočekávané chybě:
            </p>
            <pre className="p-3 bg-secondary/50 rounded text-xs text-left overflow-auto max-h-40 text-red-500 font-mono">
              {this.state.error?.message || 'Neznámá chyba'}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:opacity-90 transition-opacity cursor-pointer"
            >
              Obnovit stránku
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

