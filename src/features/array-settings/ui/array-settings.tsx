import React from 'react';

import { useAppDispatch } from '@app/store/hooks';

import { generateArray } from '@shared/lib';
import { Card, FormFieldGroup, FormGroup, FormInput, FormLabel, PrimaryButton } from '@shared/ui';
import { CardTitle } from '@shared/ui/card/card-title';

import { updateArray } from '../model/array-settings-slice';
import { MAX_ARRAY_SIZE, MIN_ARRAY_SIZE } from '../model/constants';

export const ArraySettings: React.FC = () => {
  const [arraySize, setArraysSize] = React.useState<number>(0);
  const dispatch = useAppDispatch();

  const isButtonDisabled = arraySize < MIN_ARRAY_SIZE || arraySize > MAX_ARRAY_SIZE;
  const buttonTitle = isButtonDisabled ? `[${MIN_ARRAY_SIZE}, ${MAX_ARRAY_SIZE}]` : undefined;

  const generateArrayHandler = () => {
    if (isButtonDisabled) {
      return;
    }

    const array = generateArray(arraySize);
    dispatch(updateArray(array));
  };

  return (
    <Card>
      <CardTitle label='Генерация массива' />
      <FormGroup>
        <FormFieldGroup>
          <FormLabel label='Размер массива:' />
          <FormInput onChange={setArraysSize} />
        </FormFieldGroup>
        <PrimaryButton
          label='Сгенерировать'
          onClick={generateArrayHandler}
          title={buttonTitle}
          disabled={isButtonDisabled}
        />
      </FormGroup>
    </Card>
  );
};
