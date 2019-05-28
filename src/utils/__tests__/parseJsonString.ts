import parseJsonString, {ParsedJSONError} from '../parseJsonString';

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
