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
const LATITUDE_DELTA = 5
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
      {/* Just for Demo Purpose */}
        <MapView
          style={{ flex: 1 }}
          region={this.state.region}
        >
          <MapView.Marker
            coordinate={{ latitude: 4.2105, longitude: 101.9758 }}
            title={"Malaysia"}
            description={"Mini Cooper"}
          >
            <Image
              source={{uri: "https://cdn2.iconfinder.com/data/icons/auto-cars/154/sport-car-coupe-auto-top-view-512.png"}}
              style={{height: 30, width: 30}}
            />
          </MapView.Marker>
          <MapView.Marker
            coordinate={{ latitude: 3.1390, longitude: 101.6869 }}
            title={"Kuala Lumpur"}
            description={"Toyota"}
          > 
            <Image
              source={{uri: "https://cdn2.iconfinder.com/data/icons/auto-cars/154/sport-car-coupe-auto-top-view-512.png"}}
              style={{height: 30, width: 30}}
            />
          </MapView.Marker>
          <MapView.Marker
            coordinate={{ latitude: 3.0684, longitude: 101.6856 }}
            title={"Batu Caves"}
            description={"Mercedes"}
          > 
            <Image
              source={{uri: "https://cdn2.iconfinder.com/data/icons/auto-cars/154/sport-car-coupe-auto-top-view-512.png"}}
              style={{height: 30, width: 30}}
            />
          </MapView.Marker>
          <MapView.Marker
            coordinate={{ latitude: 3.2379, longitude: 101.6840 }}
            title={"Kuala Lumpur"}
            description={"Audi"}
          > 
            <Image
              source={{uri: "https://cdn2.iconfinder.com/data/icons/auto-cars/154/sport-car-coupe-auto-top-view-512.png"}}
              style={{height: 30, width: 30}}
            />
          </MapView.Marker>
          <MapView.Marker
            coordinate={{ latitude: 3.8126, longitude: 103.3256 }}
            title={"Pahang"}
            description={"Mini Cooper"}
          > 
            <Image
              source={{uri: "https://cdn2.iconfinder.com/data/icons/auto-cars/154/sport-car-coupe-auto-top-view-512.png"}}
              style={{height: 30, width: 30}}
            />
          </MapView.Marker>
          <MapView.Marker
            coordinate={{ latitude: 4.5921, longitude: 101.0901 }}
            title={"Perak"}
            description={"Audi"}
          > 
            <Image
              source={{uri: "https://cdn2.iconfinder.com/data/icons/auto-cars/154/sport-car-coupe-auto-top-view-512.png"}}
              style={{height: 30, width: 30}}
            />
          </MapView.Marker>
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
