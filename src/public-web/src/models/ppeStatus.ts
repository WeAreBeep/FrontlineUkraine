export enum PpeStatus {
  New = 'New',
  InProgress = 'InProgress',
  Met = 'Met',
  NotMet = 'NotMet',
}

// NOTE: Order matters, it represents the ordinal value
export const PPE_STATUSES = [
  PpeStatus.New,
  PpeStatus.InProgress,
  PpeStatus.Met,
  PpeStatus.NotMet,
];

export function getPpeStatusEnumFromInt(value: number): PpeStatus | undefined {
  // Starting from 1
  return PPE_STATUSES[value - 1];
}
