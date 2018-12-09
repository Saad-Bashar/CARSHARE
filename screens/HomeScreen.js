import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image
} from 'react-native';
import { MapView } from 'expo';

let { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 6 
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 4.2105,
        longitude: 101.9758,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },  
    }
  }

  onRegionChange = (region) => {
    this.setState({ region });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={{ flex: 1 }}
          region={this.state.region}
          // onRegionChange={this.onRegionChange}
        >
          <MapView.Marker
            coordinate={{ latitude: 4.2105, longitude: 101.9758 }}
            title={"Malaysia"}
            description={"So car is amazing!"}
          >
            <Image
              source={require('../assets/images/logo.png')}
              style={{height: 40, width: 40}}
            />
          </MapView.Marker>
          <MapView.Marker
            coordinate={{ latitude: 3.1390, longitude: 101.6869 }}
            title={"Kuala Lumpur"}
            description={"So car is amazing!"}
          > 
            <Image
              source={require('../assets/images/marker.png')}
              style={{height: 30, width: 30}}
            />
          </MapView.Marker>
          <MapView.Marker
            coordinate={{ latitude: 5.4164 , longitude: 100.3327 }}
            title={"Penang"}
            description={"So car is amazing!"}
          />
        </MapView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
