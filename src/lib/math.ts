export const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), Math.max(min, max));

let counter = 0;
export const createId = (prefix = 'id') => `${prefix}-${Date.now().toString(36)}-${(++counter).toString(36)}`;
