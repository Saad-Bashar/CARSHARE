import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { MonoText } from './StyledText';
import { withFirebase } from 'react-redux-firebase';
import { showMessage } from "react-native-flash-message";
import { AntDesign, Entypo } from '@expo/vector-icons';


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
       
        <Card containerStyle={{ elevation: 3, borderRadius: 5, borderColor:'#c7c9cc', borderWidth:1 }}>
          <View>
            <View style={{ flexDirection: 'row', alignItems:'center', marginBottom:10, borderBottomColor: '#c7c9cc', borderBottomWidth:1}}>
              <AntDesign name="car" size={16} color="#4E7094"/>
              <Text style={{color:'#4E7094', fontSize:16, fontWeight:'bold', letterSpacing:3}}>  {item[1].model} </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems:'center', marginBottom:5  }}>
              <Entypo name="hour-glass" size={14} color="#4E7094"/>
              <Text style={{color:'#4E7094', fontSize:14, fontWeight:'400', letterSpacing:1, marginLeft:10 }}>Riding Hour: {item[1].hours}hr</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems:'center', marginBottom:5  }}>
              <AntDesign name="clockcircle" size={14} color="#4E7094"/>
              <Text style={{color:'#4E7094', fontSize:14, fontWeight:'400', letterSpacing:1, marginLeft:10 }}>Time: {item[1].pickuptime.slice(0, 21)} </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems:'center', marginBottom:5  }}>
              <AntDesign name="caretright" size={14} color="#4E7094"/>
              <Text style={{color:'#4E7094', fontSize:14, fontWeight:'400', letterSpacing:1, marginLeft:10 }}>Pickup Point: {item[1].pickupPoint.description}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems:'center', marginBottom:5,  }}>
              <AntDesign name="caretleft" size={14} color="#4E7094"/>
              <Text style={{color:'#4E7094', fontSize:14, fontWeight:'400', marginLeft:10 ,letterSpacing:1}}>Dropoff Point: {item[1].dropoffPoint.description}</Text>
            </View>
          </View>
        
      {
        item[1].isActive &&
        <View style={{ paddingTop: 10 }}>
          <Button
            icon={{ name: 'check-circle', type: 'font-awesome' }}
            onPress={this.updateReservation}
            small
            title="Mark Completed"
            fontSize={14}
            backgroundColor="#4e894e"
            borderRadius={4}
            
          />
        </View>
      }
      </Card>
 
    );
  }
}


