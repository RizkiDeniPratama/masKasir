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
import IonIcons from 'react-native-vector-icons/Ionicons';
import {enpoint} from '../../../enpoint';
import AsyncStorage from '@react-native-community/async-storage';
export class edititem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      token: '',
      nama_barang: props.route.params.item.nama_barang,
      barcode: props.route.params.item.barcode,
      diskon: props.route.params.item.diskon,
      merek: props.route.params.item.merek,
      kategori: props.route.params.item.kategori,
      stok: props.route.params.item.stok,
      harga_beli: props.route.params.item.harga_beli,
      harga_jual: props.route.params.item.harga_jual,
    };
  }
  editProfile = () => {
    this.setState({loading: true});
    const {
      nama_barang,
      barcode,
      diskon,
      merek,
      kategori,
      stok,
      harga_beli,
      harga_jual,
    } = this.state;

    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${this.state.token}`);
    myHeaders.append('Accept', 'aplication/json');

    var formdata = new FormData();
    formdata.append('_method', 'put');
    formdata.append('barcode', barcode);
    formdata.append('stok', stok);
    formdata.append('diskon', diskon);
    formdata.append('merek', merek);
    formdata.append('kategori', kategori);
    formdata.append('stok', stok);
    formdata.append('harga_beli', harga_beli);
    formdata.append('harga_jual', harga_jual);
    formdata.append('nama_barang', nama_barang);

    console.log('ini form edit barang', formdata);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
    };

    fetch(enpoint.editBarang + this.props.route.params.item.id, requestOptions)
      .then((response) => response.json())
      .then((resJson) => {
        console.log('resjson nya sup === ', resJson);
        if (resJson.status === 'success') {
          this.props.navigation.replace('DaftarBarang');
          ToastAndroid.show('Barang berhasil diupdate!', 1500);
        } else {
          this.setState({loading: false});
          ToastAndroid.show('Maaf barang gagal diubah ya!', 1500);
        }
      })
      .catch((error) => {
        console.log('catch error edit barang === ', error);
        this.setState({loading: false});
        ToastAndroid.show('Maaf barang gagal diubah!', 1500);
      });
  };
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
              onPress={() => this.editProfile()}
              style={styles.t3}>
              <Text style={{fontWeight: 'bold', color: 'white'}}>Tambah</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default edititem;

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
