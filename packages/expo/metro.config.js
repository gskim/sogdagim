const path = require('path');
const node_modules = path.resolve(__dirname, 'node_modules');
const appModules = [
  path.resolve(node_modules, '@eva-design/dss'),
  path.resolve(node_modules, '@eva-design/eva'),
  path.resolve(node_modules, '@eva-design/material'),
  path.resolve(node_modules, '@eva-design/processor'),
  path.resolve(node_modules, '@ui-kitten/components'),
  path.resolve(node_modules, '@ui-kitten/date-fns'),
  path.resolve(node_modules, '@ui-kitten/eva-icons'),
  path.resolve(node_modules, '@ui-kitten/moment'),
];

const extraNodeModules = {
  '@babel/runtime': path.resolve(node_modules, '@babel/runtime'),
  'react': path.resolve(node_modules, 'react'),
  'react-native': path.resolve(node_modules, 'react-native'),

  // @ui-kitten/components
  'fecha': path.resolve(node_modules, 'fecha'),
  'hoist-non-react-statics': path.resolve(node_modules, './node_modules/hoist-non-react-statics'),
  'lodash.merge': path.resolve(node_modules, 'lodash.merge'),
  'react-native-svg': path.resolve(node_modules, '.react-native-svg'),

  // @ui-kitten/date-fns
  'date-fns': path.resolve(node_modules, 'date-fns'),

  // @ui-kitten/eva-icons
  'react-native-eva-icons': path.resolve(node_modules, 'react-native-eva-icons'),

  // @ui-kitten/moment
  'moment': path.resolve(node_modules, 'moment'),
  'react-is': path.resolve(node_modules, 'react-is'),
};

module.exports = {
  projectRoot: path.resolve(__dirname),
  resolver: { extraNodeModules },
  watchFolders: appModules,
};


// /**
//  * Metro configuration for React Native
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// const MetroConfig = require('@ui-kitten/metro-config');

// /**
//  * @see https://akveo.github.io/react-native-ui-kitten/docs/guides/improving-performance
//  */
// const evaConfig = {
//   evaPackage: '@eva-design/eva',
// };

// module.exports = MetroConfig.create(evaConfig, {
//   transformer: {
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: false,
//       },
//     }),
//   },
// });
