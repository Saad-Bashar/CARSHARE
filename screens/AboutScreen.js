import React, { Component } from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Icon } from 'react-native-elements'
import Swiper from 'react-native-swiper';

const SECTIONS = [
  {
    title: 'What is SOCAR?',
    content: 'SOCAR is a car-sharing platform that allows you to book a car which suits your needs by the hour, day or week all through using our mobile application.'
  },
  {
    title: 'Does SOCAR provide a Parking Pass?',
    content: "Yes, we do! Our Parking Pass is located at the sun visor. If you can't find it, please contact our Customer Service. You will not have to pay for SOCAR parking upon leaving and entering the SOCAR Zone. Parking Pass needs to be put back at the sun visor after used."
  },
  {
    title: "How do I unlock the cars?",
    content: "SOCAR incorporates a keyless system that is operated by the SOCAR App. Members would not have to worry about losing the keys and forgetting to leave them in the car after the booking has ended. More details on here : http://blog.socar.my/2018/03/19/how-to-use-push-start-button/"
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#F5FCFF',
    flexDirection: 'row',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(238,73,167,1)',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(27,183,152,1)',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(92,56,205,1)',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
});

export default class AboutScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "About",  
    headerStyle: {
      height: 60,
      backgroundColor: '#02d5ff'
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#fff'
    },
  });

  state = {
    activeSections: [],
  };


  _renderHeader = (section, index, isActive) => {
    return (
      <View style={styles.header}>
        {
          isActive ? 
            <Icon color="#03A9F4" name='remove' style={{ marginRight: 3 }} />
          :
            <Icon color="#03A9F4" name='add-circle-outline' style={{ marginRight: 3 }} />
        }
        
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  };

  _renderContent = section => {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  };

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{ flex: 1, marginBottom: 5 }}>
            <View style={{ padding: 10 }}>
              <Text style={styles.headerText}>Why SOCAR?</Text>
            </View>
            <Swiper dotColor="#fff" showsButtons={true} autoplay={true}>
              <View style={styles.slide1}>
                <Text style={styles.text}>Affordable</Text>
              </View>
              <View style={styles.slide2}>
                <Text style={styles.text}>Beautiful</Text>
              </View>
              <View style={styles.slide3}>
                <Text style={styles.text}>And Simple</Text>
              </View>
            </Swiper>
          </View>
        <View style={{ flex: 2 }}>
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.headerText}>Frequently Asked Questions</Text>
          </View>
          <Accordion
            sections={SECTIONS}
            activeSections={this.state.activeSections}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            onChange={this._updateSections}
          />
        </View>
      </View>
    );
  }
}