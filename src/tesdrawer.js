import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ImageBackground,
  RefreshControl,
  TouchableNativeFeedback,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

export default class TesDrawer extends React.Component {
  constructor() {
    super();
    this.state = {
      search: false,
      drawer: false,
      refresh: false,
    };
  }

  search = () => {
    if (this.state.search == true) {
      return (
        <View style={styles.search}>
          <View style={{width: '90%'}}>
            <TextInput
              placeholder="Search"
              style={{backgroundColor: 'white'}}
            />
          </View>

          <TouchableOpacity
            onPress={() => this.setState({search: false})}
            style={{width: '10%'}}>
            <Ionicons name="close" color="white" size={30} />
          </TouchableOpacity>
        </View>
      );
    } else return false;
  };

  drawer = () => {
    if (this.state.drawer == true) {
      return (
        <View style={styles.drawer}>
          <View
            style={{
              width: 270,
              height: '100%',
              backgroundColor: 'black',
            }}>
            <ImageBackground
              source={{
                uri:
                  'https://img.freepik.com/free-photo/islamic-decoration-with-crescent-arabic-lantern-arabic-lantern-gift-box_257995-501.jpg?size=338&ext=jpg&uid=R27937236',
              }}
              style={styles.imD}>
              <Text>
                <Text style={{fontWeight: 'bold', fontSize: 25, color: 'blue'}}>
                  Hi
                </Text>

                <Text style={{fontWeight: 'bold', fontSize: 20, color: 'pink'}}>
                  Image
                </Text>
              </Text>

              <Text style={styles.tD}> Kumpulan Gambar</Text>
            </ImageBackground>

            <View style={{padding: 10}}>
              <TouchableOpacity style={styles.btD}>
                <Text style={styles.tD}>Upload Gambar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btD}>
                <Text style={styles.tD}>Hapus Gambar</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableNativeFeedback
            onPress={() => this.setState({drawer: false})}
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#0000007a',
            }}>
            <Text>Hallo</Text>
          </TouchableNativeFeedback>
        </View>
      );
    } else return false;
  };
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#454545'}}>
        <View style={styles.header}>
          <View style={{width: '90%'}}>
            <Text>
              <Text style={{fontWeight: 'bold', fontSize: 25, color: 'blue'}}>
                Hi
              </Text>

              <Text
                onPress={() => this.setState({drawer: true})}
                style={{fontWeight: 'bold', fontSize: 20, color: '#FFF'}}>
                Image
              </Text>
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => this.setState({search: true})}
            style={{width: '10%'}}>
            <Ionicons name="search" color="white" size={30} />
          </TouchableOpacity>
        </View>

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={() => {
                this.setState({refresh: true});
                this.setState({refresh: false});
              }}
            />
          }>
          <View>
            <Text>Ini Home</Text>
          </View>
        </ScrollView>

        {this.drawer()}

        {this.search()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    elevation: 5,
    alignItems: 'center',
    backgroundColor: 'black',
    height: 50,
    padding: 5,
  },
  search: {
    position: 'absolute',
    flexDirection: 'row',
    elevation: 5,
    alignItems: 'center',
    backgroundColor: 'black',
    height: 50,
    padding: 5,
  },
  drawer: {
    position: 'absolute',
    flexDirection: 'row',
    elevation: 5,
    height: '100%',
  },
  imD: {
    height: 200,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btD: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    height: 40,
    justifyContent: 'flex-end',
    padding: 5,
  },
  tD: {fontWeight: 'bold', color: 'white'},
});
