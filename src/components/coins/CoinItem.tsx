import React from 'react';
import {View, Text, StyleSheet, Image, Platform, Pressable} from 'react-native';
import colors from '../../resources/colors';

export type Coin = {
  id: string;
  name: string;
  symbol: string;
  priceUSD: string;
  percentChange1h: string;
  marketCapUsd: string;
  volume24: number;
  percentChange24h: string;
};

type CoinItemProps = {
  item: Coin;
  onPress: () => void;
};

const CoinItem = (props: CoinItemProps) => {
  const {item, onPress} = props;
  const getArrowImg = () => {
    if (parseFloat(item.percentChange1h) < 0) {
      return require('../../assets/arrow_down.png');
    }
    return require('../../assets/arrow_up.png');
  };
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.row}>
        <Text style={styles.symbolText}>{item.symbol}</Text>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.priceText}>{`${item.priceUSD} USD`}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.percentText}>{item.percentChange1h}</Text>
        <Image style={styles.imgIcon} source={getArrowImg()} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: colors.zircon,
    borderBottomWidth: 1,
    paddingLeft: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  symbolText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 12,
  },
  nameText: {
    color: '#ffffff',
    fontSize: 14,
    marginRight: 12,
  },
  priceText: {
    color: '#ffffff',
    fontSize: 14,
  },
  percentText: {
    color: '#ffffff',
    fontSize: 12,
    marginRight: 8,
  },
  imgIcon: {
    width: 22,
    height: 22,
  },
});

export default CoinItem;
