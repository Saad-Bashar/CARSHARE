import React, { Component } from 'react';
import { View, Alert, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import t from 'tcomb-form-native';
import { showMessage } from "react-native-flash-message";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import moment from 'moment';

var _ = require('lodash');

const homePlace = { 
  description: 'Home', 
  geometry: { location: { lat: 4.2105, lng: 101.9758 } 
}};

const workPlace = { 
  description: 'Work', 
  geometry: { location: { lat: 4.2106, lng: 101.9756 } 
}};


const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

stylesheet.textbox.normal.width = 300;
stylesheet.controlLabel.normal.color = "#1faadb";

let Form = t.form.Form;

var Reservation = t.struct({
  hours: t.String,
  pickuptime: t.Date, 
});

const options = {
  auto: 'placeholders',
  fields: {
    pickuptime: {
      label: 'Pickup Time',
      mode: 'date',
    },
  },
};

class Reserve extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickupPoint: '',
      dropoffPoint: '',
      showMessage: false
    };
  }

  updateFirebase = (data) => {
    const { firebase, navigation } = this.props;
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

    navigation.goBack();
  }

  onPress = () => {
    const { pickupPoint, dropoffPoint } = this.state;
    const { navigation } = this.props;
    const item = navigation.getParam('item', 'car');
    const model = item[1].Model;
  
    if(pickupPoint && dropoffPoint) {
      const value = this.refs.form.getValue();
      if(value) {
        let data = value;
        data = Object.assign({ 
          pickupPoint, 
          dropoffPoint,
          model,
          isActive: true,
          isComplete: false,
          time: data.pickuptime.toString()
        }, data);

        this.updateFirebase(data);
      }
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

  onPickupPoint = (data) => {
    this.setState({
      pickupPoint: data
    })
  }

  onDropoffPoint = (data) => {
    this.setState({
      dropoffPoint: data
    })
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, paddingHorizontal: 10, paddingTop: 15, backgroundColor: '#fff' }}>
        <GooglePlacesAutocomplete
          placeholder='Pickup point'
          minLength={2} 
          autoFocus={false}
          returnKeyType={'search'}
          listViewDisplayed='true'  
          fetchDetails={true}
          renderDescription={row => row.description} 
          onPress={this.onPickupPoint}
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
        <GooglePlacesAutocomplete
          placeholder='Dropoff point'
          minLength={2} 
          autoFocus={false}
          returnKeyType={'search'}
          listViewDisplayed='true' 
          fetchDetails={true}
          renderDescription={row => row.description} 
          onPress={this.onDropoffPoint}
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
            },
            
          }}
        />
        <View style={{ flex: 2 }}>
          <Form ref="form" type={Reservation} options={options}  />
          <Button
            small
            borderRadius={5}
            fontSize={18}
            backgroundColor="#02d5ff"
            title='Reserve' 
            onPress={this.onPress}  
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default compose(
  firebaseConnect(() => {
    return [
      'Cars'
    ]
  }),
  connect(
    (state) => {
      return {
        cars: state.firebase.data.Cars
      }
    } 
  )
)(Reserve)

