import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FavoritesScreen from './FavoritesScreen';
import colors from '../../resources/colors';
import {Coin} from '../coins/CoinItem';
import CoinDetailScreen from '../coinDetail/CoinDetailScreen';

const Stack = createStackNavigator();

export type FavoriteStackParamList = {
  Favorites: undefined;
  CoinDetail: {
    item: Coin;
  };
};

const FavoritesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.blackPearl,
          shadowColor: colors.blackPearl,
        },
        headerTintColor: colors.white,
      }}>
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
      <Stack.Screen name="CoinDetail" component={CoinDetailScreen} />
    </Stack.Navigator>
  );
};

export default FavoritesStack;
