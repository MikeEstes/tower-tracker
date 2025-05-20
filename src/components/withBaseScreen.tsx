import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useSetAtom } from 'jotai';

import ModuleHeader from './ModuleHeader';
import { Colors } from '../types/colors';
import ModuleFooter from './ModuleFooter';
import { currentModuleTypeAtom, ModuleType } from '../atoms/configurationAtom';

type BaseScreenOptions<P> = {
  getTitle: (props: P) => string;
  getBannerColor: (props: P) => string;
  moduleType: ModuleType;
};

function withBaseScreen<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: BaseScreenOptions<P>
) {
  const ComponentWithBaseScreen: React.FC<P> = (props) => {
    const title = options.getTitle(props);
    const bannerColor = options.getBannerColor(props);
    const setModuleType = useSetAtom(currentModuleTypeAtom);

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
          />
        </SafeAreaView>

        {/* Bottom safe area: content fills rest of screen */}
        <SafeAreaView edges={['bottom']} style={styles.container}>
          <WrappedComponent {...props} />
          <ModuleFooter />
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