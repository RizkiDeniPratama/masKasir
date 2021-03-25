import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
// import {enpoint} from '../../../enpoint';
import IonIcons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
export default class Daftarsup extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     data: [],
  //     token: '',
  //     modaleditsuplier: false,
  //     nama_supplier: '',
  //     alamat: '',
  //     no_telepon: '',
  //   };
  // }

  // getprofile() {
  //   fetch(enpoint.getallbarang, {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'aplication/json',
  //       'Content-Type': 'aplication/json',
  //       Authorization: `Bearer ${this.state.token}`,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((resJson) => {
  //       console.log('darirofil', resJson);
  //       if (resJson.data) {
  //         this.setState({data: resJson.data});
  //       }
  //     })
  //     .catch((error) => {
  //       console.log('error is' + error);
  //     });
  // }
  // componentDidMount() {
  //   AsyncStorage.getItem('token').then((value) => {
  //     if (value != null) {
  //       this.setState({token: value}, () => {
  //         this.getprofile();
  //       });
  //     } else {
  //       console.log('token tidak ada');
  //     }
  //   });
  // }
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
              Edit Profile
            </Text>
          </View>
          <ScrollView>
            <View style={styles.addressScroll}>
              <TouchableOpacity
                activeOpacity={0.95}
                style={styles.addressList}
                // key={i}
                // onPress={() => this.setState({modaleditsuplier: true})}
                // onPress={() =>
                //   this.props.navigation.navigate('Editsup', {
                //     item: v,
                //   })
                // }
              >
                <View style={styles.addressListHead}>
                  <Text style={styles.addressListNumber}>Barang 1</Text>
                  <AntDesign
                    name={'checkcircle'}
                    color={'green'}
                    size={25}
                    onPress={() => {}}
                  />
                </View>
                <Text>nama barang</Text>
                <Text>barcode</Text>
                <Text>kategori</Text>
                <Text>merek</Text>
                <Text>stok</Text>
                <Text>diskon</Text>
                <Text>harga beli</Text>
                <Text>harga jual</Text>
              </TouchableOpacity>
            </View>
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
  header: {
    backgroundColor: '#FFF',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
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
