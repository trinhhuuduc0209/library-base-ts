export const defineProperty = Object.defineProperty;

export const setProperty = (obj: any, key: string, value: any) => {
  if (key in obj) {
    defineProperty(obj, key, { enumerable: true, configurable: true, writable: true, value });
    return;
  }
  obj[key] = value;
};

export const setAndReturn = (obj: any, key: string, value: any) => {
  return setProperty(obj, key, value);
};

export function isReferenceError(error: any): boolean {
  return typeof error.name === 'string' && error.name === 'ReferenceError';
}
