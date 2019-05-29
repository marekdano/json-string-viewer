import { parseJsonString, validateJSON, ParsedJSONError} from '../json-utils';

describe('#parseJsonString', () => {
  test('parseJonString should return JSON Object when parsing a valid JSON string', () => {
    const jsonString = "{\"name\": \"Marek\"}";
    const result = {"name": "Marek"};
    expect(parseJsonString(jsonString)).toEqual(result);
  });
  
  test('parseJonString should return error object when parsing Invalid JSON string', () => {
    const jsonString = "{\"name\": \"Marek\"; age: 30}";
    const result = parseJsonString(jsonString);
    expect((<ParsedJSONError>result).error).toBeTruthy();
    expect((<ParsedJSONError>result).errorMessage).toBeDefined();
  });
});

describe('#validateJSON', () => {
  test('returns result with error message', () => {
    const jsonString = "{\"name\": \"Marek\"}";
    const result = {"name": "Marek"};
    expect(validateJSON(jsonString)).toEqual(result);
  });

  test('returns parsed JSON', () => {
    const jsonString = `{\""name\": \"Marek\"}`;
    const resultMessage = validateJSON(jsonString);
    expect(resultMessage).toEqual('Unexpected token n in JSON at position 3');
  });
});
