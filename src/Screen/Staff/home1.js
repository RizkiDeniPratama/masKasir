import AsyncStorage from '@react-native-community/async-storage';
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  TextInput,
  ToastAndroid,
  ScrollView,
} from 'react-native';
// import LinearGradient from 'li';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {enpoint} from '../../../enpoint';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import IonIcons from 'react-native-vector-icons/Ionicons'
export class Home1 extends Component {
  constructor() {
    super();
    this.state = {
      modaladdsuplier: false,
      modaladdbarang: false,
      modalpengeluaran: false,
      token: '',
      loading: false,
      alamat: '',
      nama_supplier: '',
      no_telepon: '',
      barcode: '',
      nama_barang: '',
      kategori: '',
      merek: '',
      stok: '',
      harga_beli: '',
      harga_jual: '',
      diskon: '',
      jenis_pengeluaran: '',
      nominal: '',
    };
  }
  addItem = () => {
    this.setState({loading: true});
    const {
      nama_barang,
      kategori,
      merek,
      stok,
      barcode,
      harga_beli,
      harga_jual,
      diskon,
    } = this.state;

    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${this.state.token}`);
    myHeaders.append('Accept', 'aplication/json');

    var formdata = new FormData();
    formdata.append('stok', stok);
    formdata.append('merek', merek);
    formdata.append('kategori', kategori);
    formdata.append('nama_barang', nama_barang);
    formdata.append('barcode', barcode);
    formdata.append('harga_beli', harga_beli);
    formdata.append('harga_jual', harga_jual);
    formdata.append('diskon', diskon);

    console.log('ini form edit supplier', formdata);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
    };

    fetch(enpoint.addbarang, requestOptions)
      .then((response) => response.json())
      .then((resJson) => {
        console.log('resjson nya sup === ', resJson);
        if (resJson.status === 'success') {
          this.props.navigation.replace('DaftarBarang');
          ToastAndroid.show('Barang berhasil diupdate!', 1500);
        } else {
          this.setState({loading: false});
          ToastAndroid.show('Maaf Barang gagal diubah ya!', 1500);
        }
      })
      .catch((error) => {
        console.log('catch error edit Barang === ', error);
        this.setState({loading: false});
        ToastAndroid.show('Maaf Barang gagal diubah!', 1500);
      });
  };
  addsupplier() {
    this.setState({loading: true});

    const {nama_supplier, alamat, no_telepon} = this.state;

    fetch(enpoint.addsuplier, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      body: JSON.stringify({
        nama_supplier: nama_supplier,
        alamat: alamat,
        no_telepon: no_telepon,
      }),
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        console.log('ini resjson nya', resJson);

        if (resJson.status === 'success') {
          ToastAndroid.show('supplier berhasil di tambah', ToastAndroid.SHORT);

          this.setState({loading: false});
        } else {
          console.log('gagal menambah');
          this.setState({loading: true});
        }
      })
      .catch((error) => {
        alert('ada masalah penambahan supplier', error);
        this.setState({loading: true});
      });
  }

  addPengeluaran() {
    this.setState({loading: true});

    const {jenis_pengeluaran, nominal} = this.state;

    fetch(enpoint.addpengeluaran, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      body: JSON.stringify({
        jenis_pengeluaran: jenis_pengeluaran,
        nominal: nominal,
      }),
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        console.log('ini resjson nya', resJson);

        if (resJson.status === 'success') {
          ToastAndroid.show(
            'pengeluran berhasil di tambah',
            ToastAndroid.SHORT,
          );

          this.setState({loading: false});
        } else {
          console.log('gagal menambah');
          this.setState({loading: true});
        }
      })
      .catch((error) => {
        alert('ada masalah penambahan pengeluran', error);
        this.setState({loading: true});
      });
  }
  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        this.setState({token: token}, () => {});
      } else {
        console.log('token tidak ada');
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{flexDirection: 'row', marginTop: 10, paddingHorizontal: 30}}>
          <View style={{width: '100%'}}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>Home</Text>
          </View>
          <View style={{width: '100%'}}>
            <IonIcons name="ellipsis-vertical-outline" size={20} />
          </View>
        </View>
        <View style={{flex: 1, marginTop: 15, paddingHorizontal: 24}}>
          <Image
            source={require('../../Assets/Images/header.jpg')}
            resizeMode="cover"
            style={{
              width: '100%',
              height: '80%',
              borderRadius: 15,
            }}
          />
        </View>
        {/* ............BAWAH.......... */}
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 8,
              marginTop: 10,
              flexWrap: 'wrap',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
              }}>
              <TouchableOpacity
                onPress={() => this.setState({modaladdsuplier: true})}
                style={[styles.button, styles.shadow]}>
                <IonIcons name="person-add" size={35} />
              </TouchableOpacity>
              <Text style={{fontSize: 13, marginTop: 7, fontWeight: 'bold'}}>
                Add suplier
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
              }}>
              <TouchableOpacity style={[styles.button, styles.shadow]}>
                <FontAwesome name="list-alt" size={35} />
              </TouchableOpacity>
              <Text style={{fontSize: 13, marginTop: 7, fontWeight: 'bold'}}>
                Add Category
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
              }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Daftarsup')}
                style={[styles.button, styles.shadow]}>
                <IonIcons name="reader" size={35} />
              </TouchableOpacity>
              <Text style={{fontSize: 13, marginTop: 7, fontWeight: 'bold'}}>
                List suplier
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
              }}>
              <TouchableOpacity
                onPress={() => this.setState({modaladdbarang: true})}
                style={[styles.button, styles.shadow]}>
                <IonIcons name="add-circle" size={35} />
              </TouchableOpacity>
              <Text style={{fontSize: 13, marginTop: 7, fontWeight: 'bold'}}>
                add item
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
              }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('DaftarBarang')}
                style={[styles.button, styles.shadow]}>
                <IonIcons name="reader" size={35} />
              </TouchableOpacity>
              <Text style={{fontSize: 13, marginTop: 7, fontWeight: 'bold'}}>
                List Item
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
              }}>
              <TouchableOpacity
                onPress={() => this.setState({modalpengeluaran: true})}
                style={[styles.button, styles.shadow]}>
                <IonIcons name="reader" size={35} />
              </TouchableOpacity>
              <Text style={{fontSize: 13, marginTop: 7, fontWeight: 'bold'}}>
                pengeluaran
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
              }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('AddPembelian')}
                style={[styles.button, styles.shadow]}>
                <IonIcons name="reader" size={35} />
              </TouchableOpacity>
              <Text style={{fontSize: 13, marginTop: 7, fontWeight: 'bold'}}>
                pembelian
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
              }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Daftarsup')}
                style={[styles.button, styles.shadow]}>
                <IonIcons name="reader" size={35} />
              </TouchableOpacity>
              <Text style={{fontSize: 13, marginTop: 7, fontWeight: 'bold'}}>
                tambahan
              </Text>
            </View>
          </View>
        </View>
        {/* ..........KUMPULAN MODAL.......... */}
        {/* ............TAMBAH SUPPLIER........... */}
        <Modal
          transparent={true}
          visible={this.state.modaladdsuplier}
          statusBarTranslucent={true}
          animationType={'fade'}
          onRequestClose={() => this.setState({modaladdsuplier: false})}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => this.setState({modaladdsuplier: false})}
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
        </Modal>
        {/* .................TAMBAH BARANG............... */}
        <Modal
          animationType="slide"
          visible={this.state.modaladdbarang}
          onRequestClose={() => this.setState({modaladdbarang: false})}>
          <View style={styles.utama}>
            <ScrollView>
              <View style={styles.br}>
                <View style={{alignItems: 'center', marginBottom: 10}}>
                  <Text style={{fontWeight: 'bold'}}>Tambah Barang </Text>
                </View>

                <View style={{width: '100%', marginVertical: 15}}>
                  {/* ....NAMA BARANG.... */}
                  <Text style={{fontWeight: 'bold'}}> nama barang </Text>

                  <View style={styles.data2}>
                    <View style={{width: '8%'}}>
                      <IonIcons name="grid-outline" size={20} />
                    </View>

                    <View style={{width: '92%'}}>
                      <TextInput
                        placeholder={'nama barang'}
                        value={this.state.nama_barang}
                        onChangeText={(t) => this.setState({nama_barang: t})}
                      />
                    </View>
                  </View>
                  {/* ......BARCODE........ */}
                  <Text style={{fontWeight: 'bold'}}> barcode </Text>

                  <View style={styles.data2}>
                    <View style={{width: '8%'}}>
                      <IonIcons name="barcode-sharp" size={20} />
                    </View>

                    <View style={{width: '92%'}}>
                      <TextInput
                        placeholder={'barcode'}
                        value={this.state.barcode}
                        onChangeText={(t) => this.setState({barcode: t})}
                      />
                    </View>
                  </View>
                  {/* ..........STOK......... */}
                  <Text style={{fontWeight: 'bold'}}> stok </Text>

                  <View style={styles.data2}>
                    <View style={{width: '8%'}}>
                      <IonIcons name="layers" size={20} />
                    </View>

                    <View style={{width: '92%'}}>
                      <TextInput
                        placeholder={'stok barang'}
                        value={this.state.stok}
                        onChangeText={(t) => this.setState({stok: t})}
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
                        placeholder={'merek barang'}
                        value={this.state.merek}
                        onChangeText={(t) => this.setState({merek: t})}
                      />
                    </View>
                  </View>
                  {/* .........HARGA BELI.......... */}
                  <Text style={{fontWeight: 'bold'}}> harga beli </Text>

                  <View style={styles.data2}>
                    <View style={{width: '8%'}}>
                      <IonIcons name="trending-down-sharp" size={20} />
                    </View>

                    <View style={{width: '92%'}}>
                      <TextInput
                        placeholder={'harga beli barang'}
                        value={this.state.harga_beli}
                        onChangeText={(t) => this.setState({harga_beli: t})}
                      />
                    </View>
                  </View>
                  {/* ...........HARGA JUAL.......... */}
                  <Text style={{fontWeight: 'bold'}}> harga jual </Text>
                  <View style={styles.data2}>
                    <View style={{width: '8%'}}>
                      <IonIcons name="trending-up-sharp" size={20} />
                    </View>

                    <View style={{width: '92%'}}>
                      <TextInput
                        placeholder={'harga jual barang'}
                        value={this.state.harga_jual}
                        onChangeText={(t) => this.setState({harga_jual: t})}
                      />
                    </View>
                  </View>
                  {/* ............DISKON........... */}
                  <Text style={{fontWeight: 'bold'}}> Diskon </Text>

                  <View style={styles.data2}>
                    <View style={{width: '8%'}}>
                      <IonIcons name="pricetags" size={20} />
                    </View>

                    <View style={{width: '92%'}}>
                      <TextInput
                        placeholder={'Diskon barang'}
                        value={this.state.diskon}
                        onChangeText={(t) => this.setState({diskon: t})}
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
                        placeholder={'kategori barang 1 - 3'}
                        value={this.state.kategori}
                        onChangeText={(t) => this.setState({kategori: t})}
                      />
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => this.addItem()}
                  style={styles.t3}>
                  <Text style={{fontWeight: 'bold', color: 'white'}}>
                    Tambah
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </Modal>
        {/* .........PEMBELIAN.......... */}
        <Modal
          transparent={true}
          visible={this.state.modalpengeluaran}
          statusBarTranslucent={true}
          animationType={'fade'}
          onRequestClose={() => this.setState({modalpengeluaran: false})}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => this.setState({modalpengeluaran: false})}
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
                  jenis pengeluaran
                </Text>
              </View>
              <View style={{marginTop: 30}}>
                <View>
                  <TextInput
                    style={styles.input}
                    keyboardType={'email-address'}
                    autoCapitalize={'none'}
                    // autoCompleteType={'email'}
                    placeholder={'Jenis Pengeluaran'}
                    value={this.state.jenis_pengeluaran}
                    underlineColorAndroid={'#12a548'}
                    onChangeText={(text) =>
                      this.setState({jenis_pengeluaran: text})
                    }
                  />
                </View>
                <View>
                  <TextInput
                    style={styles.input}
                    keyboardType={'email-address'}
                    autoCapitalize={'none'}
                    // autoCompleteType={'email'}
                    placeholder={'nominal'}
                    value={this.state.nominal}
                    underlineColorAndroid={'#12a548'}
                    onChangeText={(text) => this.setState({nominal: text})}
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
                  onPress={() => this.addPengeluaran()}>
                  {this.state.loading ? (
                    <ActivityIndicator size={20} color={'black'} />
                  ) : (
                    <Text style={styles.buttonText}>Kirim</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}

export default Home1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 7,
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
