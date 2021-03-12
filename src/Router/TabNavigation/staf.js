import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home1 from '../../Screen/Staff/home1';
import Drawerstaff from '../../Screen/Staff/drawerstaf';
const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator drawerContent={(props) => <Drawerstaff {...props} />}>
      <Drawer.Screen name="Home1" component={Home1} />
    </Drawer.Navigator>
  );
}
