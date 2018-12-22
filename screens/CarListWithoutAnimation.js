import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Card } from 'react-native-elements';



export default class CarListWithoutAnimation extends Component {
  render() {
    const { item } = this.props;
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Reserve', { item })}>
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
      </TouchableOpacity>
    );
  }
}
