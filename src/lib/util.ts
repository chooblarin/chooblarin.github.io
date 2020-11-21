/**
 * @param arr
 * @param size
 * @example let chunked = chunk([0, 1, 2, 3, 4], 2); // => [[0, 1], [2, 3], [4]]
 */
export const chunk = <T>(arr: T[], size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
