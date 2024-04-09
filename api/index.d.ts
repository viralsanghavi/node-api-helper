export declare const HTTP_STATUS_CODES: {
    OK: number;
    CREATED: number;
    ACCEPTED: number;
    NO_CONTENT: number;
    BAD_REQUEST: number;
    UNAUTHORIZED: number;
    FORBIDDEN: number;
    NOT_FOUND: number;
    REQUEST_TIMEOUT: number;
    INTERNAL_SERVER_ERROR: number;
    BAD_GATEWAY: number;
    SERVICE_UNAVAILABLE: number;
    GATEWAY_TIMEOUT: number;
};
export declare const DATABASE_TRANSACTION_TYPES: {
    BEGIN: string;
    COMMIT: string;
    ROLLBACK: string;
};
export declare const PAGINATION: {
    MIN_LIMIT: number;
    MAX_LIMIT: number;
    LIMIT: number;
    DEFAULT_PAGE: number;
};
export declare const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss.SSS";
export declare const getResponse: (obj?: any, statusCode?: number, contentType?: string) => {
    body: string;
    statusCode: number;
    isBase64Encoded?: boolean | undefined;
    headers: any;
};
/**
 * @description function creates a comma separated format of keys and values to use in set clause of update queries
 * @param {*} keyValueObject
 * @returns string
 * @example
 * keyValueObject: {"key1": value1, "key2": value2}
 * output: "key1=value1, key2=value2"
 */
export declare const getUpdateQuerySetClauseFormat: (keyValueObject: any) => any;
/**
 * @description: function creates a comma-separated string of quoted values that can be used for passing inside insert queries.
 * @param {*} fieldArray
 * @returns string
 * @example
 * fieldArray: ["person1", 26, 9876543210]
 * output: "'person1', '26', '9876543210'"
 */
export declare const formatInsertQueryValues: (fieldArray: any) => any;
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
export declare const checkMissingKeys: (requiredList?: never[], availableList?: never[]) => any;
/**
 *
 * @param {*} limit
 * @param {*} page
 * @returns { limit: number, offset: number }
 */
export declare const getPaginationParams: (limit: number, page: number) => {
    limit: number;
    offset: number;
};
/**
 * @description returns passed date or current date into required passed format
 * @param {*} format
 * @param {*} date
 * @returns string
 */
export declare const getFormattedDate: (format: string, date: Date) => string;
export declare const getJsonString: (str: string) => any;
export declare const isArray: (array: any) => boolean;
