const log4js = require('log4js');
const path = require('path');

const rootDirectory = path.resolve(__dirname, '../../');

log4js.configure({
	appenders: {
		error: {
			type: 'file',
			category: 'errLogger',
			filename: `${rootDirectory}/log/error.log`,
			maxLogSize: 102400,
			backups: 100,
		},
		response: {
			type: 'dateFile',
			category: 'resLogger',
			filename: `${rootDirectory}/log/response`,
			pattern: 'yyyy-MM-dd.log',
			alwaysIncludePattern: true,
			maxLogSize: 102400,
			backups: 100,
		}
	},
	categories: {
		error: { appenders: ['error'], level: 'error' },
		response: { appenders: ['response'], level: 'info' },
		default: { appenders: ['response'], level: 'info' },
	},
	replaceConsole: true,
});

const formatError = (ctx, err, costTime) => {
	const { method, url } = ctx;
	const [ body, userAgent ] = [ ctx.request.body, ctx.header.userAgent ];
	return { method, url, body, costTime, err };
}

const formatResponse = (ctx, costTime) => {
	const { method, url } = ctx;
	const [ body, response ] = [ ctx.request.body, ctx.response ];
	return { method, url, body, costTime, response };
}

const logger = {};

const [ errorLogger, responseLogger ] = [ log4js.getLogger('error'), log4js.getLogger('response') ];

logger.errorLogger = (ctx, error, resTime) => {
	if (ctx && error) {
		errorLogger.error(formatError(ctx, error, resTime));
	}
}

logger.responseLogger = (ctx, resTime) => {
	if(ctx) {
		responseLogger.info(formatResponse(ctx, resTime));
	}
}

module.exports = logger;