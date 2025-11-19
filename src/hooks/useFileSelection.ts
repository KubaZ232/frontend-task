
import { useState, ChangeEvent } from 'react';
import type { ValidationCode } from '../i18n/translations';

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_MIME_TYPES = ['image/png', 'image/jpeg', 'application/pdf'];

function validateFile(file: File | null): ValidationCode | null {
  if (!file) return 'noFile';
  if (!ALLOWED_MIME_TYPES.includes(file.type)) return 'invalidType';
  if (file.size > MAX_FILE_SIZE_BYTES) return 'tooLarge';
  return null;
}

interface UseFileSelectionResult {
  selectedFile: File | null;
  validationCode: ValidationCode | null;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  selectTestFile: () => void;
  validateBeforeSave: () => boolean;
}

export function useFileSelection(): UseFileSelectionResult {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validationCode, setValidationCode] =
    useState<ValidationCode | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedFile(file);
    setValidationCode(null);
  };

  const selectTestFile = () => {
    const blob = new Blob(['Dummy test content'], {
      type: 'application/pdf',
    });

    const testFile = new File([blob], 'test-document.pdf', {
      type: 'application/pdf',
    });

    const validation = validateFile(testFile);
    if (validation) {
      setValidationCode(validation);
      setSelectedFile(null);
      return;
    }

    setSelectedFile(testFile);
    setValidationCode(null);
  };

  const validateBeforeSave = () => {
    const validation = validateFile(selectedFile);
    if (validation) {
      setValidationCode(validation);
      return false;
    }

    setValidationCode(null);
    return true;
  };

  return {
    selectedFile,
    validationCode,
    handleFileChange,
    selectTestFile,
    validateBeforeSave,
  };
}
