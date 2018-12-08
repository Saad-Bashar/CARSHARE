import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import t from 'tcomb-form-native';
var _ = require('lodash');
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};




// clone the default stylesheet
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

// overriding the text color
stylesheet.textbox.normal.width = 300;

let Form = t.form.Form;

// here we are: define your domain model
var Person = t.struct({
  from: t.String, 
  to: t.String,
  
});


const options = {
  fields: {
    from: {
      stylesheet: stylesheet // overriding the style of the textbox
    },
    to: {
      stylesheet: stylesheet // overriding the style of the textbox
    }
  }
};




export default class Reserve extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onPress = () => {
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      console.log(value); // value here is an instance of Person
    }
  }

  render() {
    return (
      <View style={{ flex: 1, paddingTop: 20, alignItems: 'center', backgroundColor: '#fff' }}>
        <GooglePlacesAutocomplete
          placeholder='Search'
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          listViewDisplayed='auto'    // true/false/undefined
          fetchDetails={true}
          renderDescription={row => row.description} // custom description render
          onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          
          getDefaultValue={() => ''}
          
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: 'AIzaSyCoILimFA-jNjmsBHy8Vhe2tubGdL1ehx4',
            language: 'en', // language of the results
            types: '(cities)' // default: 'geocode'
          }}
          
          styles={{
            textInputContainer: {
              width: '100%'
            },
            description: {
              fontWeight: 'bold'
            },
            predefinedPlacesDescription: {
              color: '#1faadb'
            }
          }}
          
        />
        <Form style={{ width: '100%' }} ref="form" type={Person} options={options} />
        <TouchableOpacity onPress={this.onPress} underlayColor='#99d9f4'>
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
