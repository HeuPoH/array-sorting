import React from 'react';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';

import { useWorkersManager } from 'shared/lib';
import type { CustomWorker } from 'shared/workers';
import {
  ApplyButton,
  Box,
  Card,
  FormGroup,
  FormLabel,
  CardTitle,
  FormSelect,
  DangerButton,
  FormFieldGroup
} from 'shared/ui';
import { useAlgorithmsFactory } from 'shared/lib/hooks/useAlgorithmFactory';

import { updateSortedArray } from '../model/array-sorting-slice';
import type { PayloadToWorker, PayloadFromWorker } from '../model/worker/types';

const WORKER_URL = new URL('../model/worker/sort.worker.ts', import.meta.url);

export const ArraySorting: React.FC = () => {
  const factory = useAlgorithmsFactory();
  const algorithms = factory.getAllRegistered().map(item => ({ label: item.label, value: item.type }));
  const [algorithm, setAlgorithm] = React.useState(algorithms[0]);

  const workerRef = React.useRef<CustomWorker<PayloadToWorker, PayloadFromWorker> | null>(null);
  const workerManager = useWorkersManager();

  const dispatch = useAppDispatch();
  const rawArray = useAppSelector(state => state.arraySettings.array);

  const start = () => {
    const worker = workerRef.current = workerManager.create<PayloadToWorker, PayloadFromWorker>(WORKER_URL);
    worker.addEventListener('done', (event) => {
      const data = event.data.payload;
      dispatch(updateSortedArray(data));
    });
    worker.start({ algorithm: algorithm.value, array: rawArray });
  };
  const stop = () => workerRef.current?.stop('');

  return (
    <Card>
      <CardTitle label='Сортировка' />
      <FormGroup>
        <FormFieldGroup>
          <FormLabel label='Выбрать сортировку:' />
          <FormSelect option={algorithm} options={algorithms} onSelect={v => setAlgorithm(v)} />
        </FormFieldGroup>
        <Box flexrow gap={10}>
          <ApplyButton label='Старт' onClick={start} disabled={!rawArray.length} />
          <DangerButton label='Стоп' onClick={stop} disabled={!rawArray.length} />
        </Box>
      </FormGroup>
    </Card>
  );
};
