import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import firebase from 'firebase';

export default class StartingScreen extends Component {
  componentWillMount () {
    const { navigation } = this.props;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        navigation.navigate('Main')
      } else {
        // No user is signed in.
        navigation.navigate('Auth')
      }
    });
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
}

