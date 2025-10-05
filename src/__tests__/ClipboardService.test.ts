import { ClipboardService } from '../services/ClipboardService';

describe('ClipboardService', () => {
  let clipboardService: ClipboardService;
  let mockWriteText: jest.MockedFunction<any>;

  beforeEach(() => {
    clipboardService = new ClipboardService();
    mockWriteText = jest.fn();
    
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

  it('should copy text to clipboard successfully', async () => {
    mockWriteText.mockResolvedValue(undefined);
    
    await clipboardService.copyToClipboard('test text');
    
    expect(mockWriteText).toHaveBeenCalledWith('test text');
  });

  it('should handle clipboard API failure', async () => {
    mockWriteText.mockRejectedValue(new Error('Clipboard error'));
    
    await expect(clipboardService.copyToClipboard('test text')).rejects.toThrow('Failed to copy to clipboard');
  });

  it('should handle missing clipboard API', async () => {
    Object.defineProperty(global.navigator, 'clipboard', {
      value: undefined,
      writable: true,
    });
    
    await expect(clipboardService.copyToClipboard('test text')).rejects.toThrow('Failed to copy to clipboard');
  });
});
