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
    fetch(enpoint.getallbarang, {
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
              Daftar Barang
            </Text>
          </View>
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
                        this.props.navigation.navigate('EditBarang', {
                          item: v,
                        })
                      }>
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
                      <Text>{v.barcode}</Text>
                      <Text>{v.nama_barang}</Text>
                      <Text>{v.kategori}</Text>
                      <Text>{v.merek}</Text>
                      <Text>{v.stok}</Text>
                      <Text>{v.diskon}</Text>
                      <Text>{v.harga_beli}</Text>
                      <Text>{v.harga_jual}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </ScrollView>
        </View>
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
});
