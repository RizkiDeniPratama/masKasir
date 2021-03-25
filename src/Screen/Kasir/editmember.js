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
import IonIcons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import {enpoint} from '../../../enpoint';
export class editmember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      loading: false,
      refresh: false,
      modalEdit: false,
      name: props.route.params.data.name,
      foto_profil: {
        uri: props.route.params.data.foto_profil,
        type: 'image/jpeg',
        fileName: 'profilLama',
      },
      tgl_lahir: '',
      alamat: props.route.params.data.alamat,
      email: props.route.params.data.email,
      password: '',
      umur: props.route.params.data.umur,
    };
  }
  edit = () => {
    const {name, tgl_lahir, alamat, foto_profil, email, password} = this.state;
    const body = {
      _method: 'put',
      name: name,
      tgl_lahir: tgl_lahir,
      alamat: alamat,
      email: email,
      password: password,
    };
    fetch(enpoint.editMemberKasir + this.props.route.params.data.id, {
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
          ToastAndroid.show(
            ' Berhasil Diganti',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          this.props.navigation.replace('GetMember');
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
  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        this.setState({token: token}, () => {
          //   this.getMember();
        });
      } else {
        console.log('token tidak ada');
      }
    });
  }
  render() {
    return (
      <View style={{flex: 1}}>
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
                <Text style={{fontWeight: 'bold'}}> TANGGAL KAU </Text>

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

                <Text style={{fontWeight: 'bold'}}> Password </Text>

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

              <TouchableOpacity onPress={() => this.edit()} style={styles.t3}>
                <Text style={{fontWeight: 'bold', color: 'white'}}>Tambah</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default editmember;

const styles = StyleSheet.create({
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
