import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error in component tree:', error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-stone-950 text-stone-100 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-stone-900 border border-amber-500/40 rounded-2xl p-6 shadow-2xl text-center space-y-4">
            <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto text-amber-400">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold font-serif text-amber-300">
              Gracy’s Biblical Echoes
            </h2>
            <p className="text-sm text-stone-300 leading-relaxed">
              An unexpected display issue occurred. You can safely restore and reload the studio session.
            </p>
            {this.state.error && (
              <div className="p-3 bg-stone-950 rounded-lg text-left text-xs font-mono text-red-400 max-h-32 overflow-y-auto border border-stone-800">
                {this.state.error.message || String(this.state.error)}
              </div>
            )}
            <button
              onClick={() => window.location.reload()}
              className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md text-sm cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Reload Studio
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
