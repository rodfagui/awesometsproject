import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import Storage from '../../libs/storage';
import colors from '../../resources/colors';
import CoinItem, {Coin} from '../coins/CoinItem';
import FavoritesEmptyState from './FavoritesEmptyState';
import {FavoriteStackParamList} from './FavoritesStack';

type FavoritesScreenProps = NativeStackScreenProps<
  FavoriteStackParamList,
  'Favorites'
>;

const FavoritesScreen = (props: FavoritesScreenProps) => {
  const {navigation} = props;
  const [favorites, setFavorites] = useState<Array<Coin>>([]);
  useEffect(() => {
    const getFavorites = async () => {
      const allKeys = await Storage.instance.getAllKeys();
      const favoritesKeys = await allKeys.filter(key =>
        key.includes('favorite-'),
      );
      const favoritesGetted = await Storage.instance.multiget(favoritesKeys);
      const favoritesCoins = await favoritesGetted.map(
        favorite => favorite[1] && JSON.parse(favorite[1]),
      );
      setFavorites(favoritesCoins);
    };
    getFavorites();
    navigation.addListener('focus', getFavorites);
    return () => navigation.removeListener('focus', getFavorites);
  }, [navigation]);
  const handleOnPressFlatItem = (item: Coin) => {
    console.log('press');
    navigation.navigate('CoinDetail', {item});
  };
  const renderFavorites =
    favorites.length <= 0 ? (
      <FavoritesEmptyState />
    ) : (
      <FlatList
        data={favorites}
        renderItem={({item}) => (
          <CoinItem item={item} onPress={() => handleOnPressFlatItem(item)} />
        )}
      />
    );
  return <View style={styles.container}>{renderFavorites}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.charade,
    flex: 1,
  },
});

export default FavoritesScreen;
