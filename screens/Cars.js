import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator, ImageBackground
} from 'react-native';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux'
import { Card, Button } from 'react-native-elements';
import CarList from './CarList'
import { MonoText } from '../components/StyledText'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  }
});


class Cars extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "SOCARS",  
    headerRight: 
      <Button
        onPress={() => navigation.navigate('MyReservations')}
        small
        style={{ padding: 2 }}
        borderRadius={5}
        fontSize={12}
        color="#000"
        backgroundColor="#fff"
        title='Reservations' 
      />,
    headerStyle: {
      height: 60,
      backgroundColor: '#02d5ff'
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#fff'
    },
  });
  

  renderCard = (item) => {
    return (
      <Card
        key={item[0]}
        title={item[1].Model}
        image={{ uri: item[1].image }}
      >
        <MonoText style={{ marginBottom: 10, color: '#03A9F4' }}>
          {`Mileage - ${item[1].Mileage}\nYear - ${item[1].Year}\nTransmission - ${item[1].Transmission}`}
        </MonoText>
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
        source={require('../assets/images/bg.png')}
        style={{width: '100%', height: '100%'}}
      > 
        <View style={styles.container}>
          <MonoText style={{ textAlign: 'center' }}>
            Swipe right to reserve or {'\n'}Swipe left to see the next car
          </MonoText>
          <CarList
            data={data}
            renderCard={this.renderCard}
            renderNoMoreCards={this.renderNoMoreCards}
            navigation={this.props.navigation}
          />
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




