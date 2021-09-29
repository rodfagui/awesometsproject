import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CoinsScreen from './CoinsScreen';
import CoinDetailScreen from '../coinDetail/CoinDetailScreen';
import colors from '../../resources/colors';
import {Coin} from './CoinItem';

const Stack = createStackNavigator();

export type CoinStackParamList = {
  Coins: undefined;
  CoinDetail: {
    item: Coin;
  };
};

const CoinsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.blackPearl,
          shadowColor: colors.blackPearl,
        },
        headerTintColor: colors.white,
      }}>
      <Stack.Screen name="Coins" component={CoinsScreen} />
      <Stack.Screen name="CoinDetail" component={CoinDetailScreen} />
    </Stack.Navigator>
  );
};

export default CoinsStack;
