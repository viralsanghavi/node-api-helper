# Logger
This is a logger package that will help us log events right from our lambda
to Cloudwatch.

By default, the following log levels are present:
```
"fatal" (60): The service/app is going to stop or become unusable now. An operator should definitely look into this soon.
"error" (50): Fatal for a particular request, but the service/app continues servicing other requests. An operator should look at this soon(ish).
"warn" (40): A note on something that should probably be looked at by an operator eventually.
"info" (30): Detail on regular operation.
"debug" (20): Anything else, i.e. too verbose to be included in "info" level.
"trace" (10): Logging from external libraries used by your app or very detailed application logging.
```

###Steps to use
1. Import this package and call the constructor:
`const { logger } = new Logger('info')`
2. Use the appropriate function of the logger to flush the event:
`logger.info({ body: "Whatever you want to log" }, "This is the message that will be logged.");`
3. One thing to note is that the first argument will always need to be an object with the key `body`. If an error needs
to be logged then just send the `error` object as the first parameter.

### Examples
```javascript
logger.info({ body: "Whatever you want to log" }, "This is the message that will be logged.");
```
```javascript
try {
    throw new Error("Some error.")
} catch (error) {
    logger.info(error, "This is the message that will be logged.");
}
```
