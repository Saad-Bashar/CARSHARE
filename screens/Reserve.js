import React, { Component } from 'react';
import { View, Alert, KeyboardAvoidingView, StyleSheet, TextInput, Modal,  Keyboard } from 'react-native';
import { Button } from 'react-native-elements';
import { showMessage } from "react-native-flash-message";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { withFirebase } from 'react-redux-firebase'

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
    paddingHorizontal: 10, 
    paddingTop: 15, 
    backgroundColor: '#fff'
  }
})

@withFirebase
export default class Reserve extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickupPoint: '',
      dropoffPoint: '',
      showMessage: false,
      modalVisible: false,
      isFrom: null,
      hours: '',
      isDateTimePickerVisible: false,
    };
  }

  updateFirebase = (data) => {
    const { firebase } = this.props;
    firebase.database().ref('/Reservations').push(data, function(error) {
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
      <KeyboardAvoidingView 
        behavior="padding" 
        enabled 
        style={styles.container}
      >
        <TextInput
          style={{ }}
          placeholder="From *"
          onFocus={() => {this.setState({ modalVisible: true, isFrom: true })}}
          value={this.state.pickupPoint.description}
          style={styles.textInput}
        />
        <TextInput
          style={styles.textInput}
          placeholder="To *"
          onFocus={() => {this.setState({ modalVisible: true, isFrom: false })}}
          value={this.state.dropoffPoint.description}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({ hours: text })}
          placeholder="Hours *"
          value={this.state.hours}
          keyboardType={'numeric'}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Select your pickup time *"
          onFocus={this._showDateTimePicker}
          value={this.state.pickuptime}
          returnKeyType={"none"}
        />
        <Button
          small
          borderRadius={5}
          fontSize={18}
          width={200}
          backgroundColor="#02d5ff"
          title='Reserve' 
          onPress={this.onPress}
          value={this.state.dropoffPoint.description}
        />
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
            Alert.alert('Modal has been closed.');
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
    );
  }
}
