// import React, {Component} from 'react';
// import {
//   Text,
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   TextInput,
//   Dimensions,
//   Alert,
//   ToastAndroid,
//   Modal,
//   Image,
//   style,
// } from 'react-native';
// import IonIcons from 'react-native-vector-icons/Ionicons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import AsyncStorage from '@react-native-community/async-storage';
// import {Picker} from '@react-native-picker/picker';
// import {enpoint} from '../../../enpoint';
// import _ from 'lodash';
// class TambahBarang extends Component {
//   constructor() {
//     super();
//     this.state = {
//       transaksi: '',
//       token: '',
//       daftar_barang: [],
//       barang: 0,
//       jumlah: '0',
//     };
//   }

//   // toPrice(price) {
//   //   return _.replace(price, /\B(?=(\d{3})+(?!\d))/g, '.');
//   // }
//   addItem() {
//     const {jumlah, barang} = this.state;

//     fetch(enpoint.addItem + this.state.transaksi, {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${this.state.token}`,
//       },
//       body: JSON.stringify({
//         jumlah: jumlah,
//         barang: barang,
//       }),
//     })
//       .then((respon) => respon.json())
//       .then((resJson) => {
//         console.log('ini resjson nya', resJson);

//         if (resJson.status === 'success') {
//           ToastAndroid.show('sudah di tambah', ToastAndroid.SHORT);
//         } else {
//           console.log('gagal tambah');
//         }
//       })
//       .catch((error) => {
//         alert('ada masalah tambah', error);
//       });
//   }

//   getBarang() {
//     console.log('mengambil barang..');
//     fetch(enpoint.getallbarang, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${this.state.token}`,
//       },
//     })
//       .then((response) => response.json())
//       .then((responseJSON) => {
//         this.setState({
//           daftar_barang: responseJSON.data,
//           // barang: responseJSON.data.id
//         });
//         console.log('barang termuat.', responseJSON);
//       })
//       .catch((error) => {
//         console.log('error is' + error);
//       });
//   }
//   // getTransanksiBaru() {
//   //   fetch(enpoint.getTransanksiBaru, {
//   //     method: 'GET',
//   //     headers: {
//   //       Accept: 'aplication/json',
//   //       'Content-Type': 'aplication/json',
//   //       Authorization: `Bearer ${this.state.token}`,
//   //     },
//   //   })
//   //     .then((response) => response.json())
//   //     .then((resJson) => {
//   //       console.log('mengambil kode transaksi', resJson);
//   //       if (resJson.data != null) {
//   //         this.setState({transaksi: resJson.data});
//   //       } else {
//   //         this.setState({transaksi: null});
//   //       }
//   //     })
//   //     .catch((error) => {
//   //       console.log('error is' + error);
//   //     });
//   // }
//   async getTransaksiBaru() {
//     this.setState({loading: true});
//     try {
//       let myOptions = {
//         headers: {
//           Authorization: `Bearer ${this.state.token}`,
//         },
//       };

//       let response = await fetch(enpoint.getTransaksiBaru, myOptions);

//       let resJson = await response.json();

//       console.log('ini resjson get kode transaksi == ', resJson);

//       if (resJson) {
//         this.setState({transaksi: resJson.data});
//       }
//     } catch (err) {
//       console.log('catch get transaksi == ', err);
//       ToastAndroid.show('Maaf gagal mengambil kode transaksi baru!!', 2000);
//     }
//   }
//   componentDidMount() {
//     AsyncStorage.getItem('token').then((token) => {
//       if (token != null) {
//         this.setState({token: token});
//         this.getBarang();

//         console.log('token ada');
//       } else {
//         console.log('token tidak ada');
//       }
//     });
//   }
//   render() {
//     return (
//       <View style={styles.container}>
//         {/* atas */}
//         <View style={styles.header}>
//           <IonIcons
//             name="arrow-back-outline"
//             size={30}
//             style={{
//               marginLeft: 20,
//             }}
//             onPress={() => this.props.navigation.replace('Home2')}
//           />
//           <Text style={{marginLeft: 70, fontSize: 20, fontWeight: 'bold'}}>
//             {' '}
//             Add Product{' '}
//           </Text>
//         </View>
//         <ScrollView>
//           {/* .....NGAMBIL KODE TRANSAKSI BARU...... */}
//           <View style={{height: 100, marginTop: 10, backgroundColor: '#FFFF'}}>
//             {/* ....AMBIL KODE.... */}
//             <TouchableOpacity
//               style={{
//                 height: 40,
//                 backgroundColor: '#fff',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 ...styles.shadow,
//               }}
//               onPress={() => this.getTransaksiBaru()}>
//               <Text style={{fontWeight: 'bold'}}>Ambil Transaksi Baru</Text>
//             </TouchableOpacity>
//             {/* ....HASIL AMBIL KODE... */}
//             <Text style={{fontWeight: 'bold'}}> Kode Transaksi </Text>
//             {this.state.transaksi.kode_transaksi !== undefined ? (
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   marginTop: 10,
//                   paddingHorizontal: 10,
//                 }}>
//                 <View style={{width: '8%'}}>
//                   <IonIcons name="barcode-sharp" size={20} />
//                 </View>

//                 <View style={{width: '92%'}}>
//                   <Text>{this.state.transaksi.kode_transaksi}</Text>
//                 </View>
//               </View>
//             ) : (
//               <Text
//                 style={{
//                   justifyContent: 'center',
//                   alignSelf: 'center',
//                   marginTop: 10,
//                 }}>
//                 Kode Belum Di ambil
//               </Text>
//             )}
//           </View>
//           {/* Jumlah Item */}
//           <View style={styles.inputView}>
//             <View style={styles.headerName}>
//               <Text style={{fontWeight: 'bold'}}>jumlah barang</Text>
//               <Text style={{color: 'red'}}>*</Text>
//             </View>
//             <TextInput
//               keyboardType={'decimal-pad'}
//               // placeholder=""
//               value={this.state.jumlah}
//               underlineColorAndroid="orange"
//               onChangeText={(input) => this.setState({jumlah: input})}
//             />
//           </View>

//           {/* kategori */}

//           <View style={styles.inputView}>
//             <View style={styles.headerName}>
//               <Text style={{fontWeight: 'bold', marginTop: 10}}>kategori</Text>
//               <Text style={{color: 'red'}}>*</Text>
//             </View>
//             <Picker
//               mode="dropdown"
//               selectedValue={this.state.barang}
//               onValueChange={(id) => this.setState({barang: id})}>
//               {this.state.daftar_barang.map((value, index) => (
//                 <Picker.Item
//                   key={index}
//                   label={value.nama_barang}
//                   value={value.id}
//                 />
//               ))}
//             </Picker>
//           </View>

//           {/* tambah barang */}
//           <TouchableOpacity
//             style={styles.nampil}
//             onPress={() => this.addItem()}>
//             <Text
//               style={{
//                 alignSelf: 'center',
//                 fontWeight: 'bold',
//                 fontSize: 20,
//                 color: 'white',
//               }}>
//               Tampilkan
//             </Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </View>
//     );
//   }
// }

// export default TambahBarang;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     backgroundColor: '#FFF',
//     height: 50,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 25,
//   },
//   foto: {
//     backgroundColor: '#FFF',
//     height: 200,
//     marginTop: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 10,
//   },
//   addFoto: {
//     borderWidth: 2,
//     padding: 10,
//     borderStyle: 'dashed',
//     borderRadius: 5,
//   },
//   inputView: {
//     backgroundColor: '#FFF',
//     height: 90,
//     marginTop: 10,
//   },
//   headerName: {
//     backgroundColor: '#FFF',
//     height: 40,
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     flexDirection: 'row',
//   },
//   input: {
//     paddingHorizontal: 20,
//   },
//   inputKategori: {
//     backgroundColor: '#FFF',
//     height: 50,
//     marginTop: 10,
//     paddingHorizontal: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   inputPrice: {
//     backgroundColor: '#FFF',
//     height: 50,
//     marginTop: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 8,
//     justifyContent: 'space-between',
//     width: '100%',
//   },
//   inputstok: {
//     backgroundColor: '#FFF',
//     height: 50,
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 8,
//     justifyContent: 'space-between',
//     width: '100%',
//     marginTop: 1,
//   },
//   nampil: {
//     justifyContent: 'center',
//     alignSelf: 'center',
//     marginTop: 20,
//     height: 50,
//     width: 200,
//     backgroundColor: 'blue',
//     borderRadius: 10,
//   },
//   profile: {
//     height: 150,
//     width: 150,
//   },
//   shadow: {
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 4.65,

//     elevation: 8,
//   },
// });
