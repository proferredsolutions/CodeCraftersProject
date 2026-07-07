/**
 * Auto-Grading Engine
 *
 * Evaluates user code against test cases using Pyodide.
 * Handles execution, output capture, and result comparison.
 */

import { Challenge, TestResult, ChallengeAttempt } from '@/types/challenge';

/**
 * Execute code and capture output
 */
export async function executeCode(
  code: string,
  testInput: string
): Promise<{ output: string; error: string | null; executionTime: number }> {
  const startTime = performance.now();

  try {
    // @ts-ignore
    if (!window.pyodide) {
      return {
        output: '',
        error: 'Python environment not ready. Please wait for it to load.',
        executionTime: 0,
      };
    }

    // @ts-ignore
    const pyodide = window.pyodide;

    // Capture stdout
    const oldLog = console.log;
    let capturedOutput = '';
    console.log = (...args: any[]) => {
      capturedOutput += args.join(' ') + '\n';
    };

    try {
      // Execute the user's code first to define functions
      // @ts-ignore
      await pyodide.runPythonAsync(code);

      // Then execute the test input
      // @ts-ignore
      const result = await pyodide.runPythonAsync(testInput);

      // If there's a result, add it to output
      if (result !== undefined && result !== null) {
        capturedOutput += String(result);
      }

      const executionTime = performance.now() - startTime;

      return {
        output: capturedOutput.trim(),
        error: null,
        executionTime,
      };
    } catch (error: any) {
      const executionTime = performance.now() - startTime;
      return {
        output: capturedOutput.trim(),
        error: error.message || String(error),
        executionTime,
      };
    } finally {
      console.log = oldLog;
    }
  } catch (error: any) {
    const executionTime = performance.now() - startTime;
    return {
      output: '',
      error: error.message || 'Unknown error occurred',
      executionTime,
    };
  }
}

/**
 * Compare actual output with expected output
 */
function compareOutputs(actual: string, expected: string): boolean {
  // Normalize whitespace and line endings
  const normalizeOutput = (str: string) => {
    return str
      .trim()
      .replace(/\r\n/g, '\n')
      .replace(/\s+/g, ' ')
      .toLowerCase();
  };

  return normalizeOutput(actual) === normalizeOutput(expected);
}

/**
 * Run a single test case
 */
export async function runTestCase(
  userCode: string,
  testInput: string,
  expectedOutput: string
): Promise<TestResult> {
  const { output, error, executionTime } = await executeCode(userCode, testInput);

  const passed = !error && compareOutputs(output, expectedOutput);

  return {
    testCaseId: '',
    passed,
    expectedOutput,
    actualOutput: output || error || 'No output',
    error: error || undefined,
    executionTime,
  };
}

/**
 * Grade a complete challenge attempt
 */
export async function gradeChallengeAttempt(
  challenge: Challenge,
  userCode: string
): Promise<ChallengeAttempt> {
  const testResults: TestResult[] = [];
  let passedCount = 0;

  // Run all visible test cases
  for (const testCase of challenge.testCases) {
    if (testCase.isHidden) continue; // Skip hidden tests for now

    const result = await runTestCase(userCode, testCase.input || '', testCase.expectedOutput);
    result.testCaseId = testCase.id;
    testResults.push(result);

    if (result.passed) {
      passedCount++;
    }
  }

  // Calculate score
  const visibleTestCount = challenge.testCases.filter(t => !t.isHidden).length;
  const score = visibleTestCount > 0 ? Math.round((passedCount / visibleTestCount) * 100) : 0;
  const passed = passedCount === visibleTestCount;

  return {
    challengeId: challenge.id,
    userCode,
    submittedAt: new Date().toISOString(),
    testResults,
    passed,
    score,
  };
}

/**
 * Run hidden test cases (for final validation)
 */
export async function runHiddenTests(
  challenge: Challenge,
  userCode: string
): Promise<TestResult[]> {
  const testResults: TestResult[] = [];

  // Run only hidden test cases
  for (const testCase of challenge.testCases) {
    if (!testCase.isHidden) continue;

    const result = await runTestCase(userCode, testCase.input || '', testCase.expectedOutput);
    result.testCaseId = testCase.id;
    testResults.push(result);
  }

  return testResults;
}

/**
 * Get feedback message based on test results
 */
export function getFeedbackMessage(attempt: ChallengeAttempt, challenge: Challenge): string {
  if (attempt.passed) {
    return '🎉 Perfect! All tests passed! You\'ve mastered this challenge.';
  }

  const failedTests = attempt.testResults.filter(r => !r.passed);
  const failedCount = failedTests.length;

  if (failedCount === attempt.testResults.length) {
    return `❌ None of the tests passed. Review the problem statement and try again. Hint: Check your function signature and logic.`;
  }

  return `⚠️ ${failedCount} out of ${attempt.testResults.length} tests failed. Review the failed test cases and try again.`;
}

/**
 * Validate code syntax without execution
 */
export async function validateSyntax(code: string): Promise<{ valid: boolean; error?: string }> {
  try {
    // @ts-ignore
    if (!window.pyodide) {
      return { valid: false, error: 'Python environment not ready' };
    }

    // @ts-ignore
    const pyodide = window.pyodide;

    // Try to compile the code
    // @ts-ignore
    await pyodide.runPythonAsync(`compile(${JSON.stringify(code)}, '<string>', 'exec')`);

    return { valid: true };
  } catch (error: any) {
    return {
      valid: false,
      error: error.message || 'Syntax error in code',
    };
  }
}

/**
 * Get code hints based on performance
 */
export function getHintsForChallenge(
  challenge: Challenge,
  attempt: ChallengeAttempt
): string[] {
  const hints: string[] = [];

  if (attempt.score === 0) {
    // No tests passed - suggest first hint
    if (challenge.hints.length > 0) {
      hints.push(challenge.hints[0].content);
    }
  } else if (attempt.score < 50) {
    // Some tests passed - suggest second hint
    if (challenge.hints.length > 1) {
      hints.push(challenge.hints[1].content);
    }
  } else if (attempt.score < 100) {
    // Most tests passed - suggest third hint
    if (challenge.hints.length > 2) {
      hints.push(challenge.hints[2].content);
    }
  }

  return hints;
}
