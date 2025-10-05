import { ClipboardService } from '../services/ClipboardService';

describe('ClipboardService', () => {
  let clipboardService: ClipboardService;
  let mockWriteText: jest.MockedFunction<(text: string) => Promise<void>>;

  beforeEach(() => {
    clipboardService = new ClipboardService();
    mockWriteText = jest.fn();
    
    // Mock document.execCommand
    document.execCommand = jest.fn().mockReturnValue(true);
    
    // Mock secure context
    Object.defineProperty(window, 'isSecureContext', {
      value: true,
      writable: true,
    });
    
    Object.defineProperty(global.navigator, 'clipboard', {
      value: {
        writeText: mockWriteText,
      },
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should copy text to clipboard using Clipboard API in secure context', async () => {
    mockWriteText.mockResolvedValue(undefined);
    
    await clipboardService.copyToClipboard('test text');
    
    expect(mockWriteText).toHaveBeenCalledWith('test text');
    expect(document.execCommand).not.toHaveBeenCalled();
  });

  it('should use fallback when not in secure context', async () => {
    Object.defineProperty(window, 'isSecureContext', {
      value: false,
      writable: true,
    });
    
    await clipboardService.copyToClipboard('test text');
    
    expect(mockWriteText).not.toHaveBeenCalled();
    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });

  it('should use fallback when clipboard API is not available', async () => {
    Object.defineProperty(global.navigator, 'clipboard', {
      value: undefined,
      writable: true,
    });
    
    await clipboardService.copyToClipboard('test text');
    
    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });

  it('should use fallback when Clipboard API fails', async () => {
    mockWriteText.mockRejectedValue(new Error('Clipboard error'));
    
    await clipboardService.copyToClipboard('test text');
    
    expect(mockWriteText).toHaveBeenCalledWith('test text');
    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });

  it('should throw error when both methods fail', async () => {
    mockWriteText.mockRejectedValue(new Error('Clipboard error'));
    (document.execCommand as jest.Mock).mockReturnValue(false);
    
    await expect(clipboardService.copyToClipboard('test text')).rejects.toThrow('Failed to copy to clipboard');
  });
});
