import React, { Component } from 'react';
import { View, Alert, Text, KeyboardAvoidingView, TouchableOpacity, StyleSheet, TextInput, Modal, ImageBackground,  Keyboard } from 'react-native';
import { Button } from 'react-native-elements';
import { showMessage } from "react-native-flash-message";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DateTimePicker from 'react-native-modal-datetime-picker';
import NumericInput from 'react-native-numeric-input';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';



const homePlace = { 
  description: 'Home', 
  geometry: { location: { lat: 4.2105, lng: 101.9758 } 
}};

const workPlace = { 
  description: 'Work', 
  geometry: { location: { lat: 4.2106, lng: 101.9756 } 
}};

const styles = StyleSheet.create({
  textInput: {
    height: 40, 
    marginBottom: 15, 
    borderColor: 'gray', 
    borderWidth: 1, 
    padding: 10, 
    borderRadius: 5 
  },
  container: {
    flex: 1, 
    paddingHorizontal: 25, 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  inputWrapper: {
    flexDirection: 'row',
    paddingBottom: 30
  },
  input: {
    flex: 1, 
    color: '#fff', 
    borderBottomColor: '#fff', 
    borderBottomWidth: 1, 
    paddingLeft: 30, 
    padding:10
  },
  icon: {
    alignSelf: 'center', 
    left: 20, 
    width: 15, 
    height: 15
  }
})


class Reserve extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      pickupPoint: '',
      dropoffPoint: '',
      showMessage: false,
      modalVisible: false,
      isFrom: null,
      hours: 1,
      isDateTimePickerVisible: false,
    };
  }

  updateFirebase = (data) => {
    const { firebase, auth } = this.props;
    const uid = auth.uid;
    firebase.database().ref(`/Reservations/${uid}`).push(data, function(error) {
      if (error) {
        showMessage({
          message: "Something went wrong!",
          type: "danger",
        });
      } else {
        showMessage({
          message: "Reservation Completed!",
          type: "success",
        });
      }
    });

    this.setState({ 
      pickupPoint: '', 
      dropoffPoint: '', 
      hours: '', 
      pickuptime: ''
    })
  }

  onPress = () => {
    const { pickupPoint, dropoffPoint, hours, pickuptime } = this.state;
    const { navigation } = this.props;
    const item = navigation.getParam('item', 'car');
    const model = item[1].Model;
  
    if(pickupPoint && dropoffPoint && hours && pickuptime) {
      let data;
      data = Object.assign({
        pickupPoint,
        dropoffPoint,
        pickuptime,
        hours,
        model,
        isActive: true,
        isComplete: false
      }, data)
      
      this.updateFirebase(data);
      this.props.navigation.goBack();
    } else {
      Alert.alert(
        'Oops',
        'All the fields are required',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }    
  }

  _showDateTimePicker = () => { Keyboard.dismiss(); this.setState({ isDateTimePickerVisible: true });}

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    this.setState({ pickuptime: date.toString() })
    this._hideDateTimePicker();
  };

  onSetLocation = (data) => {
    const { isFrom, modalVisible } = this.state;
    if(isFrom) this.setState({ pickupPoint: data, modalVisible: !modalVisible });
    else this.setState({ dropoffPoint: data, modalVisible: !modalVisible });
  }

  render() {
    return (
      <ImageBackground
        source={require('../assets/images/bgBlue.png')}
        style={{width: '100%', height: '100%'}}
      >
        <TouchableOpacity 
          onPress={() => this.props.navigation.goBack()} 
          style={{ position: 'absolute', zIndex: 4, top: 35, padding: 20}}
        >
          <Ionicons name="ios-arrow-back" size={30} color="#fff"/>
        </TouchableOpacity>

        <KeyboardAvoidingView 
          behavior="padding" 
          enabled 
          style={styles.container}
        >
          <MaterialCommunityIcons 
            style={{ alignSelf: 'center' }} 
            name="car-sports" size={80} 
            color="#fff"
          />
          <View style={styles.inputWrapper}>
            <FontAwesome 
              style={{ left: 20, alignSelf: 'center' }} 
              name="map-marker" 
              size={18} 
              color="#fff"
            />
            <TextInput
              style={styles.input}
              placeholder={'From *'}
              placeholderTextColor="#fff"
              selectionColor="#fff"
              onFocus={() => {this.setState({ modalVisible: true, isFrom: true })}}
              value={this.state.pickupPoint.description}
            />
          </View>
          <View style={styles.inputWrapper}>
            <FontAwesome 
              style={{ left: 20, alignSelf: 'center' }} 
              name="map-marker" size={18} 
              color="#fff"
            />
            <TextInput
              style={styles.input}
              placeholder={'To *'}
              placeholderTextColor="#fff"
              selectionColor="#fff"
              onFocus={() => {this.setState({ modalVisible: true, isFrom: false })}}
              value={this.state.dropoffPoint.description}
            />
          </View>
          <View style={styles.inputWrapper}>
            <FontAwesome 
              style={{ left: 20, alignSelf: 'center' }} 
              name="clock-o" 
              size={18} 
              color="#fff" 
            />
            <TextInput
              style={styles.input}
              placeholder="Select your pickup time *"
              onFocus={this._showDateTimePicker}
              value={this.state.pickuptime}
              returnKeyType={"none"}
              placeholderTextColor="#fff"
              selectionColor="#fff"
            />
          </View>
          <View style={{ padding: 8 }}>
            <Text style={{ color: '#fff' }}>Hours *</Text>
            <NumericInput
              initValue={this.state.hours}
              value={this.state.hours} 
              onChange={hours => this.setState({hours})} 
              totalWidth={200} 
              totalHeight={50} 
              iconSize={25}
              minValue={1}
              valueType='real'
              rounded 
              textColor="#fff"
              borderColor="#fff"
              iconStyle={{ color: '#02d5ff' }} 
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <Button
              buttonStyle={{
                backgroundColor: "#fff",
                width: 200,
                alignSelf: 'center',
                borderColor: "#fff",
                borderWidth: 0,
                borderRadius: 5
              }}
              color="#02d5ff"
              fontSize={18}
              title='Reserve' 
              onPress={this.onPress}
            />
          </View>
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            mode="datetime"
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
          />
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              console.log('Modal has been closed.');
            }}>
            <View style={{ flex: 1, marginTop: 30 }}>
              <GooglePlacesAutocomplete
                placeholder={this.state.isFrom ? 'Select your pickup location' : 'Select your dropoff location'}
                minLength={2} 
                autoFocus={true} 
                returnKeyType={'search'}
                listViewDisplayed='true'  
                fetchDetails={true}
                renderDescription={row => row.description} 
                onPress={this.onSetLocation}
                getDefaultValue={() => ''}
                query={{
                  key: 'AIzaSyCoILimFA-jNjmsBHy8Vhe2tubGdL1ehx4',
                  language: 'en', 
                  types: '(cities)' 
                }}
                currentLocation={true} 
                currentLocationLabel="Current location"
                predefinedPlaces={[homePlace, workPlace]}
                debounce={200} 
                styles={{
                  textInputContainer: {
                    width: '100%',
                  },
                  description: {
                    fontWeight: 'bold'
                  },
                  predefinedPlacesDescription: {
                    color: '#1faadb'
                  }
                }}
              />
              </View>
          </Modal>
        </KeyboardAvoidingView>

      </ImageBackground>
      
    );
  }
}

export default compose(
  firebaseConnect(() => {
  }),
  connect(
    (state) => {
      return {
        auth: state.firebase.auth
      }
    } 
  )
)(Reserve)