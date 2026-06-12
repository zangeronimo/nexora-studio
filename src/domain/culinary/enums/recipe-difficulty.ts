export enum recipeDifficulty {
  'easy' = 1,
  'medium' = 2,
  'hard' = 3,
}

export namespace recipeDifficulty {
  export function toArray() {
    return Object.entries(recipeDifficulty)
      .filter(([, value]) => typeof value === 'number')
      .map(([key, value]) => ({
        label: key,
        value,
      }));
  }
}
