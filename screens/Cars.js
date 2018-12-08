import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator
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
    backgroundColor: '#fff',
  }
});


class Cars extends React.Component {
  static navigationOptions = {
    headerTitle: "SOCARS",
    headerRight: (
      <Button
        small
        borderRadius={5}
        fontSize={12}
        backgroundColor="#02d5ff"
        title='Reservations' />
    ),
    headerStyle: {height: 60}
  };

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
        <Button
          backgroundColor="#03A9F4"
          title="Get More"
        />
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
      <View style={styles.container}>
        <CarList
          data={data}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          navigation={this.props.navigation}
        />
      </View>
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




