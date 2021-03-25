import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StatusBar,
  ImageBackground,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
export class Home3 extends Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="dark-content"
          />
          {/* .........BAGIAN ATAS......... */}
          <View style={styles.header}>
            <ImageBackground
              source={require('../../Assets/Images/banner.png')}
              resizeMode="cover"
              style={[styles.imagebackground, styles.shadow]}>
              <View style={styles.drawer}>
                <View style={styles.viewdrawer}>
                  <IonIcons
                    name="reorder-three-outline"
                    style={styles.icondrawer}
                    size={50}
                    onPress={() => this.props.navigation.openDrawer()}
                  />
                </View>
                <View style={styles.viewdrawer}>
                  <Image
                    style={styles.profile}
                    source={require('../../Assets/Images/trashol.png')}
                  />
                </View>
              </View>
              <View style={styles.viewsaldo}>
                <Text style={styles.textsaldo}>Saldo Anda</Text>
                <Text style={styles.saldo}>Rp 100.000.00.-</Text>
              </View>
            </ImageBackground>
          </View>
          {/* ...........BAGIAN BAWAH........ */}
          <TouchableOpacity style={[styles.button, styles.shadow]}>
            <IonIcons name="timer-outline" size={30} />

            <View style={styles.viewhistory}>
              <Text style={styles.textbutonats}>History saldo 1</Text>
              <Text stlye={styles.textbutonbwh}>
                tekan untuk melihat yang lebih detail
              </Text>
            </View>

            <Image
              source={require('../../Assets/Images/right_arrow.png')}
              style={styles.arrow}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.tambahanscrolview} />
      </ScrollView>
    );
  }
}

export default Home3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 250,
  },
  imagebackground: {
    flex: 1,
    alignItems: 'center',
  },
  drawer: {
    flexDirection: 'row',
    marginTop: 40,
    paddingHorizontal: 20,
  },
  viewdrawer: {
    width: '50%',
  },
  icondrawer: {
    alignSelf: 'flex-start',
  },
  profile: {
    width: 50,
    height: 50,
    alignSelf: 'flex-end',
  },
  viewsaldo: {
    marginTop: 50,
  },
  textsaldo: {
    color: '#fff',
    fontSize: 16,
  },
  saldo: {
    marginTop: 10,
    color: '#fff',
    fontSize: 30,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginHorizontal: 24,
    paddingVertical: 24,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  viewhistory: {
    flex: 1,
    marginLeft: 12,
  },
  textbutonats: {
    fontSize: 22,
  },
  textbutonbwh: {
    fontSize: 14,
  },
  arrow: {
    width: 25,
    height: 25,
    tintColor: '#6A6A6A',
  },
  tambahanscrolview: {
    height: 50,
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
