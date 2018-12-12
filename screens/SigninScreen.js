import React, { Component } from 'react';
import { View, Text, Image, KeyboardAvoidingView } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Button } from 'react-native-elements'

export default class SigninScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  onPress = () => {
    const { email, password } = this.state;

    if(!email) this.setState({ emailError: 'Email is required '});
    if(!password) this.setState({ passwordError: 'Password is required '});

    if(email && password) {

    }
  }

  render() {
    const { email, password, emailError, passwordError } = this.state
    return (
      <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, padding: 25, backgroundColor: '#fff' }}>
        <View style={{ marginTop: 40, justifyContent: 'center', alignItems: 'center' }}>
          <Image 
            source={require('../assets/images/logo.png')} 
            style={{width: 150, height: 150}}
            resizeMode="contain"
          />
        </View>
        <TextField
          label='Email'
          value={email}
          onChangeText={ (email) => this.setState({ email }) }
          error={emailError}
          onFocus={() => emailError && this.setState({ emailError: '' })}
        />
        <TextField
          label='Password'
          value={password}
          onChangeText={ (password) => this.setState({ password }) }
          error={passwordError}
          onFocus={() => passwordError && this.setState({ passwordError: '' })}
        />
        <Button
          style={{ marginTop: 20, width: 200, alignSelf: 'center' }}
          large={false}
          title="Login"
          onPress={this.onPress}
          borderRadius={5}
          fontSize={14}
          backgroundColor="#02d5ff"
        />
      </KeyboardAvoidingView>
    );
  }
}
