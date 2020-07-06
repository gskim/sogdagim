import { AppRegistry, Platform } from 'react-native'
import { registerRootComponent } from 'expo'
import App from './src/index';

// AppRegistry.registerComponent('Sogdagim', () => App);
registerRootComponent(App)

if (Platform.OS === 'web') {
	console.log('web')
  const rootTag = document.getElementById('root') || document.getElementById('main');
  AppRegistry.runApplication('Sogdagim', { rootTag });
}
