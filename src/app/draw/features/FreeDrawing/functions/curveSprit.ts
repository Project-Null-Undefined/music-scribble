import { Coordinate } from '@/types/draw';

export function splitCurve(coordinates: Coordinate[], totalBeatCount: number): Coordinate[] {
  const resultCurve = Array.from(
    { length: totalBeatCount },
    (_, i) => coordinates[Math.floor((i * coordinates.length) / totalBeatCount)],
  );

  return resultCurve;
}
