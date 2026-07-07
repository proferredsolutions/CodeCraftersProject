/**
 * Progress Tracking Types
 *
 * Defines the structure for tracking user progress through challenges
 */

export interface ChallengeProgress {
  challengeId: string;
  completed: boolean;
  completedAt?: string;
  attempts: number;
  bestScore: number;
  bestTime: number; // in seconds
  hintsUsed: number;
  lastAttemptAt?: string;
}

export interface UserProgress {
  userId: string;
  createdAt: string;
  lastUpdatedAt: string;
  challenges: Record<string, ChallengeProgress>;
  totalChallengesCompleted: number;
  totalAttempts: number;
  totalTimeSpent: number; // in seconds
}

export interface ProgressStats {
  totalChallenges: number;
  completedChallenges: number;
  completionPercentage: number;
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
  averageHintsPerChallenge: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  condition: (stats: ProgressStats) => boolean;
}
