import { parseJsonString, validateJSON, ParsedJSONError, isObjectEmpty} from '../json-utils';
import { isObject } from 'util';

describe('#parseJsonString', () => {
  test('should return JSON Object when parsing a valid JSON string', () => {
    const jsonString = "{\"name\": \"Marek\"}";
    const result = {"name": "Marek"};
    expect(parseJsonString(jsonString)).toEqual(result);
  });
  
  test('should return error object when parsing Invalid JSON string', () => {
    const jsonString = "{\"name\": \"Marek\"; age: 30}";
    const result = parseJsonString(jsonString);
    expect((<ParsedJSONError>result).error).toBeTruthy();
    expect((<ParsedJSONError>result).errorMessage).toBeDefined();
  });
});

describe('#validateJSON', () => {
  test('should return result with error message', () => {
    const jsonString = "{\"name\": \"Marek\"}";
    const result = {"name": "Marek"};
    expect(validateJSON(jsonString)).toEqual(result);
  });

  test('should return parsed JSON', () => {
    const jsonString = `{\""name\": \"Marek\"}`;
    const resultMessage = validateJSON(jsonString);
    expect(resultMessage).toEqual('Unexpected token n in JSON at position 3');
  });
});

describe('#isObject', () => {
  test('should return true when a value is object', () => {
    expect(isObject({"age": 10})).toBeTruthy();
  });

  test('should return false when a value is NOT object', () => {
    expect(isObject('string')).toBeFalsy();
  });
});

describe('isObjectEmpty', () => {
  test('should return true when object is empty', () => {
    expect(isObjectEmpty({})).toBeTruthy();
  });

  test('should return false when object is NOT empty', () => {
    expect(isObjectEmpty({"age": 10})).toBeFalsy();
  });
});
