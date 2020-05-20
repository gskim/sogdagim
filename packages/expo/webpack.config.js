const path = require('path');
const createExpoWebpackConfigAsync = require('@expo/webpack-config');
// eslint-disable-next-line import/no-extraneous-dependencies
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

const node_modules = path.resolve(__dirname, 'node_modules');
const babelLoaderRules = {
  test: /\.(js|ts|tsx)$/,
  loader: 'babel-loader',
  include: __dirname + "/",
  exclude: /node_modules/,
};

const extraModules = {
  'react': path.resolve(node_modules, 'react'),
  'react-native': path.resolve(node_modules, 'react-native-web'),
  'react-native-web': path.resolve(node_modules, 'react-native-web'),
  '@expo/vector-icons': path.resolve(node_modules, '@expo/vector-icons'),
  '@babel/runtime': path.resolve(node_modules, '@babel/runtime'),
};

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync({
    ...env,
    babel: {
        dangerouslyAddModulePathsToTranspile: ['@ui-kitten/components']
    }
}, argv);

  config.module.rules = [
    ...config.module.rules,
    babelLoaderRules,
  ];

  config.module.rules.push({
    test: /\.(js|ts|tsx)$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
  });

  config.resolve.alias = {
    ...config.resolve.alias,
    ...extraModules,
  };

  config.resolve.plugins = config.resolve.plugins.filter(
    (p) => !(p instanceof ModuleScopePlugin)
  );

  config.output = {
    ...config.output,
    publicPath: '',
  };
  return config;
};
