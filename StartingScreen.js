import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import firebase from 'firebase';

export default class StartingScreen extends Component {
  constructor(props) {
    super(props);
    this.checkAuth();
  }

  checkAuth = () => {
    const user = firebase.auth().currentUser;
    if (user) {
      this.props.navigation.navigate('Main');
    } else {
      this.props.navigation.navigate('Auth');
    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
}
