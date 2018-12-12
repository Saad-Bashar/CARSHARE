import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { TabView } from 'react-native-tab-view';
import ActiveReservations from './ActiveReservations';
import CompleteReservations from './CompleteReservations';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux'
import colors from '../constants/Colors'

class MyReservations extends Component {
  static navigationOptions = () => ({
    title: "My Reservations",
    headerStyle: {
      backgroundColor: colors.primaryColor,
    }, 
    headerBackTitleStyle: {
      color: '#fff'
    }
  });

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'Active' },
        { key: 'second', title: 'Completed' },
      ],
    };
  }


  render() {
    const { activeList, completeList } = this.props;

    return (
      <TabView
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
      />
    );
  }
}


export default compose(
  firebaseConnect(() => {
    return [
      'Reservations'
    ]
  }),
  connect(
    (state) => {
      let reservationsList = state.firebase.data.Reservations && Object.entries(state.firebase.data.Reservations);
      let activeList = [];
      let completeList = [];

      if(reservationsList) {
        activeList = reservationsList.filter((item) => {
          return (
            item[1].isActive == true
          );
        });

        completeList = reservationsList.filter((item) => {
          return (
            item[1].isComplete == true
          );
        });
      }

      return {
        activeList: activeList,
        completeList: completeList
      }
    } 
  )
)(MyReservations)

