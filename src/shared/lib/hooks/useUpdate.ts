import React from 'react';

function updateIncrement(prevState: number) {
  return prevState + 1;
}

export function useUpdate() {
  const [_, dispatch] = React.useReducer(updateIncrement, 0);
  return dispatch;
}
