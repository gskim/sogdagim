const withCss = require("@zeit/next-css")
const withLess = require("@zeit/next-less")
const path = require("path")
const Dotenv = require('dotenv-webpack')

if (typeof require !== "undefined") {
	require.extensions[".less"] = (file) => { }
}

module.exports = withCss(
	withLess({
		lessLoaderOptions: {
			javascriptEnabled: true,
			// modifyVars: themeVariables // make your antd custom effective
		},
		webpack: (config, { isServer }) => {
			config.optimization.minimize = false
			config.plugins = config.plugins || []
			config.plugins = [
				...config.plugins,
				// Read the .env file
				new Dotenv({
					path: path.join(__dirname, '.env'),
					systemvars: true
				})
			]

			config.resolve.alias = {
                ...config.resolve.alias,
				"class-transformer": path.resolve(__dirname, "node_modules/@sogdagim/model/node_modules/class-transformer"),
				"class-validator": path.resolve(__dirname, "node_modules/@sogdagim/model/node_modules/class-validator"),
				"@sogdagim/model": path.resolve(__dirname, "node_modules/@sogdagim/model/dist"),
			}

			if (isServer) {
				const antStyles = /antd\/.*?\/style.*?/
				const origExternals = [...config.externals]
				config.externals = [
					(context, request, callback) => {
						if (request.match(antStyles)) return callback()
						if (typeof origExternals[0] === "function") {
							origExternals[0](context, request, callback)
						} else {
							callback()
						}
					},
					...(typeof origExternals[0] === "function" ? [] : origExternals)
				]

				config.module.rules.unshift({
					test: antStyles,
					use: "null-loader"
				})
			}
			return config
		}
	})
)
