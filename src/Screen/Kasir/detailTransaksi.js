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
  TouchableNativeFeedback,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {enpoint} from '../../../enpoint';
import AntDesign from 'react-native-vector-icons/AntDesign';
import IonIcons from 'react-native-vector-icons/Ionicons';
export default class DetailTransaksi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: [],
      token: '',
      modalEdit: false,
      loading: true,
      jumlah: '',
      item_id: '',
      transaksi: '',
      modalInputMember: false,
      data: '',
      kembalian: '',
      modalBayar: false,
      bayar: '',
    };
  }
  detailTransaksi = () => {
    return (
      <View style={{margin: 10, padding: 10}}>
        <View style={{flexDirection: 'column'}}>
          <View style={{paddingVertical: 20}}>
            <Text> {this.state.data.kode_transaksi}</Text>
          </View>
          <View style={{paddingVertical: 20}}>
            <Text> {this.state.data.kode_member}</Text>
          </View>
          <View style={{paddingVertical: 20}}>
            <Text> {this.state.data.diskon} </Text>
          </View>
          <View style={{paddingVertical: 20}}>
            <Text> {this.state.data.harga_total} </Text>
          </View>
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: 'blue',
                paddingVertical: 20,
                borderRadius: 10,
              }}
              onPress={() =>
                this.setState({
                  modalBayar: true,
                })
              }>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                {' '}
                Bayar{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Text> Total : </Text>
          <Text>{'Rp.' + this.state.data.harga_total}</Text>
        </View>
        {this.state.kembalian !== '' ? (
          <View
            style={{
              marginTop: 20,
              borderWidth: 1,
              paddingVertical: 8,
              paddingHorizontal: 20,
              flexDirection: 'row',
            }}>
            <Text>Kembalian : </Text>
            <Text style={{fontWeight: 'bold'}}>
              {this.state.kembalian.kembalian}{' '}
            </Text>
          </View>
        ) : (
          <View
            style={{
              marginTop: 20,
              borderWidth: 1,
              paddingVertical: 8,
              paddingHorizontal: 20,
              flexDirection: 'row',
            }}>
            <Text>Kembalian : </Text>
            <Text style={{fontWeight: 'bold'}}>
              Pembayaran belum dilakukan{' '}
            </Text>
          </View>
        )}
      </View>
    );
  };
  getHarga() {
    const {kode_member} = this.state;
    // console.log('ini id barang', this.state.transaksi);
    console.log('ini isi nya bos', this.state.data);

    fetch(enpoint.getHarga + this.props.route.params.data, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      body: JSON.stringify({
        kode_member: kode_member,
      }),
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        console.log('ini resjson nya get transaksi', resJson);
        if (resJson.transaksi) {
          this.setState({data: resJson.transaksi, loading: false});
          ToastAndroid.show('sudah di tambah', ToastAndroid.SHORT);
          this.detailTransaksi();
          this.setState({modalInputMember: false});
        } else {
          console.log('gagal tambah');
        }
      })
      .catch((error) => {
        // alert('ada masalah tambah', error);
        console.log('error ambil' + error);
      });
  }
  bayar() {
    const {bayar} = this.state;
    // console.log('ini id barang', this.state.transaksi);
    console.log('ini isi nya bos', this.state.data);

    fetch(enpoint.bayar + this.props.route.params.data, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      body: JSON.stringify({
        bayar: bayar,
      }),
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        console.log('ini resjson bayar', resJson);
        if (resJson) {
          this.setState({kembalian: resJson, loading: false});
          ToastAndroid.show('pembayaran sukses', ToastAndroid.SHORT);
          this.detailTransaksi();
          this.setState({modalBayar: false});
        } else {
          console.log('gagal bayar');
        }
      })
      .catch((error) => {
        // alert('ada masalah tambah', error);
        console.log('error ambil' + error);
      });
  }
  getTransaksi() {
    fetch(enpoint.getTransaksi + this.props.route.params.data, {
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
          this.getTransaksi();
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
    // console.log('ini kodenya', this.props.route.params);
    console.log('ini data kembalian', this.state.kembalian);
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
              onPress={() => this.props.navigation.navigate('TambahBarang')}
            />
            <Text style={{marginLeft: 70, fontSize: 20, fontWeight: 'bold'}}>
              Detail Transaksi
            </Text>
          </View>
          <ScrollView>
            {this.state.loading ? (
              <ActivityIndicator size={20} color={'black'} />
            ) : (
              <>
                {this.state.data !== '' ? (
                  <View>{this.detailTransaksi()}</View>
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
                        .
                      </View>
                    )}
                  </>
                )}
              </>
            )}
          </ScrollView>
        </View>
        <TouchableOpacity
          onPress={() => this.setState({modalInputMember: true})}
          style={styles.rmb}>
          <View style={styles.vpm}>
            <IonIcons name="receipt-outline" size={25} color="white" />
          </View>

          <Text style={{fontWeight: 'bold', color: 'grey'}}>Get Transaksi</Text>
        </TouchableOpacity>
        {/* ......MODAL EDIT........ */}
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
        {/* ......MODAL INPUT DATA MEMBER....... */}
        <Modal
          transparent={true}
          visible={this.state.modalInputMember}
          statusBarTranslucent={true}
          animationType={'fade'}
          onRequestClose={() => this.setState({modalInputMember: false})}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => this.setState({modalInputMember: false})}
            style={styles.forgetCont}>
            <View style={styles.loginbox}>
              <Text style={styles.boxTitle}>Masukkan Kode Member</Text>
              <TextInput
                style={styles.input}
                keyboardType={'email-address'}
                placeholder={'kode member'}
                value={this.state.kode_member}
                underlineColorAndroid={'#12a548'}
                onChangeText={(text) => this.setState({kode_member: text})}
              />
              <TouchableOpacity
                style={styles.signInButton}
                onPress={() => this.getHarga()}>
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
        {/* .....MODAL BAYAR...... */}
        <Modal
          transparent={true}
          visible={this.state.modalBayar}
          statusBarTranslucent={true}
          animationType={'fade'}
          onRequestClose={() => this.setState({modalBayar: false})}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => this.setState({modalBayar: false})}
            style={styles.forgetCont}>
            <View style={styles.loginbox}>
              <Text style={styles.boxTitle}>Masukkan jumlah Uang</Text>
              <TextInput
                style={styles.input}
                keyboardType={'email-address'}
                placeholder={'Jumlah Duit'}
                value={this.state.bayar}
                underlineColorAndroid={'#12a548'}
                onChangeText={(text) => this.setState({bayar: text})}
              />
              <TouchableOpacity
                style={styles.signInButton}
                onPress={() => this.bayar()}>
                {this.state.loading ? (
                  <ActivityIndicator size={20} color={'black'} />
                ) : (
                  <Text style={styles.buttonText}>Bayar</Text>
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
  rmb: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    alignItems: 'center',
  },
  vpm: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    elevation: 5,
    marginBottom: 5,
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
