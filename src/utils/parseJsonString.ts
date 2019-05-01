export interface ParsedJSONError {
  error: boolean;
  errorMessage: string
}

export default function parseJsonString(value: string): Object | ParsedJSONError  {
  try {
    return JSON.parse(value);
  } catch (err) {
    return {
      error: true, 
      errorMessage: err.message
    };
  }
}
