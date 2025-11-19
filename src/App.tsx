import { useState } from 'react';
import { useFileSaves } from './hooks/useFileSaves';
import { useFileSelection } from './hooks/useFileSelection';
import { MAX_PARALLEL_REQUESTS } from './services/saveFileService';
import { SaveHistory } from './components/SaveHistory';
import {
  translations,
  type Locale,
  type ValidationCode,
} from './i18n/translations';
import type { InfoCode } from './hooks/useFileSaves';
import { LanguageSwitcher } from './components/LanguageSwitcher';

function App() {
  const [locale, setLocale] = useState<Locale>('pl');

  const { actions, runningCount, infoCode, handleSaveClick } = useFileSaves();

  const {
    selectedFile,
    validationCode,
    handleFileChange,
    selectTestFile,
    validateBeforeSave,
  } = useFileSelection();

  const t = translations[locale];

  const getInfoMessage = (code: InfoCode | null): string | null => {
    if (!code) return null;
    return t.infoMessages[code];
  };

  const getValidationMessage = (
    code: ValidationCode | null,
  ): string | null => {
    if (!code) return null;
    return t.validationMessages[code];
  };

  const infoMessage = getInfoMessage(infoCode);
  const validationMessage = getValidationMessage(validationCode);

  const handleSaveWithValidation = () => {
    const isValid = validateBeforeSave();
    if (!isValid) return;

    handleSaveClick();
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50 flex justify-center items-start px-4 py-10">
        <main
            className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900/80 shadow-xl shadow-slate-950/60 p-6 space-y-5"
            role="main"
            aria-labelledby="app-title"
        >

        <LanguageSwitcher
          locale={locale}
          onChange={setLocale}
          label={t.languageLabel}
        />

        <div className="rounded-xl border border-dashed border-slate-700 bg-slate-950/50 px-4 py-3 text-xs text-slate-300 mb-1">
          {t.bannerParts.before}
          <span className="font-semibold text-sky-300">
            {t.bannerParts.successPart}
          </span>
          {t.bannerParts.middle}
          <span className="font-semibold text-rose-300">
            {t.bannerParts.failPart}
          </span>
          {t.bannerParts.after}
        </div>

        <header className="space-y-2">
          <h1 id="app-title" className="text-2xl font-semibold tracking-tight flex items-center gap-2">
            {t.headerTitle}
            <span className="text-xs font-medium text-slate-400 border border-slate-700 rounded-full px-2 py-0.5">
              {t.headerBadgePrefix} {MAX_PARALLEL_REQUESTS}{' '}
              {t.headerBadgeSuffix}
            </span>
          </h1>
          <p className="text-sm text-slate-400">{t.description}</p>
        </header>

        <section className="space-y-1 text-xs text-slate-300">
          <label className="block text-xs font-medium text-slate-300 mb-1">
            {t.fileInput.label}
          </label>

          <div className="flex items-center gap-3">
            
            <button
              type="button"
              onClick={selectTestFile}
              disabled={runningCount >= MAX_PARALLEL_REQUESTS}
              className="whitespace-nowrap rounded-lg border border-slate-600 bg-slate-800/70 px-3 py-1.5 text-[11px] font-medium text-slate-100 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {t.fileInput.testButtonLabel}
            </button>

            <label
              htmlFor="file-input"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-slate-800 px-3 py-1.5 text-[11px] font-medium text-slate-100 border border-slate-600 hover:bg-slate-700 cursor-pointer"
            >
              {t.fileInput.chooseLabel}
            </label>

            <input
              id="file-input"
              type="file"
              onChange={handleFileChange}
              className="sr-only"
            />
          </div>

          <p className="text-[11px] text-slate-500">
            {selectedFile
              ? `${selectedFile.name} (${Math.round(
                  selectedFile.size / 1024,
                )} KB)`
              : t.fileInput.noFileSelected}
          </p>
          {validationMessage && (
            <p 
              className="text-[11px] text-amber-300"
              role="alert"
              aria-live="assertive"
            >
              {validationMessage}
            </p>
          )}
        </section>

        <section className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleSaveWithValidation}
            className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium bg-sky-500 hover:bg-sky-400 active:bg-sky-500 text-slate-950 transition focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={runningCount >= MAX_PARALLEL_REQUESTS}
          >
            💾 {t.buttonLabel}
          </button>

          <div className="text-right text-xs text-slate-400">
            <div>
              {t.inProgressLabel}:{' '}
              <span className="font-mono text-sky-300">{runningCount}</span> /{' '}
              <span className="font-mono text-slate-300">
                {MAX_PARALLEL_REQUESTS}
              </span>
            </div>
            <div>
              {t.totalAttemptsLabel}: {actions.length}
            </div>
          </div>
        </section>

        {infoMessage && (
          <p 
            className="text-xs text-amber-300 bg-amber-950/40 border border-amber-700/50 rounded-lg px-3 py-2"
            role="status"
            aria-live="polite"
            >
            {infoMessage}
          </p>
        )}

        <SaveHistory actions={actions} t={t} />
      </main>
    </div>
  );
}

export default App;
