import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ChevronDown,
  ChevronUp,
  Lightbulb,
  AlertCircle,
  CheckCircle,
  BookOpen,
  Code,
  Zap
} from 'lucide-react';
import { SolutionExplanation } from '@/types/challenge';

interface SolutionExplanationProps {
  solution: SolutionExplanation;
}

/**
 * Solution Explanation Component
 *
 * Displays detailed solution walkthroughs unlocked after challenge completion.
 * Includes:
 * - Official solution code with explanation
 * - Key learning points
 * - Alternative approaches with pros/cons
 * - Common mistakes to avoid
 * - Additional learning resources
 */
export default function SolutionExplanationComponent({ solution }: SolutionExplanationProps) {
  const [expandedMistake, setExpandedMistake] = useState<number | null>(null);
  const [expandedApproach, setExpandedApproach] = useState<number | null>(null);

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div>
              <CardTitle className="text-2xl text-green-900">🎉 Challenge Complete!</CardTitle>
              <p className="text-sm text-green-700 mt-1">
                Here's the official solution with detailed explanations and learning resources.
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Tabs */}
      <Tabs defaultValue="solution" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="solution">Solution</TabsTrigger>
          <TabsTrigger value="approaches">Approaches</TabsTrigger>
          <TabsTrigger value="mistakes">Mistakes</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        {/* Solution Tab */}
        <TabsContent value="solution" className="space-y-6">
          {/* Explanation */}
          <Card className="border-border">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-accent" />
                How It Works
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="prose prose-sm max-w-none">
                <p className="whitespace-pre-wrap text-foreground/80 leading-relaxed">
                  {solution.explanation}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Official Solution Code */}
          <Card className="border-border">
            <CardHeader className="bg-slate-900 text-white">
              <CardTitle className="text-lg flex items-center gap-2">
                <Code className="w-5 h-5" />
                Official Solution
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <pre className="bg-slate-900 text-emerald-400 p-6 overflow-x-auto rounded-b-lg">
                <code className="font-mono text-sm">{solution.code}</code>
              </pre>
            </CardContent>
          </Card>

          {/* Key Points */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-accent" />
                Key Learning Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {solution.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span className="text-foreground/80">{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alternative Approaches Tab */}
        <TabsContent value="approaches" className="space-y-4">
          {solution.alternativeApproaches && solution.alternativeApproaches.length > 0 ? (
            solution.alternativeApproaches.map((approach, idx) => (
              <Card key={idx} className="border-border">
                <button
                  onClick={() =>
                    setExpandedApproach(expandedApproach === idx ? null : idx)
                  }
                  className="w-full p-6 flex items-center justify-between hover:bg-muted/50 transition-colors"
                >
                  <div className="text-left">
                    <h3 className="font-semibold text-lg text-foreground">
                      {approach.title}
                    </h3>
                    <p className="text-sm text-foreground/60 mt-1">
                      {approach.description}
                    </p>
                  </div>
                  {expandedApproach === idx ? (
                    <ChevronUp className="w-5 h-5 text-primary flex-shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-primary flex-shrink-0 ml-4" />
                  )}
                </button>

                {expandedApproach === idx && (
                  <div className="border-t border-border p-6 space-y-4">
                    {/* Code */}
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-2">Code:</p>
                      <pre className="bg-slate-900 text-emerald-400 p-4 rounded overflow-x-auto">
                        <code className="font-mono text-sm">{approach.code}</code>
                      </pre>
                    </div>

                    {/* Pros and Cons */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-semibold text-green-700 mb-2">✓ Pros:</p>
                        <ul className="space-y-1">
                          {approach.pros.map((pro, i) => (
                            <li key={i} className="text-sm text-foreground/70 flex gap-2">
                              <span className="text-green-600">•</span>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-red-700 mb-2">✗ Cons:</p>
                        <ul className="space-y-1">
                          {approach.cons.map((con, i) => (
                            <li key={i} className="text-sm text-foreground/70 flex gap-2">
                              <span className="text-red-600">•</span>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            ))
          ) : (
            <Card className="border-border">
              <CardContent className="pt-6">
                <p className="text-foreground/60">
                  No alternative approaches documented for this challenge.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Common Mistakes Tab */}
        <TabsContent value="mistakes" className="space-y-4">
          {solution.commonMistakes && solution.commonMistakes.length > 0 ? (
            solution.commonMistakes.map((mistake, idx) => (
              <Card
                key={idx}
                className="border-red-200 bg-red-50 cursor-pointer hover:border-red-300 transition-colors"
                onClick={() =>
                  setExpandedMistake(expandedMistake === idx ? null : idx)
                }
              >
                <div className="p-6 flex items-start justify-between">
                  <div className="flex gap-3 flex-1">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-red-900">
                        {mistake.mistake}
                      </h3>
                      {expandedMistake !== idx && (
                        <p className="text-sm text-red-700 mt-1">
                          Click to see explanation and correction
                        </p>
                      )}
                    </div>
                  </div>
                  {expandedMistake === idx ? (
                    <ChevronUp className="w-5 h-5 text-red-600 flex-shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-red-600 flex-shrink-0 ml-4" />
                  )}
                </div>

                {expandedMistake === idx && (
                  <div className="border-t border-red-200 p-6 space-y-4 bg-white">
                    <div>
                      <p className="text-sm font-semibold text-red-900 mb-2">
                        Why this is wrong:
                      </p>
                      <p className="text-sm text-foreground/80">
                        {mistake.why}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-green-900 mb-2">
                        ✓ Correction:
                      </p>
                      <p className="text-sm text-foreground/80">
                        {mistake.correction}
                      </p>
                    </div>
                  </div>
                )}
              </Card>
            ))
          ) : (
            <Card className="border-border">
              <CardContent className="pt-6">
                <p className="text-foreground/60">
                  No common mistakes documented for this challenge.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-4">
          {solution.resources && solution.resources.length > 0 ? (
            solution.resources.map((resource, idx) => (
              <a
                key={idx}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="border-border hover:border-primary hover:shadow-md transition-all cursor-pointer">
                  <CardContent className="pt-6 flex items-start justify-between">
                    <div className="flex gap-3 flex-1">
                      <BookOpen className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                          {resource.title}
                        </h3>
                        <p className="text-sm text-foreground/60 mt-1">
                          {resource.url}
                        </p>
                      </div>
                    </div>
                    <Badge className="ml-4 flex-shrink-0">
                      {resource.type === 'article'
                        ? '📄 Article'
                        : resource.type === 'video'
                        ? '🎥 Video'
                        : '📚 Docs'}
                    </Badge>
                  </CardContent>
                </Card>
              </a>
            ))
          ) : (
            <Card className="border-border">
              <CardContent className="pt-6">
                <p className="text-foreground/60">
                  No additional resources available for this challenge.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Learning Path Suggestion */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-900 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-800">
                Great job completing this challenge! Now that you understand these concepts, try:
              </p>
              <ul className="mt-3 space-y-2 text-sm text-blue-800">
                <li>• Review the alternative approaches and understand their trade-offs</li>
                <li>• Modify the solution and experiment with different implementations</li>
                <li>• Try solving similar challenges to reinforce your learning</li>
                <li>• Read the documentation links to deepen your understanding</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
