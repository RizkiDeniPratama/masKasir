import React, {Component} from 'react';
import {Text, View, Image, ImageBackground, Dimensions, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
const byImage = require('../../Assets/Images/banner.png');
export class Splash extends Component {
  // componentDidMount() {
  //   AsyncStorage.getItem('token').then((token) => {
  //     if (token === !null) {
  //       AsyncStorage.getItem('email_verification').then(
  //         (email_verification) => {
  //           if (email_verification !== null) {
  //             AsyncStorage.getItem('role').then((role) => {
  //               console.log(role);
  //               if (role === 'kasir') {
  //                 console.log(role, 'masuk ke aplikasi');
  //                 this.props.navigation.replace('Home3');
  //               } else if (role === 'staf') {
  //                 console.log(role, 'masuk ke aplikasi');
  //                 this.props.navigation.replace('Home3');
  //               } else if (role === 'member') {
  //                 console.log(role, 'masuk ke aplikasi');
  //                 this.props.navigation.replace('Home3');
  //               } else if (role === 'pemimpin') {
  //                 console.log(role, 'masuk ke aplikasi');
  //                 this.props.navigation.replace('Home3');
  //               } else {
  //                 console.log('anda orang asing masuk ke aplikasi');
  //               }
  //             });
  //           } else {
  //             this.props.navigation.navigate('Verifikasi');
  //             console.log('belum virifikasi', email_verification);
  //           }
  //         },
  //       );
  //     } else {
  //       setTimeout(() => {
  //         this.props.navigation.replace('Login');
  //       }, 2000);
  //     }
  //   });
  // }
  render() {
    return (
      <ImageBackground
        source={byImage}
        style={{
          height: 700,
          width: '100%',
          // height: Dimensions.get('window').height,
          // width: Dimensions.get('window').width,
        }}>
          <StatusBar backgroundColor="#6642a9" barStyle="dark-content" />
        <View>
          {/* <Image
            source={require('../../Assets/Images/')}
            // style={{}}
          /> */}
        </View>
        <View>
          <Text style={{fontSize: 30}}> maskasir </Text>
        </View>
      </ImageBackground>
    );
  }
}

export default Splash;
