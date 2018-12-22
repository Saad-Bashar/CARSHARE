import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator, 
  ImageBackground,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux'
import { Card, Button } from 'react-native-elements';
import CarList from './CarList'
import { MonoText } from '../components/StyledText'
import colors from '../constants/Colors'
import CarListWithoutAnimation from './CarListWithoutAnimation';
import { FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  }
});


class Cars extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      swipeList: false
    }
  }
  

  renderCard = (item) => {
    return (
      <Card
          containerStyle={{ elevation: 3, borderRadius: 5 }}
          key={item[0]}
          image={{ uri: item[1].image }}
        >
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}> 
          <Text style={{ fontSize:16, fontWeight:'bold', color:'#57c1be', marginBottom:10, }}>
            {item[1].Model}
          </Text>       
          <View>
            <View style={{ flexDirection: 'row' }}>
              <Ionicons name="ios-calendar" size={14} color="#4E7094"/>
              <Text style={{ fontSize:12 }}> Year - {item[1].Year}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <MaterialCommunityIcons  
                name="map-marker-distance" 
                color="#4E7094" 
                size={14}
              />
              <Text style={{ fontSize:12 }}> Mileage - {item[1].Mileage}</Text>  
            </View>
            <View style={{ flexDirection: 'row' }}>
              <MaterialIcons  
                name="autorenew" 
                color="#4E7094" 
                size={14}
              />
              <Text style={{ fontSize:12 }}> Transmission - {item[1].Transmission}</Text>
            </View>
          </View>
        </View>
      </Card>
    );
  }

  renderNoMoreCards = () => {
    return (
      <Card title="All Done!">
        <Text style={{ marginBottom: 10 }}>There are no more cars available now!</Text>
      </Card>
    );
  }

  renderItem = ({ item }) => {
    return (
      <CarListWithoutAnimation
        item={item}
        navigation={this.props.navigation}
      />
    )
  }

  keyExtractor = (item, index) => item[0];

  toggleView = () => {
    this.setState({
      swipeList: !this.state.swipeList
    })
  }


  render() {
    const { cars } = this.props;
    const data = cars && Object.entries(cars);

    if(!cars){
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator 
            size="large" 
            color="#0000ff"   
          />
        </View>
      )
    }

    return (
      <ImageBackground
        source={require('../assets/images/bgBlue.png')}
        style={{width: '100%', height: '100%'}}
      > 
        <View style={styles.container}>
          <Text style={{ fontSize: 16, textAlign: 'center', color: '#fff', fontWeight: 'bold' }}>
            Available Cars
          </Text>
          <TouchableOpacity
            onPress={this.toggleView}
            style={{ right: 25, alignSelf: 'flex-end' }}
          >
            <FontAwesome name="exchange" size={18} color="#fff"/>
          </TouchableOpacity>
          {
            this.state.swipeList ?
            <CarList
              data={data}
              renderCard={this.renderCard}
              renderNoMoreCards={this.renderNoMoreCards}
              navigation={this.props.navigation}
            />
            :
            <FlatList
              data={data}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderItem}
            />
          }
        </View> 
      </ImageBackground>
      
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
)(Cars)




