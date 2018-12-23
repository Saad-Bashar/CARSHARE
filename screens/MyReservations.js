import React, { Component } from 'react';
import { Dimensions, View , Text, TouchableOpacity, FlatList, ImageBackground} from 'react-native';
import { TabView } from 'react-native-tab-view';
import ActiveReservations from './ActiveReservations';
import CompleteReservations from './CompleteReservations';
import AllReservations from './AllReservations';
import { connect } from 'react-redux';
import { firebaseConnect, getFirebase } from 'react-redux-firebase';
import { compose } from 'redux'
import colors from '../constants/Colors'
import Button from '../components/Button'
import { AntDesign } from '@expo/vector-icons';



class MyReservations extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'Active' },
        { key: 'second', title: 'Completed' },
      ],
      status: 'All',
    };
  }

  toStatus = () => {
    this.setState({
      visibleModal: !this.state.visibleModal
    });
  }

  onStatusSelected = (item) => {
    this.setState({
      status: item.key,
      visibleModal: !this.state.visibleModal
    })
  }

  _renderItem = ({item}) => {
    return (
      <TouchableOpacity 
        onPress = {() => this.onStatusSelected(item)}
        style   = {{ paddingLeft: 20, paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#DCDCDC' }}
      >
        <Text style={{fontWeight:'400'}}>{item.value}</Text>
      </TouchableOpacity>
    );
  }

  keyExtractor = (item) => item.key;


  getList = () => {
    const { status } = this.state;
    const { activeList, completeList, allList } = this.props;

    switch (status) {
      case 'Active':
        return <ActiveReservations list={activeList}/>
      case 'Completed':
        return <CompleteReservations list={completeList}/>
      default:
        return <AllReservations list={allList} />
    }
  }


  render() {

    const status = [
      {key  : 'All', value: 'All'},
      {key  : 'Active', value: 'Active'},
      {key  : 'Completed', value: 'Completed'},
    ];

    return (
      <ImageBackground
        source={require('../assets/images/bgBlue.png')}
        style={{width: '100%', height: '100%'}}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection:'row', justifyContent:'space-between', marginLeft:25, marginTop: 40 }}>
            <Button 
              onPressedProp   = {this.toStatus}
              customStyles    = {{ borderColor: '#fff',backgroundColor: '#fff', marginBottom:0 }}
              customTextStyle = {{ color:'#02d5ff', paddingVertical: 5,  fontWeight: 'bold', fontSize: 12}}
            >
              {this.state.status}           <AntDesign  name="down" color="#02d5ff" size={15}/>
            </Button>
          </View>
          <View style={{ flex: 1, backgroundColor: 'transparent' }}>
            {this.getList()}
          </View>
          {this.state.visibleModal && 
            <View style={{ backgroundColor: '#fff', position: 'absolute', width: '100%', bottom: 0,  zIndex: 3 }}>
              <FlatList
                data       = {status}
                renderItem = {this._renderItem}
                keyExtractor={this.keyExtractor}
              />
            </View>
          }
          {/* <TabView
            navigationState={this.state}
            renderScene = {({ route }) => {
                switch (route.key) {
                  case 'first':
                    return <ActiveReservations list={activeList}/>;
                  case 'second':
                    return <CompleteReservations list={completeList}/>;
                  default:
                    return null;
              }
            }}
            onIndexChange={index => this.setState({ index })}
            initialLayout={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
          /> */}
        </View>
      </ImageBackground>
    );
  }
}


export default compose(
  firebaseConnect(() => {
    const uid = getFirebase().auth().currentUser.uid;
    return [
      `Reservations/${uid}`
    ]
  }),
  connect(
    (state) => {
      let reservationsList = state.firebase.data.Reservations && Object.entries(state.firebase.data.Reservations);
      let list = reservationsList && Object.entries(reservationsList[0][1])
      let activeList = [];
      let completeList = [];

      if(list) {
        activeList = list.filter((item) => {
          return (
            item[1].isActive == true
          );
        });

        completeList = list.filter((item) => {
          return (
            item[1].isComplete == true
          );
        });
      }

      return {
        activeList: activeList,
        completeList: completeList,
        allList: list
      }
    } 
  )
)(MyReservations)

