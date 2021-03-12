import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ToastAndroid,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {enpoint} from '../../../enpoint';

class editakun extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      data: '',
      name: props.route.params.data.name,
      foto_profil: {uri: '', type: 'image/jpeg', fileName: 'profilLama'},
      tgl_lahir: props.route.params.data.tgl_lahir,
      alamat: props.route.params.data.alamat,
      email: props.route.params.data.email,
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
    fetch(enpoint.editprofile, {
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
          this.props.navigation.navigate('Member', {screen: 'Home3'});

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
  back = () => {
    this.props.navigation.navigate('Member', {screen: 'Home3'});
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
  // handleChoosePhoto = () => {
  //   const option = {
  //     noData: true,
  //   };
  //   ImagePicker.showImagePicker(option, (response) => {
  //     console.log(response);
  //     if (response.uri) {
  //       this.setState({foto_profil: response});
  //     }
  //   });
  // };

  // handleEditProfile = () => {
  //   if (
  //     this.state.name &&
  //     this.state.alamat &&
  //     this.state.foto_profil &&
  //     this.state.tgl_lahir
  //   ) {
  //     Alert.alert('Edit Profil', 'Pastikan data yang anda masukkan sesuai!', [
  //       {
  //         text: 'Batal',
  //       },
  //       {
  //         text: 'Lanjutkan',
  //         onPress: this.editProfile,
  //       },
  //     ]);
  //   } else {
  //     ToastAndroid.show('Masukkan data anda dengan benar', 1200);
  //   }
  // };
  // editProfile = () => {
  //   this.setState({loading: true});
  //   const {name, alamat, tgl_lahir, email, foto_profil} = this.state;

  //   var myHeaders = new Headers();
  //   myHeaders.append('Authorization', `Bearer${this.state.token}`);

  //   var formdata = new FormData();
  //   formdata.append('name', name);
  //   formdata.append('alamat', alamat);
  //   formdata.append('tgl_lahir', tgl_lahir);
  //   formdata.append('email', email);
  //   formdata.append('foto_profil', foto_profil);
  //   formdata.append('_method', 'patch');

  //   console.log('ini form edit profile', formdata);

  //   var requestOptions = {
  //     method: 'POST',
  //     headers: myHeaders,
  //     body: formdata,
  //   };

  //   fetch(enpoint.editprofile, requestOptions)
  //     .then((response) => response.json())
  //     .then((resJson) => {
  //       console.log('hasil edit profile === ', resJson);
  //       if (resJson.status === 'Update Successfully') {
  //         this.props.navigation.navigate('Member', {screen: 'Home3'});
  //         ToastAndroid.show('Profil berhasil diupdate!', 1500);
  //       } else {
  //         this.setState({loading: false});
  //         ToastAndroid.show('Maaf profil gagal diubah!', 1500);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log('catch error edit profil === ', error);
  //       this.setState({loading: false});
  //       ToastAndroid.show('Maaf profil gagal diubah!', 1500);
  //     });
  // };
  // handleChoosePhoto = () => {
  //   let options = {
  //     includeBase64: false,
  //   };
  //   launchImageLibrary(options, (response) => {
  //     console.log('ini response imagepicker === ', response);
  //     if (response.fileSize < 10000000000) {
  //       let photo = {
  //         name: response.fileName,
  //         type: response.type,
  //         uri: response.uri,
  //       };
  //       this.setState({foto_profil: photo});
  //     } else {
  //       ToastAndroid.show('File gambar terlalu besar', 1200);
  //     }
  //   });
  // };
  componentDidMount() {
    AsyncStorage.getItem('token').then((value) => {
      if (value != null) {
        this.setState({token: value}, () => {});
      } else {
        console.log('token tidak ada');
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <IonIcons
            name="arrow-back-outline"
            size={30}
            style={{
              marginLeft: 20,
            }}
            onPress={() =>
              this.props.navigation.navigate('Member', {screen: 'Home3'})
            }
          />
          <Text style={{marginLeft: 70, fontSize: 20, fontWeight: 'bold'}}>
            Edit Profile
          </Text>
        </View>
        <ScrollView>
          {/* tambah photo */}
          <View style={styles.foto_profil}>
            <TouchableOpacity
              style={styles.addfoto_profil}
              activeOpacity={0.7}
              onPress={() => this.handleEditPhoto()}>
              {this.state.foto_profil.uri !== '' ? (
                <Image
                  style={styles.profile}
                  source={{uri: this.state.foto_profil.uri}}
                />
              ) : (
                <View>
                  <MaterialIcons name="add-a-photo" size={150} />
                </View>
              )}
              {/* <View>
                <MaterialIcons name="add-a-photo" size={150} />
              </View> */}
            </TouchableOpacity>
          </View>
          {/* nama user */}
          <View style={styles.inputView}>
            <View style={styles.headerName}>
              <Text style={{fontWeight: 'bold'}}>Nama</Text>
              <Text style={{color: 'red'}}>*</Text>
            </View>
            <TextInput
              placeholder={'Nama Anda'}
              style={styles.input}
              value={this.state.name}
              onChangeText={(teks) => this.setState({name: teks})}
            />
          </View>

          {/* Email */}
          <View style={styles.inputView}>
            <View style={styles.headerName}>
              <Text style={{fontWeight: 'bold'}}>Nama</Text>
              <Text style={{color: 'red'}}>*</Text>
            </View>
            <TextInput
              placeholder={'Email Anda'}
              style={styles.input}
              value={this.state.email}
              onChangeText={(teks) => this.setState({email: teks})}
            />
          </View>
          {/* TGL LAHIR */}
          <View style={styles.inputView}>
            <View style={styles.headerName}>
              <Text style={{fontWeight: 'bold'}}>tanggal lahir</Text>
              <Text style={{color: 'red'}}>*</Text>
            </View>
            <TextInput
              placeholder={'contoh masukkan tgl 20-01-1999'}
              style={styles.input}
              value={this.state.tgl_lahir}
              editable={this.props.editable}
              onChangeText={(teks) => this.setState({tgl_lahir: teks})}
            />
          </View>

          {/* no hp */}
          <View style={styles.inputView}>
            <View style={styles.headerName}>
              <Text style={{fontWeight: 'bold'}}>ALAMAT</Text>
              <Text style={{color: 'red'}}>*</Text>
            </View>
            <TextInput
              placeholder={'Mohon masukkan alamat dengan benar'}
              style={styles.input}
              value={this.state.alamat}
              onChangeText={(teks) => this.setState({alamat: teks})}
            />
          </View>

          {/* edit profile */}
          <TouchableOpacity style={styles.nampil} onPress={() => this.edit()}>
            {this.state.loading ? (
              <ActivityIndicator size={20} color={'white'} />
            ) : (
              <Text
                style={{
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: 'white',
                }}>
                Edit
              </Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

export default editakun;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#FFF',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  foto_profil: {
    backgroundColor: '#FFF',
    height: 200,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  addfoto_profil: {
    borderWidth: 2,
    padding: 10,
    borderStyle: 'dashed',
    borderRadius: 5,
  },
  inputView: {
    backgroundColor: '#FFF',
    height: 90,
    marginTop: 10,
  },
  headerName: {
    backgroundColor: '#FFF',
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  input: {
    paddingHorizontal: 20,
  },
  inputKategori: {
    backgroundColor: '#FFF',
    height: 50,
    marginTop: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputPrice: {
    backgroundColor: '#FFF',
    height: 50,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    width: '100%',
  },
  inputstok: {
    backgroundColor: '#FFF',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 1,
  },
  nampil: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    height: 50,
    width: 200,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  profile: {
    height: 150,
    width: 150,
  },
});
