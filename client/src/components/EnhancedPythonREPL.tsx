import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, RotateCcw, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material-darker.css";
import "codemirror/mode/python/python";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/display/autorefresh";

declare global {
  interface Window {
    pyodide?: any;
  }
}

interface EnhancedPythonREPLProps {
  initialCode?: string;
  onOutput?: (output: string) => void;
}

export default function EnhancedPythonREPL({ initialCode = "", onOutput }: EnhancedPythonREPLProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<any>(null);
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pyodideReady, setPyodideReady] = useState(false);

  // Initialize Pyodide
  useEffect(() => {
    const initPyodide = async () => {
      try {
        if (!window.pyodide) {
          const pyodide = await (window as any).loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.0/full/",
          });
          window.pyodide = pyodide;
        }
        setPyodideReady(true);
      } catch (error) {
        console.error("Failed to initialize Pyodide:", error);
        setOutput("Error: Failed to initialize Python environment");
      }
    };

    initPyodide();
  }, []);

  // Initialize CodeMirror
  useEffect(() => {
    if (editorRef.current && !editor) {
      const cm = CodeMirror(editorRef.current as HTMLElement, {
        value: initialCode,
        mode: "python",
        theme: "material-darker",
        lineNumbers: true,
        lineWrapping: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        indentUnit: 4,
        tabSize: 4,
        indentWithTabs: false,
        autoRefresh: true,
      });

      setEditor(cm);
    }
  }, [editorRef, editor, initialCode]);

  const runCode = async () => {
    if (!pyodideReady || !window.pyodide) {
      setOutput("Error: Python environment not ready");
      return;
    }

    setIsRunning(true);
    const code = editor.getValue();

    try {
      // Capture stdout
      const oldLog = console.log;
      let capturedOutput = "";

      window.pyodide.globals.set("__captured_output__", "");

      // Redirect print to capture output
      const pythonCode = `
import sys
from io import StringIO

old_stdout = sys.stdout
sys.stdout = StringIO()

try:
    ${code.split("\n").join("\n    ")}
    output = sys.stdout.getvalue()
finally:
    sys.stdout = old_stdout

output
`;

      const result = await window.pyodide.runPythonAsync(pythonCode);
      capturedOutput = result || "";

      setOutput(capturedOutput);
      onOutput?.(capturedOutput);
      toast.success("Code executed successfully!");
    } catch (error: any) {
      const errorMessage = error.message || String(error);
      setOutput(`Error: ${errorMessage}`);
      onOutput?.(`Error: ${errorMessage}`);
      toast.error("Code execution failed");
    } finally {
      setIsRunning(false);
    }
  };

  const clearCode = () => {
    if (editor) {
      editor.setValue("");
      setOutput("");
    }
  };

  const copyCode = () => {
    if (editor) {
      const code = editor.getValue();
      navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Code copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full space-y-4">
      <Card className="border-teal-500/20 bg-gradient-to-br from-slate-900 to-slate-800">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg text-white">Python REPL</CardTitle>
              <CardDescription className="text-slate-400">
                Write and execute Python code with syntax highlighting and line numbers
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={copyCode}
                className="border-slate-600 hover:bg-slate-700"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={clearCode}
                className="border-slate-600 hover:bg-slate-700"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                onClick={runCode}
                disabled={isRunning || !pyodideReady}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                <Play className="w-4 h-4 mr-2" />
                {isRunning ? "Running..." : "Run"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div
            ref={editorRef}
            className="rounded-b-lg overflow-hidden"
            style={{ height: "400px" }}
          />
        </CardContent>
      </Card>

      {/* Output Console */}
      <Card className="border-amber-500/20 bg-gradient-to-br from-slate-950 to-slate-900">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-white">Output Console</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-black rounded-lg p-4 font-mono text-sm text-green-400 min-h-[120px] max-h-[200px] overflow-y-auto whitespace-pre-wrap break-words">
            {output || (
              <span className="text-slate-500">
                {pyodideReady
                  ? "Run code to see output here..."
                  : "Loading Python environment..."}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
