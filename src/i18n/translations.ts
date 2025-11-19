export type Locale = 'en' | 'pl';

export type ValidationCode = 'noFile' | 'invalidType' | 'tooLarge';

export interface Translations {
  languageLabel: string;
  bannerParts: {
    before: string;
    successPart: string;
    middle: string;
    failPart: string;
    after: string;
  };
  headerTitle: string;
  headerBadgePrefix: string;
  headerBadgeSuffix: string;
  description: string;
  buttonLabel: string;
  inProgressLabel: string;
  totalAttemptsLabel: string;
  historyTitle: string;
  historyEmpty: string;
  requestLabel: string;
  status: {
    pending: string;
    success: string;
    error: string;
  };
  infoMessages: {
    tooManyInProgress: string;
  };
  fileInput: {
    label: string;
    noFileSelected: string;
    testButtonLabel: string;
    chooseLabel: string;
  };
  validationMessages: Record<ValidationCode, string>;
}

export const translations: Record<Locale, Translations> = {
  en: {
    languageLabel: 'Language',
    bannerParts: {
      before:
        'This demo intentionally simulates an unstable backend. Each save has roughly a ',
      successPart: '50%',
      middle: ' chance to succeed and a ',
      failPart: '50%',
      after:
        ' chance to fail to showcase error handling and concurrency limits.',
    },
    headerTitle: 'Async Challenge',
    headerBadgePrefix: 'max',
    headerBadgeSuffix: 'parallel saves',
    description:
      'Click "Save file" to trigger an async save. Up to three saves can run in parallel. Each attempt will show whether the file was saved successfully or not.',
    buttonLabel: 'Save file',
    inProgressLabel: 'In progress',
    totalAttemptsLabel: 'Total attempts',
    historyTitle: 'Save history',
    historyEmpty: 'No saves yet. Click "Save file" to start.',
    requestLabel: 'Request',
    status: {
      pending: 'Pending',
      success: 'Success',
      error: 'Error',
    },
    infoMessages: {
      tooManyInProgress:
        'You already have 3 saves in progress. Please wait for one to finish.',
    },
    fileInput: {
      label: 'File to save (simulated)',
      noFileSelected: 'No file selected',
      testButtonLabel: 'Use test file',
      chooseLabel: 'Choose file',
    },
    validationMessages: {
      noFile: 'Please choose a file before saving.',
      invalidType:
        'This file type is not allowed. Allowed types are: PNG, JPEG, PDF.',
      tooLarge: 'File is too large. Maximum allowed size is 5 MB.',
    },
  },
  pl: {
    languageLabel: 'Język',
    bannerParts: {
      before:
        'Ta demonstracja celowo symuluje niestabilne API. Każdy zapis ma około ',
      successPart: '50%',
      middle: ' szans powodzenia i ',
      failPart: '50%',
      after:
        ' szans niepowodzenia, aby pokazać obsługę błędów i limit równoległych zapytań.',
    },
    headerTitle: 'Wyzwanie asynchroniczne',
    headerBadgePrefix: 'max',
    headerBadgeSuffix: 'równoległe zapisy',
    description:
      'Kliknij „Zapisz plik”, aby uruchomić asynchroniczny zapis. Jednocześnie mogą działać maksymalnie trzy zapisy. Każda próba pokaże, czy plik został zapisany poprawnie.',
    buttonLabel: 'Zapisz plik',
    inProgressLabel: 'W toku',
    totalAttemptsLabel: 'Liczba prób',
    historyTitle: 'Historia zapisów',
    historyEmpty: 'Brak zapisów. Kliknij „Zapisz plik”, aby rozpocząć.',
    requestLabel: 'Zapis',
    status: {
      pending: 'W trakcie',
      success: 'Sukces',
      error: 'Błąd',
    },
    infoMessages: {
      tooManyInProgress:
        'Masz już 3 zapisy w toku. Poczekaj, aż któryś się zakończy.',
    },
    fileInput: {
      label: 'Plik do zapisu (symulacja)',
      noFileSelected: 'Nie wybrano pliku',
      testButtonLabel: 'Plik testowy',
      chooseLabel: 'Wybierz plik',
    },
    validationMessages: {
      noFile: 'Wybierz plik przed zapisaniem.',
      invalidType:
        'Ten typ pliku nie jest dozwolony. Dozwolone typy: PNG, JPEG, PDF.',
      tooLarge: 'Plik jest za duży. Maksymalny rozmiar to 5 MB.',
    },
  },
};
