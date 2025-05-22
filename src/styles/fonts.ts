import { StyleSheet } from 'react-native';

import { Colors } from './colors';

export const Typography = StyleSheet.create({
  body: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
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
  labsHeader: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalHeader: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: 'bold',
  },
  moduleHeader: {
    color: Colors.text,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  screenHeader: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textSelected: {
    color: Colors.textSelected,
  },
  toastHeader: {
    color: Colors.text,
    flexWrap: 'wrap',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  toastText: {
    color: Colors.text,
    flexWrap: 'wrap',
    fontSize: 14,
    textAlign: 'center',
  },
});
