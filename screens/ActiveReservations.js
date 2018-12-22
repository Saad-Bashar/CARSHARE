import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import ListItem from '../components/ListItem';

export default class ActiveReservations extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _keyExtractor = (item) => item[0];

  _renderItem = ({ item }) => (
    <ListItem
      item={item}
    />
  );


  render() {
    return (
      <View style={{ flex: 1, padding: 10 }}>
        <FlatList
          data={this.props.list}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          ItemSeparatorComponent={()=> {
            return (
              <View style={{ borderBottomColor: '#d3d3d3', borderBottomWidth: 1, paddingTop: 5 }} />
            ); 
          }}
        />
      </View>
    );
  }
}
