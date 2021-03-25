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
import IonIcons from 'react-native-vector-icons/Ionicons';
export default class GetPenjualan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: [],
      token: '',
      modalEdit: false,
      loading: true,
      jumlah: '',
      item_id: '',
      // transaksi: props.route.params.data.kode_transaksi,
    };
  }

  getTransaksi() {
    fetch(enpoint.getTransaksi + this.props.route.params.data.kode_transaksi, {
      method: 'GET',
      headers: {
        Accept: 'aplication/json',
        'Content-Type': 'aplication/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((response) => response.json())
      .then((resJson) => {
        console.log('ini data penjualan', resJson);
        if (resJson.detail) {
          this.setState({detail: resJson.detail, loading: false});
        }
      })
      .catch((error) => {
        console.log('error is' + error);
      });
  }
  // getAllPenjualan() {
  //   console.log('mengambil data penjualan');
  //   fetch(enpoint.getAllPenjualan, {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'aplication/json',
  //       'Content-Type': 'aplication/json',
  //       Authorization: `Bearer ${this.state.token}`,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((resJson) => {
  //       const data = resJson.data;
  //       console.log('mengambil semua data penjualan', data);
  //       // console.log(data);
  //       if (data) {
  //         this.setState({transaksi: data});
  //         this.getTransaksi();
  //       }
  //     })
  //     .catch((error) => {
  //       console.log('error is' + error);
  //     });
  // }
  editItem() {
    console.log('mengupdate produk..');
    // console.log('ini id nya');
    const {jumlah} = this.state;
    var dataUpdate = {
      jumlah: jumlah,
    };
    this.setState({loading: true});
    fetch(
      `https://pos-maskasir.herokuapp.com/api/penjualan/update/${this.state.item_id}`,
      {
        method: 'POST',
        body: JSON.stringify(dataUpdate),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.state.token}`,
        },
      },
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.status == 'success') {
          this.setState({loading: false, modalEdit: false});
          ToastAndroid.show('Produk telah diperbarui', ToastAndroid.SHORT);
          this.getTransaksi();
        } else {
          this.setState({loading: false});
          ToastAndroid.show('Periksa koneksi Anda.', ToastAndroid.SHORT);
        }
      })
      .catch((error) => console.log(error));
    this.setState({loading: false});
  }
  deleteItem = (id) => {
    console.log('menghapus');
    const url = `https://pos-maskasir.herokuapp.com/api/penjualan/delete/${id}`;
    fetch(url, {
      method: 'DELETE',
      headers: {
        // Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        console.log('resjson hapus', resJson);
        if (resJson.status === 'success') {
          this.setState({loading: false});
          ToastAndroid.show('Item telah dihapus', ToastAndroid.SHORT);
          this.getPenjualan();
        } else {
          console.log('gagal menghapus');
          this.setState({loading: false});
          ToastAndroid.show('Periksa koneksi Anda.', ToastAndroid.SHORT);
        }
      })
      .catch((error) => {
        console.log('error is' + error);
      });
  };
  componentDidMount() {
    AsyncStorage.getItem('token').then((value) => {
      if (value != null) {
        this.setState({token: value});
        this.getTransaksi();
      } else {
        console.log('token tidak ada');
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.scrollViewCont}>
          <View style={[styles.header, styles.shadow]}>
            <IonIcons
              name="arrow-back-outline"
              size={30}
              style={{
                marginLeft: 20,
              }}
              // onPress={() =>
              //   this.props.navigation.navigate('Nasabah', {screen: 'Akun'})
              // }
            />
            <Text style={{marginLeft: 70, fontSize: 20, fontWeight: 'bold'}}>
              Daftar Penjualan
            </Text>
          </View>
          <ScrollView>
            {this.state.loading ? (
              <ActivityIndicator size={20} color={'black'} />
            ) : (
              <>
                {this.state.detail !== '' ? (
                  <View style={styles.addressScroll}>
                    {this.state.detail.map((v, i) => {
                      return (
                        <TouchableOpacity
                          activeOpacity={0.95}
                          style={styles.addressList}
                          key={i}>
                          <View style={styles.addressListHead}>
                            <Text style={styles.addressListNumber}>
                              Barang {(i + 1).toString()}
                            </Text>
                            <AntDesign
                              name={'checkcircle'}
                              color={'green'}
                              size={25}
                              onPress={() => {}}
                            />
                          </View>
                          <Text>barcode :{v.barcode}</Text>
                          <Text>nama :{v.nama_barang}</Text>
                          <Text>jumlah barang :{v.jumlah}</Text>
                          <Text>kategori :{v.kategori}</Text>
                          <Text>merek :{v.merek}</Text>
                          {/* <Text>{v.stok}</Text> */}
                          {/* <Text>{v.diskon}</Text> */}
                          <Text>harga :{v.harga}</Text>
                          <Text>harga jual :{v.harga_jual}</Text>

                          <View style={{flexDirection: 'row-reverse'}}>
                            <View style={styles.iconsCont}>
                              <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() =>
                                  this.setState({
                                    modalEdit: true,
                                    item_id: v.id,
                                  })
                                }
                                style={styles.dataButton}>
                                <Text style={styles.dataText}> edit </Text>
                              </TouchableOpacity>
                            </View>

                            <View style={styles.iconsCont}>
                              <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => this.deleteItem(v.id)}
                                style={styles.dataButton1}>
                                <Text style={styles.dataText}> hapus </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                ) : (
                  <View>
                    <Text
                      style={{
                        alignSelf: 'center',
                        marginTop: 200,
                        fontWeight: 'bold',
                      }}>
                      BELUM ADA DATA PEMBELIAN
                    </Text>
                  </View>
                )}
              </>
            )}
          </ScrollView>
        </View>
        <Modal
          transparent={true}
          visible={this.state.modalEdit}
          statusBarTranslucent={true}
          animationType={'fade'}
          onRequestClose={() => this.setState({modalEdit: false})}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => this.setState({modalEdit: false})}
            style={styles.forgetCont}>
            <View style={styles.loginbox}>
              <Text style={styles.boxTitle}>Edit Item</Text>
              <TextInput
                style={styles.input}
                keyboardType={'number-pad'}
                autoCapitalize={'none'}
                // autoCompleteType={'jumlah'}
                placeholder={'jumlah yang di ubah'}
                value={this.state.jumlah}
                underlineColorAndroid={'#12a548'}
                onChangeText={(text) => this.setState({jumlah: text})}
              />
              <TouchableOpacity
                style={styles.signInButton}
                onPress={() => this.editItem()}>
                {this.state.loading ? (
                  <ActivityIndicator size={20} color={'black'} />
                ) : (
                  <Text style={styles.buttonText}>Edit</Text>
                )}
              </TouchableOpacity>
              <Text style={styles.questionText}>
                masukkan jumlah barang dengan tepat!
              </Text>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'green',
    alignItems: 'center',
    // paddingTop: 35,
  },
  scrollViewCont: {
    flex: 1,
    width: '100%',
  },
  header: {
    backgroundColor: '#FFF',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
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
  iconsCont: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    // width: '100%',
  },
  dataText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e8e8e8',
  },
  dataButton1: {
    flexDirection: 'row',
    // padding: 5,
    borderRadius: 5,
    // alignSelf:'flex-start',
    // justifyContent: 'flex-start',
    backgroundColor: 'red',
    left: 20,
  },
  dataButton: {
    flexDirection: 'row',
    padding: 3,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
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
