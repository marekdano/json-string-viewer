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
  if (isObject(result) && 'error' in result && result.error) {
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
    if (isObjectPropertyExisted(jsonStringThroughPath as JSONObject, item)) {
      jsonStringThroughPath = (jsonStringThroughPath as JSONObject)[item];
    } else {
      alert('The path to get json string is invalid.');
    }
  }
  return jsonStringThroughPath as string;
}

const isObjectPropertyExisted = (object: JSONObject, property: string): boolean => {
  return typeof object[property] !== 'undefined';
} 