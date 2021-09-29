import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../../resources/colors';

export type Market = {
  name: string;
  base: string;
  quote: string;
  price: number;
  priceUSD: number;
  volume: number;
  volumeUSD: number;
};

type CoinMarketItemProps = {
  item: Market;
};

const CoinMarketItem = (props: CoinMarketItemProps) => {
  const {item} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>{item.name}</Text>
      <Text style={styles.priceText}>{`${item.priceUSD} USD`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderColor: colors.zircon,
    borderWidth: 1,
    padding: 16,
    marginRight: 8,
    alignItems: 'center',
  },
  nameText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  priceText: {
    color: '#ffffff',
  },
});

export default CoinMarketItem;
