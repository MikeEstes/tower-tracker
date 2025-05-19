import React from 'react';
import { StyleSheet } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import ModuleHeader from './ModuleHeader';
import { Colors } from '../types/colors';

type BaseScreenOptions<P> = {
  getTitle: (props: P) => string;
  getBannerColor: (props: P) => string;
  showAmountSelector?: boolean;
};

function withBaseScreen<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: BaseScreenOptions<P>
) {
  const ComponentWithBaseScreen: React.FC<P> = (props) => {
    const title = options.getTitle(props);
    const bannerColor = options.getBannerColor(props);
    const showAmountSelector = options.showAmountSelector ?? false;

    return (
      <>
        {/* Top safe area: full-width banner under notch */}
        <SafeAreaView edges={['top']} style={{ backgroundColor: bannerColor }}>
          <ModuleHeader
            title={title}
            bannerColor={bannerColor}
            showAmountSelector={showAmountSelector}
          />
        </SafeAreaView>

        {/* Bottom safe area: content fills rest of screen */}
        <SafeAreaView edges={['bottom']} style={styles.container}>
          <WrappedComponent {...props} />
        </SafeAreaView>
      </>
    );
  };

  return ComponentWithBaseScreen;
}

export default withBaseScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
});