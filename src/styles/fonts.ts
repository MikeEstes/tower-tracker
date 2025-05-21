import { StyleSheet } from 'react-native';

import { Colors } from '../types/colors';

export const Typography = StyleSheet.create({
  body: {
    color: Colors.text,
    fontSize: 12,
  },
  button: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  display: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  moduleHeader: {
    color: Colors.text,
    fontSize: 12,
    fontWeight: 'bold',
  },
  screenHeader: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  textSelected: {
    color: Colors.textSelected,
  },
});
