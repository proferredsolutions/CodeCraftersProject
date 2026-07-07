/**
 * Challenge Library
 *
 * Pre-built coding challenges for learning GitHub Gists and Python.
 * Organized by difficulty and category.
 * Each challenge includes detailed solution explanations unlocked after completion.
 */

import { Challenge } from '@/types/challenge';

export const CHALLENGES: Challenge[] = [
  {
    id: 'hello-gist',
    title: 'Hello, Gist!',
    description: 'Your first challenge! Learn to create a simple Python function.',
    difficulty: 'beginner',
    category: 'python-basics',
    problem: `Create a function called \`greet\` that takes a name as input and returns a greeting message.

The function should return a string in the format: "Hello, [name]!"

Example: greet("Alice") should return "Hello, Alice!"`,
    starterCode: `def greet(name):
    # Your code here
    pass`,
    expectedSolution: `def greet(name):
    return f"Hello, {name}!"`,
    testCases: [
      {
        id: 'test-1',
        input: 'greet("Alice")',
        expectedOutput: 'Hello, Alice!',
        description: 'Test with name "Alice"',
      },
      {
        id: 'test-2',
        input: 'greet("Bob")',
        expectedOutput: 'Hello, Bob!',
        description: 'Test with name "Bob"',
      },
      {
        id: 'test-3',
        input: 'greet("Python")',
        expectedOutput: 'Hello, Python!',
        description: 'Test with name "Python"',
        isHidden: true,
      },
    ],
    hints: [
      {
        id: 'hint-1',
        title: 'Use f-strings',
        content: 'Python f-strings allow you to embed variables in strings using {variable} syntax.',
        level: 1,
      },
      {
        id: 'hint-2',
        title: 'Return the greeting',
        content: 'Make sure to use the `return` keyword to send the greeting back to the caller.',
        level: 2,
      },
      {
        id: 'hint-3',
        title: 'Solution hint',
        content: 'Try: return f"Hello, {name}!"',
        level: 3,
      },
    ],
    solution: {
      id: 'sol-hello-gist',
      title: 'Official Solution',
      explanation: `This challenge introduces you to Python functions and f-strings. The key insight is that Python provides multiple ways to format strings:

1. **f-strings (Python 3.6+)**: The most modern and readable approach. You embed variables directly in the string using {variable} syntax.
2. **String concatenation**: You could also use "Hello, " + name + "!" but this is less readable.
3. **format() method**: You could use "Hello, {}!".format(name) but f-strings are preferred.

F-strings are preferred because they're:
- More readable and concise
- Faster than other formatting methods
- Support expressions inside the braces`,
      code: `def greet(name):
    return f"Hello, {name}!"`,
      keyPoints: [
        'Functions are reusable blocks of code that accept parameters and return values',
        'F-strings allow you to embed variables in strings using {variable} syntax',
        'The return keyword sends a value back to the caller',
        'Function parameters are like placeholders for values passed when calling the function',
      ],
      alternativeApproaches: [
        {
          title: 'String Concatenation',
          description: 'Combine strings using the + operator',
          code: `def greet(name):
    return "Hello, " + name + "!"`,
          pros: ['Works in older Python versions', 'Simple and explicit'],
          cons: ['Less readable with many concatenations', 'Slower performance'],
        },
        {
          title: 'format() Method',
          description: 'Use the format() method with placeholders',
          code: `def greet(name):
    return "Hello, {}!".format(name)`,
          pros: ['Works in Python 2.7+', 'Flexible formatting options'],
          cons: ['More verbose than f-strings', 'Slightly slower'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Forgetting the return statement',
          why: 'Without return, the function returns None instead of the greeting',
          correction: 'Always use return to send the value back to the caller',
        },
        {
          mistake: 'Using single quotes inside f-string: f\'Hello, {name}!\'',
          why: 'This works, but mixing quote styles can be confusing',
          correction: 'Use consistent quotes: f"Hello, {name}!" or f\'Hello, {name}!\'',
        },
      ],
      resources: [
        {
          title: 'Python f-strings Documentation',
          url: 'https://docs.python.org/3/reference/lexical_analysis.html#f-strings',
          type: 'documentation',
        },
        {
          title: 'Functions in Python',
          url: 'https://docs.python.org/3/tutorial/controlflow.html#defining-functions',
          type: 'documentation',
        },
      ],
    },
    estimatedTime: 5,
    tags: ['functions', 'strings', 'basics'],
    createdAt: '2026-06-18',
    updatedAt: '2026-06-18',
  },

  {
    id: 'list-operations',
    title: 'Master List Operations',
    description: 'Work with Python lists to manipulate and filter data.',
    difficulty: 'beginner',
    category: 'python-basics',
    problem: `Create a function called \`filter_even\` that takes a list of numbers and returns only the even numbers.

Example: filter_even([1, 2, 3, 4, 5, 6]) should return [2, 4, 6]`,
    starterCode: `def filter_even(numbers):
    # Your code here
    pass`,
    expectedSolution: `def filter_even(numbers):
    return [n for n in numbers if n % 2 == 0]`,
    testCases: [
      {
        id: 'test-1',
        input: 'filter_even([1, 2, 3, 4, 5, 6])',
        expectedOutput: '[2, 4, 6]',
        description: 'Filter even numbers from 1-6',
      },
      {
        id: 'test-2',
        input: 'filter_even([10, 15, 20, 25])',
        expectedOutput: '[10, 20]',
        description: 'Filter even numbers from mixed list',
      },
      {
        id: 'test-3',
        input: 'filter_even([])',
        expectedOutput: '[]',
        description: 'Empty list should return empty list',
      },
      {
        id: 'test-4',
        input: 'filter_even([2, 4, 6, 8, 10])',
        expectedOutput: '[2, 4, 6, 8, 10]',
        description: 'All even numbers',
        isHidden: true,
      },
    ],
    hints: [
      {
        id: 'hint-1',
        title: 'Use list comprehension',
        content: 'List comprehension is a concise way to create lists: [x for x in list if condition]',
        level: 1,
      },
      {
        id: 'hint-2',
        title: 'Check if even',
        content: 'A number is even if n % 2 == 0 (modulo operator returns 0 for even numbers)',
        level: 2,
      },
      {
        id: 'hint-3',
        title: 'Solution hint',
        content: 'Try: return [n for n in numbers if n % 2 == 0]',
        level: 3,
      },
    ],
    solution: {
      id: 'sol-list-operations',
      title: 'Official Solution',
      explanation: `List comprehension is one of Python's most powerful features for creating and filtering lists. This challenge teaches you to combine filtering with iteration in a concise, readable way.

The solution uses list comprehension: [n for n in numbers if n % 2 == 0]

This reads like English: "Give me n for each n in numbers where n is even"

The modulo operator (%) returns the remainder after division. For even numbers, n % 2 always equals 0.`,
      code: `def filter_even(numbers):
    return [n for n in numbers if n % 2 == 0]`,
      keyPoints: [
        'List comprehension is a concise way to create lists with filtering',
        'The modulo operator (%) returns the remainder: n % 2 == 0 means n is even',
        'Syntax: [expression for item in iterable if condition]',
        'List comprehension is faster and more readable than for loops for simple operations',
      ],
      alternativeApproaches: [
        {
          title: 'Traditional For Loop',
          description: 'Use a traditional for loop with append()',
          code: `def filter_even(numbers):
    result = []
    for n in numbers:
        if n % 2 == 0:
            result.append(n)
    return result`,
          pros: ['More explicit and easier for beginners to understand', 'Easier to debug'],
          cons: ['More verbose', 'Slower for large lists'],
        },
        {
          title: 'Using filter() Function',
          description: 'Use the built-in filter() function with lambda',
          code: `def filter_even(numbers):
    return list(filter(lambda n: n % 2 == 0, numbers))`,
          pros: ['Functional programming style', 'Works with any predicate'],
          cons: ['Less readable for most Python developers', 'Requires lambda'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Confusing n % 2 == 0 with n % 2 == 1',
          why: 'n % 2 == 1 checks for odd numbers, not even',
          correction: 'Remember: even numbers have remainder 0 when divided by 2',
        },
        {
          mistake: 'Using filter_even([1, 2, 3, 4]) instead of filter_even(numbers)',
          why: 'The function expects a parameter, not a hardcoded list',
          correction: 'Pass the list as a parameter to the function',
        },
      ],
      resources: [
        {
          title: 'List Comprehensions',
          url: 'https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions',
          type: 'documentation',
        },
        {
          title: 'Modulo Operator',
          url: 'https://docs.python.org/3/reference/lexical_analysis.html#operators',
          type: 'documentation',
        },
      ],
    },
    estimatedTime: 10,
    tags: ['lists', 'comprehension', 'filtering'],
    createdAt: '2026-06-18',
    updatedAt: '2026-06-18',
  },

  {
    id: 'string-manipulation',
    title: 'String Manipulation Master',
    description: 'Learn to work with strings in Python.',
    difficulty: 'beginner',
    category: 'python-basics',
    problem: `Create a function called \`reverse_string\` that takes a string and returns it reversed.

Example: reverse_string("hello") should return "olleh"`,
    starterCode: `def reverse_string(text):
    # Your code here
    pass`,
    expectedSolution: `def reverse_string(text):
    return text[::-1]`,
    testCases: [
      {
        id: 'test-1',
        input: 'reverse_string("hello")',
        expectedOutput: 'olleh',
        description: 'Reverse "hello"',
      },
      {
        id: 'test-2',
        input: 'reverse_string("Python")',
        expectedOutput: 'nohtyP',
        description: 'Reverse "Python"',
      },
      {
        id: 'test-3',
        input: 'reverse_string("")',
        expectedOutput: '',
        description: 'Empty string',
      },
      {
        id: 'test-4',
        input: 'reverse_string("a")',
        expectedOutput: 'a',
        description: 'Single character',
        isHidden: true,
      },
    ],
    hints: [
      {
        id: 'hint-1',
        title: 'String slicing',
        content: 'Python strings support slicing with [start:end:step] syntax.',
        level: 1,
      },
      {
        id: 'hint-2',
        title: 'Negative step',
        content: 'Using a negative step (-1) reverses the string: text[::-1]',
        level: 2,
      },
      {
        id: 'hint-3',
        title: 'Solution hint',
        content: 'Try: return text[::-1]',
        level: 3,
      },
    ],
    solution: {
      id: 'sol-string-manipulation',
      title: 'Official Solution',
      explanation: `String slicing in Python is incredibly powerful. The syntax is [start:end:step]. By using [::-1], you're saying "start from the end, go to the beginning, with a step of -1".

This is the Pythonic way to reverse a string. It's concise, efficient, and idiomatic Python.`,
      code: `def reverse_string(text):
    return text[::-1]`,
      keyPoints: [
        'String slicing uses [start:end:step] syntax',
        'Negative indices count from the end: -1 is the last character',
        'A step of -1 means iterate backwards',
        'text[::-1] is the idiomatic Python way to reverse strings',
      ],
      alternativeApproaches: [
        {
          title: 'Using reversed() Function',
          description: 'Use the built-in reversed() function',
          code: `def reverse_string(text):
    return ''.join(reversed(text))`,
          pros: ['More explicit about intent', 'Works with any iterable'],
          cons: ['More verbose', 'Slightly slower'],
        },
        {
          title: 'Using a Loop',
          description: 'Manually iterate backwards',
          code: `def reverse_string(text):
    result = ""
    for i in range(len(text) - 1, -1, -1):
        result += text[i]
    return result`,
          pros: ['Educational', 'Shows how reversal works'],
          cons: ['Very verbose', 'Inefficient (string concatenation)'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Using text[len(text)-1::-1] instead of text[::-1]',
          why: 'While this works, it\'s unnecessarily complex',
          correction: 'text[::-1] is simpler and more readable',
        },
      ],
      resources: [
        {
          title: 'String Slicing',
          url: 'https://docs.python.org/3/tutorial/introduction.html#strings',
          type: 'documentation',
        },
      ],
    },
    estimatedTime: 5,
    tags: ['strings', 'slicing', 'basics'],
    createdAt: '2026-06-18',
    updatedAt: '2026-06-18',
  },

  {
    id: 'dict-operations',
    title: 'Dictionary Data Structures',
    description: 'Master Python dictionaries for key-value data storage.',
    difficulty: 'intermediate',
    category: 'python-intermediate',
    problem: `Create a function called \`count_words\` that takes a string and returns a dictionary with word counts.

Example: count_words("hello world hello") should return {"hello": 2, "world": 1}

Note: Convert to lowercase and ignore punctuation for simplicity.`,
    starterCode: `def count_words(text):
    # Your code here
    pass`,
    expectedSolution: `def count_words(text):
    words = text.lower().split()
    word_count = {}
    for word in words:
        word_count[word] = word_count.get(word, 0) + 1
    return word_count`,
    testCases: [
      {
        id: 'test-1',
        input: 'count_words("hello world hello")',
        expectedOutput: "{'hello': 2, 'world': 1}",
        description: 'Count words in simple sentence',
      },
      {
        id: 'test-2',
        input: 'count_words("python python python")',
        expectedOutput: "{'python': 3}",
        description: 'Count repeated word',
      },
      {
        id: 'test-3',
        input: 'count_words("")',
        expectedOutput: "{}",
        description: 'Empty string',
      },
      {
        id: 'test-4',
        input: 'count_words("a b c a b a")',
        expectedOutput: "{'a': 3, 'b': 2, 'c': 1}",
        description: 'Mixed word frequencies',
        isHidden: true,
      },
    ],
    hints: [
      {
        id: 'hint-1',
        title: 'Split the string',
        content: 'Use text.split() to break the string into words.',
        level: 1,
      },
      {
        id: 'hint-2',
        title: 'Use dictionary.get()',
        content: 'The get() method returns a default value if the key doesn\'t exist: dict.get(key, 0)',
        level: 2,
      },
      {
        id: 'hint-3',
        title: 'Solution approach',
        content: 'Loop through words, use get() to check if word exists, increment count.',
        level: 3,
      },
    ],
    solution: {
      id: 'sol-dict-operations',
      title: 'Official Solution',
      explanation: `This challenge teaches you to work with dictionaries, one of Python's most important data structures. The key insight is using dict.get(key, default) to safely access dictionary values without raising KeyError.

The algorithm:
1. Convert text to lowercase and split into words
2. Create an empty dictionary
3. For each word, use get() to check if it exists
4. If it exists, increment the count; if not, start at 1`,
      code: `def count_words(text):
    words = text.lower().split()
    word_count = {}
    for word in words:
        word_count[word] = word_count.get(word, 0) + 1
    return word_count`,
      keyPoints: [
        'Dictionaries store key-value pairs for efficient lookups',
        'dict.get(key, default) safely retrieves values with a fallback',
        'The get() method prevents KeyError exceptions',
        'This pattern is fundamental for counting, grouping, and aggregating data',
      ],
      alternativeApproaches: [
        {
          title: 'Using collections.Counter',
          description: 'Use the Counter class from collections module',
          code: `from collections import Counter

def count_words(text):
    words = text.lower().split()
    return dict(Counter(words))`,
          pros: ['Most concise', 'Optimized for counting', 'Provides additional methods'],
          cons: ['Requires import', 'Less educational about dictionaries'],
        },
        {
          title: 'Using setdefault()',
          description: 'Use setdefault() instead of get()',
          code: `def count_words(text):
    words = text.lower().split()
    word_count = {}
    for word in words:
        word_count.setdefault(word, 0)
        word_count[word] += 1
    return word_count`,
          pros: ['Alternative approach', 'Also safe'],
          cons: ['Less concise than get()', 'Less commonly used'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Forgetting to call .lower() on text',
          why: 'This causes "Hello" and "hello" to be counted as different words',
          correction: 'Always normalize text case before processing',
        },
        {
          mistake: 'Using word_count[word] directly without checking if it exists',
          why: 'This raises KeyError if the word hasn\'t been seen before',
          correction: 'Use get() with a default value or check if key exists first',
        },
      ],
      resources: [
        {
          title: 'Python Dictionaries',
          url: 'https://docs.python.org/3/tutorial/datastructures.html#dictionaries',
          type: 'documentation',
        },
        {
          title: 'collections.Counter',
          url: 'https://docs.python.org/3/library/collections.html#collections.Counter',
          type: 'documentation',
        },
      ],
    },
    estimatedTime: 15,
    tags: ['dictionaries', 'loops', 'data-structures'],
    createdAt: '2026-06-18',
    updatedAt: '2026-06-18',
  },

  {
    id: 'gist-api-basics',
    title: 'GitHub Gist API Basics',
    description: 'Learn to work with the GitHub Gists API.',
    difficulty: 'intermediate',
    category: 'gist-api',
    problem: `Create a function called \`parse_gist_response\` that takes a JSON-like dictionary (simulating a GitHub Gist API response) and extracts the file names.

The function should return a list of file names from the gist.

Example response structure:
{
    "id": "abc123",
    "files": {
        "script.py": {"content": "..."},
        "readme.md": {"content": "..."}
    }
}

Should return: ["script.py", "readme.md"]`,
    starterCode: `def parse_gist_response(gist_data):
    # Your code here
    pass`,
    expectedSolution: `def parse_gist_response(gist_data):
    return list(gist_data['files'].keys())`,
    testCases: [
      {
        id: 'test-1',
        input: `parse_gist_response({"files": {"script.py": {}, "readme.md": {}}})`,
        expectedOutput: "['script.py', 'readme.md']",
        description: 'Extract file names from gist',
      },
      {
        id: 'test-2',
        input: `parse_gist_response({"files": {"main.py": {}}})`,
        expectedOutput: "['main.py']",
        description: 'Single file',
      },
      {
        id: 'test-3',
        input: `parse_gist_response({"files": {}})`,
        expectedOutput: "[]",
        description: 'Empty files',
        isHidden: true,
      },
    ],
    hints: [
      {
        id: 'hint-1',
        title: 'Access dictionary keys',
        content: 'Use dict.keys() to get all keys from a dictionary.',
        level: 1,
      },
      {
        id: 'hint-2',
        title: 'Convert to list',
        content: 'Use list() to convert dict.keys() to a list.',
        level: 2,
      },
      {
        id: 'hint-3',
        title: 'Solution hint',
        content: 'Try: return list(gist_data["files"].keys())',
        level: 3,
      },
    ],
    solution: {
      id: 'sol-gist-api-basics',
      title: 'Official Solution',
      explanation: `This challenge introduces you to working with API responses. GitHub's Gist API returns JSON data with a "files" key containing a dictionary of file objects.

The solution extracts just the file names (keys) from this dictionary. This is a common pattern when working with APIs:
1. Access nested data using dictionary keys
2. Extract what you need (in this case, just the keys)
3. Convert to the appropriate format (list)`,
      code: `def parse_gist_response(gist_data):
    return list(gist_data['files'].keys())`,
      keyPoints: [
        'API responses are typically JSON, which Python represents as dictionaries',
        'Use dictionary keys to access nested data: data[\'key\'][\'nested_key\']',
        'dict.keys() returns the keys of a dictionary',
        'Convert dict_keys to a list using list()',
        'This pattern is used constantly when working with APIs',
      ],
      alternativeApproaches: [
        {
          title: 'List Comprehension',
          description: 'Extract keys using list comprehension',
          code: `def parse_gist_response(gist_data):
    return [filename for filename in gist_data['files']]`,
          pros: ['More explicit', 'Easier to extend with additional logic'],
          cons: ['More verbose'],
        },
        {
          title: 'Direct Iteration',
          description: 'Iterate over dictionary directly',
          code: `def parse_gist_response(gist_data):
    return list(gist_data['files'])`,
          pros: ['Concise', 'Works because iterating over dict gives keys'],
          cons: ['Less explicit about intent'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Trying to access gist_data.files instead of gist_data[\'files\']',
          why: 'Dictionaries use bracket notation, not dot notation (unless using objects)',
          correction: 'Always use gist_data[\'files\'] for dictionary access',
        },
        {
          mistake: 'Forgetting to convert dict_keys to a list',
          why: 'dict.keys() returns a dict_keys object, not a list',
          correction: 'Wrap with list() to convert to a list',
        },
      ],
      resources: [
        {
          title: 'GitHub Gists API Documentation',
          url: 'https://docs.github.com/en/rest/gists/gists',
          type: 'documentation',
        },
        {
          title: 'Working with JSON in Python',
          url: 'https://docs.python.org/3/library/json.html',
          type: 'documentation',
        },
      ],
    },
    estimatedTime: 10,
    tags: ['api', 'dictionaries', 'json'],
    createdAt: '2026-06-18',
    updatedAt: '2026-06-18',
  },

  {
    id: 'advanced-filtering',
    title: 'Advanced Data Filtering',
    description: 'Filter and transform complex data structures.',
    difficulty: 'advanced',
    category: 'python-advanced',
    problem: `Create a function called \`filter_gists\` that takes a list of gist objects and filters them by criteria.

Each gist object has: {"id": "...", "description": "...", "public": true/false, "files_count": int}

Return only public gists with more than 1 file, sorted by files_count (descending).`,
    starterCode: `def filter_gists(gists):
    # Your code here
    pass`,
    expectedSolution: `def filter_gists(gists):
    filtered = [g for g in gists if g['public'] and g['files_count'] > 1]
    return sorted(filtered, key=lambda g: g['files_count'], reverse=True)`,
    testCases: [
      {
        id: 'test-1',
        input: `filter_gists([
    {"id": "1", "public": True, "files_count": 2},
    {"id": "2", "public": False, "files_count": 3},
    {"id": "3", "public": True, "files_count": 1}
])`,
        expectedOutput: "[{'id': '1', 'public': True, 'files_count': 2}]",
        description: 'Filter public gists with multiple files',
      },
      {
        id: 'test-2',
        input: `filter_gists([
    {"id": "1", "public": True, "files_count": 5},
    {"id": "2", "public": True, "files_count": 2},
    {"id": "3", "public": True, "files_count": 3}
])`,
        expectedOutput: "[{'id': '1', 'public': True, 'files_count': 5}, {'id': '3', 'public': True, 'files_count': 3}, {'id': '2', 'public': True, 'files_count': 2}]",
        description: 'Sort by files_count descending',
      },
    ],
    hints: [
      {
        id: 'hint-1',
        title: 'List comprehension with conditions',
        content: 'Use multiple conditions: [x for x in list if condition1 and condition2]',
        level: 1,
      },
      {
        id: 'hint-2',
        title: 'Lambda functions',
        content: 'Lambda is a small anonymous function: lambda x: x["key"]',
        level: 2,
      },
      {
        id: 'hint-3',
        title: 'Solution approach',
        content: 'Filter with list comprehension, then use sorted() with lambda key and reverse=True',
        level: 3,
      },
    ],
    solution: {
      id: 'sol-advanced-filtering',
      title: 'Official Solution',
      explanation: `This advanced challenge combines multiple Python concepts: list comprehension, lambda functions, and sorting. The solution demonstrates professional-grade data filtering.

The algorithm:
1. Filter gists using list comprehension with multiple conditions
2. Sort the filtered results using sorted() with a lambda key function
3. Use reverse=True to sort in descending order

This pattern is used constantly in real-world applications for data processing.`,
      code: `def filter_gists(gists):
    filtered = [g for g in gists if g['public'] and g['files_count'] > 1]
    return sorted(filtered, key=lambda g: g['files_count'], reverse=True)`,
      keyPoints: [
        'List comprehension can include multiple conditions with "and" and "or"',
        'Lambda functions are small anonymous functions: lambda x: expression',
        'sorted() with key parameter allows custom sorting logic',
        'reverse=True sorts in descending order',
        'This pattern is fundamental for data processing and filtering',
      ],
      alternativeApproaches: [
        {
          title: 'Using filter() and sorted()',
          description: 'Use filter() function instead of list comprehension',
          code: `def filter_gists(gists):
    def is_valid(g):
        return g['public'] and g['files_count'] > 1
    filtered = list(filter(is_valid, gists))
    return sorted(filtered, key=lambda g: g['files_count'], reverse=True)`,
          pros: ['More functional programming style', 'Separates concerns'],
          cons: ['More verbose', 'Less Pythonic'],
        },
        {
          title: 'Using sort() Method',
          description: 'Sort in-place instead of using sorted()',
          code: `def filter_gists(gists):
    filtered = [g for g in gists if g['public'] and g['files_count'] > 1]
    filtered.sort(key=lambda g: g['files_count'], reverse=True)
    return filtered`,
          pros: ['Slightly more efficient for large lists'],
          cons: ['Modifies the list in-place', 'Less functional'],
        },
      ],
      commonMistakes: [
        {
          mistake: 'Forgetting reverse=True when sorting descending',
          why: 'Default sort is ascending, so you\'ll get the opposite order',
          correction: 'Always include reverse=True for descending order',
        },
        {
          mistake: 'Using "or" instead of "and" in the filter condition',
          why: 'This would include gists that are either public OR have multiple files',
          correction: 'Use "and" to require both conditions to be true',
        },
        {
          mistake: 'Forgetting the lambda keyword',
          why: 'key=g[\'files_count\'] won\'t work; you need lambda g: g[\'files_count\']',
          correction: 'Always use lambda to create the key function',
        },
      ],
      resources: [
        {
          title: 'Lambda Functions',
          url: 'https://docs.python.org/3/tutorial/controlflow.html#lambda-expressions',
          type: 'documentation',
        },
        {
          title: 'sorted() Function',
          url: 'https://docs.python.org/3/library/functions.html#sorted',
          type: 'documentation',
        },
      ],
    },
    estimatedTime: 20,
    tags: ['filtering', 'sorting', 'lambda', 'advanced'],
    createdAt: '2026-06-18',
    updatedAt: '2026-06-18',
  },
];

/**
 * Get challenges by difficulty level
 */
export function getChallengesByDifficulty(difficulty: string): Challenge[] {
  return CHALLENGES.filter(c => c.difficulty === difficulty);
}

/**
 * Get challenges by category
 */
export function getChallengesByCategory(category: string): Challenge[] {
  return CHALLENGES.filter(c => c.category === category);
}

/**
 * Get a single challenge by ID
 */
export function getChallengeById(id: string): Challenge | undefined {
  return CHALLENGES.find(c => c.id === id);
}

/**
 * Get all unique categories
 */
export function getAllCategories(): string[] {
  const categories = new Set(CHALLENGES.map(c => c.category));
  return Array.from(categories);
}

/**
 * Get all unique difficulty levels
 */
export function getAllDifficulties() {
  return ['beginner', 'intermediate', 'advanced'];
}
