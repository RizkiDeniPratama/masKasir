import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home3 from '../../Screen/Member/home3';
import Drawermember from '../../Screen/Member/drawermamber';
const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator drawerContent={(props) => <Drawermember {...props} />}>
      <Drawer.Screen name="Home3" component={Home3} />
    </Drawer.Navigator>
  );
}
