import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Zap, Target, TrendingUp } from 'lucide-react';

interface ProgressBarProps {
  completed: number;
  total: number;
  label?: string;
  showPercentage?: boolean;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  animated?: boolean;
}

/**
 * Progress Bar Component
 *
 * Displays a visual progress bar with statistics
 */
export function ProgressBar({
  completed,
  total,
  label = 'Progress',
  showPercentage = true,
  difficulty,
  animated = true,
}: ProgressBarProps) {
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-500';
      case 'intermediate':
        return 'bg-blue-500';
      case 'advanced':
        return 'bg-purple-500';
      default:
        return 'bg-primary';
    }
  };

  const getDifficultyBadge = () => {
    switch (difficulty) {
      case 'beginner':
        return <Badge className="bg-green-100 text-green-800">Beginner</Badge>;
      case 'intermediate':
        return <Badge className="bg-blue-100 text-blue-800">Intermediate</Badge>;
      case 'advanced':
        return <Badge className="bg-purple-100 text-purple-800">Advanced</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-foreground">{label}</h3>
          {difficulty && getDifficultyBadge()}
        </div>
        {showPercentage && (
          <span className="text-sm font-bold text-primary">
            {Math.round(percentage)}%
          </span>
        )}
      </div>

      <div className="relative">
        <Progress
          value={percentage}
          className={`h-3 ${animated ? 'transition-all duration-500' : ''}`}
        />
      </div>

      <p className="text-xs text-foreground/60">
        {completed} of {total} completed
      </p>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  unit?: string;
  color?: 'primary' | 'success' | 'warning' | 'info';
}

/**
 * Stat Card Component
 *
 * Displays a single statistic with icon
 */
export function StatCard({
  icon,
  label,
  value,
  unit,
  color = 'primary',
}: StatCardProps) {
  const colorClasses = {
    primary: 'text-primary',
    success: 'text-green-600',
    warning: 'text-amber-600',
    info: 'text-blue-600',
  };

  return (
    <Card className="border-border">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-foreground/60 mb-1">{label}</p>
            <p className="text-2xl font-bold text-foreground">
              {value}
              {unit && <span className="text-sm text-foreground/60 ml-1">{unit}</span>}
            </p>
          </div>
          <div className={`${colorClasses[color]} opacity-80`}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}

interface ProgressGridProps {
  stats: {
    completed: number;
    total: number;
    beginnerCompleted: number;
    beginnerTotal: number;
    intermediateCompleted: number;
    intermediateTotal: number;
    advancedCompleted: number;
    advancedTotal: number;
    totalTimeSpent: number;
    averageTimePerChallenge: number;
    averageAttemptsPerChallenge: number;
    totalHintsUsed: number;
  };
}

/**
 * Progress Grid Component
 *
 * Displays multiple progress bars and statistics in a grid
 */
export function ProgressGrid({ stats }: ProgressGridProps) {
  return (
    <div className="space-y-8">
      {/* Overall Progress */}
      <Card className="border-border bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Overall Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ProgressBar
            completed={stats.completed}
            total={stats.total}
            label="All Challenges"
            showPercentage={true}
          />
        </CardContent>
      </Card>

      {/* Difficulty Progress */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base">Beginner</CardTitle>
          </CardHeader>
          <CardContent>
            <ProgressBar
              completed={stats.beginnerCompleted}
              total={stats.beginnerTotal}
              difficulty="beginner"
              showPercentage={false}
            />
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base">Intermediate</CardTitle>
          </CardHeader>
          <CardContent>
            <ProgressBar
              completed={stats.intermediateCompleted}
              total={stats.intermediateTotal}
              difficulty="intermediate"
              showPercentage={false}
            />
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base">Advanced</CardTitle>
          </CardHeader>
          <CardContent>
            <ProgressBar
              completed={stats.advancedCompleted}
              total={stats.advancedTotal}
              difficulty="advanced"
              showPercentage={false}
            />
          </CardContent>
        </Card>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<TrendingUp className="w-6 h-6" />}
          label="Total Time Spent"
          value={Math.round(stats.totalTimeSpent / 60)}
          unit="min"
          color="info"
        />
        <StatCard
          icon={<Zap className="w-6 h-6" />}
          label="Avg Time per Challenge"
          value={Math.round(stats.averageTimePerChallenge)}
          unit="sec"
          color="warning"
        />
        <StatCard
          icon={<Target className="w-6 h-6" />}
          label="Avg Attempts"
          value={stats.averageAttemptsPerChallenge.toFixed(1)}
          color="primary"
        />
        <StatCard
          icon={<Zap className="w-6 h-6" />}
          label="Total Hints Used"
          value={stats.totalHintsUsed}
          color="success"
        />
      </div>
    </div>
  );
}
