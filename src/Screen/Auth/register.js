import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {enpoint} from '../../../enpoint';
export class Login extends Component {
  constructor() {
    super();
    this.state = {
      visible: true,
      check: true,
      visible2: true,
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      loading: false,
      token: '',
    };
  }

  Register = () => {
    const {name, email, password, password_confirmation} = this.state;
    this.setState({loading: true});
    const formData = new FormData();

    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('password_confirmation', password_confirmation);
    console.log('ini form data', formData);
    fetch(enpoint.register, {
      method: 'POST',
      // headers: {
      //   Accept: 'aplication/json',
      //   'Content-Type': 'aplication/json',
      // },
      body: formData,
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        console.log(resJson);
        if (resJson.token) {
          this.props.navigation.replace('Login');
          this.setState({loading: false});
          ToastAndroid.show(
            'Register Berhasil',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        } else {
          this.setState({loading: false});
          ToastAndroid.show(
            'mungkin ada email yand sudah di gunakan dan password minimal 8',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }
      })
      .catch((error) => {
        this.setState({loading: false});
        console.log('errror ini ' + error);
      });
  };

  // alert() {
  //   Alert.alert(
  //     '',
  //     'Convirmation Email Anda',
  //     [
  //       {
  //         text: 'Convirmation',
  //         onPress: () => this.verivikasi(),
  //       },
  //     ],
  //     {cancelable: false},
  //   );
  // }
  //
  passwordCheck = (a, b) => {
    if (a === b) {
      return {
        color: '#9e9e9e',
      };
    } else {
      return {
        color: 'red',
      };
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <StatusBar backgroundColor="#fafafa" barStyle="dark-content" />
          <View style={styles.header}>
            <View style={styles.viewsignup}>
              <Text style={styles.textsignup}>Sign Up</Text>
            </View>

            <View style={styles.viewlogin}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Login')}
                activeOpacity={1}>
                <Text style={styles.textlogin}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.person}>
            <IonIcon name="camera" size={100} color="#9e9e9e" />
          </View>
          <TextInput
            value={this.state.name}
            onChangeText={(teks) => this.setState({name: teks})}
            style={styles.username}
            placeholder="Username"
          />

          <TextInput
            value={this.state.email}
            autoCapitalize={'none'}
            onChangeText={(teks) => this.setState({email: teks})}
            style={styles.email}
            placeholder="email addres"
          />

          <View style={styles.viewpass}>
            <View style={styles.view2pass}>
              <TextInput
                autoCapitalize={'none'}
                onChangeText={(teks) => this.setState({password: teks})}
                style={styles.textpass}
                placeholder="Password"
                value={this.state.password}
                secureTextEntry={this.state.visible}
              />
            </View>
            <View style={styles.viewvisible}>
              <IonIcon
                name={this.state.visible ? 'eye-off' : 'eye'}
                size={30}
                color={'#9e9e9e'}
                onPress={() => this.setState({visible: !this.state.visible})}
              />
            </View>
          </View>
          <View style={styles.viewpass}>
            <View style={styles.view2pass}>
              <TextInput
                autoCapitalize={'none'}
                onChangeText={(teks) =>
                  this.setState({password_confirmation: teks})
                }
                style={[
                  styles.textpass,
                  this.passwordCheck(
                    this.state.password,
                    this.state.password_confirmation,
                  ),
                ]}
                value={this.state.password_confirmation}
                placeholder="Password Confirmation"
                secureTextEntry={this.state.visible2}
              />
            </View>
            <View style={styles.viewvisible}>
              <IonIcon
                name={this.state.visible2 ? 'eye-off' : 'eye'}
                size={30}
                color={'#9e9e9e'}
                onPress={() => this.setState({visible2: !this.state.visible2})}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => this.Register()}
            style={styles.signup}>
            <>
              {this.state.loading === true ? (
                <ActivityIndicator size={25} color="black" />
              ) : (
                <Text style={styles.textbutton}>SIGN UP</Text>
              )}
            </>
          </TouchableOpacity>
          <View style={{height: 50}} />
        </ScrollView>
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
  viewsignup: {
    flex: 1,
    justifyContent: 'center',
  },
  textsignup: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  viewlogin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  textlogin: {
    fontSize: 18,
    color: '#9e9e9e',
  },
  person: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
  },
  username: {
    height: 45,
    borderColor: '#9e9e9e',
    borderBottomWidth: 1,
    marginHorizontal: 30,
    fontSize: 18,
    color: '#9e9e9e',
  },
  email: {
    height: 45,
    borderColor: '#9e9e9e',
    borderBottomWidth: 1,
    marginHorizontal: 30,
    fontSize: 18,
    color: '#9e9e9e',
    marginTop: 30,
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
  signup: {
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
});
