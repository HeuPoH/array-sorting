export function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) {
    return arr;
  }

  const middleIdx = Math.ceil((arr.length - 1) / 2);
  const pivot = arr[middleIdx];
  const leftPart: number[] = [];
  const rightPart: number[] = [];

  for (let i = 0; i < arr.length; i++) {
    const curr = arr[i];
    if (i === middleIdx) {
      continue;
    }

    if (curr > pivot) {
      rightPart.push(curr);
    } else {
      leftPart.push(curr);
    }
  }

  return [...quickSort(leftPart), pivot, ...quickSort(rightPart)];
}
