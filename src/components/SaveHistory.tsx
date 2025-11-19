
import type { SaveAction } from '../services/saveFileService';
import type { Translations } from '../i18n/translations';
import { StatusBadge } from './StatusBadge';

interface SaveHistoryProps {
  actions: SaveAction[];
  t: Translations;
}

export function SaveHistory({ actions, t }: SaveHistoryProps) {
  return (
    <section
      className="space-y-2"
      aria-labelledby="history-heading"
    >
      <h2
        id="history-heading"
        className="text-sm font-semibold text-slate-200"
      >
        {t.historyTitle}
      </h2>

      <div className="max-h-32 overflow-y-auto rounded-xl border border-slate-800 bg-slate-950/40">
        {actions.length === 0 ? (
          <div className="px-4 py-6 text-sm text-slate-500 text-center">
            {t.historyEmpty}
          </div>
        ) : (
          <ul 
            className="divide-y divide-slate-800 text-sm" 
            aria-live="polite"
            >
            {actions.map((action) => (
              <li
                key={action.id}
                className="px-4 py-3 flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <p className="font-medium text-slate-100">
                    {action.message}
                  </p>
                  <p className="text-xs text-slate-500">
                    {t.requestLabel} #{action.id}
                  </p>
                </div>
                <div className="shrink-0">
                  <StatusBadge status={action.status} t={t} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
