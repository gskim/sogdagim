const path = require('path');

console.log(path.resolve(__dirname, '../node_modules/react-native-ui-kitten'), 'path.resolve(__dirname, \'../node_modules/react-native-ui-kitten\')')
module.exports = {
  ENV: 'prod',
  KITTEN_PATH: path.resolve(__dirname, '../node_modules/react-native-ui-kitten'),
  MAPPING_PATH: path.resolve(__dirname, '../node_modules/@eva-design/eva'),
  PROCESSOR_PATH: path.resolve(__dirname, '../node_modules/@eva-design/processor'),
};
