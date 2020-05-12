const path = require('path');
const createExpoWebpackConfigAsync = require('@expo/webpack-config');
// eslint-disable-next-line import/no-extraneous-dependencies
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

const node_modules = path.resolve(__dirname, 'node_modules');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

//   config.context = path.resolve(__dirname, '..');

  config.module.rules.push({
    test: /\.(js|ts|tsx)$/,
    include: /\/.+/,
    exclude: /node_modules/,
    use: 'babel-loader',
  });

  config.resolve.plugins = config.resolve.plugins.filter(
    (p) => !(p instanceof ModuleScopePlugin)
  );

  Object.assign(config.resolve.alias, {
    'react': path.resolve(node_modules, 'react'),
    'react-native': path.resolve(node_modules, 'react-native-web'),
    'react-native-web': path.resolve(node_modules, 'react-native-web'),
    '@expo/vector-icons': path.resolve(node_modules, '@expo/vector-icons'),
  });
  return config;
};
