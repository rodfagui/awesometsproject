/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import CoinsStack from './src/components/coins/CoinsStack';
import {Image} from 'react-native';
import colors from './src/resources/colors';
import FavoritesStack from './src/components/favorites/FavoritesStack';

const Tabs = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: colors.blackPearl,
          },
          headerShown: false,
        }}>
        <Tabs.Screen
          name="CoinsTab"
          component={CoinsStack}
          options={{
            title: 'Coins',
            tabBarIcon: ({size, color}) => (
              <Image
                style={{tintColor: color, width: size, height: size}}
                source={require('./src/assets/bank.png')}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="FavoritesTab"
          component={FavoritesStack}
          options={{
            title: 'Favorites',
            tabBarIcon: ({size, color}) => (
              <Image
                style={{tintColor: color, width: size, height: size}}
                source={require('./src/assets/star.png')}
              />
            ),
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default App;
