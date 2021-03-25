import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  TextInput,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {enpoint} from '../../../enpoint';
import AntDesign from 'react-native-vector-icons/AntDesign';
export default class Daftarsup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      token: '',
      modaleditsuplier: false,
      nama_supplier: '',
      alamat: '',
      no_telepon: '',
    };
  }

  getprofile() {
    fetch(enpoint.getallsupli, {
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
        if (resJson.data) {
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
  // editProfile = (id) => {
  //   this.setState({loading: true});
  //   const {nama_supplier, alamat, no_telepon} = this.state;

  //   var myHeaders = new Headers();
  //   myHeaders.append('Authorization', `Bearer${this.state.token}`);

  //   var formdata = new FormData();
  //   formdata.append('_method', 'put');
  //   formdata.append('alamat', alamat);
  //   formdata.append('no_telepon', no_telepon);
  //   formdata.append('nama_supplier', nama_supplier);

  //   console.log('ini form edit profile', formdata);

  //   var requestOptions = {
  //     method: 'POST',
  //     headers: myHeaders,
  //     body: formdata,
  //   };

  //   fetch(enpoint.editprofile + id, requestOptions)
  //     .then((response) => response.json())
  //     .then((resJson) => {
  //       console.log('hasil edit profile === ', resJson);
  //       if (resJson.status === 'success') {
  //         this.props.navigation.navigate('Staff', {screen: 'Home1'});
  //         ToastAndroid.show('Profil berhasil diupdate!', 1500);
  //       } else if (resJson.status === 'error') {
  //         alert(resJson.message);
  //       } else {
  //         this.setState({loading: false});
  //         ToastAndroid.show('Maaf profil gagal diubah!', 1500);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log('catch error edit profil === ', error);
  //       this.setState({loading: false});
  //       ToastAndroid.show('Maaf profil gagal diubah!', 1500);
  //     });
  // };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.scrollViewCont}>
          <ScrollView>
            {this.state.data === '' ? (
              <View>
                <Text>BELUM ADA SUPPLIER</Text>
              </View>
            ) : (
              <View style={styles.addressScroll}>
                {this.state.data.map((v, i) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.95}
                      style={styles.addressList}
                      key={i}
                      // onPress={() => this.setState({modaleditsuplier: true})}
                      onPress={() =>
                        this.props.navigation.navigate('Editsup', {
                          item: v,
                        })
                      }>
                      <View style={styles.addressListHead}>
                        <Text style={styles.addressListNumber}>
                          Supplier {(i + 1).toString()}
                        </Text>
                        <AntDesign
                          name={'checkcircle'}
                          color={'green'}
                          size={25}
                          onPress={() => {}}
                        />
                      </View>
                      <Text>{v.nama_supplier}</Text>
                      <Text>{v.alamat}</Text>
                      <Text>{v.no_telepon}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </ScrollView>
        </View>
        {/* <Modal
          transparent={true}
          visible={this.state.modaleditsuplier}
          statusBarTranslucent={true}
          animationType={'fade'}
          onRequestClose={() => this.setState({modaleditsuplier: false})}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => this.setState({modaleditsuplier: false})}
            style={{
              backgroundColor: '#00000087',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '90%',
                backgroundColor: '#eee',
                // alignItems: 'center',
                // justifyContent: 'center',
                borderRadius: 10,
                paddingHorizontal: 15,
                height: '70%',
              }}>
              <View
                style={{width: '100%', height: 50, justifyContent: 'center'}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: 20,
                  }}>
                  Add Supplier
                </Text>
              </View>
              <View style={{marginTop: 30}}>
                <View>
                  <TextInput
                    style={styles.input}
                    keyboardType={'email-address'}
                    autoCapitalize={'none'}
                    // autoCompleteType={'email'}
                    placeholder={'Nama Supplier'}
                    value={this.state.nama_supplier}
                    underlineColorAndroid={'#12a548'}
                    onChangeText={(text) =>
                      this.setState({nama_supplier: text})
                    }
                  />
                </View>
                <View>
                  <TextInput
                    style={styles.input}
                    keyboardType={'email-address'}
                    autoCapitalize={'none'}
                    // autoCompleteType={'email'}
                    placeholder={'alamat'}
                    value={this.state.alamat}
                    underlineColorAndroid={'#12a548'}
                    onChangeText={(text) => this.setState({alamat: text})}
                  />
                </View>
                <View>
                  <TextInput
                    style={styles.input}
                    keyboardType={'number-pad'}
                    autoCapitalize={'none'}
                    // autoCompleteType={'email'}
                    placeholder={'no telepon'}
                    value={this.state.no_telepon}
                    underlineColorAndroid={'#12a548'}
                    onChangeText={(text) => this.setState({no_telepon: text})}
                  />
                </View>
              </View>
              <View style={{alignSelf: 'center'}}>
                <TouchableOpacity
                  style={{
                    width: 200,
                    height: 40,
                    backgroundColor: 'red',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                    marginTop: 60,
                  }}
                  onPress={() => this.addsupplier()}>
                  {this.state.loading ? (
                    <ActivityIndicator size={20} color={'black'} />
                  ) : (
                    <Text style={styles.buttonText}>Kirim</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'green',
    alignItems: 'center',
    paddingTop: 35,
  },
  scrollViewCont: {
    flex: 1,
    width: '100%',
  },
  addressScroll: {
    flexGrow: 1,
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
  },
  addressList: {
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
    elevation: 4,
    marginTop: 15,
  },
  addressListNumber: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addressListHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
