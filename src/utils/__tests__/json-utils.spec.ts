import { parseJsonString, validateJSON, ParsedJSONError, isObjectEmpty, isObject, getJSONStringThroughPath} from '../json-utils';

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

describe('getJSONStringThroughPath', () => {
  test('should return string when valid object path is provided', () => {
    const input = {
      "Report": {
        "Configuration": "This is the configuration file"
      }
    };
    
    expect(getJSONStringThroughPath(input, ['Report', 'Configuration'])).toEqual("This is the configuration file");
  });

  test('should return string when INVALID object path is provided', () => {
    const input = {
      "Report": {
        "Configuration": "This is the configuration file"
      }
    };
    window.alert = () => {};

    expect(getJSONStringThroughPath(input, ['Report', 'Invalid'])).toEqual(undefined);
  });
});
