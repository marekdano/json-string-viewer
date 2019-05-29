export interface ParsedJSONError {
  error: boolean;
  errorMessage: string
}

export const parseJsonString = (value: string): Object | ParsedJSONError => {
  try {
    return JSON.parse(value);
  } catch (err) {
    return {
      error: true, 
      errorMessage: err.message
    };
  }
}

export const validateJSON = (jsonValidString: string): Object | ParsedJSONError => {
  const result = parseJsonString(jsonValidString);
  if ('error' in result && result.error) {
    return result.errorMessage;
  } else {
    return result;
  }
}
