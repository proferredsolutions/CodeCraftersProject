import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Copy, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface OutputLine {
  type: 'input' | 'output' | 'error';
  content: string;
}

/**
 * Interactive Python REPL Component
 *
 * Features:
 * - Live Python code execution using Pyodide
 * - Input/output history
 * - Error handling and display
 * - Copy to clipboard functionality
 * - Clear history button
 *
 * Future enhancements:
 * - Variable inspection
 * - Code completion
 * - Syntax highlighting
 * - Save session history
 */
export default function PythonREPL() {
  const [code, setCode] = useState('print("Hello, Python!")');
  const [output, setOutput] = useState<OutputLine[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pyodideReady, setPyodideReady] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  // Initialize Pyodide
  useEffect(() => {
    const initPyodide = async () => {
      try {
        // @ts-ignore
        const pyodide = await window.loadPyodide();
        // @ts-ignore
        window.pyodide = pyodide;
        setPyodideReady(true);
      } catch (error) {
        console.error('Failed to initialize Pyodide:', error);
        toast.error('Failed to load Python environment');
      }
    };

    // Check if Pyodide is already loaded
    // @ts-ignore
    if (!window.pyodide) {
      initPyodide();
    } else {
      // @ts-ignore
      setPyodideReady(!!window.pyodide);
    }
  }, []);

  // Auto-scroll to bottom of output
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const executeCode = async () => {
    if (!pyodideReady) {
      toast.error('Python environment is still loading...');
      return;
    }

    setIsLoading(true);
    const newOutput = [...output];
    newOutput.push({ type: 'input', content: code });

    try {
      // @ts-ignore
      const pyodide = window.pyodide;

      // Capture stdout
      const oldLog = console.log;
      let capturedOutput = '';
      console.log = (...args: any[]) => {
        capturedOutput += args.join(' ') + '\n';
      };

      try {
        // @ts-ignore
        const result = await pyodide.runPythonAsync(code);

        if (capturedOutput) {
          newOutput.push({ type: 'output', content: capturedOutput.trim() });
        } else if (result !== undefined && result !== null) {
          newOutput.push({ type: 'output', content: String(result) });
        }
      } finally {
        console.log = oldLog;
      }
    } catch (error: any) {
      newOutput.push({
        type: 'error',
        content: error.message || String(error)
      });
    }

    setOutput(newOutput);
    setIsLoading(false);
  };

  const copyOutput = () => {
    const outputText = output
      .map(line => `${line.type === 'input' ? '>>> ' : ''}${line.content}`)
      .join('\n');
    navigator.clipboard.writeText(outputText);
    toast.success('Output copied to clipboard!');
  };

  const clearOutput = () => {
    setOutput([]);
    setCode('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      executeCode();
    }
  };

  return (
    <Card className="w-full border-border shadow-lg">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border">
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🐍</span>
          Interactive Python REPL
        </CardTitle>
        <p className="text-sm text-foreground/60 mt-2">
          Write and execute Python code directly in your browser. Press Ctrl+Enter to run.
        </p>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {/* Code Input */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Python Code</label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter Python code here..."
            className="w-full h-32 p-4 bg-slate-900 text-emerald-400 font-mono text-sm rounded-lg border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
            disabled={!pyodideReady}
          />
        </div>

        {/* Control Buttons */}
        <div className="flex gap-3 flex-wrap">
          <Button
            onClick={executeCode}
            disabled={!pyodideReady || isLoading}
            className="gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Run Code
              </>
            )}
          </Button>
          <Button
            onClick={copyOutput}
            variant="outline"
            disabled={output.length === 0}
            className="gap-2"
          >
            <Copy className="w-4 h-4" />
            Copy Output
          </Button>
          <Button
            onClick={clearOutput}
            variant="outline"
            disabled={output.length === 0}
            className="gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </Button>
        </div>

        {/* Output Display */}
        {output.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Output</label>
            <div
              ref={outputRef}
              className="h-48 p-4 bg-slate-900 text-white font-mono text-sm rounded-lg border border-border overflow-y-auto space-y-1"
            >
              {output.map((line, idx) => (
                <div
                  key={idx}
                  className={`${
                    line.type === 'input'
                      ? 'text-emerald-400'
                      : line.type === 'error'
                      ? 'text-red-400'
                      : 'text-white'
                  }`}
                >
                  {line.type === 'input' && <span className="text-emerald-400">{'>>> '}</span>}
                  {line.content}
                </div>
              ))}
            </div>
          </div>
        )}

        {!pyodideReady && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
            Loading Python environment... This may take a moment on first load.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
