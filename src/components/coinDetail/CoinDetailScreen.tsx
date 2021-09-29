import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  SectionList,
  StyleSheet,
  FlatList,
  Platform,
  ActivityIndicator,
  Pressable,
  Alert,
} from 'react-native';
import {CoinStackParamList} from '../coins/CoinsStack';
import colors from '../../resources/colors';
import {Coin} from '../coins/CoinItem';
import Http from '../../libs/http';
import CoinMarketItem from './CoinMarketItem';
import Storage from '../../libs/storage';

type CoinDetailScreenProps = NativeStackScreenProps<
  CoinStackParamList,
  'CoinDetail'
>;

const CoinDetailScreen = (props: CoinDetailScreenProps) => {
  const {navigation} = props;
  const {item: coin} = props.route.params;
  const [markets, setMarkets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const getSymbolIcon = (name: string) => {
    const transformedName = name.toLowerCase().replace(' ', '-');
    return name && `https://c1.coinlore.com/img/25x25/${transformedName}.png`;
  };
  const getSections = (item: Coin) => {
    const sections = [
      {
        title: 'Market Cap',
        data: [item.marketCapUsd],
      },
      {
        title: 'Volume 24h',
        data: [item.volume24.toString()],
      },
      {
        title: 'Percentage Change 24h',
        data: [item.percentChange24h],
      },
    ];
    return sections;
  };
  useEffect(() => {
    const fetchMarkets = async () => {
      setIsLoading(true);
      const result = await Http.instance.get(
        `https://api.coinlore.net/api/coin/markets/?id=${coin.id}`,
      );
      setMarkets(
        result.map((element: any) => {
          return {
            name: element.name,
            base: element.base,
            quote: element.quote,
            price: element.price,
            priceUSD: element.price_usd,
            volume: element.volume,
            volumeUSD: element.volume_usd,
          };
        }),
      );
      setIsLoading(false);
    };
    const checkIsFavorite = async () => {
      const key = `favorite-${coin.id}`;
      const coinFound = await Storage.instance.get(key);
      if (coinFound) {
        setIsFavorite(true);
      }
    };
    navigation.setOptions({title: coin.symbol});
    fetchMarkets();
    checkIsFavorite();
  }, [coin, navigation]);
  const renderMarketsList = isLoading ? (
    <ActivityIndicator style={styles.loader} color="#ffffff" size="large" />
  ) : (
    <FlatList
      style={styles.list}
      horizontal={true}
      data={markets}
      renderItem={({item}) => <CoinMarketItem item={item} />}
    />
  );
  const removeFavorite = (key: string) => {
    Alert.alert('Remove Favorite', 'Are you sure?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Remove',
        onPress: async () => {
          const removed = await Storage.instance.remove(key);
          if (removed) {
            setIsFavorite(false);
          }
        },
        style: 'destructive',
      },
    ]);
  };
  const addFavorite = async (key: string) => {
    const jsonCoin = JSON.stringify(coin);
    const stored = await Storage.instance.store(key, jsonCoin);
    if (stored) {
      setIsFavorite(true);
    }
  };
  const toggleFavorite = () => {
    const key = `favorite-${coin.id}`;
    if (isFavorite) {
      removeFavorite(key);
      return;
    }
    addFavorite(key);
  };
  return (
    <View style={styles.container}>
      <View style={styles.subHeader}>
        <View style={styles.row}>
          <Image
            style={styles.iconImg}
            source={{uri: getSymbolIcon(coin.name)}}
          />
          <Text style={styles.titleText}>{coin.name}</Text>
        </View>
        <Pressable
          onPress={toggleFavorite}
          style={[
            styles.favoriteButton,
            isFavorite ? styles.removeFavoriteButton : styles.addFavoriteButton,
          ]}>
          <Text style={styles.favoriteButtonText}>
            {isFavorite ? 'Remove favorite' : 'Add favorite'}
          </Text>
        </Pressable>
      </View>
      <SectionList
        style={styles.section}
        sections={getSections(coin)}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <View style={styles.sectionItem}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({section}) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionText}>{section.title}</Text>
          </View>
        )}
      />
      <Text style={styles.marketsText}>Markets</Text>
      {renderMarketsList}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade,
  },
  subHeader: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    marginLeft: 8,
  },
  iconImg: {
    width: 25,
    height: 25,
  },
  section: {
    maxHeight: 220,
  },
  list: {
    maxHeight: 100,
    paddingLeft: Platform.OS === 'ios' ? 16 : 0,
    paddingRight: Platform.OS === 'ios' ? 16 : 0,
  },
  sectionHeader: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 8,
  },
  sectionItem: {
    padding: 8,
  },
  itemText: {
    color: colors.white,
    fontSize: 14,
  },
  sectionText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  marketsText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    marginLeft: 16,
  },
  loader: {
    marginTop: 30,
  },
  favoriteButtonText: {
    color: colors.white,
  },
  favoriteButton: {
    padding: 8,
    borderRadius: 8,
  },
  addFavoriteButton: {
    backgroundColor: colors.picton,
  },
  removeFavoriteButton: {
    backgroundColor: colors.carmine,
  },
});

export default CoinDetailScreen;
