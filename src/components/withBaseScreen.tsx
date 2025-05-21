import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useAtom } from 'jotai';

import ModuleHeader from './ModuleHeader';
import { Colors } from '../types/colors';
import ModuleFooter from './ModuleFooter';
import { currentModuleTypeAtom, ModuleType } from '../atoms/configurationAtom';

type BaseScreenOptions<P> = {
  getTitle: (props: P) => string;
  getBannerColor: (props: P) => string;
  moduleType: ModuleType;
  showInfoButton?: boolean;
};

function withBaseScreen<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: BaseScreenOptions<P>
) {
  const ComponentWithBaseScreen: React.FC<P> = (props) => {
    const title = options.getTitle(props);
    const bannerColor = options.getBannerColor(props);
    const [moduleType, setModuleType] = useAtom(currentModuleTypeAtom);

    useEffect(() => {
      setModuleType(options.moduleType);
    }, [options.moduleType, setModuleType]);

    return (
      <>
        {/* Top safe area: full-width banner under notch */}
        <SafeAreaView edges={['top']} style={{ backgroundColor: bannerColor }}>
          <ModuleHeader
            title={title}
            bannerColor={bannerColor}
            showInfoButton={options.showInfoButton}
          />
        </SafeAreaView>

        <View style={styles.container}>
          <WrappedComponent {...props} />
        </View>
        {/* Bottom safe area: content fills rest of screen */}
        <SafeAreaView edges={['bottom']} style={styles.footer}>
          {moduleType !== 'hidden' && <ModuleFooter />}
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
  footer: {
    backgroundColor: Colors.footerColor,
  },
});