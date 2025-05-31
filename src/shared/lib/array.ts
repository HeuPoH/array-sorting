export function generateArray(size: number): number[] {
  const arr: number[] = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.ceil(Math.random() * 100));
  }

  return arr;
};
