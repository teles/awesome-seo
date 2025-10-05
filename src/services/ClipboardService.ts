import { IClipboardService } from '../interfaces';

export class ClipboardService implements IClipboardService {
  async copyToClipboard(text: string): Promise<void> {
    try {
      // Try modern Clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return;
      }
      
      // Fallback for non-secure contexts (HTTP)
      this.fallbackCopyToClipboard(text);
    } catch (error) {
      console.error('Failed to copy text:', error);
      // If Clipboard API fails, try fallback
      try {
        this.fallbackCopyToClipboard(text);
      } catch (fallbackError) {
        throw new Error('Failed to copy to clipboard');
      }
    }
  }

  private fallbackCopyToClipboard(text: string): void {
    // Create a temporary textarea element
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Make it invisible
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    textArea.setAttribute('readonly', '');
    
    document.body.appendChild(textArea);
    
    // Select and copy the text
    textArea.select();
    textArea.setSelectionRange(0, 99999); // For mobile devices
    
    const successful = document.execCommand('copy');
    
    // Clean up
    document.body.removeChild(textArea);
    
    if (!successful) {
      throw new Error('Failed to copy using fallback method');
    }
  }
}
