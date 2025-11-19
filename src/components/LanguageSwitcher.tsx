import type { Locale } from '../i18n/translations';

interface LanguageSwitcherProps {
  locale: Locale;
  onChange: (locale: Locale) => void;
  label: string;
}

export function LanguageSwitcher({ locale, onChange, label }: LanguageSwitcherProps) {
  return (
    <div className="flex justify-end mb-1">
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <span>{label}:</span>
        <div className="inline-flex rounded-full bg-slate-800 p-0.5">
          <button
            type="button"
            onClick={() => onChange('en')}
            className={`px-2 py-0.5 rounded-full transition text-xs ${
              locale === 'en'
                ? 'bg-sky-500 text-slate-950'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => onChange('pl')}
            className={`px-2 py-0.5 rounded-full transition text-xs ${
              locale === 'pl'
                ? 'bg-sky-500 text-slate-950'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            PL
          </button>
        </div>
      </div>
    </div>
  );
}
