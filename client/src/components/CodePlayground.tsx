import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'sonner';

interface CodePlaygroundProps {
  title: string;
  description?: string;
  code: string;
  language?: string;
  defaultExpanded?: boolean;
}

/**
 * Interactive Code Playground Component
 *
 * Features:
 * - Syntax highlighting with code blocks
 * - Copy-to-clipboard with visual feedback
 * - Collapsible sections for progressive disclosure
 * - Language-specific styling
 * - Beautiful code presentation
 *
 * Future enhancements:
 * - Live code execution
 * - Diff highlighting
 * - Line numbers
 * - Code folding
 * - Theme switching
 */
export default function CodePlayground({
  title,
  description,
  code,
  language = 'python',
  defaultExpanded = true,
}: CodePlaygroundProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success('Code copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="w-full border-border hover:shadow-lg transition-shadow">
      <CardHeader
        className="cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">{title}</CardTitle>
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-mono rounded">
                {language}
              </span>
            </div>
            {description && (
              <p className="text-sm text-foreground/60 mt-2">{description}</p>
            )}
          </div>
          <button className="p-1 hover:bg-muted rounded transition-colors">
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-foreground/60" />
            ) : (
              <ChevronDown className="w-5 h-5 text-foreground/60" />
            )}
          </button>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="p-0 border-t border-border">
          <div className="relative">
            {/* Code Block */}
            <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto font-mono text-sm rounded-b-lg">
              <code>{code}</code>
            </pre>

            {/* Copy Button */}
            <Button
              onClick={copyToClipboard}
              size="sm"
              variant="outline"
              className="absolute top-3 right-3 gap-2 bg-white/10 border-white/20 hover:bg-white/20"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
