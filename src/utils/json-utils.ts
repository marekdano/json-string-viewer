import { JSONObject } from "../App";

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

export const validateJSON = (jsonValidString: string): string => {
  const result = parseJsonString(jsonValidString);
  if ('error' in result && result.error) {
    return result.errorMessage;
  } else {
    return result as string;
  }
}

export const isObject = (value: Object): boolean => {
  return value instanceof Object;
}

export const isObjectEmpty = (obj: Object): boolean => {
  return Object.keys(obj).length === 0;
} 

export const getJSONStringThroughPath = (validJSON: JSONObject, path: string[]): string | undefined => {
  let jsonStringThroughPath: string | JSONObject = validJSON;
  for (const item of path) { 
    jsonStringThroughPath =  (jsonStringThroughPath as JSONObject)[item];
  }
  return jsonStringThroughPath as string;
}
