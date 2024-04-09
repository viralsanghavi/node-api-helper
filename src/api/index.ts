// import {createHmac} from "crypto";
import moment from "moment";

export const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  REQUEST_TIMEOUT: 408,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};

export const DATABASE_TRANSACTION_TYPES = {
  BEGIN: "BEGIN",
  COMMIT: "COMMIT",
  ROLLBACK: "ROLLBACK",
};

export const PAGINATION = {
  MIN_LIMIT: 1,
  MAX_LIMIT: 100,
  LIMIT: 20,
  DEFAULT_PAGE: 1,
};

export const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss.SSS";

export const getResponse = (
  obj: any = {message: "Bad Request"},
  statusCode: number = HTTP_STATUS_CODES.BAD_REQUEST,
  contentType: string = "application/json"
): {
  body: string;
  statusCode: number;
  isBase64Encoded?: boolean;
  headers: any;
} => {
  let resMessage = {
    body: JSON.stringify(obj),
    statusCode: statusCode,
    isBase64Encoded: false,
    headers: {
      contentType,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE",
      },
    },
  };
  return resMessage;
};

/**
 * @description function creates a comma separated format of keys and values to use in set clause of update queries
 * @param {*} keyValueObject
 * @returns string
 * @example
 * keyValueObject: {"key1": value1, "key2": value2}
 * output: "key1=value1, key2=value2"
 */
export const getUpdateQuerySetClauseFormat = (keyValueObject: any): any => {
  if (!keyValueObject || typeof keyValueObject !== "object") {
    throw new Error("Object type is required");
  }

  return Object.entries(keyValueObject)
    .map(([key, value]) => `${key}='${value}'`)
    .join(", ");
};

/**
 * @description: function creates a comma-separated string of quoted values that can be used for passing inside insert queries.
 * @param {*} fieldArray
 * @returns string
 * @example
 * fieldArray: ["person1", 26, 9876543210]
 * output: "'person1', '26', '9876543210'"
 */
export const formatInsertQueryValues = (fieldArray: any): any => {
  if (!Array.isArray(fieldArray)) {
    throw new Error("Array is required");
  }

  return fieldArray.map((element) => `'${element}'`).join(",");
};

/**
 * @description function compares two arrays and returns keys from first array which are not available in second array
 * @param {*} requiredList array
 * @param {*} availableList array
 * @returns array
 * @example
 * requiredList: ["one", "two"]
 * availableList: ["two", "three"]
 * returns ["one"]
 */
export const checkMissingKeys = (
  requiredList = [],
  availableList = []
): any => {
  if (!Array.isArray(requiredList) || !Array.isArray(availableList)) {
    throw new Error("Required and Available List must be an array");
  }

  return requiredList.filter((element) => availableList.indexOf(element) < 0);
};

// /**
//  * @description function hashes numbers and strings.
//  * @param {*} dataString string | number
//  * @param {*} salt
//  * @returns string
//  */
// export const createHash = (dataString: string, salt: string): string => {
//   if (typeof dataString !== "string") {
//     throw new Error("String type is required");
//   }

//   const hmac = createHmac("sha256", salt);
//   return hmac.update(dataString).digest("hex");
// };

/**
 *
 * @param {*} limit
 * @param {*} page
 * @returns { limit: number, offset: number }
 */
export const getPaginationParams = (
  limit: number,
  page: number
): {limit: number; offset: number} => {
  const {LIMIT, MIN_LIMIT, MAX_LIMIT, DEFAULT_PAGE} = PAGINATION;

  if (typeof limit !== "number") {
    limit = LIMIT;
  } else {
    if (limit < MIN_LIMIT) {
      limit = MIN_LIMIT;
    }

    if (limit > MAX_LIMIT) {
      limit = MAX_LIMIT;
    }
  }

  if (typeof page !== "number" || page < DEFAULT_PAGE) {
    page = DEFAULT_PAGE;
  }

  const offset = (page - 1) * limit;

  return {limit, offset};
};

/**
 * @description returns passed date or current date into required passed format
 * @param {*} format
 * @param {*} date
 * @returns string
 */
export const getFormattedDate = (format: string, date: Date): string => {
  if (date) {
    return moment(date).format(format);
  }

  return moment().format(format);
};

export const getJsonString = (str: string): any => {
  try {
    if (str.toString() === "null") throw new Error();
    return JSON.parse(str);
  } catch (e) {
    return {};
  }
};

const isObject = function (obj: any): boolean {
  return obj === Object(obj) && !isArray(obj) && typeof obj !== "function";
};

export const isArray = function (array: any): boolean {
  return Array.isArray(array);
};

const toCamel = (str: string): string => {
  return str.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace("-", "").replace("_", "");
  });
};

// export const keysToCamel = function (obj: any): any {
//   if (isObject(obj)) {
//     const n = {};

//     Object.keys(obj).forEach((key) => {
//       n[toCamel(key)] = keysToCamel(obj[key]);
//     });

//     return n;
//   } else if (isArray(obj)) {
//     return obj.map((index) => {
//       return keysToCamel(index);
//     });
//   }

//   return obj;
// };
