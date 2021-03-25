import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Transaksi from '../../Screen/Kasir/transaksi';

const Tab = createMaterialTopTabNavigator();

const TopKasir = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Transaksi" component={Transaksi} />
    </Tab.Navigator>
  );
};

export default TopKasir;
