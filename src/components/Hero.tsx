import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Github, CheckCircle2 } from 'lucide-react';
import { DarkModeToggle } from './DarkModeToggle';

interface HeroProps {
  toolsCount: number;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export function Hero({ toolsCount, isDarkMode, onToggleDarkMode }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 dark:from-gray-800 dark:via-gray-900 dark:to-black overflow-hidden transition-all duration-200">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute -top-40 -right-32 w-96 h-96 rounded-full bg-white/10 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-32 w-96 h-96 rounded-full bg-white/10 blur-3xl"></div>
      
      {/* Dark Mode Toggle */}
      <div className="absolute top-6 right-6 z-10">
        <DarkModeToggle isDarkMode={isDarkMode} onToggle={onToggleDarkMode} />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="text-center">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
              <span className="text-6xl">🔍</span>
            </div>
          </div>
          
          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Awesome SEO
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            A curated list of SEO tools with interactive filtering and search
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            {/* GitHub Button */}
            <Button 
              asChild 
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-50 shadow-lg hover:shadow-xl"
            >
              <a 
                href="https://github.com/teles/awesome-seo"
              >
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
              </a>
            </Button>
            
            {/* Tools Counter Badge */}
            <Badge 
              variant="secondary" 
              className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white border-white/30 text-base"
            >
              <CheckCircle2 className="mr-2 h-5 w-5" />
              {toolsCount === 1 ? '1 tool' : `${toolsCount} tools`}
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
