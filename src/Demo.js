// // import React, {Component} from 'react';
// // import {
// //   Text,
// //   View,
// //   TouchableOpacity,
// //   StyleSheet,
// //   TouchableNativeFeedback,
// //   TextInput,
// //   TouchableWithoutFeedback,
// //   ScrollView,
// //   Alert,
// //   ToastAndroid,
// //   ActivityIndicator,
// //   Modal,
// //   KeyboardAvoidingView,
// //   StatusBar,
// //   Button,
// // } from 'react-native';
// // import {enpoint} from '../../../enpoint';
// // import {Picker} from '@react-native-picker/picker';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // export class addpembelian extends Component {
// //   constructor() {
// //     super();
// //     this.state = {
// //       token: '',
// //       inputData: [],
// //       daftar_barang: [],
// //       daftar_supplier: [],
// //       supplier_id: '',
// //       barang_id: 0,
// //       jumlah: '0',
// //       modalChangeSupplier: false,
// //       supplierInput: '',
// //       loading: false,
// //     };
// //   }

// //   handleSendData = () => {
// //     if (this.state.inputData.length > 0) {
// //       Alert.alert('Kirim Laporan', 'Pastikan data yang anda masukkan sesuai!', [
// //         {
// //           text: 'Batal',
// //         },
// //         {
// //           text: 'Lanjutkan',
// //           onPress: this.logData,
// //         },
// //       ]);
// //     } else {
// //       ToastAndroid.show('Masukkan data anda dengan benar', 1200);
// //     }
// //   };
// //   getSupplier() {
// //     console.log('mengambil supplier..');
// //     this.setState({daftar_supplier: []});
// //     fetch('enpoint.getallsupli', {
// //       method: 'GET',
// //       headers: {
// //         'Content-Type': 'application/json',
// //         Authorization: `Bearer ${this.state.token}`,
// //       },
// //     })
// //       .then((response) => response.json())
// //       .then((responseJSON) => {
// //         this.setState({daftar_supplier: responseJSON.data});
// //         console.log('supplier termuat', responseJSON);
// //         this.getBarang();
// //       })
// //       .catch((error) => {
// //         console.log('error is' + error);
// //       });
// //   }
// //   getBarang() {
// //     console.log('mengambil supplier..');
// //     this.setState({daftar_barang: []});
// //     fetch('enpoint.getallbarang', {
// //       method: 'GET',
// //       headers: {
// //         'Content-Type': 'application/json',
// //         Authorization: `Bearer ${this.state.token}`,
// //       },
// //     })
// //       .then((response) => response.json())
// //       .then((responseJSON) => {
// //         this.setState({daftar_barang: responseJSON.data});
// //         console.log('barang termuat.', responseJSON);
// //       })
// //       .catch((error) => {
// //         console.log('error is' + error);
// //       });
// //   }

// //   masukkanInput = () => {
// //     let data = {
// //       barang: this.state.barang_id,
// //       jumlah: parseFloat(this.state.jumlah),
// //     };

// //     let newInputData = this.state.inputData.concat([data]);

// //     this.setState({inputData: newInputData});
// //   };

// //   logData = () => {
// //     this.setState({loading: true});

// //     var myHeaders = new Headers();
// //     myHeaders.append('Authorization', `Bearer ${this.state.token}`);
// //     myHeaders.append('Accept', 'aplication/json');
// //     let form = new FormData();

// //     form.append('supplier', this.state.supplier_id);
// //     this.state.inputData.forEach((element, index) => {
// //       form.append(`detail[${index}][barang]`, element.barang);
// //       form.append(`detail[${index}][jumlah]`, element.jumlah);
// //     });

// //     console.log('ini form pendataan == ', form);

// //     var requestOptions = {
// //       method: 'POST',
// //       headers: myHeaders,
// //       body: formdata,
// //     };
// //     fetch(enpoint.addpembelian, requestOptions)
// //       .then((response) => response.json())
// //       .then((resJson) => {
// //         console.log('resjson nya sup === ', resJson);
// //         if (resJson.status === 'success') {
// //           this.props.navigation.replace('Daftarsup');
// //           ToastAndroid.show('Supplier berhasil diupdate!', 1500);
// //         } else {
// //           this.setState({loading: false});
// //           ToastAndroid.show('Maaf supplier gagal diubah ya!', 1500);
// //         }
// //       })
// //       .catch((error) => {
// //         console.log('catch error edit supplier === ', error);
// //         this.setState({loading: false});
// //         ToastAndroid.show('Maaf supplier gagal diubah!', 1500);
// //       });
// //   };

// //   changeSupplier = (v) =>
// //     this.setState({supplierInput: v}, () => {
// //       if (this.state.supplierInput !== this.state.supplier_id) {
// //         this.setState({
// //           supplier_id: this.state.supplierInput,
// //           inputData: [],
// //           modalChangeSupplier: false,
// //         });
// //       } else {
// //         this.setState({modalChangeSupplier: false});
// //       }
// //     });

// //   componentDidMount() {
// //     AsyncStorage.getItem('token').then((value) => {
// //       if (value != null) {
// //         this.setState({token: value}, () => {
// //           this.getSupplier();
// //         });
// //       } else {
// //         console.log('token tidak ada');
// //       }
// //     });
// //   }
// //   // this.setState({inputData: [], supplier_id: input});
// //   render() {
// //     return (
// //       <View>
// //         <StatusBar translucent />
// //         <Modal
// //           statusBarTranslucent
// //           transparent
// //           visible={this.state.modalChangeSupplier}
// //           animationType={'fade'}
// //           onRequestClose={() => this.setState({modalChangeSupplier: false})}>
// //           <KeyboardAvoidingView
// //             behavior={'padding'}
// //             style={{
// //               flex: 1,
// //               padding: 10,
// //               alignItems: 'center',
// //               justifyContent: 'center',
// //               backgroundColor: '#000000ab',
// //             }}>
// //             <View
// //               style={{
// //                 backgroundColor: '#F8F8F8',
// //                 padding: 10,
// //                 width: '80%',
// //                 alignItems: 'center',
// //                 justifyContent: 'center',
// //                 borderRadius: 10,
// //               }}>
// //               <Text style={{fontSize: 25}}>Ubah Supplier</Text>
// //               <View
// //                 style={{
// //                   height: 200,
// //                   width: '100%',
// //                 }}>
// //                 <Text>
// //                   Mengubah supplier akan mengosongkan data supplier lainnya
// //                 </Text>
// //                 <ScrollView>
// //                   {this.state.daftar_supplier.map((v, i) => {
// //                     return (
// //                       <View key={i} style={{marginVertical: 5}}>
// //                         <Button
// //                           title={v}
// //                           onPress={() => this.changeSupplier(v)}
// //                         />
// //                       </View>
// //                     );
// //                   })}
// //                 </ScrollView>
// //                 {}
// //               </View>
// //             </View>
// //             <View
// //               style={{
// //                 // backgroundColor: "red",
// //                 padding: 10,
// //                 width: '80%',
// //                 borderRadius: 1,
// //               }}>
// //               <Button
// //                 // disabled={loading}
// //                 onPress={() => {
// //                   this.setState({modalChangeSupplier: false});
// //                 }}
// //                 // mode="contained"
// //                 color="red"
// //                 style={[{width: '100%', marginTop: 2}]}
// //                 title="Batalkan"
// //               />
// //             </View>
// //           </KeyboardAvoidingView>
// //         </Modal>

// //         <View style={styles.mainViewModal}>
// //           <View style={styles.modal}>
// //             <ScrollView>
// //               <View style={{width: '95%'}}>
// //                 {/* DI TEXT INPUT KAN ITU BIASANYA PAKAI onChangeText KAN NAH AKU BINGUNG SOALNYA DI DATA FETCH NYA KAN AKU SIMPAN TU ELEMENT NYA DI STATE NAMANYA INPUT DATA.NAH APA AKU TARO DI SANA (DI DALAM onChangeTextNYA)
// //                 onChangeText={(input) => this.setState({inputData: input})} */}

// //                 <Text>jumlah</Text>
// //                 <TextInput
// //                   keyboardType={'decimal-pad'}
// //                   placeholder="e.g 10"
// //                   value={this.state.jumlah}
// //                   underlineColorAndroid="orange"
// //                   onChangeText={(input) => this.setState({jumlah: input})}
// //                 />
// //                 <Text>Penyedia Produk</Text>
// //                 <Button
// //                   title="Pilih Supplier"
// //                   onPress={() => this.setState({modalChangeSupplier: true})}
// //                 />
// //               </View>
// //               <View style={styles.spliterModal}>
// //                 <View style={{width: '70%'}}>
// //                   <Text>barang</Text>
// //                   <Picker
// //                     mode="dropdown"
// //                     selectedValue={this.state.barang_id}
// //                     onValueChange={(id) => this.setState({barang_id: id})}>
// //                     {this.state.daftar_barang.map((value, index) => (
// //                       <Picker.Item key={index} label={value} value={value} />
// //                     ))}
// //                   </Picker>
// //                 </View>
// //               </View>

// //               {this.state.loading ? (
// //                 <View style={styles.button}>
// //                   <ActivityIndicator color="white" size="small" />
// //                 </View>
// //               ) : (
// //                 <TouchableNativeFeedback onPress={this.masukkanInput}>
// //                   <View style={styles.button}>
// //                     <Text style={styles.text}>Add</Text>
// //                   </View>
// //                 </TouchableNativeFeedback>
// //               )}
// //               {this.state.supplier_id ? (
// //                 <Text
// //                   style={{
// //                     fontSize: 20,
// //                     fontWeight: 'bold',
// //                     textAlign: 'center',
// //                   }}>
// //                   Supplier {this.state.supplier_id}
// //                 </Text>
// //               ) : (
// //                 <Text
// //                   style={{
// //                     fontSize: 20,
// //                     fontWeight: 'bold',
// //                     textAlign: 'center',
// //                   }}>
// //                   Pilih Supplier Dahulu
// //                 </Text>
// //               )}
// //               {this.state.inputData.map((v, i) => {
// //                 return (
// //                   <View
// //                     key={i}
// //                     style={{
// //                       width: '100%',
// //                       marginVertical: 5,
// //                       backgroundColor: 'lightblue',
// //                       borderRadius: 5,
// //                       padding: 5,
// //                     }}>
// //                     <Text>barang : {v.barang}</Text>
// //                     <Text>jumlah : {v.jumlah}</Text>
// //                   </View>
// //                 );
// //               })}
// //               <TouchableNativeFeedback onPress={this.logData}>
// //                 <View style={styles.button}>
// //                   <Text style={styles.text}>Log Data di Konsol</Text>
// //                 </View>
// //               </TouchableNativeFeedback>
// //             </ScrollView>
// //           </View>
// //         </View>
// //       </View>
// //     );
// //   }
// // }

// // export default addpembelian;

// // const styles = StyleSheet.create({
// //   mainViewModal: {
// //     justifyContent: 'center',
// //     height: '100%',
// //     alignItems: 'center',
// //   },
// //   headerModal: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     marginBottom: 10,
// //     width: '95%',
// //   },
// //   inputHarga: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //   },
// //   textHarga: {},
// //   spliterModal: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //   },
// //   buttonAdd: {
// //     alignSelf: 'center',
// //     backgroundColor: 'white',
// //     elevation: 3,
// //     alignItems: 'center',
// //     borderRadius: 10,
// //     padding: 10,
// //   },
// //   button: {
// //     padding: 10,
// //     backgroundColor: 'tomato',
// //     borderRadius: 10,
// //     elevation: 5,
// //     width: 100,
// //     alignSelf: 'center',
// //     height: 50,
// //     justifyContent: 'center',
// //   },
// //   modal: {
// //     backgroundColor: 'white',
// //     width: '90%',
// //     borderRadius: 10,
// //     elevation: 3,
// //     padding: 10,
// //     alignItems: 'center',
// //   },
// // });

// import React, {Component} from 'react';
// import {
//   Text,
//   View,
//   Image,
//   StatusBar,
//   ImageBackground,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Modal,
//   TextInput,
//   ToastAndroid,
//   ActivityIndicator,
// } from 'react-native';
// import IonIcons from 'react-native-vector-icons/Ionicons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import {enpoint} from '../../../enpoint';
// import ImagePicker from 'react-native-image-picker';
// import AsyncStorage from '@react-native-community/async-storage';
// export class Home2 extends Component {
//   constructor() {
//     super();
//     this.state = {
//       modalAddMember: false,
//       token: '',
//       loading: false,
//       alamat: '',
//       name: '',
//       email: '',
//       password: '',
//       tgl_lahir: '',
//       foto_profil: {uri: '', type: 'image/jpeg', fileName: 'profilLama'},
//       password: '',
//       photo: '',
//       transaksi: null,
//     };
//   }

//   addMember = () => {
//     const {name, tgl_lahir, alamat, foto_profil, email, password} = this.state;
//     const body = {
//       name: name,
//       tgl_lahir: tgl_lahir,
//       alamat: alamat,
//       email: email,
//       password: password,
//     };
//     fetch(enpoint.addMember, {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         // 'Content-Type': 'application/json',
//         Authorization: `Bearer ${this.state.token}`,
//       },
//       body: this.createFormData(foto_profil, body),
//     })
//       .then((respon) => respon.json())
//       .then((resJson) => {
//         console.log('ini resjson nya ', resJson);
//         if (resJson.status === 'success') {
//           this.props.navigation.navigate('Kasir', {screen: 'Home2'});

//           ToastAndroid.show(
//             ' Berhasil Ditambah',
//             ToastAndroid.SHORT,
//             ToastAndroid.CENTER,
//           );
//         } else {
//           alert('err');
//         }
//       })
//       .catch((error) => {
//         console.log('ini error dari feact' + error);
//       });
//   };
//   createFormData = (photo, body) => {
//     const data = new FormData();
//     if (photo.uri !== '') {
//       data.append('foto_profil', {
//         name: photo.fileName,
//         type: photo.type,
//         uri:
//           Platform.OS === 'android'
//             ? photo.uri
//             : photo.uri.replace('file://', ''),
//       });
//     }
//     Object.keys(body).forEach((key) => {
//       data.append(key, body[key]);
//     });
//     console.log('ini form', data);
//     console.log('ini foto_profil', data._parts);
//     return data;
//   };
//   handleEditPhoto = () => {
//     const options = {
//       noData: true,
//     };
//     ImagePicker.showImagePicker(options, (response) => {
//       if (response.uri) {
//         this.setState({foto_profil: response, edited: true});
//         console.log(JSON.stringify(response.fileName));
//       }
//     });
//   };s
//   getTransaksi() {
//     fetch(enpoint.gettransaksi, {
//       method: 'GET',
//       headers: {
//         Accept: 'aplication/json',
//         'Content-Type': 'aplication/json',
//         Authorization: `Bearer ${this.state.token}`,
//       },
//     })
//       .then((response) => response.json())
//       .then((resJson) => {
//         console.log('darirofil', resJson);
//         if (resJson.data != null) {
//           this.setState({transaksi: resJson.data});
//         } else {
//           this.setState({transaksi: null});
//         }
//       })
//       .catch((error) => {
//         console.log('error is' + error);
//       });
//   }

//   componentDidMount() {
//     AsyncStorage.getItem('token').then((value) => {
//       if (value != null) {
//         this.setState({token: value}, () => {
//           this.getTransaksi();
//         });
//       } else {
//         console.log('token tidak ada');
//       }
//     });
//   }
//   render() {
//     return (
//       <ScrollView>
//         <View style={[styles.container, styles.shadow]}>
//           <StatusBar
//             translucent
//             backgroundColor="transparent"
//             barStyle="light-content"
//           />
//           {/* .........BAGIAN ATAS......... */}
//           <View style={styles.header}>
//             <ImageBackground
//               source={require('../../Assets/Images/banner.png')}
//               resizeMode="cover"
//               style={[styles.imagebackground, styles.shadow]}>
//               <View style={styles.drawer}>
//                 <View style={styles.viewdrawer}>
//                   <IonIcons
//                     name="reorder-three-outline"
//                     style={styles.icondrawer}
//                     size={50}
//                     onPress={() => this.props.navigation.openDrawer()}
//                   />
//                 </View>
//                 <View style={styles.viewdrawer}>
//                   <Image
//                     style={styles.profile}
//                     source={require('../../Assets/Images/trashol.png')}
//                   />
//                 </View>
//               </View>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   marginTop: 30,
//                   alignItems: 'center',
//                   justifyContent: 'space-around',
//                   width: '100%',
//                 }}>
//                 <TouchableOpacity
//                   onPress={() => this.setState({modalAddMember: true})}
//                   style={{
//                     height: 40,
//                     width: 150,
//                     backgroundColor: 'white',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     borderRadius: 8,
//                   }}>
//                   <Text>Add Member</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   style={{
//                     height: 40,
//                     width: 150,
//                     backgroundColor: 'green',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     borderRadius: 8,
//                   }}>
//                   <Text style={{color: 'white'}}>Transaksi Baru</Text>
//                 </TouchableOpacity>
//               </View>
//             </ImageBackground>
//           </View>
//           {/* ...........BAGIAN BAWAH........ */}
//           <TouchableOpacity
//             onPress={() => this.props.navigation.navigate('GetMember')}
//             style={[styles.button, styles.shadow]}>
//             <IonIcons name="timer-outline" size={30} />

//             <View style={styles.viewhistory}>
//               <Text style={styles.textbutonats}>Daftar Member</Text>
//               <Text stlye={styles.textbutonbwh}>
//                 tekan untuk melihat yang lebih detail
//               </Text>
//             </View>

//             <Image
//               source={require('../../Assets/Images/right_arrow.png')}
//               style={styles.arrow}
//             />
//           </TouchableOpacity>
//           {/* .....TRANSAKSI...... */}

//           <View style={styles.viewtransaksi}>
//             <Text style={{fontSize: 22, fontWeight: 'bold'}}>
//               Transaction History
//             </Text>
//             {this.state.transaksi === null ? (
//               <ActivityIndicator color="red" size="large" />
//             ) : (
//               <TouchableOpacity
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   paddingVertical: 8,
//                   marginTop: 10,
//                   borderRadius: 3,
//                   // borderWidth: 0.1,
//                   borderBottomWidth: 1,
//                 }}>
//                 <Image
//                   source={require('../../Assets/Images/transaksi.png')}
//                   style={{width: 30, height: 30, tintColor: '#7F5DF0'}}
//                 />
//                 <View style={{flex: 1, marginLeft: 12}}>
//                   <Text style={{fontSize: 16}}>Kode Transaksi</Text>
//                   <Text style={{color: '#6A6A6A', fontSize: 14}}>
//                     {this.state.transaksi.kode_transaksi}
//                   </Text>
//                 </View>
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     height: '100%',
//                     alignItems: 'center',
//                   }}>
//                   <Text
//                     style={{
//                       // color: item.type == 'B' ? COLORS.green : COLORS.black,
//                       fontSize: 16,
//                     }}>
//                     $2000000
//                   </Text>
//                   <Image
//                     source={require('../../Assets/Images/right_arrow.png')}
//                     style={{
//                       width: 20,
//                       height: 20,
//                       tintColor: '#6A6A6A',
//                     }}
//                   />
//                 </View>
//               </TouchableOpacity>
//             )}
//           </View>

//           {/* ........MODAL ADD MEMBER........... */}
//           <Modal
//             animationType="slide"
//             visible={this.state.modalAddMember}
//             onRequestClose={() => this.setState({modalAddMember: false})}>
//             <View style={styles.utama}>
//               <ScrollView>
//                 <View style={styles.br}>
//                   <View style={{alignItems: 'center', marginBottom: 10}}>
//                     <Text style={{fontWeight: 'bold'}}>Tambah Member </Text>
//                   </View>

//                   <View style={{width: '100%', marginVertical: 15}}>
//                     <View
//                       style={{
//                         height: 150,
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                       }}>
//                       <TouchableOpacity
//                         onPress={() => this.handleEditPhoto()}
//                         style={{
//                           borderWidth: 2,
//                           padding: 10,
//                           borderStyle: 'dashed',
//                           borderRadius: 5,
//                         }}>
//                         {this.state.foto_profil.uri !== '' ? (
//                           <Image
//                             style={{width: 100, height: 100}}
//                             source={{uri: this.state.foto_profil.uri}}
//                           />
//                         ) : (
//                           <View>
//                             <FontAwesome name="photo" size={100} />
//                           </View>
//                         )}
//                       </TouchableOpacity>
//                     </View>
//                     {/* ....NAMA BARANG.... */}
//                     <Text style={{fontWeight: 'bold'}}> Email </Text>

//                     <View style={styles.data2}>
//                       <View style={{width: '8%'}}>
//                         <IonIcons name="grid-outline" size={20} />
//                       </View>

//                       <View style={{width: '92%'}}>
//                         <TextInput
//                           placeholder={'email'}
//                           value={this.state.email}
//                           onChangeText={(t) => this.setState({email: t})}
//                         />
//                       </View>
//                     </View>
//                     {/* ......BARCODE........ */}
//                     <Text style={{fontWeight: 'bold'}}> name </Text>

//                     <View style={styles.data2}>
//                       <View style={{width: '8%'}}>
//                         <IonIcons name="barcode-sharp" size={20} />
//                       </View>

//                       <View style={{width: '92%'}}>
//                         <TextInput
//                           placeholder={'name'}
//                           value={this.state.name}
//                           onChangeText={(t) => this.setState({name: t})}
//                         />
//                       </View>
//                     </View>

//                     {/* ..........MEREK........ */}
//                     <Text style={{fontWeight: 'bold'}}> Merek </Text>

//                     <View style={styles.data2}>
//                       <View style={{width: '8%'}}>
//                         <IonIcons name="calendar-sharp" size={20} />
//                       </View>

//                       <View style={{width: '92%'}}>
//                         <TextInput
//                           placeholder={'tgl_lahir '}
//                           value={this.state.tgl_lahir}
//                           onChangeText={(t) => this.setState({tgl_lahir: t})}
//                         />
//                       </View>
//                     </View>

//                     {/* ............DISKON........... */}
//                     <Text style={{fontWeight: 'bold'}}> Alamat </Text>

//                     <View style={styles.data2}>
//                       <View style={{width: '8%'}}>
//                         <IonIcons name="pricetags" size={20} />
//                       </View>

//                       <View style={{width: '92%'}}>
//                         <TextInput
//                           placeholder={'alamat'}
//                           value={this.state.alamat}
//                           onChangeText={(t) => this.setState({alamat: t})}
//                         />
//                       </View>
//                     </View>

//                     <Text style={{fontWeight: 'bold'}}> Kategori </Text>

//                     <View style={styles.data2}>
//                       <View style={{width: '8%'}}>
//                         <IonIcons name="pricetags" size={20} />
//                       </View>

//                       <View style={{width: '92%'}}>
//                         <TextInput
//                           placeholder={'password minimal 8'}
//                           value={this.state.password}
//                           onChangeText={(t) => this.setState({password: t})}
//                         />
//                       </View>
//                     </View>
//                   </View>

//                   <TouchableOpacity
//                     onPress={() => this.addMember()}
//                     style={styles.t3}>
//                     <Text style={{fontWeight: 'bold', color: 'white'}}>
//                       Tambah
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//               </ScrollView>
//             </View>
//           </Modal>
//         </View>
//         <View style={styles.tambahanscrolview} />
//       </ScrollView>
//     );
//   }
// }

// export default Home2;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     width: '100%',
//     height: 250,
//   },
//   imagebackground: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   drawer: {
//     flexDirection: 'row',
//     marginTop: 40,
//     paddingHorizontal: 20,
//   },
//   viewdrawer: {
//     width: '50%',
//   },
//   icondrawer: {
//     alignSelf: 'flex-start',
//     color: 'white',
//   },
//   profile: {
//     width: 50,
//     height: 50,
//     alignSelf: 'flex-end',
//   },
//   viewsaldo: {
//     marginTop: 50,
//   },
//   textsaldo: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   saldo: {
//     marginTop: 10,
//     color: '#fff',
//     fontSize: 30,
//   },
//   button: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: -40,
//     marginHorizontal: 24,
//     paddingVertical: 17,
//     paddingHorizontal: 12,
//     backgroundColor: '#fff',
//     borderRadius: 12,
//   },
//   viewhistory: {
//     flex: 1,
//     marginLeft: 12,
//   },
//   textbutonats: {
//     fontSize: 22,
//   },
//   textbutonbwh: {
//     fontSize: 14,
//   },
//   arrow: {
//     width: 25,
//     height: 25,
//     tintColor: '#6A6A6A',
//   },
//   tambahanscrolview: {
//     height: 50,
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
//   utama: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'deepskyblue',
//   },
//   vh: {
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 5,
//     backgroundColor: 'white',
//   },
//   br: {
//     width: 330,
//     backgroundColor: 'white',
//     padding: 5,
//     elevation: 5,
//     borderRadius: 15,
//   },
//   t1: {
//     height: 50,
//     margin: 5,
//     alignItems: 'center',
//     borderRadius: 20,
//     justifyContent: 'center',
//     backgroundColor: 'red',
//     elevation: 3,
//   },
//   t2: {
//     height: 50,
//     margin: 5,
//     alignItems: 'center',
//     borderRadius: 20,
//     justifyContent: 'center',
//     backgroundColor: 'grey',
//     elevation: 3,
//   },
//   t3: {
//     height: 50,
//     margin: 5,
//     alignItems: 'center',
//     borderRadius: 20,
//     justifyContent: 'center',
//     backgroundColor: 'black',
//     elevation: 3,
//   },
//   data: {
//     flexDirection: 'row',
//     borderBottomWidth: 0.5,
//     paddingVertical: 5,
//     marginBottom: 10,
//   },
//   data2: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderBottomWidth: 0.5,
//     marginBottom: 10,
//   },
//   viewtransaksi: {
//     marginTop: 24,
//     marginHorizontal: 24,
//     padding: 20,
//     borderRadius: 12,
//     backgroundColor: '#fff',
//   },
// });

// import React, {Component} from 'react';
// import {
//   Text,
//   View,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Modal,
//   ActivityIndicator,
//   TextInput,
//   ToastAndroid,
// } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
// import {enpoint} from '../../../enpoint';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import IonIcons from 'react-native-vector-icons/Ionicons';
// export default class GetPenjualan extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       detail: [],
//       token: '',
//       modalEdit: false,
//       loading: true,
//       jumlah: '',
//       item_id: '',
//       transaksi: '',
//     };
//   }

//   getTransaksi() {
//     fetch(enpoint.getTransaksi + this.state.transaksi, {
//       method: 'GET',
//       headers: {
//         Accept: 'aplication/json',
//         'Content-Type': 'aplication/json',
//         Authorization: `Bearer ${this.state.token}`,
//       },
//     })
//       .then((response) => response.json())
//       .then((resJson) => {
//         console.log('ini data penjualan', resJson);
//         if (resJson.detail) {
//           this.setState({detail: resJson.detail, loading: false});
//         }
//       })
//       .catch((error) => {
//         console.log('error is' + error);
//       });
//   }
//   getAllPenjualan() {
//     console.log('mengambil data penjualan');
//     fetch(enpoint.getAllPenjualan, {
//       method: 'GET',
//       headers: {
//         Accept: 'aplication/json',
//         'Content-Type': 'aplication/json',
//         Authorization: `Bearer ${this.state.token}`,
//       },
//     })
//       .then((response) => response.json())
//       .then((resJson) => {
//         const data = resJson.data;
//         console.log('mengambil kode transaksi', data);
//         // console.log(data);
//         if (data) {
//           this.setState({transaksi: data});
//           this.getTransaksi();
//         }
//       })
//       .catch((error) => {
//         console.log('error is' + error);
//       });
//   }
//   editItem() {
//     console.log('mengupdate produk..');
//     // console.log('ini id nya');
//     const {jumlah} = this.state;
//     var dataUpdate = {
//       jumlah: jumlah,
//     };
//     this.setState({loading: true});
//     fetch(
//       `https://pos-maskasir.herokuapp.com/api/penjualan/update/${this.state.item_id}`,
//       {
//         method: 'POST',
//         body: JSON.stringify(dataUpdate),
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${this.state.token}`,
//         },
//       },
//     )
//       .then((response) => response.json())
//       .then((responseJson) => {
//         console.log(responseJson);
//         if (responseJson.status == 'success') {
//           this.setState({loading: false, modalEdit: false});
//           ToastAndroid.show('Produk telah diperbarui', ToastAndroid.SHORT);
//           this.getTransaksi();
//         } else {
//           this.setState({loading: false});
//           ToastAndroid.show('Periksa koneksi Anda.', ToastAndroid.SHORT);
//         }
//       })
//       .catch((error) => console.log(error));
//     this.setState({loading: false});
//   }
//   deleteItem = (id) => {
//     console.log('menghapus');
//     const url = `https://pos-maskasir.herokuapp.com/api/penjualan/delete/${id}`;
//     fetch(url, {
//       method: 'DELETE',
//       headers: {
//         // Accept: 'application/json',
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${this.state.token}`,
//       },
//     })
//       .then((respon) => respon.json())
//       .then((resJson) => {
//         console.log('resjson hapus', resJson);
//         if (resJson.status === 'success') {
//           this.setState({loading: false});
//           ToastAndroid.show('Item telah dihapus', ToastAndroid.SHORT);
//           this.getPenjualan();
//         } else {
//           console.log('gagal menghapus');
//           this.setState({loading: false});
//           ToastAndroid.show('Periksa koneksi Anda.', ToastAndroid.SHORT);
//         }
//       })
//       .catch((error) => {
//         console.log('error is' + error);
//       });
//   };
//   componentDidMount() {
//     AsyncStorage.getItem('token').then((value) => {
//       if (value != null) {
//         this.setState({token: value});
//         this.getAllPenjualan();
//       } else {
//         console.log('token tidak ada');
//       }
//     });
//   }
//   render() {
//     return (
//       <View style={styles.container}>
//         <View style={styles.scrollViewCont}>
//           <View style={[styles.header, styles.shadow]}>
//             <IonIcons
//               name="arrow-back-outline"
//               size={30}
//               style={{
//                 marginLeft: 20,
//               }}
//               // onPress={() =>
//               //   this.props.navigation.navigate('Nasabah', {screen: 'Akun'})
//               // }
//             />
//             <Text style={{marginLeft: 70, fontSize: 20, fontWeight: 'bold'}}>
//               Daftar Penjualan
//             </Text>
//           </View>
//           <ScrollView>
//             {this.state.loading ? (
//               <ActivityIndicator size={20} color={'black'} />
//             ) : (
//               <>
//                 {this.state.detail === '' ? (
//                   <View>
//                     <Text>BELUM ADA DATA PEMBELIAN</Text>
//                   </View>
//                 ) : (
//                   <View style={styles.addressScroll}>
//                     {this.state.detail.map((v, i) => {
//                       return (
//                         <TouchableOpacity
//                           activeOpacity={0.95}
//                           style={styles.addressList}
//                           key={i}>
//                           <View style={styles.addressListHead}>
//                             <Text style={styles.addressListNumber}>
//                               Barang {(i + 1).toString()}
//                             </Text>
//                             <AntDesign
//                               name={'checkcircle'}
//                               color={'green'}
//                               size={25}
//                               onPress={() => {}}
//                             />
//                           </View>
//                           <Text>barcode :{v.barcode}</Text>
//                           <Text>nama :{v.nama_barang}</Text>
//                           <Text>jumlah barang :{v.jumlah}</Text>
//                           <Text>kategori :{v.kategori}</Text>
//                           <Text>merek :{v.merek}</Text>
//                           {/* <Text>{v.stok}</Text> */}
//                           {/* <Text>{v.diskon}</Text> */}
//                           <Text>harga :{v.harga}</Text>
//                           <Text>harga jual :{v.harga_jual}</Text>

//                           <View style={{flexDirection: 'row-reverse'}}>
//                             <View style={styles.iconsCont}>
//                               <TouchableOpacity
//                                 activeOpacity={0.8}
//                                 onPress={() =>
//                                   this.setState({
//                                     modalEdit: true,
//                                     item_id: v.id,
//                                   })
//                                 }
//                                 style={styles.dataButton}>
//                                 <Text style={styles.dataText}> edit </Text>
//                               </TouchableOpacity>
//                             </View>

//                             <View style={styles.iconsCont}>
//                               <TouchableOpacity
//                                 activeOpacity={0.8}
//                                 onPress={() => this.deleteItem(v.id)}
//                                 style={styles.dataButton1}>
//                                 <Text style={styles.dataText}> hapus </Text>
//                               </TouchableOpacity>
//                             </View>
//                           </View>
//                         </TouchableOpacity>
//                       );
//                     })}
//                   </View>
//                 )}
//               </>
//             )}
//           </ScrollView>
//         </View>
//         <Modal
//           transparent={true}
//           visible={this.state.modalEdit}
//           statusBarTranslucent={true}
//           animationType={'fade'}
//           onRequestClose={() => this.setState({modalEdit: false})}>
//           <TouchableOpacity
//             activeOpacity={1}
//             onPress={() => this.setState({modalEdit: false})}
//             style={styles.forgetCont}>
//             <View style={styles.loginbox}>
//               <Text style={styles.boxTitle}>Edit Item</Text>
//               <TextInput
//                 style={styles.input}
//                 keyboardType={'number-pad'}
//                 autoCapitalize={'none'}
//                 // autoCompleteType={'jumlah'}
//                 placeholder={'jumlah yang di ubah'}
//                 value={this.state.jumlah}
//                 underlineColorAndroid={'#12a548'}
//                 onChangeText={(text) => this.setState({jumlah: text})}
//               />
//               <TouchableOpacity
//                 style={styles.signInButton}
//                 onPress={() => this.editItem()}>
//                 {this.state.loading ? (
//                   <ActivityIndicator size={20} color={'black'} />
//                 ) : (
//                   <Text style={styles.buttonText}>Edit</Text>
//                 )}
//               </TouchableOpacity>
//               <Text style={styles.questionText}>
//                 masukkan jumlah barang dengan tepat!
//               </Text>
//             </View>
//           </TouchableOpacity>
//         </Modal>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: 'green',
//     alignItems: 'center',
//     // paddingTop: 35,
//   },
//   scrollViewCont: {
//     flex: 1,
//     width: '100%',
//   },
//   header: {
//     backgroundColor: '#FFF',
//     height: 50,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   addressScroll: {
//     flexGrow: 1,
//     borderRadius: 10,
//     alignItems: 'center',
//     padding: 10,
//   },
//   addressList: {
//     width: '100%',
//     padding: 10,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     marginVertical: 5,
//     elevation: 4,
//     marginTop: 15,
//   },
//   addressListNumber: {
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   addressListHead: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
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
//   iconsCont: {
//     flexDirection: 'row-reverse',
//     justifyContent: 'space-between',
//     // width: '100%',
//   },
//   dataText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#e8e8e8',
//   },
//   dataButton1: {
//     flexDirection: 'row',
//     // padding: 5,
//     borderRadius: 5,
//     // alignSelf:'flex-start',
//     // justifyContent: 'flex-start',
//     backgroundColor: 'red',
//     left: 20,
//   },
//   dataButton: {
//     flexDirection: 'row',
//     padding: 3,
//     borderRadius: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'blue',
//   },
//   forgetCont: {
//     backgroundColor: '#00000087',
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   loginbox: {
//     width: '90%',
//     backgroundColor: '#eee',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     paddingVertical: 70,
//   },
//   boxTitle: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     position: 'absolute',
//     top: 20,
//     color: '#2e995594',
//   },
//   input: {
//     width: '100%',
//     marginVertical: 5,
//   },
//   signInButton: {
//     padding: 10,
//     backgroundColor: '#2e995594',
//     borderRadius: 5,
//     marginTop: 35,
//     width: 80,
//     height: 40,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttonText: {
//     fontSize: 17,
//     color: 'white',
//   },
//   questionText: {
//     position: 'absolute',
//     bottom: 25,
//   },
// });

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import React, {Component} from 'react';
// import {
//   Image,
//   Text,
//   TextInput,
//   TouchableNativeFeedback,
//   View,
//   Modal,
//   ScrollView,
//   ToastAndroid,
//   ActivityIndicator,
//   TouchableOpacity,
// } from 'react-native';
// import styles1 from '../../assets/style/boxAllRole/boxCari/boxCari';
// import styles from '../../assets/style/boxKasir/boxHomeKasir/index';

// export class Home extends Component {
//   constructor() {
//     super();
//     this.state = {
//       dataBarang: [],
//       dataMember: [],
//       loading: false,
//       loading1: false,
//       data: '',
//       data1: '',
//       dataKosong: [],
//       modalMember: false,
//       modalPembanyaran: false,
//       token: '',
//       penjualan_id: '',
//       member_id: '',
//       jenis_pembayaran: 'tunai',
//       dibayar: '',
//       pesan: '',
//       dataPembanyaran: '',
//       jumlah: '',
//       modal: false,
//       modalError: false,
//       dataInput: '',
//       namaMember: '',
//       saldoMember: '',
//     };
//   }
//   Member = () => {
//     if (this.state.member_id != null) {
//       return (
//         <View>
//           <View>
//             <View style={styles.boxDataMap}>
//               <Text>{'Nama : ' + this.state.namaMember}</Text>
//               <Text>{'Saldo : ' + this.state.saldoMember}</Text>
//             </View>
//           </View>
//         </View>
//       );
//     } else {
//       return <View></View>;
//     }
//   };
//   Hapus = (id) => {
//     console.log('Hapus Barang');
//     const {token} = this.state;
//     const url = `https://katastima-pos.herokuapp.com/api/staff/pembelian/delete-detail/${id}`;
//     fetch(url, {
//       method: 'DELETE',
//       headers: {
//         Accept: 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((resjson) => {
//         console.log('ini respon Dellet', resjson);
//         this.GetPenjualan();
//       })
//       .catch((error) => {
//         console.log('ini ada error Dellet : ', error);
//       });
//   };
//   Barang = () => {
//     return (
//       <View style={{margin: 10, padding: 10}}>
//         {this.state.dataBarang.map((val, key) => {
//           return (
//             <View style={{flexDirection: 'row'}} key={key}>
//               <View style={styles.dataBarang}>
//                 <Text> {val.nama_product}</Text>
//               </View>
//               <View style={styles.dataBarang}>
//                 <Text> {val.harga_jual}</Text>
//               </View>
//               <View style={styles.dataBarang}>
//                 <Text> {val.quantity} </Text>
//               </View>
//               <View style={styles.dataBarang}>
//                 <Text> {val.subtotal_harga} </Text>
//               </View>
//               <View style={styles.dataBarang}>
//                 <TouchableNativeFeedback onPress={() => this.Hapus(val.id)}>
//                   <Text> Hapus </Text>
//                 </TouchableNativeFeedback>
//               </View>
//             </View>
//           );
//         })}
//         <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
//           <Text> Total : </Text>
//           <Text>{'Rp.' + this.state.jumlah}</Text>
//         </View>
//       </View>
//     );
//   };
//   GetPenjualan() {
//     console.log('mulai penjualan');
//     const {token, member_id} = this.state;
//     const q = member_id !== '' ? `/${member_id}` : '';
//     const url = `https://katastima-pos.herokuapp.com/api/kasir/penjualan/form${q}`;
//     this.setState({loading: true});

//     fetch(url, {
//       method: 'GET',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((resjson) => {
//         const {data} = resjson;
//         this.setState({
//           penjualan_id: data.id,
//           dataBarang: data.detail_penjualan,
//           loading: false,
//           jumlah: data.total_price,
//         });
//         // this.setState({loading:false})
//         this.Member();
//         console.log('barang ', resjson);
//       })
//       .catch((error) => {
//         console.log('ini ada error', error);
//         this.setState({loading: false, dataInput: this.state.kosong});
//       });
//   }
//   Pembanyaran = () => {
//     console.log('mulai pembanyaran');
//     const {
//       token,
//       penjualan_id,
//       member_id,
//       jenis_pembayaran,
//       dibayar,
//     } = this.state;
//     const url =
//       'https://katastima-pos.herokuapp.com/api/kasir/penjualan/finish';
//     const data = {
//       penjualan_id: penjualan_id,
//       jenis_pembayaran: jenis_pembayaran,
//       dibayar: dibayar,
//     };
//     this.setState({loading1: true});
//     member_id != '' ? (data.member_id = member_id) : null;
//     fetch(url, {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'applicetion/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(data),
//     })
//       .then((res) => res.json())
//       .then((resjson) => {
//         const {status, error} = resjson;
//         if (status == 'success') {
//           console.log('ini res pon bersil', resjson);
//           this.setState({
//             dataPembanyaran: resjson.data,
//             modalPembanyaran: true,
//             loading1: false,
//           });
//           ToastAndroid.show(
//             ' Transaksi Berasil ',
//             ToastAndroid.SHORT,
//             ToastAndroid.CENTER,
//           );
//         } else if (status == 'failed' && error) {
//           console.log('orang kere ', resjson);
//           this.setState({
//             pesan: resjson.message,
//             modalError: true,
//             loading1: false,
//           });
//           ToastAndroid.show(
//             ' Uang anda tidak Cukup ',
//             ToastAndroid.SHORT,
//             ToastAndroid.CENTER,
//           );
//         } else {
//           console.log(' ini ada kesalahan ', resjson);
//           this.setState({loading1: false});
//         }
//       })
//       .catch((error) => {
//         this.setState({loading1: false});
//         console.log('error adalah ' + error);
//       });
//   };
//   CariMember() {
//     console.log('get  barang');
//     const {token, dataInput} = this.state;
//     const q = dataInput !== '' ? `/${dataInput}` : '';
//     const url = `https://katastima-pos.herokuapp.com/api/kasir/member/cari${q}`;
//     this.setState({loading: true});
//     console.log(token);
//     fetch(url, {
//       method: 'GET',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((resjson) => {
//         this.setState({dataMember: resjson, loading: false});
//         console.log('ini respon cari member ', resjson);
//       })
//       .catch((error) => {
//         console.log('ini ada error', error);
//         this.setState({loading: false, dataInput: this.state.kosong});
//       });
//   }
//   componentDidMount() {
//     AsyncStorage.getItem('token').then((token) => {
//       if (token) {
//         this.setState({token: token});
//         console.log(this.state.token);
//       } else {
//         console.log('tidak ada token');
//       }
//     });
//   }

//   render() {
//     const {dataPembanyaran, jenis_pembayaran, dibayar} = this.state;
//     return (
//       <View style={styles.utama}>
//         <View style={styles.headher}>
//           <TouchableNativeFeedback
//             onPress={() => this.props.navigation.openDrawer()}>
//             <Image
//               source={require('../../assets/logoAplikasi/pngaaa.com-607749.png')}
//               style={styles.Icon}
//             />
//           </TouchableNativeFeedback>
//           <Text style={styles.taksIcon}> atastima</Text>
//         </View>
//         {this.state.penjualan_id == '' ? (
//           <View style={{...styles.boxInputMember, alignSelf: 'center'}}>
//             {this.state.loading ? (
//               <ActivityIndicator size={30} color="white" />
//             ) : (
//               <TouchableNativeFeedback onPress={() => this.GetPenjualan()}>
//                 <Text style={{fontSize: 20, color: 'white', padding: 5}}>
//                   Mulai Penjualan
//                 </Text>
//               </TouchableNativeFeedback>
//             )}
//           </View>
//         ) : (
//           <ScrollView style={styles.utama}>
//             <View style={{...styles.boxInputMember, alignSelf: 'center'}}>
//               {this.state.loading ? (
//                 <ActivityIndicator size={30} color="white" />
//               ) : (
//                 <TouchableNativeFeedback
//                   onPress={() =>
//                     this.props.navigation.navigate('Cari', {
//                       id: this.state.penjualan_id,
//                       pesan: 'kasir',
//                     })
//                   }>
//                   <Text style={{fontSize: 20, color: 'white', padding: 5}}>
//                     Pencarian Barang
//                   </Text>
//                 </TouchableNativeFeedback>
//               )}
//             </View>
//             <ScrollView horizontal>
//               {this.state.dataBarang == '' ? (
//                 <View></View>
//               ) : (
//                 <View>{this.Barang()}</View>
//               )}
//             </ScrollView>
//             <View style={{flexDirection: 'row', padding: 5}}></View>
//             <TouchableNativeFeedback
//               onPress={() => this.setState({modalMember: true})}>
//               <View style={{...styles.boxInputMember, alignItems: 'center'}}>
//                 <Text style={{fontSize: 20, color: 'white', padding: 5}}>
//                   Member
//                 </Text>
//                 <Image
//                   style={{...styles.Icon, margin: 10}}
//                   source={require('../../assets/logoAplikasi/pngaaa.com-607749.png')}
//                 />
//               </View>
//             </TouchableNativeFeedback>
//             {this.state.dataMember == '' ? (
//               <View></View>
//             ) : (
//               <View>{this.Member()}</View>
//             )}

//             <View style={styles.klikBayar}>
//               <TouchableNativeFeedback
//                 onPress={() => this.setState({modal: true})}>
//                 {this.state.loading1 ? (
//                   <ActivityIndicator size={30} color="white" />
//                 ) : (
//                   <Text
//                     style={{
//                       fontSize: 20,
//                       fontWeight: 'bold',
//                       color: 'white',
//                       padding: 5,
//                     }}>
//                     Pembanyaran
//                   </Text>
//                 )}
//               </TouchableNativeFeedback>
//             </View>
//           </ScrollView>
//         )}
//         <Modal
//           visible={this.state.modalMember}
//           animationType="fade"
//           onRequestClose={() => this.setState({modalMember: false})}
//           transparent>
//           <View style={{flex: 1, backgroundColor: 'white'}}>
//             <View style={styles1.boxInput}>
//               <TextInput
//                 style={{flex: 1}}
//                 placeholder="Member"
//                 onChangeText={(taks) => this.setState({dataInput: taks})}
//               />
//               <TouchableOpacity onPress={(taks) => this.CariMember()}>
//                 <Image
//                   source={require('../../assets/logoAplikasi/pngaaa.com-607749.png')}
//                   style={styles1.Icon}
//                 />
//               </TouchableOpacity>
//             </View>
//             <ScrollView>
//               {this.state.dataMember == null ? (
//                 <View>
//                   {loading ? (
//                     <View></View>
//                   ) : (
//                     <ActivityIndicator size={50} color="red" />
//                   )}
//                 </View>
//               ) : (
//                 <View>
//                   {this.state.dataMember.map((val, key) => {
//                     return (
//                       <View key={key}>
//                         <TouchableNativeFeedback
//                           onPress={() =>
//                             this.setState({
//                               member_id: val.id,
//                               namaMember: val.nama,
//                               saldoMember: val.saldo,
//                             })
//                           }>
//                           <View style={styles.boxDataMap}>
//                             <Text>{'Kode : ' + val.kode_member}</Text>
//                             <Text>{'Nama : ' + val.nama}</Text>
//                             <Text>{'Saldo : ' + val.saldo}</Text>
//                             <Text>{'No Telephone : ' + val.no_telephone}</Text>
//                           </View>
//                         </TouchableNativeFeedback>
//                       </View>
//                     );
//                   })}
//                 </View>
//               )}
//             </ScrollView>
//           </View>
//         </Modal>
//         <Modal
//           visible={this.state.modalPembanyaran}
//           animationType="fade"
//           onRequestClose={() => this.setState({modalPembanyaran: false})}
//           transparent>
//           <View style={{flex: 1, backgroundColor: 'white'}}>
//             <Text>{'total : Rp. ' + dataPembanyaran.total_price}</Text>
//             <Text>
//               {'jenis pembayaran : ' + dataPembanyaran.jenis_pembayaran}
//             </Text>
//             <Text>{'Uang : Rp. ' + dataPembanyaran.dibayar}</Text>
//             <Text>{'kembalian : Rp. ' + dataPembanyaran.kembalian}</Text>
//           </View>
//         </Modal>
//         <Modal
//           visible={this.state.modal}
//           animationType="fade"
//           onRequestClose={() => this.setState({modal: false})}
//           transparent>
//           <View style={{flex: 1, backgroundColor: 'white'}}>
//             <View
//               style={{
//                 justifyContent: 'space-around',
//                 flexDirection: 'row',
//               }}>
//               <TouchableNativeFeedback
//                 onPress={() => this.setState({jenis_pembayaran: 'tunai'})}>
//                 <View
//                   style={{
//                     margin: 10,
//                     backgroundColor: 'blue',
//                     padding: 5,
//                     borderRadius: 10,
//                   }}>
//                   <Text style={{fontSize: 20, color: 'white'}}>Tunai</Text>
//                 </View>
//               </TouchableNativeFeedback>
//               <TouchableNativeFeedback
//                 onPress={() => this.setState({jenis_pembayaran: 'debit'})}>
//                 <View
//                   style={{
//                     margin: 10,
//                     backgroundColor: 'blue',
//                     padding: 5,
//                     borderRadius: 10,
//                   }}>
//                   <Text style={{fontSize: 20, color: 'white'}}>Debit</Text>
//                 </View>
//               </TouchableNativeFeedback>
//             </View>

//             <TextInput
//               placeholder="apap"
//               onChangeText={(taks) => this.setState({dibayar: taks})}
//               keyboardType="number-pad"
//             />
//             <View style={styles.klikBayar}>
//               <TouchableNativeFeedback onPress={() => this.Pembanyaran()}>
//                 {this.state.loading1 ? (
//                   <ActivityIndicator size={30} color="white" />
//                 ) : (
//                   <Text
//                     style={{
//                       fontSize: 20,
//                       fontWeight: 'bold',
//                       color: 'white',
//                       padding: 5,
//                     }}>
//                     Bayar
//                   </Text>
//                 )}
//               </TouchableNativeFeedback>
//             </View>
//           </View>
//         </Modal>
//         <Modal
//           visible={this.state.modalError}
//           animationType="fade"
//           onRequestClose={() => this.setState({modalError: false})}
//           transparent>
//           <View style={{flex: 1, backgroundColor: 'white'}}>
//             <Text> {this.state.pesan}</Text>
//           </View>
//         </Modal>
//       </View>
//     );
//   }
// }

// export default Home;
