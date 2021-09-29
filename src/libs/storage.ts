import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {
  static instance = new Storage();

  store = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.log('Storage set error', error);
      return false;
    }
  };

  get = async (key: string) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error: any) {
      console.log('Storage get error', error);
      throw new Error(error);
    }
  };

  multiget = async (
    keys: Array<string>,
  ): Promise<Array<[string, string | null]>> => {
    try {
      return await AsyncStorage.multiGet(keys);
    } catch (error: any) {
      console.log('Storage multiget error', error);
      throw new Error(error);
    }
  };

  getAllKeys = async () => {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error: any) {
      console.log('Storage getAllKeys error', error);
      throw new Error(error);
    }
  };

  remove = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error: any) {
      console.log('Storage remove error', error);
      return false;
    }
  };
}

export default Storage;
