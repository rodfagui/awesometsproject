import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Platform} from 'react-native';
import colors from '../../resources/colors';

type CoinsSearchProps = {
  onChange: (value: string) => void;
};

const CoinsSearch = (props: CoinsSearchProps) => {
  const [query, setQuery] = useState('');
  const handleText = (value: string) => {
    setQuery(value);
    props.onChange(value);
  };
  return (
    <View>
      <TextInput
        style={[
          styles.textInput,
          Platform.OS === 'ios' ? styles.textInputIOS : styles.textInputAndroid,
        ]}
        onChangeText={handleText}
        value={query}
        placeholder="Search coin"
        placeholderTextColor="#ffffff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: colors.charade,
    paddingLeft: 16,
    color: '#ffffff',
  },
  textInputAndroid: {
    borderBottomWidth: 2,
    borderBottomColor: colors.zircon,
  },
  textInputIOS: {
    margin: 8,
    borderRadius: 8,
  },
});

export default CoinsSearch;
