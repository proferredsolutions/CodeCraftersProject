import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronRight, Trophy, Zap, BookOpen } from 'lucide-react';
import { Challenge, ChallengeAttempt } from '@/types/challenge';
import { CHALLENGES, getChallengesByDifficulty, getAllDifficulties } from '@/lib/challenges';
import ChallengeSolver from './ChallengeSolver';

/**
 * Challenge Browser Component
 *
 * Features:
 * - Browse challenges by difficulty
 * - Filter and search
 * - Track progress
 * - Launch challenge solver
 *
 * Future enhancements:
 * - Search functionality
 * - Leaderboard
 * - Achievement badges
 * - Difficulty progression
 */
export default function ChallengeBrowser() {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState('beginner');

  const handleChallengeComplete = (attempt: ChallengeAttempt) => {
    if (attempt.passed) {
      setCompletedChallenges(prev => {
        const newSet = new Set(prev);
        newSet.add(attempt.challengeId);
        return newSet;
      });
    }
  };

  if (selectedChallenge) {
    return (
      <div className="space-y-4">
        <Button
          onClick={() => setSelectedChallenge(null)}
          variant="outline"
          className="gap-2"
        >
          ← Back to Challenges
        </Button>
        <ChallengeSolver
          challenge={selectedChallenge}
          onComplete={handleChallengeComplete}
        />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary flex items-center gap-3">
          <Trophy className="w-8 h-8 text-accent" />
          Coding Challenges
        </h2>
        <p className="text-lg text-foreground/70">
          Test your skills with interactive coding challenges. Start with beginner challenges and work your way up!
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{CHALLENGES.length}</div>
              <p className="text-foreground/70">Total Challenges</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-2">{completedChallenges.size}</div>
              <p className="text-foreground/70">Completed</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">
                {Math.round((completedChallenges.size / CHALLENGES.length) * 100)}%
              </div>
              <p className="text-foreground/70">Progress</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Challenges by Difficulty */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          {getAllDifficulties().map(difficulty => (
            <TabsTrigger key={difficulty} value={difficulty} className="capitalize">
              {difficulty === 'beginner' && <Zap className="w-4 h-4 mr-2" />}
              {difficulty === 'intermediate' && <BookOpen className="w-4 h-4 mr-2" />}
              {difficulty === 'advanced' && <Trophy className="w-4 h-4 mr-2" />}
              {difficulty}
            </TabsTrigger>
          ))}
        </TabsList>

        {getAllDifficulties().map(difficulty => (
          <TabsContent key={difficulty} value={difficulty} className="space-y-4 mt-6">
            <div className="grid gap-4">
              {getChallengesByDifficulty(difficulty).map(challenge => {
                const isCompleted = completedChallenges.has(challenge.id);
                return (
                  <Card
                    key={challenge.id}
                    className="border-border hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedChallenge(challenge)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-lg">{challenge.title}</CardTitle>
                            {isCompleted && (
                              <Badge className="bg-green-100 text-green-800">✓ Completed</Badge>
                            )}
                          </div>
                          <p className="text-foreground/70 mb-4">{challenge.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {challenge.tags.slice(0, 3).map(tag => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {challenge.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{challenge.tags.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="text-right ml-4 flex-shrink-0">
                          <p className="text-sm text-foreground/60 mb-2">
                            ⏱️ {challenge.estimatedTime} min
                          </p>
                          <p className="text-sm text-foreground/60 mb-4">
                            {challenge.testCases.length} tests
                          </p>
                          <Button
                            size="sm"
                            className="gap-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedChallenge(challenge);
                            }}
                          >
                            Start <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Tips */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-lg text-blue-900">💡 Tips for Success</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-900 space-y-2 text-sm">
          <p>• Start with beginner challenges to build confidence</p>
          <p>• Read the problem statement carefully before coding</p>
          <p>• Use hints if you get stuck, but try to solve it yourself first</p>
          <p>• Test your code with different inputs to ensure it works correctly</p>
          <p>• Review the test cases to understand what's expected</p>
        </CardContent>
      </Card>
    </div>
  );
}
