import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


const homePlace = { 
  description: 'Home', 
  geometry: { location: { lat: 4.2105, lng: 101.9758 } 
}};

const workPlace = { 
  description: 'Work', 
  geometry: { location: { lat: 4.2106, lng: 101.9756 } 
}};

export default class AutoPlaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
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
    );
  }
}
