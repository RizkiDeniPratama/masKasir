import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secured, setSecured] = useState(true);

  const refEmail = useRef(null);
  const refPassword = useRef(null);

  function focus(ref) {
    ref.current.focus();
  }

  return (
    <View style={styles.container}>
      <View style={styles.loginOuterBox}>
        <View style={styles.loginBoxUpper}>
          <View style={styles.loginBoxTitle}>
            <Text style={styles.loginBoxTitleText}>USER LOGIN</Text>
          </View>
          <View style={styles.loginBoxMiddle}>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons
                onPress={() => focus(refEmail)}
                name={'account'}
                size={25}
              />
              <TextInput
                keyboardType={'email-address'}
                placeholder={'Email'}
                value={email}
                ref={refEmail}
                autoFocus={true}
                onChangeText={(text) => {
                  setEmail(text);
                }}
                style={styles.textInput}
                onSubmitEditing={() => focus(refPassword)}
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.inputSeparator} />
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons
                onPress={() => focus(refPassword)}
                name={'lock'}
                size={25}
              />
              <TextInput
                secureTextEntry={secured}
                placeholder={'Password'}
                value={password}
                ref={refPassword}
                onChangeText={(text) => {
                  setPassword(text);
                }}
                style={styles.textInput}
              />
              <TouchableOpacity
                onPressIn={() => setSecured(false)}
                onPressOut={() => setSecured(true)}>
                <MaterialCommunityIcons
                  name={secured ? 'eye-off' : 'eye'}
                  size={25}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Pressable
          android_ripple={{color: '#3f608d', radius: 500, borderless: false}}
          style={styles.loginBoxButton}>
          <Text style={styles.loginBoxButtonText}>LOGIN</Text>
        </Pressable>

        <View style={styles.loginBoxLower}>
          <View style={styles.smallLeftTriangle} />
          <View style={styles.optionsContainer}>
            <Text style={styles.optionsText}>
              Forgot Passwword? Click{' '}
              <Text style={styles.forgotPasswordText} onPress={() => {}}>
                Here
              </Text>
            </Text>
            <Text style={styles.optionsText}>
              Do not have an account?{' '}
              <Text style={styles.registerText} onPress={() => {}}>
                Register
              </Text>
            </Text>
          </View>
          <View style={styles.smallRightTriangle} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7498b2ff',
    paddingHorizontal: 5,
  },
  loginOuterBox: {
    width: '100%',
    height: 400,
    overflow: 'hidden',
  },
  loginBoxUpper: {
    width: '100%',
    height: '65%',
    paddingHorizontal: 20,
  },
  loginBoxTitle: {
    backgroundColor: '#39557cff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  loginBoxTitleText: {
    fontSize: 25,
    color: '#fff',
    letterSpacing: 5,
    marginVertical: 10,
  },
  loginBoxMiddle: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
    paddingHorizontal: 20,
  },
  textInput: {
    flex: 1,
  },
  inputSeparator: {
    height: 1,
    width: '90%',
    backgroundColor: 'gray',
  },
  loginBoxButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingVertical: 20,
    elevation: 5,
    backgroundColor: '#39557cff',
  },
  loginBoxButtonText: {
    fontSize: 20,
    color: '#fff',
    letterSpacing: 5,
  },
  loginBoxLower: {
    flex: 1,
    flexDirection: 'row',
  },
  smallLeftTriangle: {
    height: 20,
    borderBottomWidth: 20,
    borderBottomColor: 'transparent',
    borderRightWidth: 20,
    borderRightColor: '#2c3f58',
  },
  optionsContainer: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallRightTriangle: {
    height: 20,
    borderBottomWidth: 20,
    borderBottomColor: 'transparent',
    borderLeftWidth: 20,
    borderLeftColor: '#2c3f58',
  },
  optionsText: {
    color: 'gray',
    marginVertical: 5,
  },
  forgotPasswordText: {
    color: '#39557cff',
    fontWeight: 'bold',
  },
  registerText: {
    color: '#39557cff',
    fontWeight: 'bold',
  },
});

export default App;