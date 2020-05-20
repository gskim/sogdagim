const path = require('path');
const node_modules = path.resolve(__dirname, 'node_modules');
const frameworkAlias = {
  '@eva-design/dss': path.resolve(node_modules, '@eva-design/dss'),
  '@eva-design/eva': path.resolve(node_modules, '@eva-design/eva'),
  '@eva-design/material': path.resolve(node_modules, '@eva-design/material'),
  '@eva-design/processor': path.resolve(node_modules, '@eva-design/processor'),
  '@ui-kitten/components': path.resolve(node_modules, '@ui-kitten/components'),
  '@ui-kitten/date-fns': path.resolve(node_modules, '@ui-kitten/date-fns'),
  '@ui-kitten/eva-icons': path.resolve(node_modules, '@ui-kitten/eva-icons'),
  '@ui-kitten/moment': path.resolve(node_modules, '@ui-kitten/moment'),
};

const frameworkInternalAlias = {
  '@kitten/theme': path.resolve(node_modules, '@ui-kitten/components/theme'),
  // '@kitten/ui': path.resolve(node_modules, '@ui-kitten/components/ui'),
};

const moduleResolverConfig = {
  root: path.resolve('./'),
  alias: {
    ...frameworkAlias,
    ...frameworkInternalAlias,
  },
};

module.exports = function(api) {
  api.cache(true);
  const presets = [
    'babel-preset-expo',
  ];
  const plugins = [
    // 'react-native-paper/babel',
    ['module-resolver', moduleResolverConfig],
  ];

  return { presets, plugins };
  // return {
  //   presets: ['babel-preset-expo'],
  //   env: {
  //     production: {
  //       plugins: ['react-native-paper/babel'],
  //     },
  //   },
  // };
};
