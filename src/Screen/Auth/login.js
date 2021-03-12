import AsyncStorage from '@react-native-community/async-storage';
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
  ToastAndroid,
} from 'react-native';
// import {cos} from 'react-native-reanimated';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {enpoint} from '../../../enpoint';
export class Login extends Component {
  constructor() {
    super();
    this.state = {
      visible: true,
      check: false,
      modalForget: false,
      token: '',
      loading: false,
      email: '',
      password: '',
    };
  }
  // {....................DATA resjsonnya YANG ADA ROLE NYA......................}
  // login() {
  //   if (this.state.email !== '' && this.state.password !== '') {
  //     this.setState({loading: true});
  //     console.log('proses login');
  //     const {email, password} = this.state;
  //     const data = {email: email, password: password};
  //     this.setState({loading: true});
  //     console.log('ini bodynya blm stringify === ', data);
  //     fetch(enpoint.login, {
  //       method: 'POST',
  //       body: JSON.stringify(data),
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((resJson) => {
  //         console.log('ini resjson login === ', resJson);
  //         const {token} = resJson;
  //         const {role} = resJson.user;
  //         const token_user = ['token', token];
  //         const role_user = ['role', role];
  //         if (resJson.token != null) {
  //           this.state.check
  //             ? AsyncStorage.multiSet([token_user, role_user]).catch((errr) =>
  //                 console.log(errr),
  //               )
  //             : console.log('data user belum di simpan');
  //           if (resJson.token) {
  //             AsyncStorage.setItem('token', resJson.token);
  //             this.setState({loading: false});
  //             this.props.navigation.navigate('Home3');
  //           }
  //         } else {
  //           this.setState({loading: false});
  //           this.e();
  //         }
  //       })
  //       .catch((err) => {
  //         this.setState({loading: false});
  //         alert('Terjadi kesalahan. ' + err);
  //       });
  //   } else {
  //     ToastAndroid.show('Harap isi semua form', ToastAndroid.SHORT);
  //   }
  // }
  verifikasi(token) {
    fetch(enpoint.verifikasi, {
      method: 'GET',
      headers: {
        Accept: 'aplication/json',
        'Content-Type': 'aplication/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((resJson) => {
        console.log('email verivikasi', resJson);

        if (resJson.message === 'Verification has send to you email') {
          console.log('ini respon verifikasi ====', resJson);
          ToastAndroid.show('periksa email anda ', ToastAndroid.SHORT);
          this.setState({loading: false});
        }
      })
      .catch((error) => {
        console.log('error is' + error);
        ToastAndroid.show('email tidak di temukan ', ToastAndroid.SHORT);
      });
  }
  componentDidMount() {
    AsyncStorage.getItem('token').then((value) => {
      if (value != null) {
        this.setState({token: value});
      } else {
        console.log('token tidak ada');
      }
    });
  }
  login() {
    if (this.state.email !== '' && this.state.password !== '') {
      this.setState({loading: true});
      console.log('proses login');
      const {email, password} = this.state;
      const input = {email: email, password: password};
      this.setState({loading: true});
      console.log('ini bodynya blm stringify === ', input);
      fetch(enpoint.login, {
        method: 'POST',
        body: JSON.stringify(input),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((resJson) => {
          console.log('ini resjson login === ', resJson);
          const {token} = resJson;
          const {email_verification, role} = resJson.data;
          const token_user = ['token', token];
          const role_user = ['role', role];
          if (email_verification != null) {
            if (resJson.token != null) {
              this.state.check
                ? AsyncStorage.multiSet([token_user, role_user]).catch((err) =>
                    console.log(err),
                  )
                : console.log('data belum');
              AsyncStorage.setItem('token', resJson.token);
              if (resJson.data.role === 'member') {
                console.log(resJson);
                // this.setState({loading: false});
                this.props.navigation.navigate('Member');
              } else if (resJson.data.role === 'staff') {
                // this.setState({loading: false});
                console.log('sedang memasuki staf', resJson.data.role);
                this.props.navigation.navigate('Staf');
              } else if (resJson.data.role === 'kasir') {
                console.log('sedang memasuki kasir', resJson.data.role);

                // this.setState({loading: false});
                this.props.navigation.navigate('Kasir');
              } else if (resJson.data.role === 'pemimpin') {
                // this.setState({loading: false});
                this.props.navigation.navigate('Pemimpin');
              }
            } else {
              this.setState({loading: false});
              this.e();
            }
          } else {
            this.verifikasi(token);
            ToastAndroid.show('email di verivikasi', ToastAndroid.SHORT);
          }
        })
        .catch((err) => {
          this.setState({loading: false});
          alert('Terjadi kesalahan. ' + err);
        });
    } else {
      ToastAndroid.show('Harap isi semua form', ToastAndroid.SHORT);
    }
  }
  e() {
    Alert.alert(
      'Warning',
      'ada data yang salah',
      [
        {
          text: 'OK',
          onPress: () => console.log('Cancel '),
        },
      ],
      {cancelable: false},
    );
  }

  forgetPass() {
    this.setState({loading: true});
    const {email} = this.state;

    let data = {
      email: email,
    };

    let form = new FormData();

    for (var key in data) {
      form.append(key, data[key]);
    }

    console.log('ini form forget ====', form);

    fetch(enpoint.forget, {
      method: 'POST',
      body: form,
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log('ini resjson forget ====', resJson);
        if (resJson) {
          ToastAndroid.show(
            'Link reset password sudah dikirim ke email anda!',
            4500,
          );
          this.setState({loading: false});
        } else {
          ToastAndroid.show(JSON.stringify(resJson), 3000);
          this.setState({loading: false});
        }
      })
      .catch((err) => {
        console.log('catch login == ', err);
        ToastAndroid.show('Ada yang salah, silahkan coba lagi', 1500);
        this.setState({loading: false});
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#fafafa" barStyle="dark-content" />
        <View style={styles.header}>
          <View style={styles.viewlogin}>
            <Text style={styles.textlogin}>Login</Text>
          </View>

          <View style={styles.viewsignup}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Register')}
              activeOpacity={1}>
              <Text style={styles.textsignup}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.person}>
          <IonIcon name="person-circle-outline" size={100} color="#9e9e9e" />
        </View>

        <TextInput
          autoCapitalize={'none'}
          blurOnSubmit={false}
          style={styles.username}
          placeholder="Username or email addres"
          value={this.state.email}
          onChangeText={(teks) => this.setState({email: teks})}
        />

        <View style={styles.viewpass}>
          <View style={styles.view2pass}>
            <TextInput
              secureTextEntry={this.state.visible}
              autoCapitalize={'none'}
              style={styles.textpass}
              placeholder="Password"
              value={this.state.password}
              onChangeText={(teks) => this.setState({password: teks})}
            />
          </View>
          <View style={styles.viewvisible}>
            <IonIcon
              name={this.state.visible ? 'eye-off' : 'eye'}
              size={32}
              color={'#9e9e9e'}
              onPress={() => this.setState({visible: !this.state.visible})}
            />
          </View>
        </View>
        {/*........................ BAWAH .....................*/}
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => this.setState({check: !this.state.check})}
            style={styles.touchableopacitymata}>
            {this.state.check ? (
              <>
                <IonIcon name="checkbox" size={30} color={'#cd750a'} />
                <Text style={styles.textrememberme}>Remember me</Text>
              </>
            ) : (
              <>
                <IonIcon name="square-outline" size={30} color={'#cd750a'} />
                <Text style={styles.iconrememberme}>Remember me</Text>
              </>
            )}
            {/* <IonIcon
            name={this.state.check ? 'checkbox-outline' : 'checkbox'}
            size={30}
            color={'#cd750a'}
            onPress={() => this.setState({check: !this.state.check})}
          />
          <Text
            style={{alignSelf: 'center', fontSize: 15, marginHorizontal: 5}}>
            Remember me
          </Text> */}
          </TouchableOpacity>
          <Text
            onPress={() => this.setState({modalForget: true})}
            style={{fontSize: 15, marginTop: 15, marginHorizontal: 20}}>
            lupa password ?
          </Text>
        </View>
        {/* {............BUTTOM LOGIN ...........} */}
        <TouchableOpacity onPress={() => this.login()} style={styles.login}>
          {this.state.loading ? (
            <ActivityIndicator size={20} color={'black'} />
          ) : (
            <Text style={styles.textbutton}>LOG IN</Text>
          )}
        </TouchableOpacity>
        {/* {.......................INI MODAL FORGET......................} */}
        <Modal
          transparent={true}
          visible={this.state.modalForget}
          statusBarTranslucent={true}
          animationType={'fade'}
          onRequestClose={() => this.setState({modalForget: false})}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => this.setState({modalForget: false})}
            style={styles.forgetCont}>
            <View style={styles.loginbox}>
              <Text style={styles.boxTitle}>Lupa Password</Text>
              <TextInput
                style={styles.input}
                keyboardType={'email-address'}
                autoCapitalize={'none'}
                autoCompleteType={'email'}
                placeholder={'Email Anda'}
                value={this.state.email}
                underlineColorAndroid={'#12a548'}
                onChangeText={(text) => this.setState({email: text})}
              />
              <TouchableOpacity
                style={styles.signInButton}
                onPress={() => this.forgetPass()}>
                {this.state.loading ? (
                  <ActivityIndicator size={20} color={'black'} />
                ) : (
                  <Text style={styles.buttonText}>Kirim</Text>
                )}
              </TouchableOpacity>
              <Text style={styles.questionText}>
                Link reset akan dikirim ke email anda
              </Text>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}

export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    marginHorizontal: 20,
    paddingVertical: 20,
  },
  viewlogin: {
    flex: 1,
    justifyContent: 'center',
  },
  textlogin: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  viewsignup: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  textsignup: {
    fontSize: 18,
    color: '#9e9e9e',
  },
  person: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
  },
  username: {
    height: 50,
    borderColor: '#9e9e9e',
    borderBottomWidth: 1,
    marginHorizontal: 30,
    fontSize: 18,
    color: '#9e9e9e',
  },
  viewpass: {
    flexDirection: 'row',
    marginHorizontal: 30,
  },
  view2pass: {
    flex: 1,
  },
  textpass: {
    height: 50,
    borderColor: '#9e9e9e',
    borderBottomWidth: 1,
    fontSize: 18,
    color: '#9e9e9e',
    marginTop: 30,
  },
  viewvisible: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#9e9e9e',
  },
  touchableopacitymata: {
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 20,
  },
  iconrememberme: {
    alignSelf: 'center',
    fontSize: 15,
    marginHorizontal: 5,
  },
  textrememberme: {
    alignSelf: 'center',
    fontSize: 15,
    marginHorizontal: 5,
  },
  login: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    marginTop: 50,
    marginHorizontal: 30,
    elevation: 2,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textbutton: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#03a9f4',
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
