module.exports = {
	presets: [
		'babel-preset-expo',
		'@expo/next-adapter/babel',
		[
			"@babel/preset-env",
			{
			  targets: {
				browsers: ["> 1%", "last 2 versions", "not ie <= 10"]
			  },
			  useBuiltIns: "entry",
			  corejs: "2.0"
			}
		]
	],
	plugins: [
		"react-native-paper/babel",
		"transform-class-properties",
		[
			"module-resolver",
			{
				"root": ["./"],
				"alias": {
					"react-native$": "react-native-web",
					"@src": "./src"
				}
			}
		],
		"@babel/plugin-proposal-class-properties",
		["@babel/plugin-proposal-decorators", { "legacy": true }],
		["@babel/plugin-proposal-optional-chaining"],
		["inline-dotenv", { "path": ".env" }],
		[
			"babel-plugin-styled-components",
			{
				"ssr": true,
				"displayName": true,
				"preprocess": false
			}
		],
	],
	sourceMap: true
}
