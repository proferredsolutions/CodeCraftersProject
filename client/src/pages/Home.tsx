import { Button } from "@/components/ui/button";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code2, Copy, Github, Share2, Lock, Globe, Zap, BookOpen, ArrowRight, Sparkles, Trophy, BarChart3 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import EnhancedPythonREPL from "@/components/EnhancedPythonREPL";
import CodePlayground from "@/components/CodePlayground";
import CreatorFooter from "@/components/CreatorFooter";
import ChallengeBrowser from "@/components/ChallengeBrowser";

/**
 * Design Philosophy: Interactive Craftsmanship
 *
 * Enhanced with:
 * - Interactive Python REPL for live code execution
 * - Collapsible code playgrounds for progressive disclosure
 * - Artistic visual assets and gradients
 * - Smooth animations and micro-interactions
 * - Professional creator branding
 * - Future-ready architecture for easy updates
 *
 * Color System (Refined):
 * - Primary (Deep Indigo): #1F2937 - Trust, professionalism
 * - Secondary (Electric Teal): #06B6D4 - Growth, learning
 * - Accent (Vibrant Amber): #F59E0B - CTAs, highlights
 * - Success (Emerald): #10B981 - Positive states
 * - Neutral: Slate grays for text and backgrounds
 */

export default function Home() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    toast.success("Code copied to clipboard!");
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const codeExamples = {
    basicGist: `# Create a simple Python function
def greet(name):
    message = f"Hello, {name}!"
    return message

print(greet("Gist User"))`,

    pythonApi: `import requests

# Fetch a public gist
GIST_ID = "e3f7c2b1d4a7b8c9d0e1f2a3"
headers = {"Accept": "application/vnd.github+json"}
url = f"https://api.github.com/gists/{GIST_ID}"

response = requests.get(url, headers=headers)
data = response.json()

# Access gist content
for filename, file_data in data['files'].items():
    print(f"File: {filename}")
    print(f"Content: {file_data['content']}")`,

    createGist: `import requests

# Create a new gist (requires authentication)
GITHUB_TOKEN = "your_github_token_here"
headers = {
    "Authorization": f"token {GITHUB_TOKEN}",
    "Accept": "application/vnd.github+json"
}

gist_data = {
    "description": "My Python utility functions",
    "public": True,
    "files": {
        "utils.py": {
            "content": "def add(a, b):\\n    return a + b"
        }
    }
}

response = requests.post(
    "https://api.github.com/gists",
    json=gist_data,
    headers=headers
)
print(f"Gist created: {response.json()['html_url']}")`,

    updateGist: `import requests

GIST_ID = "abc123def456"
GITHUB_TOKEN = "your_github_token_here"

headers = {
    "Authorization": f"token {GITHUB_TOKEN}",
    "Accept": "application/vnd.github+json"
}

update_data = {
    "description": "Updated description",
    "files": {
        "example.py": {
            "content": "# Updated content\\nprint('Hello, World!')"
        }
    }
}

response = requests.patch(
    f"https://api.github.com/gists/{GIST_ID}",
    json=update_data,
    headers=headers
)
print("Gist updated successfully!")`,
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663093287182/JXGGor2b8bjAQKKvdEFaXs/gist-logo-YBXeTBjtAhXDo4SvS5D7nL.webp"
              alt="Gist Logo"
              className="w-8 h-8"
            />
            <span className="text-xl font-bold text-primary">Gist Guide</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#what-is" className="text-sm hover:text-primary transition-colors">
              What is Gist?
            </a>
            <a href="#getting-started" className="text-sm hover:text-primary transition-colors">
              Getting Started
            </a>
            <a href="#python-integration" className="text-sm hover:text-primary transition-colors">
              Python Integration
            </a>
            <a href="#examples" className="text-sm hover:text-primary transition-colors">
              Examples
            </a>
            <a href="#playground" className="text-sm hover:text-primary transition-colors flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              Try It
            </a>
            <a href="#challenges" className="text-sm hover:text-primary transition-colors flex items-center gap-1">
              <Trophy className="w-4 h-4" />
              Challenges
            </a>
            <a href="/dashboard" className="text-sm hover:text-primary transition-colors flex items-center gap-1">
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section with Enhanced Background */}
      <section
        className="relative py-20 md:py-32 overflow-hidden"
        style={{
          backgroundImage: `url('/manus-storage/1000044560_01fe2c5d.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/80"></div>
        <div className="container relative z-10">
          <div className="max-w-2xl mx-auto text-center text-white fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Master GitHub Gists
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Share code without the repository overhead. Learn how to create, manage, and integrate GitHub Gists with Python.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Get Started <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <Github className="mr-2 w-4 h-4" /> View on GitHub
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What is GitHub Gists Section */}
      <section id="what-is" className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="slide-in-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
                What is GitHub Gists?
              </h2>
              <p className="text-lg text-foreground/80 mb-4">
                GitHub Gists are a lightweight way to share code snippets without creating a full repository. Each gist is its own Git repository, making it perfect for quick examples, single-file scripts, or small code collections.
              </p>
              <p className="text-lg text-foreground/80 mb-6">
                Whether you're sharing a utility function, documenting a solution, or collaborating on a small piece of code, Gists provide simplicity and ease of use.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Public or Private</h4>
                    <p className="text-sm text-foreground/70">Share with everyone or keep it secret</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Share2 className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Easy Sharing</h4>
                    <p className="text-sm text-foreground/70">Share a simple URL with anyone</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Code2 className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Multiple Files</h4>
                    <p className="text-sm text-foreground/70">Include multiple files in a single gist</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="fade-in">
              <img
                src="/manus-storage/1000044560_01fe2c5d.jpg"
                alt="Developers Collaborating on Code"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
            Why Use GitHub Gists?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Quick & Simple",
                description:
                  "No repository setup needed. Create and share in seconds.",
              },
              {
                icon: Lock,
                title: "Privacy Control",
                description:
                  "Choose between public gists for sharing or secret gists for personal use.",
              },
              {
                icon: BookOpen,
                title: "Version History",
                description:
                  "Track changes with full Git history for each gist.",
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card key={idx} className="border-border hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Icon className="w-8 h-8 text-secondary mb-3" />
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/70">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section id="getting-started" className="py-16 md:py-24 bg-white">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-primary">
            Getting Started: 5 Simple Steps
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-secondary">Step 1: Visit gist.github.com</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70">
                  Open your browser and navigate to{" "}
                  <code className="bg-muted px-2 py-1 rounded text-sm">gist.github.com</code>. You'll
                  need a GitHub account (free).
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-secondary">Step 2: Add Your Code</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70">
                  Paste your code snippet or upload files. You can add multiple files to a single
                  gist.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-secondary">Step 3: Name Your Gist</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70">
                  Give your gist a clear, descriptive name. This helps others understand what your
                  gist contains.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-secondary">Step 4: Choose Visibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70">
                  Select <strong>Public</strong> to share with everyone, or <strong>Secret</strong>{" "}
                  to keep it private (but still accessible via URL).
                </p>
              </CardContent>
            </Card>

            <Card className="border-border md:col-span-2">
              <CardHeader>
                <CardTitle className="text-secondary">Step 5: Share the Link</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70">
                  Copy your gist URL and share it with colleagues, in documentation, or on social
                  media. Anyone with the link can view and fork your gist.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Python Integration Section */}
      <section id="python-integration" className="py-16 md:py-24 bg-muted">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="fade-in">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663093287182/n8m8ZBifeuEbAzf6TXsDwq/terminal-interface-fkPkSAXmxgxSPia7NWJAkc.webp"
                alt="Python Terminal Interface"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            <div className="slide-in-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
                Python + GitHub Gists
              </h2>
              <p className="text-lg text-foreground/80 mb-6">
                Integrate GitHub Gists into your Python projects using the GitHub API. With just a
                few lines of code, you can create, read, update, and delete gists programmatically.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Minimal Code</h4>
                    <p className="text-sm text-foreground/70">
                      Just a few lines to work with Gists
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Seamless Integration</h4>
                    <p className="text-sm text-foreground/70">
                      Smooth API integration with your Python scripts
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Shareable</h4>
                    <p className="text-sm text-foreground/70">
                      Instantly share and collaborate on code
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Examples Section */}
      <section id="examples" className="py-16 md:py-24 bg-white">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            Python Code Examples
          </h2>
          <p className="text-lg text-foreground/70 mb-12">
            Learn how to work with GitHub Gists using Python. These examples show you how to fetch,
            create, and update gists programmatically. Click on any example to expand it.
          </p>

          <div className="space-y-6">
            <CodePlayground
              title="Basic Python Function"
              description="A simple example to get started"
              code={codeExamples.basicGist}
              language="python"
              defaultExpanded={true}
            />

            <CodePlayground
              title="Fetch Gist from GitHub API"
              description="Retrieve a gist using the GitHub API"
              code={codeExamples.pythonApi}
              language="python"
              defaultExpanded={false}
            />

            <CodePlayground
              title="Create a New Gist"
              description="Create a gist programmatically with authentication"
              code={codeExamples.createGist}
              language="python"
              defaultExpanded={false}
            />

            <CodePlayground
              title="Update an Existing Gist"
              description="Modify a gist's content and description"
              code={codeExamples.updateGist}
              language="python"
              defaultExpanded={false}
            />
          </div>
        </div>
      </section>

      {/* Interactive Python REPL Section */}
      <section id="playground" className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-accent" />
              Try It Yourself!
            </h2>
            <p className="text-lg text-foreground/70">
              Execute Python code directly in your browser. Experiment with the examples above or write your own code.
              This is a great way to learn and test your understanding.
            </p>
          </div>
          <EnhancedPythonREPL />
        </div>
      </section>

      {/* Coding Challenges Section */}
      <section id="challenges" className="py-16 md:py-24 bg-white">
        <div className="container">
          <ChallengeBrowser />
        </div>
      </section>

      {/* Best Practices Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-primary">
            Best Practices for GitHub Gists
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Use Descriptive Names",
                description:
                  "Give your gists clear, descriptive names that indicate their purpose. This helps others (and your future self) understand what the gist contains.",
              },
              {
                title: "Add Comments",
                description:
                  "Include comments in your code to explain what it does. This is especially important for complex or non-obvious code.",
              },
              {
                title: "Keep It Focused",
                description:
                  "Each gist should have a single, clear purpose. If you have multiple unrelated code snippets, create separate gists.",
              },
              {
                title: "Update Regularly",
                description:
                  "Keep your gists up-to-date with the latest best practices and fixes. Use the version history to track changes.",
              },
              {
                title: "Document Dependencies",
                description:
                  "If your gist requires external libraries or dependencies, document them clearly in comments or a README.",
              },
              {
                title: "Privacy Matters",
                description:
                  "Use secret gists for sensitive code or personal projects. Public gists are searchable and indexed by search engines.",
              },
            ].map((practice, idx) => (
              <Card key={idx} className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg text-secondary">{practice.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70">{practice.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Sharing Code?
          </h2>
          <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
            Create your first GitHub Gist today and start sharing code snippets with the world.
            It's free, simple, and powerful.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              onClick={() => window.open("https://gist.github.com", "_blank")}
            >
              Create Your First Gist <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              onClick={() => window.open("https://docs.github.com/en/get-started/writing-on-github/editing-and-sharing-content-with-gists", "_blank")}
            >
              Read GitHub Docs
            </Button>
          </div>
        </div>
      </section>

      {/* Creator Footer */}
      <CreatorFooter />
    </div>
  );
}
