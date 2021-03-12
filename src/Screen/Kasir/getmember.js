import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  Button,
  Dimensions,
  RefreshControl,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import {enpoint} from '../../../enpoint';
var {width} = Dimensions.get('window');
var {height} = Dimensions.get('window');
class GetMember extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      data: [],
      loading: false,
      refresh: false,
      modalEdit: false,
      name: '',
      foto_profil: {uri: '', type: 'image/jpeg', fileName: 'profilLama'},
      tgl_lahir: '',
      alamat: '',
      email: '',
    };
  }

  edit = () => {
    const {name, tgl_lahir, alamat, foto_profil, email} = this.state;
    const body = {
      _method: 'put',
      name: name,
      tgl_lahir: tgl_lahir,
      alamat: alamat,
      email: email,
    };
    fetch(enpoint.addbarang + this.state.data.id, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      body: this.createFormData(foto_profil, body),
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        console.log('ini resjson nya ', resJson);
        if (resJson.status === 'Update Successfully') {
          this.props.navigation.navigate('Kasir', {screen: 'Home2'});

          ToastAndroid.show(
            ' Berhasil Diganti',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        } else {
          alert('err');
        }
      })
      .catch((error) => {
        console.log('ini error dari feact' + error);
      });
  };
  createFormData = (photo, body) => {
    const data = new FormData();
    if (photo.uri !== '') {
      data.append('foto_profil', {
        name: photo.fileName,
        type: photo.type,
        uri:
          Platform.OS === 'android'
            ? photo.uri
            : photo.uri.replace('file://', ''),
      });
    }
    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });
    console.log('ini form', data);
    console.log('ini foto_profil', data._parts);
    return data;
  };
  handleEditPhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.uri) {
        this.setState({foto_profil: response, edited: true});
        console.log(JSON.stringify(response.fileName));
      }
    });
  };

  getMember = () => {
    this.setState({data: [], loading: true});
    console.log('sedang mengambil Member');
    fetch(enpoint.getMember, {
      method: 'GET',
      headers: {
        // Accept: 'aplication/json',
        'Content-Type': 'aplication/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        this.setState({
          data: resJson.data,
          refresh: false,
          loading: false,
        });
        console.log('ini data GetMember', this.state.data);
      })
      .catch((error) => {
        console.log('error is' + error);
      });
  };

  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        this.setState({token: token}, () => {
          this.getMember();
        });
      } else {
        console.log('token tidak ada');
      }
    });
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={() => {
                this.setState({refresh: true});
                this.getMember();
              }}
            />
          }>
          {this.state.data == null ? (
            <View style={{alignSelf: 'center'}}>
              <Text>Member Tidak Ada</Text>
            </View>
          ) : (
            <View style={{flex: 1, margin: 10}}>
              <View style={{height: 20}} />
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                  color: '#33c37d',
                  alignSelf: 'center',
                }}>
                Daftar Member
              </Text>
              <View style={{height: 20}} />
              {this.state.data.map((val, key) => {
                return (
                  <View
                    key={key}
                    style={{
                      width: width - 20,
                      margin: 10,
                      backgroundColor: 'transparent',
                      flexDirection: 'row',
                      borderBottomWidth: 2,
                      borderColor: '#cccccc',
                      paddingBottom: 10,
                    }}>
                    <Image
                      source={{uri: val.foto_profil}}
                      style={{width: width / 3, height: width / 3}}
                      resizeMode="cover"
                    />
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: 'trangraysparent',
                        padding: 10,
                        justifyContent: 'space-between',
                      }}>
                      <View>
                        <Text style={{fontWeight: 'bold', fontSize: 20}}>
                          {val.name}
                        </Text>
                        <Text>Saldo : {val.saldo}</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('EditMember', {
                            data: val,
                          })
                        }
                        style={{
                          alignSelf: 'flex-end',
                          backgroundColor: 'blue',
                          height: 30,
                          width: 50,
                          borderRadius: 3,
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            justifyContent: 'center',
                          }}>
                          Edit
                        </Text>
                      </TouchableOpacity>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            color: '#33c37d',
                            fontSize: 20,
                          }}>
                          kode:
                          {val.kode_member}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </ScrollView>
        {/* .........MODAL EDIT........ */}
        <Modal
          animationType="slide"
          visible={this.state.modalEdit}
          onRequestClose={() => this.setState({modalEdit: false})}>
          <View style={styles.utama}>
            <ScrollView>
              <View style={styles.br}>
                <View style={{alignItems: 'center', marginBottom: 10}}>
                  <Text style={{fontWeight: 'bold'}}>Tambah Member </Text>
                </View>

                <View style={{width: '100%', marginVertical: 15}}>
                  <View
                    style={{
                      height: 150,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => this.handleEditPhoto()}
                      style={{
                        borderWidth: 2,
                        padding: 10,
                        borderStyle: 'dashed',
                        borderRadius: 5,
                      }}>
                      {this.state.foto_profil.uri !== '' ? (
                        <Image
                          style={{width: 100, height: 100}}
                          source={{uri: this.state.foto_profil.uri}}
                        />
                      ) : (
                        <View>
                          <FontAwesome name="photo" size={100} />
                        </View>
                      )}
                    </TouchableOpacity>
                  </View>
                  {/* ....NAMA BARANG.... */}
                  <Text style={{fontWeight: 'bold'}}> Email </Text>

                  <View style={styles.data2}>
                    <View style={{width: '8%'}}>
                      <IonIcons name="grid-outline" size={20} />
                    </View>

                    <View style={{width: '92%'}}>
                      <TextInput
                        placeholder={'email'}
                        value={this.state.email}
                        onChangeText={(t) => this.setState({email: t})}
                      />
                    </View>
                  </View>
                  {/* ......BARCODE........ */}
                  <Text style={{fontWeight: 'bold'}}> name </Text>

                  <View style={styles.data2}>
                    <View style={{width: '8%'}}>
                      <IonIcons name="barcode-sharp" size={20} />
                    </View>

                    <View style={{width: '92%'}}>
                      <TextInput
                        placeholder={'name'}
                        value={this.state.name}
                        onChangeText={(t) => this.setState({name: t})}
                      />
                    </View>
                  </View>

                  {/* ..........MEREK........ */}
                  <Text style={{fontWeight: 'bold'}}> Merek </Text>

                  <View style={styles.data2}>
                    <View style={{width: '8%'}}>
                      <IonIcons name="calendar-sharp" size={20} />
                    </View>

                    <View style={{width: '92%'}}>
                      <TextInput
                        placeholder={'tgl_lahir '}
                        value={this.state.tgl_lahir}
                        onChangeText={(t) => this.setState({tgl_lahir: t})}
                      />
                    </View>
                  </View>

                  {/* ............DISKON........... */}
                  <Text style={{fontWeight: 'bold'}}> Alamat </Text>

                  <View style={styles.data2}>
                    <View style={{width: '8%'}}>
                      <IonIcons name="pricetags" size={20} />
                    </View>

                    <View style={{width: '92%'}}>
                      <TextInput
                        placeholder={'alamat'}
                        value={this.state.alamat}
                        onChangeText={(t) => this.setState({alamat: t})}
                      />
                    </View>
                  </View>

                  <Text style={{fontWeight: 'bold'}}> Kategori </Text>

                  <View style={styles.data2}>
                    <View style={{width: '8%'}}>
                      <IonIcons name="pricetags" size={20} />
                    </View>

                    <View style={{width: '92%'}}>
                      <TextInput
                        placeholder={'password minimal 8'}
                        value={this.state.password}
                        onChangeText={(t) => this.setState({password: t})}
                      />
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => this.addMember()}
                  style={styles.t3}>
                  <Text style={{fontWeight: 'bold', color: 'white'}}>
                    Tambah
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  }
}

export default GetMember;

const styles = StyleSheet.create({
  boxTampildata: {
    // backgroundColor: 'red',
    justifyContent: 'center',
    // flexDirection: 'row',
    flexWrap: 'wrap',
    flexGrow: 1,
  },
  boksProduk: {
    width: 300,
    height: 200,
    backgroundColor: '#FFF',
    marginLeft: 20,
    marginTop: 10,
    elevation: 5,
    borderRadius: 10,
    flexDirection: 'row',
  },
  image: {
    width: 80,
    height: 80,
  },
  viewImage: {
    // justifyContent: 'center',
    alignItems: 'center',
  },
  viewTeks: {
    paddingLeft: 7,
    // justifyContent: 'space-around',
  },
  loginRegister: {
    width: '90%',
    height: 190,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 90,
    marginLeft: 18,
    elevation: 10,
  },
  BoxImage: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    top: 50,
    borderWidth: 7,
    borderColor: '#3462f9',
    marginTop: -95,
    borderWidth: 7,
    margin: 5,
  },
  posisenLogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  boxLoginRegister: {
    width: '40%',
    height: 50,
    margin: 5,
    borderRadius: 20,
  },
  utama: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'deepskyblue',
  },
  vh: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    backgroundColor: 'white',
  },
  br: {
    width: 330,
    backgroundColor: 'white',
    padding: 5,
    elevation: 5,
    borderRadius: 15,
  },
  t1: {
    height: 50,
    margin: 5,
    alignItems: 'center',
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: 'red',
    elevation: 3,
  },
  t2: {
    height: 50,
    margin: 5,
    alignItems: 'center',
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: 'grey',
    elevation: 3,
  },
  t3: {
    height: 50,
    margin: 5,
    alignItems: 'center',
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: 'black',
    elevation: 3,
  },
  data: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    paddingVertical: 5,
    marginBottom: 10,
  },
  data2: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    marginBottom: 10,
  },
});
