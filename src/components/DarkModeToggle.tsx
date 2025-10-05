import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';

interface DarkModeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

export function DarkModeToggle({ isDarkMode, onToggle }: DarkModeToggleProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onToggle}
      className="rounded-full w-10 h-10 bg-white/20 dark:bg-gray-800/50 backdrop-blur-sm border-white/30 dark:border-gray-700 hover:bg-white/30 dark:hover:bg-gray-700/50 transition-all"
      aria-label={isDarkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5 text-yellow-300" />
      ) : (
        <Moon className="h-5 w-5 text-white" />
      )}
    </Button>
  );
}
