/**
 * Challenge System Type Definitions
 *
 * Defines the structure for coding challenges with auto-grading capabilities.
 * Supports multiple test case types and difficulty levels.
 */

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';
export type TestCaseType = 'function_output' | 'print_output' | 'variable_state';

/**
 * Test case for validating user solutions
 */
export interface TestCase {
  id: string;
  input?: string;  // Code to set up the test (e.g., function call)
  expectedOutput: string;  // Expected result
  description: string;  // Human-readable description
  isHidden?: boolean;  // Hidden test cases for final validation
}

/**
 * Hint for helping users solve challenges
 */
export interface Hint {
  id: string;
  title: string;
  content: string;
  level: number;  // 1 = gentle hint, 2 = more direct, 3 = near solution
}

/**
 * Solution explanation with detailed walkthrough
 */
export interface SolutionExplanation {
  id: string;
  title: string;  // e.g., "Official Solution"
  explanation: string;  // Detailed explanation of the approach
  code: string;  // Complete solution code
  keyPoints: string[];  // Key learning points
  alternativeApproaches?: {
    title: string;
    description: string;
    code: string;
    pros: string[];
    cons: string[];
  }[];
  commonMistakes?: {
    mistake: string;
    why: string;
    correction: string;
  }[];
  resources?: {
    title: string;
    url: string;
    type: 'article' | 'video' | 'documentation';
  }[];
}

/**
 * Complete challenge definition
 */
export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  category: string;  // e.g., 'gist-basics', 'python-api', 'data-manipulation'

  // Challenge content
  problem: string;  // Problem statement
  starterCode: string;  // Initial code provided to user
  expectedSolution?: string;  // Reference solution (optional)

  // Test cases
  testCases: TestCase[];

  // Help
  hints: Hint[];
  solution?: SolutionExplanation;  // Unlocked after successful completion

  // Metadata
  estimatedTime: number;  // Minutes
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

/**
 * User's attempt at solving a challenge
 */
export interface ChallengeAttempt {
  challengeId: string;
  userCode: string;
  submittedAt: string;
  testResults: TestResult[];
  passed: boolean;
  score: number;  // 0-100
}

/**
 * Result of running a single test case
 */
export interface TestResult {
  testCaseId: string;
  passed: boolean;
  expectedOutput: string;
  actualOutput: string;
  error?: string;
  executionTime: number;  // Milliseconds
}

/**
 * Challenge progress tracking
 */
export interface ChallengeProgress {
  challengeId: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'failed';
  attempts: number;
  bestScore: number;
  hintsUsed: number[];
  completedAt?: string;
}

/**
 * Leaderboard entry
 */
export interface LeaderboardEntry {
  username: string;
  challengeId: string;
  score: number;
  completedAt: string;
  attempts: number;
}
