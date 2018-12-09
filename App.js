import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import ConfigureStore from './ConfigureStore'
import FlashMessage from "react-native-flash-message";


console.disableYellowBox = true;

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    rehydrated: false,
    authReady: false,
  };

  store;

  componentWillMount() {
    this.store = ConfigureStore(
      () => this.setState({ rehydrated: true }),
      () => this.setState({ authReady: true })
    );
  }

  render() {
    if ((!this.state.isLoadingComplete && !this.props.skipLoadingScreen) 
      || (!this.state.authReady && !this.state.rehydrated)) {
        return (
          <AppLoading
            startAsync={this._loadResourcesAsync}
            onError={this._handleLoadingError}
            onFinish={this._handleFinishLoading}
          />
      );
    } 
    return (
      <Provider store={this.store}>
        <View style={{ flex: 1 }}>
          <AppNavigator />
          <FlashMessage position="top" />
        </View> 
      </Provider>
    );
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        ...Icon.Ionicons.font,
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
