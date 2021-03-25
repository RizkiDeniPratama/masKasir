import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
export class Historymember extends Component {
  render() {
    return (
      <View>
        <TouchableOpacity
        style={{
            flexDirection:'row',
            alignItems:'center',
            marginTop:24,
            marginHorizontal:24,
            paddingVertical:24,
            paddingHorizontal:12,
            backgroundColor:'#fff',
            borderRadius:12,
            ...styles.shadow
        }}
        >
          <IonIcons name="timer-outline" size={30} />

          <View style={{flex: 1, marginLeft: 12}}>
            <Text style={{fontSize: 22}}>Set Price Alert</Text>
            <Text stlye={{fontSize: 14}}>
              Get notifed when your coins are moving
            </Text>
          </View>

          <Image
            source={require('../Assets/Images/right_arrow.png')}
            style={{
              width: 25,
              height: 25,
              tintColor:"#6A6A6A"
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default Historymember;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});
