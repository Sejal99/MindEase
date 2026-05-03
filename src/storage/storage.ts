import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

export const StorageService = {
  setItem: (key: string, value: string): boolean => {
    try {
      storage.set(key, value);
      return true;
    } catch (error) {
      console.error('Storage setItem error:', error);
      return false;
    }
  },

  getItem: (key: string): string | undefined => {
    try {
      return storage.getString(key);
    } catch (error) {
      console.error('Storage getItem error:', error);
      return undefined;
    }
  },

  setJSON: <T>(key: string, value: T): boolean => {
    try {
      const jsonString = JSON.stringify(value);
      storage.set(key, jsonString);
      return true;
    } catch (error) {
      console.error('Storage setJSON error:', error);
      return false;
    }
  },

  getJSON: <T>(key: string, defaultValue: T): T => {
    try {
      const jsonString = storage.getString(key);
      if (jsonString) {
        return JSON.parse(jsonString) as T;
      }
      return defaultValue;
    } catch (error) {
      console.error('Storage getJSON error:', error);
      return defaultValue;
    }
  },

  removeItem: (key: string): boolean => {
    try {
      storage.delete(key);
      return true;
    } catch (error) {
      console.error('Storage removeItem error:', error);
      return false;
    }
  },

  clear: (): boolean => {
    try {
      storage.clearAll();
      return true;
    } catch (error) {
      console.error('Storage clear error:', error);
      return false;
    }
  },
};

export default StorageService;
