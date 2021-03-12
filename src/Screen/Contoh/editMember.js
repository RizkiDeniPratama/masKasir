// import AsyncStorage from '@react-native-async-storage/async-storage';
// import React, {Component} from 'react';
// import {
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   Modal,
//   ActivityIndicator,
//   StyleSheet,
//   ToastAndroid,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

// export default class EditMember extends Component {
//   constructor() {
//     super();
//     this.state = {
//       data: {},
//       token:'',

//       edit: false,
//       name: '',
//       email: '',
//       telepon: '',
//       alamat: '',

//       topup: false,
//       saldo: '',

//       loading: false,
//     };
//   }

//   hapusMember = () => {
//     console.log(this.props.route.params.v.id);
//     this.setState({loading: true});

//     const url = `https://master-of-sale.herokuapp.com/api/member/${this.props.route.params.v.id}`;

//     fetch(url, {
//       method: 'DELETE',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${this.state.token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((resJson) => {
//         console.log('ini datanya ', resJson.status);
//         if (resJson.status == 'success') {
//           ToastAndroid.show(
//             'Berhasil Hapus Akun Penguna',
//             ToastAndroid.SHORT,
//             ToastAndroid.CENTER,
//           );
//           this.setState({loading: false});
//           this.props.navigation.replace('MemberKasir');
//         } else {
//           console.log('erere');
//           alert('Gagal Menghapus Member');
//           this.setState({loading: false});
//         }
//       })
//       .catch((resJson) => {
//         this.setState({loading: false});
//         alert('Ada Kesalahan Server');
//         console.log('ini errro  ', resJson);
//       });
//   };

//   topUp = () => {
//     const {saldo} = this.state;
//     const url = `https://master-of-sale.herokuapp.com/api/member/${this.props.route.params.v.id}/topup`;
//     this.setState({loading: true});

//     fetch(url, {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${this.state.token}`,
//       },
//       body: JSON.stringify({
//         saldo: saldo,
//       }),
//     })
//       .then((res) => res.json())
//       .then((resjson) => {
//         console.log('ini resjsonnya', resjson.data);
//         if (resjson.status === 'success') {
//           this.setState({data: resjson.data, loading: false});

//           Alert.alert(
//             'Top Up Berhasil',
//             `Nama: ${this.props.route.params.v.name}` +
//               `\nEmail: ${this.props.route.params.v.email}` +
//               `\nKode Member: ${this.props.route.params.v.kode_member}` +
//               `\nJumlah Top Up: ${this.state.data.saldo}`,
//             [
//               {
//                 text: 'OK',
//                 onPress: () => console.log('OK Pressed'),
//                 style: 'cancel',
//               },
//             ],
//           );

//           this.props.navigation.replace('MemberKasir');
//         } else {
//           console.log('ini json ', resjson.data);
//           this.setState({loading: false});
//           alert('gagal Top Up');
//         }
//       })
//       .catch((error) => {
//         console.log('ini error ', error);
//       });
//   };

//   edit = () => {
//     const {name, email, telepon, alamat} = this.state;
//     const url = `https://master-of-sale.herokuapp.com/api/member/${this.props.route.params.v.id}`;
//     this.setState({loading: true});

//     fetch(url, {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${this.state.token}`,
//       },
//       body: JSON.stringify({
//         name: name,
//         email: email,
//         alamat: alamat,
//         telepon: telepon,
//       }),
//     })
//     .then((res) => res.json())
//       .then((resjson) => {
//       console.log('ini id', this.props.route.params.v.id);
//       console.log('ini resjsonnya', resjson.status);
//       // if (resjson.status=== 'success') {
//       //   this.setState({data: resjson.data, loading: false});
//       //   Alert.alert(
//       //     'Berhasil',
//       //     `Nama: ${this.state.data.name}` +
//       //       `\nEmail: ${this.state.data.email}` +
//       //       `\nKode Member: ${this.state.data.kode_member}` +
//       //       `\nEmail: ${this.state.data.telepon}`,
//       //     [
//       //       {
//       //         text: 'OK',
//       //         onPress: () => console.log('OK Pressed'),
//       //         style: 'cancel',
//       //       },
//       //     ],
//       //   );

//       //   this.props.navigation.replace('MemberKasir');
//       // } else {
//       //   console.log('ini json ', resjson.data);
//       //   this.setState({loading: false});
//       //   alert('Gagal Edit Member');
//       // }
//     })
//     .catch((error) => {
//       console.log('ini error ', error);
//       alert('Ada Kesalahan Server');
//       this.setState({loading: false});
//     });
//   };

//   componentDidMount() {
//     AsyncStorage.getItem('token').then((token) => {
//       if (token != null) {
//         this.setState({token: token});
//       } else {
//         console.log('gak ada token');
//       }
//     });
//   }

//   // topUp = () => {
//   //   this.setState({topup: true});
//   // };
//   render() {
//     const {v} = this.props.route.params;
//     return (
//       <View style={styles.utama}>
//         {/* modal loading */}
//         <Modal
//           transparent={true}
//           animationType="slide"
//           visible={this.state.loading}
//           onRequestClose={() => this.setState({loading: false})}>
//           <View
//             style={{
//               flex: 1,
//               justifyContent: 'center',
//               alignItems: 'center',
//               backgroundColor: '#0000008c',
//             }}>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 height: 100,
//                 backgroundColor: 'white',
//                 alignItems: 'center',
//               }}>
//               <ActivityIndicator size={50} color="black" style={{margin: 10}} />
//               <Text style={{margin: 10, fontWeight: 'bold'}}>
//                 Data Sedang di Proses . . .
//               </Text>
//             </View>
//           </View>
//         </Modal>
//         {/* modal tambah saldo  */}
//         <Modal
//           animationType="slide"
//           visible={this.state.topup}
//           onRequestClose={() => this.setState({topup: false})}>
//           <View
//             style={{
//               flex: 1,
//             }}>
//             <View style={styles.vh}>
//               <Text style={{fontWeight: 'bold', fontSize: 20}}>
//                 Top Up Saldo
//               </Text>
//             </View>

//             <View style={{flex: 1}}>
//               <Text style={{margin: 5}}>
//                 Top up atas Nama
//                 <Text style={{fontWeight: 'bold'}}> {v.name}</Text>
//               </Text>

//               <View
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   padding: 5,
//                   margin: 5,
//                   borderWidth: 0.5,
//                 }}>
//                 <Text style={{fontWeight: 'bold'}}>Rp. </Text>
//                 <TextInput
//                   value={this.state.saldo}
//                   placeholder="Masukkan Nominal"
//                   keyboardType="number-pad"
//                   onChangeText={(t) => this.setState({saldo: t})}
//                 />
//               </View>
//             </View>

//             <TouchableOpacity onPress={() => this.topUp()} style={styles.t3}>
//               <Text style={{fontWeight: 'bold', color: 'white'}}>Top Up</Text>
//             </TouchableOpacity>
//           </View>
//         </Modal>
//         {/* modal edit member */}
//         <Modal
//           animationType="slide"
//           visible={this.state.edit}
//           onRequestClose={() => this.setState({edit: false})}>
//           <View style={styles.utama}>
//             <View style={styles.br}>
//               <View style={{alignItems: 'center', marginBottom: 10}}>
//                 <Text style={{fontWeight: 'bold'}}> Member </Text>
//                 <View style={styles.data}>
//                   <Text style={{fontWeight: 'bold'}}> Code Member </Text>

//                   <Text style={{marginLeft: 5}}> : {v.kode_member} </Text>
//                 </View>
//               </View>

//               <View style={{width: '100%', marginVertical: 15}}>
//                 <Text style={{fontWeight: 'bold'}}> Username </Text>

//                 <View style={styles.data2}>
//                   <View style={{width: '8%'}}>
//                     <Icon name="person" size={20} />
//                   </View>

//                   <View style={{width: '92%'}}>
//                     <TextInput
//                       placeholder={v.name}
//                       value={this.state.name}
//                       onChangeText={(t) => this.setState({name: t})}
//                     />
//                   </View>
//                 </View>

//                 <Text style={{fontWeight: 'bold'}}> Email </Text>

//                 <View style={styles.data2}>
//                   <View style={{width: '8%'}}>
//                     <Icon name="mail" size={20} />
//                   </View>

//                   <View style={{width: '92%'}}>
//                     <TextInput
//                       placeholder={v.email}
//                       value={this.state.email}
//                       onChangeText={(t) => this.setState({email: t})}
//                     />
//                   </View>
//                 </View>

//                 <Text style={{fontWeight: 'bold'}}> Telepon </Text>

//                 <View style={styles.data2}>
//                   <View style={{width: '8%'}}>
//                     <Icon name="call" size={20} />
//                   </View>

//                   <View style={{width: '92%'}}>
//                     <TextInput
//                       placeholder={v.telepon}
//                       value={this.state.telepon}
//                       onChangeText={(t) => this.setState({telepon: t})}
//                     />
//                   </View>
//                 </View>

//                 <Text style={{fontWeight: 'bold'}}> Alamat </Text>

//                 <View style={styles.data2}>
//                   <View style={{width: '8%'}}>
//                     <Icon name="location" size={20} />
//                   </View>

//                   <View style={{width: '92%'}}>
//                     <TextInput
//                       placeholder={v.alamat}
//                       value={this.state.alamat}
//                       onChangeText={(t) => this.setState({alamat: t})}
//                     />
//                   </View>
//                 </View>
//               </View>

//               <TouchableOpacity onPress={() => this.edit()} style={styles.t3}>
//                 <Text style={{fontWeight: 'bold', color: 'white'}}>Simpan</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>

//         <View style={styles.br}>
//           <View style={{alignItems: 'center', marginBottom: 10}}>
//             <Text style={{fontWeight: 'bold'}}> Member </Text>
//             <View style={styles.data}>
//               <Text style={{fontWeight: 'bold'}}> Code Member </Text>

//               <Text style={{marginLeft: 5}}> : {v.kode_member} </Text>
//             </View>
//           </View>

//           <View style={{width: '100%', marginVertical: 15}}>
//             <Text style={{fontWeight: 'bold'}}> Username </Text>

//             <View style={styles.data}>
//               <Icon name="person" size={20} />

//               <Text style={{marginLeft: 5}}> {v.name} </Text>
//             </View>

//             <Text style={{fontWeight: 'bold'}}> Email </Text>

//             <View style={styles.data}>
//               <Icon name="mail" size={20} />

//               <Text style={{marginLeft: 5}}> {v.email} </Text>
//             </View>

//             <Text style={{fontWeight: 'bold'}}> Kode Member </Text>

//             <View style={styles.data}>
//               <Icon name="people" size={20} />

//               <Text style={{marginLeft: 5}}> {v.kode_member} </Text>
//             </View>

//             <Text style={{fontWeight: 'bold'}}> Telepon </Text>

//             <View style={styles.data}>
//               <Icon name="call" size={20} />

//               <Text style={{marginLeft: 5}}> {v.telepon} </Text>
//             </View>

//             <Text style={{fontWeight: 'bold'}}> Alamat </Text>

//             <View style={styles.data}>
//               <Icon name="location" size={20} />

//               <Text style={{marginLeft: 5}}> {v.alamat} </Text>
//             </View>
//           </View>

//           <TouchableOpacity
//             onPress={() => this.hapusMember()}
//             style={styles.t1}>
//             <Text style={{fontWeight: 'bold', color: 'white'}}>
//               Hapus Member
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={() => this.setState({topup: true})}
//             style={styles.t2}>
//             <Text style={{fontWeight: 'bold', color: 'white'}}>
//               Isi Saldo Member
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={() => this.setState({edit: true})}
//             style={styles.t3}>
//             <Text style={{fontWeight: 'bold', color: 'white'}}>
//               Edit Member
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
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
// });
