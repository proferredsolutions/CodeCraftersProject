/**
 * Progress Tracker
 *
 * Manages user progress through challenges with localStorage persistence.
 * Provides utilities for tracking, calculating stats, and managing achievements.
 */

import { UserProgress, ChallengeProgress, ProgressStats, Achievement } from '@/types/progress';
import { CHALLENGES } from './challenges';

const STORAGE_KEY = 'gist-guide-user-progress';
const USER_ID = 'default-user'; // In a real app, this would be the logged-in user

/**
 * Initialize or get user progress from localStorage
 */
export function getUserProgress(): UserProgress {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse progress:', e);
    }
  }

  // Initialize new progress
  const newProgress: UserProgress = {
    userId: USER_ID,
    createdAt: new Date().toISOString(),
    lastUpdatedAt: new Date().toISOString(),
    challenges: {},
    totalChallengesCompleted: 0,
    totalAttempts: 0,
    totalTimeSpent: 0,
  };

  // Initialize each challenge
  CHALLENGES.forEach(challenge => {
    newProgress.challenges[challenge.id] = {
      challengeId: challenge.id,
      completed: false,
      attempts: 0,
      bestScore: 0,
      bestTime: 0,
      hintsUsed: 0,
    };
  });

  return newProgress;
}

/**
 * Save progress to localStorage
 */
export function saveUserProgress(progress: UserProgress): void {
  progress.lastUpdatedAt = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

/**
 * Record a challenge attempt
 */
export function recordChallengeAttempt(
  challengeId: string,
  score: number,
  timeSpent: number,
  hintsUsed: number
): void {
  const progress = getUserProgress();
  const challengeProgress = progress.challenges[challengeId];

  if (!challengeProgress) {
    console.error(`Challenge ${challengeId} not found`);
    return;
  }

  challengeProgress.attempts += 1;
  challengeProgress.lastAttemptAt = new Date().toISOString();
  challengeProgress.hintsUsed = Math.max(challengeProgress.hintsUsed, hintsUsed);

  // Update best score
  if (score > challengeProgress.bestScore) {
    challengeProgress.bestScore = score;
  }

  // Mark as completed if score is 100%
  if (score === 100 && !challengeProgress.completed) {
    challengeProgress.completed = true;
    challengeProgress.completedAt = new Date().toISOString();
    challengeProgress.bestTime = timeSpent;
    progress.totalChallengesCompleted += 1;
  }

  // Update best time if this is a completion
  if (score === 100 && timeSpent < challengeProgress.bestTime) {
    challengeProgress.bestTime = timeSpent;
  }

  progress.totalAttempts += 1;
  progress.totalTimeSpent += timeSpent;

  saveUserProgress(progress);
}

/**
 * Calculate progress statistics
 */
export function calculateProgressStats(): ProgressStats {
  const progress = getUserProgress();

  const totalChallenges = CHALLENGES.length;
  const completedChallenges = progress.totalChallengesCompleted;

  // Count by difficulty
  const beginnerChallenges = CHALLENGES.filter(c => c.difficulty === 'beginner');
  const intermediateChallenges = CHALLENGES.filter(c => c.difficulty === 'intermediate');
  const advancedChallenges = CHALLENGES.filter(c => c.difficulty === 'advanced');

  const beginnerCompleted = beginnerChallenges.filter(
    c => progress.challenges[c.id]?.completed
  ).length;

  const intermediateCompleted = intermediateChallenges.filter(
    c => progress.challenges[c.id]?.completed
  ).length;

  const advancedCompleted = advancedChallenges.filter(
    c => progress.challenges[c.id]?.completed
  ).length;

  const totalTimeSpent = progress.totalTimeSpent;
  const averageTimePerChallenge =
    completedChallenges > 0 ? totalTimeSpent / completedChallenges : 0;

  const averageAttemptsPerChallenge =
    totalChallenges > 0 ? progress.totalAttempts / totalChallenges : 0;

  let totalHintsUsed = 0;
  Object.values(progress.challenges).forEach(cp => {
    totalHintsUsed += cp.hintsUsed;
  });

  const averageHintsPerChallenge =
    completedChallenges > 0 ? totalHintsUsed / completedChallenges : 0;

  return {
    totalChallenges,
    completedChallenges,
    completionPercentage: (completedChallenges / totalChallenges) * 100,
    beginnerCompleted,
    beginnerTotal: beginnerChallenges.length,
    intermediateCompleted,
    intermediateTotal: intermediateChallenges.length,
    advancedCompleted,
    advancedTotal: advancedChallenges.length,
    totalTimeSpent,
    averageTimePerChallenge,
    averageAttemptsPerChallenge,
    totalHintsUsed,
    averageHintsPerChallenge,
  };
}

/**
 * Get challenge progress by ID
 */
export function getChallengeProgress(challengeId: string): ChallengeProgress | null {
  const progress = getUserProgress();
  return progress.challenges[challengeId] || null;
}

/**
 * Get all completed challenges
 */
export function getCompletedChallenges(): ChallengeProgress[] {
  const progress = getUserProgress();
  return Object.values(progress.challenges).filter(cp => cp.completed);
}

/**
 * Get challenges by difficulty
 */
export function getChallengesByDifficultyProgress(difficulty: string): ChallengeProgress[] {
  const progress = getUserProgress();
  const challenges = CHALLENGES.filter(c => c.difficulty === difficulty);
  return challenges.map(c => progress.challenges[c.id]);
}

/**
 * Format time in seconds to readable format
 */
export function formatTime(seconds: number): string {
  if (seconds < 60) {
    return `${Math.round(seconds)}s`;
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);
  return `${minutes}m ${remainingSeconds}s`;
}

/**
 * Reset all progress (for testing/debugging)
 */
export function resetProgress(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Export progress as JSON
 */
export function exportProgress(): string {
  const progress = getUserProgress();
  return JSON.stringify(progress, null, 2);
}

/**
 * Import progress from JSON
 */
export function importProgress(jsonString: string): boolean {
  try {
    const imported = JSON.parse(jsonString);
    if (imported.userId && imported.challenges) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(imported));
      return true;
    }
  } catch (e) {
    console.error('Failed to import progress:', e);
  }
  return false;
}

/**
 * Get achievements
 */
export function getAchievements(): Achievement[] {
  const stats = calculateProgressStats();

  return [
    {
      id: 'first-challenge',
      title: 'First Steps',
      description: 'Complete your first challenge',
      icon: '🎯',
      condition: (s) => s.completedChallenges >= 1,
    },
    {
      id: 'beginner-master',
      title: 'Beginner Master',
      description: 'Complete all beginner challenges',
      icon: '🌱',
      condition: (s) => s.beginnerCompleted === s.beginnerTotal,
    },
    {
      id: 'intermediate-pro',
      title: 'Intermediate Pro',
      description: 'Complete all intermediate challenges',
      icon: '⚡',
      condition: (s) => s.intermediateCompleted === s.intermediateTotal,
    },
    {
      id: 'advanced-expert',
      title: 'Advanced Expert',
      description: 'Complete all advanced challenges',
      icon: '🚀',
      condition: (s) => s.advancedCompleted === s.advancedTotal,
    },
    {
      id: 'challenge-master',
      title: 'Challenge Master',
      description: 'Complete all challenges',
      icon: '👑',
      condition: (s) => s.completedChallenges === s.totalChallenges,
    },
    {
      id: 'speed-runner',
      title: 'Speed Runner',
      description: 'Complete 3 challenges in under 2 minutes each',
      icon: '⚡',
      condition: (s) => {
        const progress = getUserProgress();
        const fastChallenges = Object.values(progress.challenges).filter(
          cp => cp.completed && cp.bestTime < 120
        );
        return fastChallenges.length >= 3;
      },
    },
    {
      id: 'hint-master',
      title: 'Independent Learner',
      description: 'Complete 3 challenges without using hints',
      icon: '🧠',
      condition: (s) => {
        const progress = getUserProgress();
        const noHintChallenges = Object.values(progress.challenges).filter(
          cp => cp.completed && cp.hintsUsed === 0
        );
        return noHintChallenges.length >= 3;
      },
    },
  ];
}

/**
 * Get unlocked achievements
 */
export function getUnlockedAchievements(): Achievement[] {
  const stats = calculateProgressStats();
  const achievements = getAchievements();

  return achievements.filter(achievement => achievement.condition(stats));
}
