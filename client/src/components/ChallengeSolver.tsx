import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Lightbulb, RotateCcw, Copy, Check, Loader2, AlertCircle, CheckCircle, ChevronDown, ChevronUp, Trophy } from 'lucide-react';
import { toast } from 'sonner';
import { Challenge, ChallengeAttempt, TestResult } from '@/types/challenge';
import { gradeChallengeAttempt, getFeedbackMessage, validateSyntax } from '@/lib/grader';
import SolutionExplanationComponent from './SolutionExplanation';
import { recordChallengeAttempt } from '@/lib/progressTracker';

interface ChallengeSolverProps {
  challenge: Challenge;
  onComplete?: (attempt: ChallengeAttempt) => void;
}

/**
 * Interactive Challenge Solver Component
 *
 * Features:
 * - Code editor with syntax validation
 * - Real-time test execution
 * - Progressive hint system with 3 levels
 * - Detailed test result feedback
 * - Performance metrics
 * - Hint tracking and analytics
 *
 * Hint Levels:
 * - Level 1 (Gentle): Nudges user in right direction
 * - Level 2 (Direct): More specific guidance
 * - Level 3 (Solution): Near-complete solution
 */
export default function ChallengeSolver({ challenge, onComplete }: ChallengeSolverProps) {
  const [code, setCode] = useState(challenge.starterCode);
  const [attempt, setAttempt] = useState<ChallengeAttempt | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleHintIndices, setVisibleHintIndices] = useState<Set<number>>(new Set());
  const [syntaxError, setSyntaxError] = useState<string | null>(null);
  const [hintHistory, setHintHistory] = useState<number[]>([]);
  const outputRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to output
  useEffect(() => {
    if (outputRef.current && attempt) {
      outputRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [attempt]);

  const handleSubmit = async () => {
    setIsLoading(true);
    setSyntaxError(null);

    try {
      // Validate syntax first
      const validation = await validateSyntax(code);
      if (!validation.valid) {
        setSyntaxError(validation.error || 'Syntax error');
        toast.error('Syntax error in code');
        setIsLoading(false);
        return;
      }

      // Grade the attempt
      const result = await gradeChallengeAttempt(challenge, code);
      setAttempt(result);

      if (result.passed) {
        toast.success('🎉 All tests passed!');
        // Record progress
        const totalTime = result.testResults.reduce((sum, tr) => sum + tr.executionTime, 0) / 1000;
        recordChallengeAttempt(
          challenge.id,
          result.score,
          totalTime,
          hintHistory.length
        );
        onComplete?.(result);
      } else {
        toast.error('Some tests failed. Try again!');
      }
    } catch (error: any) {
      setSyntaxError(error.message);
      toast.error('Error running tests');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setCode(challenge.starterCode);
    setAttempt(null);
    setSyntaxError(null);
    setVisibleHintIndices(new Set());
    setHintHistory([]);
  };

  const handleToggleHint = (hintIndex: number) => {
    setVisibleHintIndices(prev => {
      const newSet = new Set(prev);
      if (newSet.has(hintIndex)) {
        newSet.delete(hintIndex);
      } else {
        newSet.add(hintIndex);
        // Track hint history
        if (!hintHistory.includes(hintIndex)) {
          setHintHistory([...hintHistory, hintIndex]);
        }
      }
      return newSet;
    });
  };

  const handleShowNextHint = () => {
    const nextIndex = getNextHintIndex();
    if (nextIndex !== -1) {
      handleToggleHint(nextIndex);
      toast.info(`Hint ${nextIndex + 1} revealed!`);
    }
  };

  const getNextHintIndex = () => {
    for (let i = 0; i < challenge.hints.length; i++) {
      if (!visibleHintIndices.has(i)) {
        return i;
      }
    }
    return -1;
  };

  const canShowMoreHints = () => {
    return visibleHintIndices.size < challenge.hints.length;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    toast.success('Code copied to clipboard!');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score === 100) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getHintLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-green-100 text-green-800';
      case 2:
        return 'bg-yellow-100 text-yellow-800';
      case 3:
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getHintLevelLabel = (level: number) => {
    switch (level) {
      case 1:
        return 'Gentle Nudge';
      case 2:
        return 'Direct Help';
      case 3:
        return 'Solution Hint';
      default:
        return 'Hint';
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Challenge Header */}
      <Card className="border-border">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <CardTitle className="text-2xl">{challenge.title}</CardTitle>
                <Badge className={getDifficultyColor(challenge.difficulty)}>
                  {challenge.difficulty}
                </Badge>
              </div>
              <p className="text-foreground/70 mb-3">{challenge.description}</p>
              <div className="flex flex-wrap gap-2">
                {challenge.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="text-right text-sm text-foreground/60">
              <p>⏱️ {challenge.estimatedTime} min</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="prose prose-sm max-w-none">
            <p className="whitespace-pre-wrap text-foreground/80">{challenge.problem}</p>
          </div>
        </CardContent>
      </Card>

      {/* Code Editor */}
      <Card className="border-border">
        <CardHeader className="bg-slate-900 text-white">
          <CardTitle className="text-lg">Your Solution</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <textarea
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setSyntaxError(null);
            }}
            placeholder="Write your code here..."
            className="w-full h-64 p-4 bg-slate-900 text-emerald-400 font-mono text-sm rounded-b-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
          />
          {syntaxError && (
            <div className="p-4 bg-red-50 border-t border-red-200 text-red-800 text-sm">
              <p className="font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Syntax Error
              </p>
              <p className="mt-1">{syntaxError}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Control Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="gap-2"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Running Tests...
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Submit Solution
            </>
          )}
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          className="gap-2"
          size="lg"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
        <Button
          onClick={handleCopyCode}
          variant="outline"
          className="gap-2"
          size="lg"
        >
          <Copy className="w-4 h-4" />
          Copy Code
        </Button>
        {challenge.hints.length > 0 && (
          <Button
            onClick={handleShowNextHint}
            variant="outline"
            className="gap-2"
            size="lg"
            disabled={!canShowMoreHints()}
          >
            <Lightbulb className="w-4 h-4" />
            Get Hint ({visibleHintIndices.size}/{challenge.hints.length})
          </Button>
        )}
      </div>

      {/* Hints Section - Always Visible */}
      {challenge.hints.length > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Available Hints
              </CardTitle>
              <span className="text-sm text-blue-700 font-semibold">
                {visibleHintIndices.size} of {challenge.hints.length} revealed
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {challenge.hints.map((hint, idx) => (
              <div
                key={idx}
                className="border-2 border-blue-200 rounded-lg overflow-hidden transition-all hover:border-blue-400"
              >
                <button
                  onClick={() => handleToggleHint(idx)}
                  className="w-full p-4 bg-white hover:bg-blue-50 flex items-center justify-between text-left transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-lg font-bold text-blue-600 bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{hint.title}</p>
                      <p className="text-sm text-foreground/60">
                        {visibleHintIndices.has(idx) ? 'Click to hide' : 'Click to reveal'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getHintLevelColor(hint.level)}>
                      {getHintLevelLabel(hint.level)}
                    </Badge>
                    {visibleHintIndices.has(idx) ? (
                      <ChevronUp className="w-5 h-5 text-blue-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                </button>

                {/* Hint Content */}
                {visibleHintIndices.has(idx) && (
                  <div className="p-4 bg-blue-50 border-t-2 border-blue-200">
                    <p className="text-foreground/80 leading-relaxed">{hint.content}</p>
                    {idx < challenge.hints.length - 1 && (
                      <p className="text-xs text-foreground/60 mt-3 italic">
                        💡 Still stuck? Try the next hint for more direct guidance.
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
            <p className="text-sm text-blue-700 italic mt-4">
              💡 Hints are progressive: start with gentle nudges and work your way to solution hints if needed.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Test Results */}
      {attempt && (
        <div ref={outputRef} className="space-y-4">
          {/* Summary */}
          <Card className={`border-2 ${attempt.passed ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {attempt.passed ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-yellow-600" />
                  )}
                  <div>
                    <CardTitle className={attempt.passed ? 'text-green-900' : 'text-yellow-900'}>
                      {getFeedbackMessage(attempt, challenge)}
                    </CardTitle>
                  </div>
                </div>
                <div className={`text-3xl font-bold ${getScoreColor(attempt.score)}`}>
                  {attempt.score}%
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Test Cases */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Test Results</CardTitle>
              <p className="text-sm text-foreground/60 mt-2">
                {attempt.testResults.filter(r => r.passed).length} / {attempt.testResults.length} tests passed
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {attempt.testResults.map((result, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border-2 ${
                    result.passed
                      ? 'border-green-200 bg-green-50'
                      : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {result.passed ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-600" />
                      )}
                      <span className={`font-semibold ${result.passed ? 'text-green-900' : 'text-red-900'}`}>
                        Test {idx + 1}: {result.passed ? 'Passed' : 'Failed'}
                      </span>
                    </div>
                    <span className="text-xs text-foreground/60">
                      {result.executionTime.toFixed(2)}ms
                    </span>
                  </div>

                  {!result.passed && (
                    <div className="space-y-2 text-sm">
                      <div>
                        <p className="font-semibold text-red-900">Expected:</p>
                        <code className="block bg-red-100 p-2 rounded mt-1 text-xs">
                          {result.expectedOutput}
                        </code>
                      </div>
                      <div>
                        <p className="font-semibold text-red-900">Got:</p>
                        <code className="block bg-red-100 p-2 rounded mt-1 text-xs">
                          {result.actualOutput}
                        </code>
                      </div>
                      {result.error && (
                        <div>
                          <p className="font-semibold text-red-900">Error:</p>
                          <code className="block bg-red-100 p-2 rounded mt-1 text-xs">
                            {result.error}
                          </code>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Hint Usage Stats */}
          {hintHistory.length > 0 && (
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Hint Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-sm text-foreground/60">Hints Used</p>
                    <p className="text-2xl font-bold text-primary">{hintHistory.length}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground/60 mb-2">Hint Sequence</p>
                    <div className="flex gap-2 flex-wrap">
                      {hintHistory.map((hintIdx, i) => (
                        <Badge key={i} className={getHintLevelColor(challenge.hints[hintIdx].level)}>
                          Hint {hintIdx + 1}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Solution Explanation - Unlocked after successful completion */}
          {attempt.passed && challenge.solution && (
            <div className="mt-8">
              <SolutionExplanationComponent solution={challenge.solution} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
