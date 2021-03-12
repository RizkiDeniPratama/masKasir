import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
// import IonIcons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import {enpoint} from '../../../enpoint';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export class Drawermember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      data: {},
      // uri: '',
    };
  }

  getprofile() {
    fetch(enpoint.profile, {
      method: 'GET',
      headers: {
        Accept: 'aplication/json',
        'Content-Type': 'aplication/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((response) => response.json())
      .then((resJson) => {
        console.log('darirofil', resJson);
        if (resJson) {
          this.setState({data: resJson.data});
        }
      })
      .catch((error) => {
        console.log('error is' + error);
      });
  }
  componentDidMount() {
    AsyncStorage.getItem('token').then((value) => {
      if (value != null) {
        this.setState({token: value}, () => {
          this.getprofile();
        });
      } else {
        console.log('token tidak ada');
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 1}}>
          {/* ......HEADER............ */}
          <View style={{paddingRight: 15}}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                marginTop: 50,
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor:'red'
              }}>
              <Image
                source={{uri: this.state.data.foto_profil}}
                style={{width: 80, height: 80}}
              />
              {/* <Image
                style={{width: 80, height: 80}}
                source={
                  this.state.uri !== null
                    ? {
                        uri:
                          'https://image.shutterstock.com/image-vector/add-icon-plus-vector-260nw-454078798.jpg',
                      }
                    : {
                        uri: this.state.uri,
                      }
                }
              /> */}
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Text style={{fontSize: 16, marginTop: 3, fontWeight: 'bold'}}>
                  {this.state.data.name}
                </Text>
                <Text style={{fontSize: 14, lineHeight: 30, color: 'grey'}}>
                  {this.state.data.email}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* ......BAWAH........... */}
          <View style={{marginTop: 55}}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View>
                <Icon name="home-outline" size={40} />
              </View>
              <View style={{padding: 15}}>
                <Text>HOME INI BOSS</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() =>
                this.props.navigation.navigate('Editmember', {
                  data: this.state.data,
                })
              }>
              <View>
                <Icon name="home-outline" size={40} />
              </View>
              <View style={{padding: 15}}>
                <Text>Edit akun</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View>
                <Icon name="home-outline" size={40} />
              </View>
              <View style={{padding: 15}}>
                <Text>Tambah saldo</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Home3')}
          style={styles.drawernavigasi}
          activeOpacity={0.7}>
          <View style={styles.navigation}>
            <FontAwesome5 name="th-large" size={25} />

            <Text style={styles.buttonsText}>Dasbord Saya</Text>
          </View>
          <IonIcons name={'chevron-forward'} size={26} />
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          onPress={() => this.props.navigation.navigate('ReqDiterima')}
          style={styles.drawernavigasi}
          activeOpacity={0.7}>
          <View style={styles.navigation}>
            <FontAwesome5 name="user-edit" size={25} />
            <Text style={styles.buttonsText}>diterima</Text>
          </View>
          <IonIcons name={'chevron-forward'} size={26} />
        </TouchableOpacity> */}
      </View>
    );
  }
}

export default Drawermember;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  drawernavigasi: {
    width: '100%',
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingVertical: 5,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsText: {
    marginHorizontal: 5,
    fontSize: 16,
  },
});
