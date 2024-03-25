import bunyan from "bunyan";
import { LOG_LEVEL } from "./helpers.js";

export class Logger {
    logger;

    constructor(logLevel) {
        // If we forget to add the log level in the SAM template then
        // we can also pass it in the constructor
        if (!logLevel && !process.env.LOG_LEVEL) {
            throw new Error("Log level not found")
        }

        // Set the log level to error if in production
        // This will act as a safety measure so that only error logs are logged in production.
        const level = process.env.ENV_NAME === 'prod' ? LOG_LEVEL.ERROR : logLevel || process.env.LOG_LEVEL;

        // Initialize the logger
        this.logger = bunyan.createLogger({
            level,
            name: 'logger',
            src: true,
            serializers: bunyan.stdSerializers
        });
    }
}
