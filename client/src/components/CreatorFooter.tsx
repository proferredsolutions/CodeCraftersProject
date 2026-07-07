import React from 'react';
import { Github, Instagram, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Creator Footer Component
 *
 * Displays creator information and social links.
 * Designed to be easily customizable for future updates.
 *
 * Features:
 * - Social media links
 * - Creator attribution
 * - Call-to-action for feedback
 * - Responsive design
 *
 * Future enhancements:
 * - Newsletter signup
 * - Feedback form
 * - Version history
 * - Contribution guidelines
 */
export default function CreatorFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-primary/5 to-secondary/5 border-t border-border mt-20">
      <div className="container py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">About This Guide</h3>
            <p className="text-sm text-foreground/70">
              A comprehensive educational resource for mastering GitHub Gists and Python integration.
              Created with ❤️ for developers of all skill levels.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#what-is" className="text-foreground/70 hover:text-primary transition-colors">
                  What is Gist?
                </a>
              </li>
              <li>
                <a href="#getting-started" className="text-foreground/70 hover:text-primary transition-colors">
                  Getting Started
                </a>
              </li>
              <li>
                <a href="#python-integration" className="text-foreground/70 hover:text-primary transition-colors">
                  Python Integration
                </a>
              </li>
              <li>
                <a href="#examples" className="text-foreground/70 hover:text-primary transition-colors">
                  Code Examples
                </a>
              </li>
            </ul>
          </div>

          {/* Creator Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Created By</h3>
            <p className="text-sm text-foreground/70 mb-4">
              <span className="font-medium">@Russia</span>
              <br />
              Software Engineer & Developer
            </p>
            <div className="flex gap-3">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <a
                  href="https://github.com/proferredsolutions"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <a
                  href="https://www.instagram.com/proferred_solutions?igsh=MW40b2Z1d2ExdGZkbQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="w-4 h-4" />
                  Instagram
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground/60">
            © {currentYear} Mastering GitHub Gists. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-foreground/60">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>for developers</span>
          </div>
          <p className="text-sm text-foreground/60">
            <a
              href="https://github.com/proferredsolutions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Find me on GitHub
            </a>
          </p>
        </div>

        {/* Update Notice */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
          <p className="font-semibold mb-2">📝 Future Updates & Improvements</p>
          <p>
            This guide is actively maintained and updated. Check back regularly for new content,
            interactive features, and enhanced examples. Have suggestions?
            <a href="https://github.com/proferredsolutions" className="font-semibold hover:underline">
              {' '}Reach out on GitHub
            </a>
            !
          </p>
        </div>
      </div>
    </footer>
  );
}
