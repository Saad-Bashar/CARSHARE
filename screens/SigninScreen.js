import React, { Component } from 'react';
import { View, ActivityIndicator, Image, KeyboardAvoidingView } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Button } from 'react-native-elements'
import { connect } from 'react-redux';
import { loginUser } from '../actions/Auth';
import { showMessage } from "react-native-flash-message";


class SigninScreen extends Component {
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

    const pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const result  = pattern.test(email);

    if(!email || !result) this.setState({ emailError: 'Inavlid Email'});
    if(!password) this.setState({ passwordError: 'Password is required '});

    if(email && password && result) {
      this.props.loginUser(email, password);
    }
  }

  renderButton = () => {
    if (this.props.loading) {
      return <ActivityIndicator size="large" color="#0000ff" />
    }
    return (
      <Button
        style={{ marginTop: 35, width: 200, alignSelf: 'center' }}
        large={false}
        title="Login"
        onPress={this.onPress}
        borderRadius={5}
        fontSize={14}
        backgroundColor="#02d5ff"
      />
    );
  }

  render() {
    const { email, password, emailError, passwordError } = this.state;
    if(this.props.error) {
      showMessage({
        message: this.props.error,
        type: "danger",
      });
    }
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
          autoCorrect={false}
          autoCapitalize={'none'}
          onChangeText={ (email) => this.setState({ email }) }
          error={emailError}
          onFocus={() => emailError && this.setState({ emailError: '' })}
        />
        <TextField
          label='Password'
          secureTextEntry
          value={password}
          onChangeText={ (password) => this.setState({ password }) }
          error={passwordError}
          onFocus={() => passwordError && this.setState({ passwordError: '' })}
        />
        {this.renderButton()}
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  };
};

export default connect(mapStateToProps, { loginUser })(SigninScreen);
