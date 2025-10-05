import React from 'react';
import { Tool } from '../types';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ExternalLink, Copy } from 'lucide-react';
import { getCategoryColor, categoryColorStyles } from '../lib/categoryColors';

interface ToolCardProps {
  tool: Tool;
  onCopyUrl: (url: string) => void;
}

export function ToolCard({ tool, onCopyUrl }: ToolCardProps) {
  const colorVariant = getCategoryColor(tool.category);
  const colorClass = categoryColorStyles[colorVariant];
  
  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      <CardHeader className="flex-1">
        <Badge variant="outline" className={`w-fit mb-2 ${colorClass}`}>
          {tool.category}
        </Badge>
        <CardTitle className="text-xl">{tool.name}</CardTitle>
        <CardDescription className="leading-relaxed">
          {tool.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex gap-3 mt-auto">
        <Button asChild className="flex-1">
          <a 
            href={tool.url} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Visit
          </a>
        </Button>
        <Button 
          variant="outline"
          size="icon"
          onClick={() => onCopyUrl(tool.url)}
          title="Copy URL"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
