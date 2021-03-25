import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home2 from '../../Screen/Kasir/home2';
import DrawerKasir from '../../Screen/Kasir/drawerkasir';
const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerKasir {...props} />}>
      <Drawer.Screen name="Home2" component={Home2} />
    </Drawer.Navigator>
  );
}
