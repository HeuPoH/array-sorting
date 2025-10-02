import React from 'react';
import { useAppDispatch, useAppSelector } from '@app/store/hooks';

import { updateSortedArray } from '@features/array-sorting/model/array-sorting-slice';
import { PayloadFromWorker, PayloadToWorker } from '@features/array-sorting/model/worker/types';

import { useWorkersManager } from '@shared/lib';
import type { WorkerWrapper } from '@shared/workers';
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
} from '@shared/ui';
import { useAlgorithmsFactory } from '@shared/lib/hooks/useAlgorithmFactory';

import SortingWorker from '@features/array-sorting/model/worker/sort.worker?worker';

export const ArraySorting: React.FC = () => {
  const factory = useAlgorithmsFactory();
  const algorithms = factory.getAllRegistered().map(item => ({ label: item.label, value: item.type }));
  const [algorithm, setAlgorithm] = React.useState(algorithms[0]);

  const workerRef = React.useRef<WorkerWrapper<PayloadToWorker, PayloadFromWorker> | null>(null);
  const workerManager = useWorkersManager();

  const dispatch = useAppDispatch();
  const rawArray = useAppSelector(state => state.arraySettings.array);

  const start = () => {
    const worker = workerRef.current = workerManager.create<PayloadToWorker, PayloadFromWorker>(new SortingWorker());
    worker.addEventListener('task-complete', (event) => {
      const data = event.data.payload;
      dispatch(updateSortedArray(data));
    });
    worker.start({ algorithm: algorithm.value, array: rawArray });
  };
  const stop = () => workerRef.current?.stop();

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
