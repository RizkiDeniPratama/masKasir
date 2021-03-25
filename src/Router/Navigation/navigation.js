import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../../Screen/Auth/login';
import Register from '../../Screen/Auth/register';
import Splash from '../../Screen/Intro/Splash';

import Member from '../../Router/TabNavigation/member';
import Staf from '../../Router/TabNavigation/staf';
import Kasir from '../../Router/TabNavigation/kasir';
import Pemimpin from '../../Router/TabNavigation/pemimpin';
import Home2 from '../../Screen/Kasir/home2';
import Home3 from '../../Screen/Member/home3';
import Drawermember from '../../Screen/Member/drawermamber';
import Editmember from '../../Screen/Member/editprofile';
import Drawerstaff from '../../Screen/Staff/drawerstaf';
import Daftarsup from '../../Screen/Staff/daftarsup';
import Editsup from '../../Screen/Staff/editsupp';
import DaftarBarang from '../../Screen/Staff/daftaritem';
import EditBarang from '../../Screen/Staff/edititem';
import AddPembelian from '../../Screen/Staff/addpembelian';
import DrawerKasir from '../../Screen/Kasir/drawerkasir';
import Transaksi from '../../Screen/Kasir/transaksi';
import TopKasir from '../TopNavigation/topkasir';
import GetMember from '../../Screen/Kasir/getmember';
import EditMember from '../../Screen/Kasir/editmember';
import TambahBarang from '../../Screen/Kasir/TambahBarang';
import GetPenjualan from '../../Screen/Kasir/gettransaksi';
import DetailTransaksi from '../../Screen/Kasir/detailTransaksi';
import Last from '../../Screen/Kasir/last';
const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animationEnabled: false,
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Member" component={Member} />
        <Stack.Screen name="Staf" component={Staf} />
        <Stack.Screen name="Kasir" component={Kasir} />
        <Stack.Screen name="Pemimpin" component={Pemimpin} />
        <Stack.Screen name="Home2" component={Home2} />
        <Stack.Screen name="Home3" component={Home3} />
        <Stack.Screen name="Drawermember" component={Drawermember} />
        <Stack.Screen name="Editmember" component={Editmember} />
        <Stack.Screen name="Drawerstaff" component={Drawerstaff} />
        <Stack.Screen name="Daftarsup" component={Daftarsup} />
        <Stack.Screen name="Editsup" component={Editsup} />
        <Stack.Screen name="DaftarBarang" component={DaftarBarang} />
        <Stack.Screen name="EditBarang" component={EditBarang} />
        <Stack.Screen name="AddPembelian" component={AddPembelian} />
        <Stack.Screen name="DrawerKasir" component={DrawerKasir} />
        <Stack.Screen name="Transaksi" component={Transaksi} />
        <Stack.Screen name="TopKasir" component={TopKasir} />
        <Stack.Screen name="GetMember" component={GetMember} />
        <Stack.Screen name="EditMember" component={EditMember} />
        <Stack.Screen name="TambahBarang" component={TambahBarang} />
        <Stack.Screen name="GetPenjualan" component={GetPenjualan} />
        <Stack.Screen name="DetailTransaksi" component={DetailTransaksi} />
        <Stack.Screen name="Last" component={Last} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Navigation;
