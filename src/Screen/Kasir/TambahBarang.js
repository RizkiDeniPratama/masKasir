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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {enpoint} from '../../../enpoint';
var {width} = Dimensions.get('window');
class GetMember extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
      token: '',
      loading: false,
      refresh: false,
      modalInputJumlah: false,
      daftar_barang: [],
      barang: 0,
      jumlah: '0',
      stok: 0,
    };
  }

  addItem() {
    const {jumlah} = this.state;
    console.log('ini id barang', this.state.barang);

    fetch(enpoint.addItem + this.props.route.params.data.kode_transaksi, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      body: JSON.stringify({
        jumlah: jumlah,
        barang: this.state.barang,
      }),
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        console.log('ini resjson nya', resJson);

        if (resJson.status === 'success') {
          ToastAndroid.show('sudah di tambah', ToastAndroid.SHORT);
          this.setState({modalInputJumlah: false});
        } else {
          console.log('gagal tambah');
        }
      })
      .catch((error) => {
        alert('ada masalah tambah', error);
      });
  }

  getBarang() {
    console.log('mengambil barang..');
    fetch(enpoint.getallbarang, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        this.setState({
          daftar_barang: responseJSON.data,
          refresh: false,
          loading: false,
        });
        console.log('barang termuat.', responseJSON);
      })
      .catch((error) => {
        console.log('error get barang' + error);
      });
  }
  stok = () => {
    if (this.state.stok < 0) {
      this.state.stok;
    } else {
      0;
    }
  };
  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        this.setState({token: token});
        this.getBarang();

        console.log('token ada');
      } else {
        console.log('token tidak ada');
      }
    });
  }

  render() {
    // console.log('ini isi data', this.props.route.params);
    // let data = this.props.route.params.data.kode_transaksi;
    return (
      <View style={{flex: 1}}>
        <View style={{height: 20}} />
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: '#33c37d',
            alignSelf: 'center',
          }}>
          Tambah Barang
        </Text>
        <View style={{height: 20}} />

        <ScrollView
          // style={{}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={() => {
                this.setState({refresh: true});
                this.getBarang();
              }}
            />
          }>
          {this.state.daftar_barang == null ? (
            <View style={{alignSelf: 'center'}}>
              <Text>Barang Tidak Ada</Text>
            </View>
          ) : (
            <View
              style={{
                flexWrap: 'wrap',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              {this.state.daftar_barang.map((val, key) => {
                return (
                  <View key={key}>
                    <TouchableOpacity
                      style={{
                        height: 150,
                        backgroundColor: '#FFF',
                        marginHorizontal: 20,
                        marginTop: 20,
                        width: 130,
                        borderRadius: 7,
                        ...styles.shadow,
                      }}
                      onPress={() =>
                        this.setState({modalInputJumlah: true, barang: val.id})
                      }>
                      <View
                        style={{
                          height: 70,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {val.kategori == 'peralatan belajar' ? (
                          <IonIcons name="book" size={50} />
                        ) : (
                          <>
                            {val.kategori == 'Sabun' ? (
                              <FontAwesome5 name="soap" size={50} />
                            ) : (
                              <>
                                {val.kategori == 'Mie Instan' ? (
                                  <MaterialCommunityIcons
                                    name="noodles"
                                    size={50}
                                  />
                                ) : (
                                  <FontAwesome name="frown-o" size={50} />
                                )}
                              </>
                            )}
                          </>
                        )}
                      </View>
                      <View style={styles.merekHarga}>
                        <Text style={styles.gayaHarga}>{val.nama_barang}</Text>
                        <Text
                          numberOfLines={2}
                          style={{
                            fontWeight: 'bold',
                            paddingTop: 10,
                          }}>
                          {val.stok <= 0
                            ? ' barang habis !!!'
                            : 'barang : ' + val.stok}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          )}
        </ScrollView>
        <View
          style={{
            height: 50,
            backgroundColor: '#c1bebe',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                height: 30,
                backgroundColor: '#FFF',
                alignItems: 'center',
                justifyContent: 'center',
                width: 200,
                borderRadius: 10,
                ...styles.shadow,
              }}
              onPress={() =>
                this.props.navigation.navigate('DetailTransaksi', {
                  data: this.props.route.params.data.kode_transaksi,
                })
              }>
              <Text style={{fontWeight: 'bold'}}>Selanjutnya</Text>
            </TouchableOpacity>
            <IonIcons
              style={{padding: 15, left: 20}}
              name="caret-forward-circle"
              size={30}
            />
          </View>
        </View>

        {/* .........MODAL Input Jumlah........ */}
        <Modal
          transparent={true}
          visible={this.state.modalInputJumlah}
          statusBarTranslucent={true}
          animationType={'fade'}
          onRequestClose={() => this.setState({modalInputJumlah: false})}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => this.setState({modalInputJumlah: false})}
            style={styles.forgetCont}>
            <View style={styles.loginbox}>
              <Text style={styles.boxTitle}>Masukkan Jumlah</Text>
              <TextInput
                style={styles.input}
                keyboardType={'number-pad'}
                placeholder={'Jumlah Barang'}
                value={this.state.jumlah}
                underlineColorAndroid={'#12a548'}
                onChangeText={(text) => this.setState({jumlah: text})}
              />
              <TouchableOpacity
                style={styles.signInButton}
                onPress={() => this.addItem()}>
                {this.state.loading ? (
                  <ActivityIndicator size={20} color={'black'} />
                ) : (
                  <Text style={styles.buttonText}>Kirim</Text>
                )}
              </TouchableOpacity>
              <Text style={styles.questionText}>
                Mohon input data dengan benar
              </Text>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}

export default GetMember;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#424242cc',
    flex: 1,
  },
  header: {
    backgroundColor: 'blue',
    height: 200,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
  },
  drawer: {
    height: 10,
    width: 20,
    marginTop: 25,
  },
  screnHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    width: '100%',
  },
  textHeader: {
    fontSize: 28,
    color: '#FFF',
    fontWeight: 'bold',
  },
  imageHeader: {
    width: '50%',
    alignItems: 'flex-end',
  },
  styleImageHeader: {
    height: 60,
    width: 60,
  },
  screnSearch: {
    backgroundColor: '#FFF',
    // paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: 15,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  search: {
    fontWeight: 'bold',
    fontSize: 18,
    width: 260,
  },
  rekomendasi: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#404040',
  },
  textrecomendasi: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#ecedf3a1',
  },
  gayarekomendasi: {
    height: 4,
    backgroundColor: '#b1e5d3',
    width: 115,
    marginTop: 2,
  },
  scrolviewRecomendasi: {
    flexGrow: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: '#fafafae3',
    //  alignItems:'center',
    justifyContent: 'center',
  },
  kotakRecomendasi: {
    height: 250,
    elevation: 2,
    backgroundColor: '#FFF',
    marginHorizontal: 5,
    marginTop: 20,
    borderRadius: 15,
    marginBottom: 10,
    width: 160,
  },
  merekHarga: {
    // flexDirection: '',
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  gayaHarga: {
    fontWeight: 'bold',
    color: '#00a46c',
    fontSize: 20,
  },
  footerRecomendasi: {
    paddingHorizontal: 10,
    fontWeight: 'bold',
    color: '#b1e5d3',
    paddingTop: 3,
  },
  viewLoading: {
    backgroundColor: '#FFF',

    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
    alignSelf: 'center',
    width: '95%',
    elevation: 2,
    marginVertical: 10,
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
  forgetCont: {
    backgroundColor: '#00000087',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginbox: {
    width: '90%',
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 70,
  },
  boxTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    position: 'absolute',
    top: 20,
    color: '#2e995594',
  },
  input: {
    width: '100%',
    marginVertical: 5,
  },
  signInButton: {
    padding: 10,
    backgroundColor: '#2e995594',
    borderRadius: 5,
    marginTop: 35,
    width: 80,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 17,
    color: 'white',
  },
  questionText: {
    position: 'absolute',
    bottom: 25,
  },
});
