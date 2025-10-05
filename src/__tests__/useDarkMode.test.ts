import { renderHook, act } from '@testing-library/react';
import { useDarkMode } from '../hooks/useDarkMode';

describe('useDarkMode', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Reset document class
    document.documentElement.className = '';
  });

  it('should initialize with false when no preference is set', () => {
    const { result } = renderHook(() => useDarkMode());
    expect(result.current.isDarkMode).toBe(false);
  });

  it('should toggle dark mode', () => {
    const { result } = renderHook(() => useDarkMode());
    
    act(() => {
      result.current.toggleDarkMode();
    });
    
    expect(result.current.isDarkMode).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should save preference to localStorage', () => {
    const { result } = renderHook(() => useDarkMode());
    
    act(() => {
      result.current.toggleDarkMode();
    });
    
    expect(localStorage.getItem('darkMode')).toBe('true');
  });

  it('should load preference from localStorage', () => {
    localStorage.setItem('darkMode', 'true');
    
    const { result } = renderHook(() => useDarkMode());
    
    expect(result.current.isDarkMode).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should toggle dark mode off', () => {
    localStorage.setItem('darkMode', 'true');
    const { result } = renderHook(() => useDarkMode());
    
    act(() => {
      result.current.toggleDarkMode();
    });
    
    expect(result.current.isDarkMode).toBe(false);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('darkMode')).toBe('false');
  });
});
