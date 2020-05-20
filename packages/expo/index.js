import { AppRegistry, Platform } from 'react-native';
import App from './src/index';

AppRegistry.registerComponent('Sogdagim', () => App);

if (Platform.OS === 'web') {
	console.log('web')
  const rootTag = document.getElementById('root') || document.getElementById('main');
  AppRegistry.runApplication('Sogdagim', { rootTag });
}
