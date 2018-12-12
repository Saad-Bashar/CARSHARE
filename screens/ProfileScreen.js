import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import { Button } from 'react-native-elements';
import { withFirebase } from 'react-redux-firebase'

@withFirebase
export default class ProfileScreen extends Component {
  static navigationOptions = () => ({
    header: null
  });

  render() {
    return (
      <View style={styles.container}>
        <Image 
          style={{width: '100%', height: 200}} 
          source={{uri: 'https://image.freepik.com/free-vector/abstract-dark-blue-polygonal-background_1035-9700.jpg'}}
        /> 
        <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>John Doe</Text>
            <Text style={styles.info}>Proud SOCAR member</Text>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, 
              saepe sapientem eu nam. Qui ne assum electram expetendis, 
              omittam deseruisse consequuntur ius an
            </Text>
            <Button
              style={{ marginTop: 20, width: 200, alignSelf: 'center' }}
              large={false}
              title="Logout"
              onPress={() => { this.props.firebase.logout()}}
              borderRadius={5}
              fontSize={14}
              backgroundColor="#02d5ff"
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#000",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
});