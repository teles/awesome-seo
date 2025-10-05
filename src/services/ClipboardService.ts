import { IClipboardService } from '../interfaces';

export class ClipboardService implements IClipboardService {
  async copyToClipboard(text: string): Promise<void> {
    try {
      if (!navigator.clipboard) {
        throw new Error('Clipboard API not available');
      }
      
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error('Failed to copy text:', error);
      throw new Error('Failed to copy to clipboard');
    }
  }
}
