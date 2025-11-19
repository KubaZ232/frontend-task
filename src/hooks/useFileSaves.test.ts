import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { useFileSaves } from './useFileSaves';
import * as service from '../services/saveFileService';

describe('useFileSaves', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.resetAllMocks();
    vi.useRealTimers();
  });

  it('starts a request and marks it as success', async () => {
    const saveFileSpy = vi
      .spyOn(service, 'saveFile')
      .mockResolvedValue('Success: file saved');

    const { result } = renderHook(() => useFileSaves());

    act(() => {
      result.current.handleSaveClick();
    });

    expect(result.current.runningCount).toBe(1);
    expect(result.current.actions[0].status).toBe('pending');

    await act(async () => {
      vi.runAllTimers();
      await Promise.resolve();
    });

    expect(result.current.runningCount).toBe(0);
    expect(result.current.actions[0].status).toBe('success');
    expect(saveFileSpy).toHaveBeenCalledTimes(1);
  });

  it('prevents more than 3 parallel requests', () => {
    const saveFileSpy = vi
      .spyOn(service, 'saveFile')
      .mockImplementation(() => new Promise(() => {}));
  
    const { result } = renderHook(() => useFileSaves());
  
    act(() => {
      result.current.handleSaveClick();
      result.current.handleSaveClick();
      result.current.handleSaveClick();
      result.current.handleSaveClick();
    });
  
    expect(saveFileSpy).toHaveBeenCalledTimes(3);
    expect(result.current.runningCount).toBe(3);
    expect(result.current.infoCode).toBe('tooManyInProgress');
  });  
});
