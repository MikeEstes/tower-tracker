import React from 'react';
import { StyleSheet } from 'react-native';

import {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from 'react-native-toast-message';

import { Colors } from '../styles/colors';
import { Typography } from '../styles/fonts';
import { Spacing } from '../styles/spacing';

const ToastConfig = () => {
  return {
    error: (props: BaseToastProps) => (
      <ErrorToast
        {...props}
        contentContainerStyle={styles.contentContainer}
        style={styles.errorToast}
        text1NumberOfLines={2}
        text1Style={Typography.toastHeader}
        text2NumberOfLines={2}
        text2Style={Typography.toastText}
      />
    ),
    info: (props: BaseToastProps) => (
      <BaseToast
        {...props}
        contentContainerStyle={styles.contentContainer}
        style={styles.infoToast}
        text1NumberOfLines={2}
        text1Style={Typography.toastHeader}
        text2NumberOfLines={2}
        text2Style={Typography.toastText}
      />
    ),
    success: (props: BaseToastProps) => (
      <BaseToast
        {...props}
        contentContainerStyle={styles.contentContainer}
        style={styles.successToast}
        text1NumberOfLines={2}
        text1Style={Typography.toastHeader}
        text2NumberOfLines={2}
        text2Style={Typography.toastText}
      />
    ),
  };
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingLeft: Spacing.sm,
  },
  errorToast: {
    alignItems: 'center',
    backgroundColor: Colors.error,
    borderLeftColor: Colors.error,
  },
  infoToast: {
    alignItems: 'center',
    backgroundColor: Colors.info,
    borderLeftColor: Colors.info,
  },
  successToast: {
    alignItems: 'center',
    backgroundColor: Colors.success,
    borderLeftColor: Colors.success,
  },
});

export default ToastConfig();
