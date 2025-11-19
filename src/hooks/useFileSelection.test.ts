import { renderHook, act } from '@testing-library/react';
import { useFileSelection } from './useFileSelection';

function makeFile(type: string, sizeBytes: number) {
  const blob = new Blob(['x'.repeat(sizeBytes)], { type });
  return new File([blob], 'test.' + type.split('/')[1], { type });
}

describe('useFileSelection', () => {
  it('fails validation when no file selected', () => {
    const { result } = renderHook(() => useFileSelection());

    let isValid: boolean;
    act(() => {
      isValid = result.current.validateBeforeSave();
    });

    expect(isValid!).toBe(false);
    expect(result.current.validationCode).toBe('noFile');
  });

  it('accepts valid PNG file', () => {
    const { result } = renderHook(() => useFileSelection());
    const file = makeFile('image/png', 1024);

    act(() => {
      result.current.handleFileChange({
        target: { files: [file] },
      } as any);
    });

    let isValid: boolean;
    act(() => {
      isValid = result.current.validateBeforeSave();
    });

    expect(isValid!).toBe(true);
    expect(result.current.validationCode).toBeNull();
  });
});
