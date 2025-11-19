import { faker } from '@faker-js/faker';

export const MAX_PARALLEL_REQUESTS = 3;

export type SaveStatus = 'pending' | 'success' | 'error';

export interface SaveAction {
  id: number;
  status: SaveStatus;
  message: string;
}

export const saveFile = (): Promise<string> =>
  new Promise((res, rej) => {
    const timeToResolve = faker.number.int({ min: 1_000, max: 3_000 });

    setTimeout(() => {
      if (Math.random() > 0.5) {
        res(`Success: ${faker.system.commonFileName()} saved`);
      } else {
        rej(`Error: ${faker.system.commonFileName()} not saved`);
      }
    }, timeToResolve);
  });
