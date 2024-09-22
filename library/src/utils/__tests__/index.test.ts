import { setProperty, setAndReturn, isReferenceError } from '../';
import { describe, it, expect, beforeEach } from '@jest/globals';

describe('Utility Functions', () => {
  let obj: any;

  beforeEach(() => {
    obj = {};
  });

  describe('setProperty', () => {
    it('should define a property using defineProperty if key exists in the object', () => {
      obj.existingKey = 'initialValue';
      setProperty(obj, 'existingKey', 'newValue');

      const descriptor = Object.getOwnPropertyDescriptor(obj, 'existingKey');

      expect(descriptor).toMatchObject({
        value: 'newValue',
        enumerable: true,
        configurable: true,
        writable: true,
      });
    });

    it('should set the property directly if the key does not exist in the object', () => {
      setProperty(obj, 'newKey', 'newValue');

      expect(obj.newKey).toBe('newValue');
    });
  });

  describe('setAndReturn', () => {
    it('should call setProperty and return the value', () => {
      const returnValue = setAndReturn(obj, 'anotherKey', 'anotherValue');

      expect(returnValue).toBeUndefined();
      expect(obj.anotherKey).toBe('anotherValue');
    });
  });

  describe('isReferenceError', () => {
    it('should return true if the error is a ReferenceError', () => {
      const error = new ReferenceError('This is a reference error');

      const result = isReferenceError(error);

      expect(result).toBe(true);
    });

    it('should return false if the error is not a ReferenceError', () => {
      const error = new TypeError('This is a type error');

      const result = isReferenceError(error);

      expect(result).toBe(false);
    });

    it('should return false if the error does not have a name property', () => {
      const error = { message: 'This is an error without a name property' };

      const result = isReferenceError(error);

      expect(result).toBe(false);
    });

    it('should return false if the error name is not a string', () => {
      const error = { name: 123, message: 'This is an error with a non-string name' };

      const result = isReferenceError(error);

      expect(result).toBe(false);
    });
  });
});
