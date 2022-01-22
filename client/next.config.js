module.exports = {
	webpackDevMiddleware: (config) => {
		config.watchOptions.poll = {
			poll: 1000,
			aggregateTimeout: 300,
		};
		return config;
	},
};
