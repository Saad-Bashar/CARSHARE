import React, { Component } from 'react';
import { View, ActivityIndicator, Image, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Button } from 'react-native-elements'
import { connect } from 'react-redux';
import { loginUser } from '../actions/Auth';
import { showMessage } from "react-native-flash-message";
import colors from '../constants/Colors';


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 25, 
    backgroundColor: '#fff'
  },
  imageWrapper: {
    marginTop: 40, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
})

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

    let cleanedEmail = email.trim();

    const pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const result  = pattern.test(cleanedEmail);

    if(!cleanedEmail || !result) this.setState({ emailError: 'Inavlid Email'});
    if(!password) this.setState({ passwordError: 'Password is required '});

    if(cleanedEmail && password && result) {
      this.props.loginUser(cleanedEmail, password);
    }
  }

  renderButton = () => {
    if (this.props.loading) {
      return <ActivityIndicator size="large" color="#0000ff" />
    }
    return (
      <Button
        style={{ width: 200, alignSelf: 'center' }}
        large={false}
        title="Login"
        onPress={this.onPress}
        borderRadius={5}
        fontSize={14}
        backgroundColor={colors.primaryColor}
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
      <KeyboardAvoidingView 
        behavior="padding" 
        enabled 
        style={styles.container}
      >
        <View style={styles.imageWrapper}>
          <Image 
            source={require('../assets/images/logo.png')} 
            style={{ width: 150, height: 150 }}
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
          style={{ marginBottom: 40 }}
        />
        <View style={{ top: 25 }}>
          {this.renderButton()}        
        </View>
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
