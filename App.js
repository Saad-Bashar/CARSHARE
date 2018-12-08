import React from 'react';
import { Provider } from 'react-redux';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import ConfigureStore from './ConfigureStore'
import firebase from 'firebase'

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

    firebase.database().ref('users/' + '1234567').set({
      highscore: 100
    });

  //   // Listen for authentication state to change.
  // firebase.auth().onAuthStateChanged((user) => {
  //   if (user != null) {
  //     console.log("We are authenticated now!");
  //   } else {
  //     console.log("We are not authenticated now!");
  //   }

  //   // Do other things
  // });
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

    console.log('store ', this.store.getState())

    return (
      <Provider store={this.store}>
        <AppNavigator />
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
