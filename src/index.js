/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
// import {name as appName} from '../app.json';

// AppRegistry.registerComponent(appName, () => App);

AppRegistry.registerComponent('App', () => App);
AppRegistry.runApplication('App', {
  rootTag: document.getElementById('root'),
});

// TODO Uzywaj komendy
// ./node_modules/.bin/webpack-dev-server --config ./web/webpack.config.js
