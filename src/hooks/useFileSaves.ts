
import { useRef, useState } from 'react';
import {
  MAX_PARALLEL_REQUESTS,
  saveFile,
  type SaveAction,
} from '../services/saveFileService';

export type InfoCode = 'tooManyInProgress';

interface UseFileSavesResult {
  actions: SaveAction[];
  runningCount: number;
  infoCode: InfoCode | null;
  handleSaveClick: () => void;
}

export const useFileSaves = (): UseFileSavesResult => {
  const [actions, setActions] = useState<SaveAction[]>([]);
  const [runningCount, setRunningCount] = useState(0);
  const [infoCode, setInfoCode] = useState<InfoCode | null>(null);

  const nextIdRef = useRef(1);
  const runningRef = useRef(0); 

  const handleSaveClick = () => {
    if (runningRef.current >= MAX_PARALLEL_REQUESTS) {
      setInfoCode('tooManyInProgress');
      return;
    }

    setInfoCode(null);

    const id = nextIdRef.current++;
    const newAction: SaveAction = {
      id,
      status: 'pending',
      message: 'Saving file…',
    };

    setActions((prev) => [newAction, ...prev]);

    runningRef.current += 1;
    setRunningCount(runningRef.current);

    saveFile()
      .then((result) => {
        const message = typeof result === 'string' ? result : 'File saved';
        setActions((prev) =>
          prev.map((action) =>
            action.id === id
              ? { ...action, status: 'success', message }
              : action,
          ),
        );
      })
      .catch((error: unknown) => {
        const message =
          typeof error === 'string'
            ? error
            : 'Unknown error: file not saved';

        setActions((prev) =>
          prev.map((action) =>
            action.id === id
              ? { ...action, status: 'error', message }
              : action,
          ),
        );
      })
      .finally(() => {
        runningRef.current = Math.max(0, runningRef.current - 1);
        setRunningCount(runningRef.current);
      });
  };

  return { actions, runningCount, infoCode, handleSaveClick };
};
