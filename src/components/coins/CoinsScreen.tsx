import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import Http from '../../libs/http';
import {CoinStackParamList} from './CoinsStack';
import CoinItem, {Coin} from './CoinItem';
import colors from '../../resources/colors';
import CoinsSearch from './CoinsSearch';

type CoinsScreenProps = NativeStackScreenProps<CoinStackParamList, 'Coins'>;

const CoinsScreen = (props: CoinsScreenProps) => {
  const {navigation} = props;
  const [allCoins, setAllCoins] = useState([]);
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchCoins = async () => {
      setIsLoading(true);
      const result = await Http.instance.get(
        'https://api.coinlore.net/api/tickers/',
      );
      const mappedResult = result.data.map((coin: any) => {
        return {
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol,
          priceUSD: coin.price_usd,
          percentChange1h: coin.percent_change_1h,
          marketCapUsd: coin.market_cap_usd,
          volume24: coin.volume24,
          percentChange24h: coin.percent_change_24h,
        };
      });
      setAllCoins(mappedResult);
      setCoins(mappedResult);
      setIsLoading(false);
    };
    fetchCoins();
  }, []);
  const handleSearch = (query: string) => {
    const filteredCoins = allCoins.filter((coin: Coin) => {
      return (
        coin.name.toLowerCase().includes(query.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(query.toLowerCase())
      );
    });
    setCoins(filteredCoins);
  };
  const handleOnPressFlatItem = (item: Coin) => {
    navigation.navigate('CoinDetail', {item});
  };
  const renderList = isLoading ? (
    <ActivityIndicator style={styles.loader} color="#ffffff" size="large" />
  ) : (
    <FlatList
      data={coins}
      renderItem={({item}) => (
        <CoinItem item={item} onPress={() => handleOnPressFlatItem(item)} />
      )}
    />
  );
  return (
    <View style={styles.container}>
      <CoinsSearch onChange={handleSearch} />
      {renderList}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade,
  },
  titleText: {
    color: '#fff',
    textAlign: 'center',
  },
  itemText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  button: {
    padding: 8,
    backgroundColor: 'blue',
    borderRadius: 8,
    margin: 16,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  loader: {
    marginTop: 60,
  },
});

export default CoinsScreen;
