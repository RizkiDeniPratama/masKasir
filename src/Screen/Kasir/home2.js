import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StatusBar,
  ImageBackground,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {enpoint} from '../../../enpoint';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
export class Home2 extends Component {
  constructor() {
    super();
    this.state = {
      modalAddMember: false,
      token: '',
      loading: false,
      alamat: '',
      name: '',
      email: '',
      password: '',
      tgl_lahir: '',
      foto_profil: {uri: '', type: 'image/jpeg', fileName: 'profilLama'},
      password: '',
      photo: '',
      penjualan: [],
    };
  }

  addMember = () => {
    const {name, tgl_lahir, alamat, foto_profil, email, password} = this.state;
    const body = {
      name: name,
      tgl_lahir: tgl_lahir,
      alamat: alamat,
      email: email,
      password: password,
    };
    fetch(enpoint.addMember, {
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
        if (resJson.status === 'success') {
          this.props.navigation.navigate('Kasir', {screen: 'Home2'});

          ToastAndroid.show(
            ' Berhasil Ditambah',
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
  getAllPenjualan() {
    fetch(enpoint.getAllPenjualan, {
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
          this.setState({penjualan: resJson.data});
        } else {
          console.log('penjualan tidak ada');
        }
      })
      .catch((error) => {
        console.log('error is' + error);
      });
  }

  async getTransaksiBaru() {
    this.setState({loading: true});
    try {
      let myOptions = {
        headers: {
          Authorization: `Bearer ${this.state.token}`,
        },
      };

      let response = await fetch(enpoint.getTransaksiBaru, myOptions);

      let resJson = await response.json();

      console.log('ini resjson get kode transaksi == ', resJson);

      if (resJson) {
        this.setState({transaksi: resJson.data});
        ToastAndroid.show('Memulai transaksi baru!!', 2000);
        this.props.navigation.replace('TambahBarang', {
          data: this.state.transaksi,
        });
      }
    } catch (err) {
      console.log('catch get transaksi == ', err);
      ToastAndroid.show('Maaf gagal mengambil kode transaksi baru!!', 2000);
    }
  }
  componentDidMount() {
    AsyncStorage.getItem('token').then((value) => {
      if (value != null) {
        this.setState({token: value}, () => {
          this.getAllPenjualan();
        });
      } else {
        console.log('token tidak ada');
      }
    });
  }
  render() {
    return (
      <ScrollView>
        <View style={[styles.container, styles.shadow]}>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="light-content"
          />
          {/* .........BAGIAN ATAS......... */}
          <View style={styles.header}>
            <ImageBackground
              source={require('../../Assets/Images/banner.png')}
              resizeMode="cover"
              style={[styles.imagebackground, styles.shadow]}>
              <View style={styles.drawer}>
                <View style={styles.viewdrawer}>
                  <IonIcons
                    name="reorder-three-outline"
                    style={styles.icondrawer}
                    size={50}
                    onPress={() => this.props.navigation.openDrawer()}
                  />
                </View>
                <View style={styles.viewdrawer}>
                  <Image
                    style={styles.profile}
                    source={require('../../Assets/Images/trashol.png')}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 30,
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  width: '100%',
                }}>
                <TouchableOpacity
                  onPress={() => this.setState({modalAddMember: true})}
                  style={{
                    height: 40,
                    width: 150,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 8,
                  }}>
                  <Text>Add Member</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    height: 40,
                    width: 150,
                    backgroundColor: 'green',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 8,
                  }}
                  onPress={() => this.getTransaksiBaru()}>
                  <Text style={{color: 'white'}}>New Transaksi</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
          {/* ...........BAGIAN BAWAH........ */}
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('GetMember')}
            style={[styles.button, styles.shadow]}>
            <IonIcons name="timer-outline" size={30} />

            <View style={styles.viewhistory}>
              <Text style={styles.textbutonats}>Daftar Member</Text>
              <Text stlye={styles.textbutonbwh}>
                tekan untuk melihat yang lebih detail
              </Text>
            </View>

            <Image
              source={require('../../Assets/Images/right_arrow.png')}
              style={styles.arrow}
            />
          </TouchableOpacity>
          {/* ......FITUR LAIN........ */}

          {/* .....Story Pembelian...... */}

          <View style={styles.viewtransaksi}>
            <Text style={{fontSize: 22, fontWeight: 'bold'}}>
              Transaction History
            </Text>
            {this.state.penjualan.map((v, i) => {
              return (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 8,
                    marginTop: 10,
                    borderRadius: 3,
                    // borderWidth: 0.1,
                    borderBottomWidth: 1,
                  }}>
                  <Image
                    source={require('../../Assets/Images/transaksi.png')}
                    style={{width: 30, height: 30, tintColor: '#7F5DF0'}}
                  />
                  <View style={{flex: 1, marginLeft: 12}}>
                    {v.kasir == 1 ? (
                      <Text style={{fontSize: 16}}>mbk tini</Text>
                    ) : (
                      <>
                        {v.kasir == 2 ? (
                          <Text style={{fontSize: 16}}>mbk mega</Text>
                        ) : (
                          <>
                            {v.kasir == 3 ? (
                              <Text style={{fontSize: 16}}>mbk ayu</Text>
                            ) : (
                              <>
                                {v.kasir == 4 ? (
                                  <Text style={{fontSize: 16}}>mbk putri</Text>
                                ) : (
                                  <Text style={{fontSize: 16}}>
                                    Tidak ada kasir
                                  </Text>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </>
                    )}
                    {/* <Text style={{fontSize: 16}}>kasir : {v.kasir}</Text> */}
                    <Text
                      style={{
                        // color: '#6A6A6A',
                        fontSize: 14,
                        color: v.kasir == 4 ? '#6A6A6A' : 'green',
                      }}>
                      {v.kode_transaksi}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      height: '100%',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        // color: item.type == 'B' ? COLORS.green : COLORS.black,
                        fontSize: 16,
                      }}>
                      $2000000
                    </Text>
                    <Image
                      source={require('../../Assets/Images/right_arrow.png')}
                      style={{
                        width: 20,
                        height: 20,
                        tintColor: '#6A6A6A',
                      }}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* ........MODAL ADD MEMBER........... */}
          <Modal
            animationType="slide"
            visible={this.state.modalAddMember}
            onRequestClose={() => this.setState({modalAddMember: false})}>
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
        <View style={styles.tambahanscrolview} />
      </ScrollView>
    );
  }
}

export default Home2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 250,
  },
  imagebackground: {
    flex: 1,
    alignItems: 'center',
  },
  drawer: {
    flexDirection: 'row',
    marginTop: 40,
    paddingHorizontal: 20,
  },
  viewdrawer: {
    width: '50%',
  },
  icondrawer: {
    alignSelf: 'flex-start',
    color: 'white',
  },
  profile: {
    width: 50,
    height: 50,
    alignSelf: 'flex-end',
  },
  viewsaldo: {
    marginTop: 50,
  },
  textsaldo: {
    color: '#fff',
    fontSize: 16,
  },
  saldo: {
    marginTop: 10,
    color: '#fff',
    fontSize: 30,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -40,
    marginHorizontal: 24,
    paddingVertical: 17,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  viewhistory: {
    flex: 1,
    marginLeft: 12,
  },
  textbutonats: {
    fontSize: 22,
  },
  textbutonbwh: {
    fontSize: 14,
  },
  arrow: {
    width: 25,
    height: 25,
    tintColor: '#6A6A6A',
  },
  tambahanscrolview: {
    height: 50,
  },
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
  viewtransaksi: {
    marginTop: 24,
    marginHorizontal: 24,
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
});
