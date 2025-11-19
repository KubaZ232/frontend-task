
import type { SaveStatus } from '../services/saveFileService';
import type { Translations } from '../i18n/translations';

interface StatusBadgeProps {
  status: SaveStatus;
  t: Translations;
}

export function StatusBadge({ status, t }: StatusBadgeProps) {
  if (status === 'pending') {
    return (
      <span 
        className="inline-flex items-center rounded-full bg-sky-900/60 px-2.5 py-0.5 text-xs font-medium text-sky-200 border border-sky-500/50"
        role="status"
        >
        ⏳ {t.status.pending}
      </span>
    );
  }

  if (status === 'success') {
    return (
      <span 
        className="inline-flex items-center rounded-full bg-emerald-900/60 px-2.5 py-0.5 text-xs font-medium text-emerald-200 border border-emerald-500/50"
        role="status"
        >
        ✅ {t.status.success}
      </span>
    );
  }

  return (
    <span 
        className="inline-flex items-center rounded-full bg-rose-900/60 px-2.5 py-0.5 text-xs font-medium text-rose-200 border border-rose-500/50"
        role="status"
        >
      ❌ {t.status.error}
    </span>
  );
}
