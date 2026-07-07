import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart3,
  Trophy,
  TrendingUp,
  Calendar,
  Zap,
  Target,
  Download,
  RotateCcw,
  Medal,
  Star,
  Clock,
  AlertCircle,
  Home,
} from 'lucide-react';
import { ProgressGrid, ProgressBar } from './ProgressBar';
import {
  calculateProgressStats,
  getCompletedChallenges,
  formatTime,
  getUnlockedAchievements,
  exportProgress,
  resetProgress,
} from '@/lib/progressTracker';
import { getChallengeById } from '@/lib/challenges';
import { toast } from 'sonner';

/**
 * User Dashboard Component
 *
 * Comprehensive dashboard showing:
 * - Overall progress and statistics
 * - Completed challenges with details
 * - Achievements and milestones
 * - Learning insights and recommendations
 */
export default function UserDashboard() {
  const [stats, setStats] = useState(calculateProgressStats());
  const [completedChallenges, setCompletedChallenges] = useState(getCompletedChallenges());
  const [achievements, setAchievements] = useState(getUnlockedAchievements());

  useEffect(() => {
    // Refresh data when component mounts
    setStats(calculateProgressStats());
    setCompletedChallenges(getCompletedChallenges());
    setAchievements(getUnlockedAchievements());
  }, []);

  const handleExportProgress = () => {
    const data = exportProgress();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gist-guide-progress-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Progress exported successfully!');
  };

  const handleResetProgress = () => {
    if (confirm('Are you sure? This will reset all your progress. This action cannot be undone.')) {
      resetProgress();
      window.location.reload();
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'advanced':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return '🌱';
      case 'intermediate':
        return '⚡';
      case 'advanced':
        return '🚀';
      default:
        return '📚';
    }
  };

  return (
    <div className="w-full space-y-8">
      <div className="flex items-center gap-2 mb-6"><Link href="/"><Button variant="outline" size="sm" className="gap-2"><Home className="w-4 h-4" />Return to Home</Button></Link></div>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-primary flex items-center gap-3">
              <BarChart3 className="w-10 h-10" />
              Your Learning Dashboard
            </h1>
            <p className="text-foreground/60 mt-2">
              Track your progress and celebrate your achievements
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportProgress}
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetProgress}
              className="gap-2 text-red-600 hover:text-red-700"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Quick Stats */}
          <Card className="border-border bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-accent" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Completion Rate</p>
                  <p className="text-3xl font-bold text-primary">
                    {Math.round(stats.completionPercentage)}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Challenges Completed</p>
                  <p className="text-3xl font-bold text-green-600">
                    {stats.completedChallenges}/{stats.totalChallenges}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Total Time Spent</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {Math.round(stats.totalTimeSpent / 60)}m
                  </p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Achievements</p>
                  <p className="text-3xl font-bold text-accent">{achievements.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Grid */}
          <ProgressGrid stats={{
            completed: stats.completedChallenges,
            total: stats.totalChallenges,
            beginnerCompleted: stats.beginnerCompleted,
            beginnerTotal: stats.beginnerTotal,
            intermediateCompleted: stats.intermediateCompleted,
            intermediateTotal: stats.intermediateTotal,
            advancedCompleted: stats.advancedCompleted,
            advancedTotal: stats.advancedTotal,
            totalTimeSpent: stats.totalTimeSpent,
            averageTimePerChallenge: stats.averageTimePerChallenge,
            averageAttemptsPerChallenge: stats.averageAttemptsPerChallenge,
            totalHintsUsed: stats.totalHintsUsed,
          }} />
        </TabsContent>

        {/* Completed Challenges Tab */}
        <TabsContent value="completed" className="space-y-4">
          {completedChallenges.length > 0 ? (
            <div className="space-y-4">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Completed Challenges ({completedChallenges.length})
                  </CardTitle>
                </CardHeader>
              </Card>

              {completedChallenges.map((progress) => {
                const challenge = getChallengeById(progress.challengeId);
                if (!challenge) return null;

                return (
                  <Card key={progress.challengeId} className="border-green-200 bg-green-50">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-lg text-foreground">
                                {challenge.title}
                              </h3>
                              <Badge className={getDifficultyColor(challenge.difficulty)}>
                                {getDifficultyIcon(challenge.difficulty)} {challenge.difficulty}
                              </Badge>
                            </div>
                            <p className="text-sm text-foreground/60">
                              {challenge.description}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-green-600">
                              {progress.bestScore}%
                            </p>
                            <p className="text-xs text-foreground/60">Best Score</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-green-200">
                          <div>
                            <p className="text-xs text-foreground/60">Completed</p>
                            <p className="font-semibold text-foreground">
                              {progress.completedAt
                                ? new Date(progress.completedAt).toLocaleDateString()
                                : 'N/A'}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-foreground/60">Best Time</p>
                            <p className="font-semibold text-foreground">
                              {formatTime(progress.bestTime)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-foreground/60">Attempts</p>
                            <p className="font-semibold text-foreground">
                              {progress.attempts}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="border-border">
              <CardContent className="pt-6 text-center py-12">
                <AlertCircle className="w-12 h-12 text-foreground/30 mx-auto mb-4" />
                <p className="text-foreground/60">
                  No completed challenges yet. Start with a beginner challenge!
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-4">
          <Card className="border-border bg-gradient-to-r from-accent/10 to-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Medal className="w-5 h-5 text-accent" />
                Achievements ({achievements.length})
              </CardTitle>
            </CardHeader>
          </Card>

          {achievements.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className="border-accent/20 bg-accent/5">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">
                          {achievement.title}
                        </h3>
                        <p className="text-sm text-foreground/60 mt-1">
                          {achievement.description}
                        </p>
                        {achievement.unlockedAt && (
                          <p className="text-xs text-accent mt-2 flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-border">
              <CardContent className="pt-6 text-center py-12">
                <Trophy className="w-12 h-12 text-foreground/30 mx-auto mb-4" />
                <p className="text-foreground/60">
                  Complete challenges to unlock achievements!
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          {/* Learning Insights */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Learning Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">
                    Average Time per Challenge
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {formatTime(stats.averageTimePerChallenge)}
                  </p>
                  <p className="text-xs text-foreground/60 mt-1">
                    {stats.averageTimePerChallenge < 120
                      ? '⚡ You\'re getting faster!'
                      : 'Take your time to understand concepts'}
                  </p>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm font-semibold text-foreground mb-2">
                    Average Attempts per Challenge
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {stats.averageAttemptsPerChallenge.toFixed(1)}
                  </p>
                  <p className="text-xs text-foreground/60 mt-1">
                    {stats.averageAttemptsPerChallenge <= 1.5
                      ? '🎯 Excellent accuracy!'
                      : 'Keep practicing to improve'}
                  </p>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm font-semibold text-foreground mb-2">
                    Hint Usage
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {stats.averageHintsPerChallenge.toFixed(1)} per challenge
                  </p>
                  <p className="text-xs text-foreground/60 mt-1">
                    {stats.averageHintsPerChallenge < 1
                      ? '🧠 Great independent learning!'
                      : 'Hints are helpful - use them wisely'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-900 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-blue-900">
              {stats.completedChallenges === 0 && (
                <p>
                  ✨ Start with a beginner challenge to get familiar with the platform!
                </p>
              )}

              {stats.beginnerCompleted === stats.beginnerTotal &&
                stats.intermediateCompleted < stats.intermediateTotal && (
                  <p>
                    🎓 Great job completing all beginner challenges! Ready for intermediate?
                  </p>
                )}

              {stats.intermediateCompleted === stats.intermediateTotal &&
                stats.advancedCompleted < stats.advancedTotal && (
                  <p>
                    🚀 Impressive! You've mastered intermediate challenges. Try advanced ones!
                  </p>
                )}

              {stats.completedChallenges === stats.totalChallenges && (
                <p>
                  👑 Congratulations! You've completed all challenges. You're a master!
                </p>
              )}

              {stats.averageAttemptsPerChallenge > 2 && (
                <p>
                  💡 Tip: Review the solution explanations after completing challenges to
                  learn alternative approaches.
                </p>
              )}

              {stats.totalTimeSpent > 3600 && (
                <p>
                  ⏱️ You've spent {Math.round(stats.totalTimeSpent / 3600)} hours learning.
                  Take breaks and stay hydrated!
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Helper component for completed challenges
function CheckCircle({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  );
}
