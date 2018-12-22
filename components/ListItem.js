import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { MonoText } from './StyledText';
import { withFirebase } from 'react-redux-firebase';
import { showMessage } from "react-native-flash-message";


@withFirebase
export default class ListItem extends Component {      
  constructor(props) {
    super(props);
    this.state = {
    };
  } 

  updateReservation = () => {
    const { item } = this.props;
    this.props.firebase.database().ref(`/Reservations/${item[0]}`).update({
      isActive: false,
      isComplete: true
    }, function(error) {
      if(error) {
        showMessage({
          message: "Something went wrong!",
          type: "danger",
        });
      } else {
        showMessage({
          message: "Marked as completed! Check complete list!",
          type: "success",
        });
      }
    });
  }

  render() {
    const { item } = this.props;
    return (
      <View style={{ padding: 5 }}>
        <View>
          <MonoText> Your Car - {item[1].model} </MonoText>
          <MonoText> You take the car for - {item[1].hours} hours </MonoText>
          <MonoText> Time - {item[1].pickuptime} </MonoText>
          <MonoText> Pickup Point - {item[1].pickupPoint.description} </MonoText>
          <MonoText> Dropoff Point - {item[1].dropoffPoint.description} </MonoText>
        </View>
        {
          item[1].isActive &&
          <View style={{ paddingTop: 10 }}>
            <Button
              onPress={this.updateReservation}
              small
              title="Mark Completed"
              fontSize={12}
              backgroundColor="#1faadb"
              borderRadius={4}
            />
          </View>
        }
      </View>
    );
  }
}
