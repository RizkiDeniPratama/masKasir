import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {enpoint} from '../../../enpoint';
import AsyncStorage from '@react-native-community/async-storage';
export class Editsupp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      token: '',
      nama_supplier: props.route.params.item.nama_supplier,
      alamat: props.route.params.item.alamat,
      no_telepon: props.route.params.item.no_telepon,
    };
  }
  editProfile = () => {
    this.setState({loading: true});
    const {nama_supplier, alamat, no_telepon} = this.state;

    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${this.state.token}`);
    myHeaders.append('Accept', 'aplication/json');

    var formdata = new FormData();
    formdata.append('_method', 'put');
    formdata.append('alamat', alamat);
    formdata.append('no_telepon', no_telepon);
    formdata.append('nama_supplier', nama_supplier);

    console.log('ini form edit supplier', formdata);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
    };

    fetch(enpoint.editsupli + this.props.route.params.item.id, requestOptions)
      .then((response) => response.json())
      .then((resJson) => {
        console.log('resjson nya sup === ', resJson);
        if (resJson.status === 'success') {
          this.props.navigation.replace('Daftarsup');
          ToastAndroid.show('Supplier berhasil diupdate!', 1500);
        } else {
          this.setState({loading: false});
          ToastAndroid.show('Maaf supplier gagal diubah ya!', 1500);
        }
      })
      .catch((error) => {
        console.log('catch error edit supplier === ', error);
        this.setState({loading: false});
        ToastAndroid.show('Maaf supplier gagal diubah!', 1500);
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
  //   editProfile() {
  //     this.setState({loading: true});

  //     const {nama_supplier, alamat, no_telepon} = this.state;

  //     fetch(enpoint.editsupli + `${this.props.route.params.item.id}`, {
  //       method: 'POST',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${this.state.token}`,
  //       },
  //       body: JSON.stringify({
  //         nama_supplier: nama_supplier,
  //         alamat: alamat,
  //         no_telepon: no_telepon,
  //         _method: 'put',
  //       }),
  //     })
  //       .then((respon) => respon.json())
  //       .then((resJson) => {
  //         console.log('ini resjson nya', resJson);

  //         if (resJson.status === 'success') {
  //           ToastAndroid.show('supplier berhasil di tambah', ToastAndroid.SHORT);
  //           this.props.navigation.replace('Daftarsup');

  //           this.setState({loading: false});
  //         } else {
  //           console.log('gagal menambah');
  //           this.setState({loading: true});
  //         }
  //       })
  //       .catch((error) => {
  //         alert('ada masalah penambahan supplier', error);
  //         this.setState({loading: true});
  //       });
  //   }
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View
            style={{
              width: '90%',
              backgroundColor: '#fff',
              alignSelf: 'center',
              //   justifyContent: 'center',
              borderRadius: 10,
              paddingHorizontal: 15,
              height: '70%',
            }}>
            <View style={{width: '100%', height: 50, justifyContent: 'center'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: 20,
                }}>
                Edit Supplier
              </Text>
            </View>
            <View style={{marginTop: 30}}>
              <View>
                <TextInput
                  //   style={styles.input}
                  keyboardType={'email-address'}
                  autoCapitalize={'none'}
                  // autoCompleteType={'email'}
                  placeholder={this.state.nama_supplier}
                  value={this.state.nama_supplier}
                  underlineColorAndroid={'#12a548'}
                  onChangeText={(text) => this.setState({nama_supplier: text})}
                />
              </View>
              <View>
                <TextInput
                  //   style={styles.input}
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
                  //   style={styles.input}
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
                onPress={() => this.editProfile()}>
                {this.state.loading ? (
                  <ActivityIndicator size={20} color={'black'} />
                ) : (
                  <Text>Kirim</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default Editsupp;
