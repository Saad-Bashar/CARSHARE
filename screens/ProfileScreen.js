import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { createFirebaseConnect, firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux'



class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  render() {
    return (
      <ScrollView>
      </ScrollView>
    );
  }
}

export default compose(
  firebaseConnect((props) => {
    return [
      'users'
    ]
  }),
  connect(
    (state) => ({
      // todos: state.firebase.data.todos,
      // profile: state.firebase.profile // load profile
    })
  )
)(ProfileScreen)
