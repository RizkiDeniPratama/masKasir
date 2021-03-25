// import React, {Component} from 'react';
// import {
//   Text,
//   View,
//   TouchableOpacity,
//   StyleSheet,
//   TouchableNativeFeedback,
//   TextInput,
//   TouchableWithoutFeedback,
//   ScrollView,
//   Alert,
//   ToastAndroid,
//   ActivityIndicator,
//   Modal,
//   KeyboardAvoidingView,
//   StatusBar,
//   Button,
// } from 'react-native';
// import {Picker} from '@react-native-picker/picker';
// import AsyncStorage from '@react-native-community/async-storage';
// import {enpoint} from '../../../enpoint';
// export class Addpembelian extends Component {
//   constructor() {
//     super();
//     this.state = {
//       token: '',
//       inputData: [],
//       daftar_barang: [],
//       daftar_supplier: [],
//       supplier_id: '',
//       barang_id: 0,
//       jumlah: '0',
//       modalChangeSupplier: false,
//       loading: false,
//     };
//   }

//   // handleSendData = () => {
//   //   if (this.state.inputData.length > 0) {
//   //     Alert.alert('Kirim Laporan', 'Pastikan data yang anda masukkan sesuai!', [
//   //       {
//   //         text: 'Batal',
//   //       },
//   //       {
//   //         text: 'Lanjutkan',
//   //         onPress: this.logData,
//   //       },
//   //     ]);
//   //   } else {
//   //     ToastAndroid.show('Masukkan data anda dengan benar', 1200);
//   //   }
//   // };
//   getSupplier() {
//     console.log('mengambil supplier..');
//     this.setState({daftar_supplier: []});
//     fetch(enpoint.getallsupli, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${this.state.token}`,
//       },
//     })
//       .then((response) => response.json())
//       .then((responseJSON) => {
//         this.setState({daftar_supplier: responseJSON.data});
//         console.log('supplier termuat', responseJSON);
//         this.getBarang();
//       })
//       .catch((error) => {
//         console.log('error is' + error);
//       });
//   }
//   getBarang() {
//     console.log('mengambil supplier..');
//     this.setState({daftar_barang: []});
//     fetch(enpoint.getallbarang, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${this.state.token}`,
//       },
//     })
//       .then((response) => response.json())
//       .then((responseJSON) => {
//         this.setState({daftar_barang: responseJSON.data});
//         console.log('barang termuat.', responseJSON);
//       })
//       .catch((error) => {
//         console.log('error is' + error);
//       });
//   }

//   masukkanInput = () => {
//     if (this.state.supplier_id && this.state.jumlah > 0) {
//       let data = {
//         barang: this.state.barang_id,
//         jumlah: parseFloat(this.state.jumlah),
//       };

//       let newInputData = this.state.inputData.concat([data]);

//       this.setState({inputData: newInputData});
//     } else if (this.state.supplier_id && this.state.jumlah < 1) {
//       ToastAndroid.show('Pembelian minimal 1 barang!', 2500);
//     } else {
//       ToastAndroid.show('Pilih supplier anda terlebih dahulu!', 2500);
//       this.setState({modalChangeSupplier: true});
//     }
//   };

//   logData = () => {
//     this.setState({loading: true});

//     var myHeaders = new Headers();
//     myHeaders.append('Authorization', `Bearer ${this.state.token}`);
//     myHeaders.append('Accept', 'aplication/json');
//     let form = new FormData();

//     form.append('supplier', this.state.supplier_id);
//     this.state.inputData.forEach((element, index) => {
//       form.append(`detail[${index}][barang]`, element.barang);
//       form.append(`detail[${index}][jumlah]`, element.jumlah);
//     });

//     console.log('ini form pendataan == ', form);

//     var requestOptions = {
//       method: 'POST',
//       headers: myHeaders,
//       body: form,
//     };
//     fetch(enpoint.addpembelian, requestOptions)
//       .then((response) => response.json())
//       .then((resJson) => {
//         console.log('resjson nya sup === ', resJson);
//         if (resJson) {
//           this.props.navigation.replace('Home1');
//           ToastAndroid.show(' berhasil Menambah Pembelian!', 1500);
//         } else {
//           this.setState({loading: false});
//           ToastAndroid.show('Maaf Pembelian Gagal Ditambah!', 1500);
//         }
//       })
//       .catch((error) => {
//         console.log('catch error nambah pembelian === ', error);
//         this.setState({loading: false});
//         ToastAndroid.show('Maaf Pembelian Tidak Berhasil!', 1500);
//       });
//   };

//   changeSupplier = (nama) => {
//     console.log('nama supplier = ', nama);
//     if (nama !== this.state.supplier_id) {
//       this.setState({
//         supplier_id: nama,
//         inputData: [],
//         modalChangeSupplier: false,
//       });
//     } else {
//       this.setState({modalChangeSupplier: false});
//     }
//   };

//   componentDidMount() {
//     AsyncStorage.getItem('token').then((value) => {
//       if (value != null) {
//         this.setState({token: value}, () => {
//           this.getSupplier();
//         });
//       } else {
//         console.log('token tidak ada');
//       }
//     });
//   }
//   // this.setState({inputData: [], supplier_id: input});
//   render() {
//     return (
//       <View>
//         <StatusBar translucent />
//         <Modal
//           statusBarTranslucent
//           transparent
//           visible={this.state.modalChangeSupplier}
//           animationType={'fade'}
//           onRequestClose={() => this.setState({modalChangeSupplier: false})}>
//           <KeyboardAvoidingView
//             behavior={'padding'}
//             style={{
//               flex: 1,
//               padding: 10,
//               alignItems: 'center',
//               justifyContent: 'center',
//               backgroundColor: '#000000ab',
//             }}>
//             <View
//               style={{
//                 backgroundColor: '#F8F8F8',
//                 padding: 10,
//                 width: '80%',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 borderRadius: 10,
//               }}>
//               <Text style={{fontSize: 25}}>Ubah Supplier</Text>
//               <View
//                 style={{
//                   height: 200,
//                   width: '100%',
//                 }}>
//                 <Text>
//                   Mengubah supplier akan mengosongkan data supplier lainnya
//                 </Text>
//                 <ScrollView>
//                   {this.state.daftar_supplier.map((v, i) => {
//                     return (
//                       <View key={i} style={{marginVertical: 5}}>
//                         <Button
//                           title={v.nama_supplier}
//                           onPress={() => this.changeSupplier(v.nama_supplier)}
//                         />
//                       </View>
//                     );
//                   })}
//                 </ScrollView>
//                 {}
//               </View>
//             </View>
//             <View
//               style={{
//                 // backgroundColor: "red",
//                 padding: 10,
//                 width: '80%',
//                 borderRadius: 1,
//               }}>
//               <Button
//                 // disabled={loading}
//                 onPress={() => {
//                   this.setState({modalChangeSupplier: false});
//                 }}
//                 // mode="contained"
//                 color="red"
//                 style={[{width: '100%', marginTop: 2}]}
//                 title="Batalkan"
//               />
//             </View>
//           </KeyboardAvoidingView>
//         </Modal>

//         <View style={styles.mainViewModal}>
//           <View style={styles.modal}>
//             <ScrollView>
//               <View style={{width: '95%'}}>
//                 {/* DI TEXT INPUT KAN ITU BIASANYA PAKAI onChangeText KAN NAH AKU BINGUNG SOALNYA DI DATA FETCH NYA KAN AKU SIMPAN TU ELEMENT NYA DI STATE NAMANYA INPUT DATA.NAH APA AKU TARO DI SANA (DI DALAM onChangeTextNYA)
//                 onChangeText={(input) => this.setState({inputData: input})} */}

//                 <Text>jumlah</Text>
//                 <TextInput
//                   keyboardType={'decimal-pad'}
//                   placeholder="e.g 10"
//                   value={this.state.jumlah}
//                   underlineColorAndroid="orange"
//                   onChangeText={(input) => this.setState({jumlah: input})}
//                 />
//                 <Text>Penyedia Produk</Text>
//                 <Button
//                   title="Pilih Supplier"
//                   onPress={() => this.setState({modalChangeSupplier: true})}
//                 />
//               </View>
//               <View style={styles.spliterModal}>
//                 <View style={{width: '70%'}}>
//                   <Text>barang</Text>
//                   <Picker
//                     mode="dropdown"
//                     selectedValue={this.state.barang_id}
//                     onValueChange={(id) => this.setState({barang_id: id})}>
//                     {this.state.daftar_barang.map((value, index) => (
//                       <Picker.Item
//                         key={index}
//                         label={value.nama_barang}
//                         value={value.id}
//                       />
//                     ))}
//                   </Picker>
//                 </View>
//               </View>

//               {this.state.loading ? (
//                 <View style={styles.button}>
//                   <ActivityIndicator color="white" size="small" />
//                 </View>
//               ) : (
//                 <TouchableNativeFeedback onPress={this.masukkanInput}>
//                   <View style={styles.button}>
//                     <Text style={styles.text}>Add</Text>
//                   </View>
//                 </TouchableNativeFeedback>
//               )}
//               {this.state.supplier_id ? (
//                 <Text
//                   style={{
//                     fontSize: 20,
//                     fontWeight: 'bold',
//                     textAlign: 'center',
//                   }}>
//                   Supplier {this.state.supplier_id}
//                 </Text>
//               ) : (
//                 <Text
//                   style={{
//                     fontSize: 20,
//                     fontWeight: 'bold',
//                     textAlign: 'center',
//                   }}>
//                   Pilih Supplier Dahulu
//                 </Text>
//               )}
//               {this.state.inputData.map((v, i) => {
//                 return (
//                   <View
//                     key={i}
//                     style={{
//                       width: '100%',
//                       marginVertical: 5,
//                       backgroundColor: 'lightblue',
//                       borderRadius: 5,
//                       padding: 5,
//                     }}>
//                     <Text>barang : {v.barang}</Text>
//                     <Text>jumlah : {v.jumlah}</Text>
//                   </View>
//                 );
//               })}
//               <TouchableNativeFeedback onPress={this.logData}>
//                 <View style={styles.button}>
//                   <Text style={styles.text}>Log Data di Konsol</Text>
//                 </View>
//               </TouchableNativeFeedback>
//             </ScrollView>
//           </View>
//         </View>
//       </View>
//     );
//   }
// }

// export default Addpembelian;

// const styles = StyleSheet.create({
//   mainViewModal: {
//     justifyContent: 'center',
//     height: '100%',
//     alignItems: 'center',
//   },
//   headerModal: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//     width: '95%',
//   },
//   inputHarga: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   textHarga: {},
//   spliterModal: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   buttonAdd: {
//     alignSelf: 'center',
//     backgroundColor: 'white',
//     elevation: 3,
//     alignItems: 'center',
//     borderRadius: 10,
//     padding: 10,
//   },
//   button: {
//     padding: 10,
//     backgroundColor: 'tomato',
//     borderRadius: 10,
//     elevation: 5,
//     width: 100,
//     alignSelf: 'center',
//     height: 50,
//     justifyContent: 'center',
//   },
//   modal: {
//     backgroundColor: 'white',
//     width: '90%',
//     borderRadius: 10,
//     elevation: 3,
//     padding: 10,
//     alignItems: 'center',
//   },
// });
