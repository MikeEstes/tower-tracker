import React, { useMemo, useState, useEffect } from 'react';
import { StyleSheet, SectionList, View, Text, TouchableOpacity, Pressable } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import { useSetAtom, useAtomValue } from 'jotai';

import { Colors } from '../styles/colors';
import withBaseScreen from '../components/withBaseScreen';
import { LabData, MAX_LAB_AMOUNT } from '../data/LabData';
import LabModule from '../components/LabModule';
import LabModal from '../components/LabModal';
import { Spacing } from '../styles/spacing';
import { selectedLabAtom } from '../atoms/utilitiesAtom';
import { infoModalDataAtom } from '../atoms/modalsAtom';
import { previewModeAtom, playerLabTotalAmountAtom, previewLabTotalAmountAtom, playerLabProgressAtom, previewLabProgressAtom } from '../atoms/playerProgressAtom';
import { Typography } from '../styles/fonts';

const LabsScreen = () => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [hideMaxedLabs, setHideMaxedLabs] = useState(false);
  const previewMode = useAtomValue(previewModeAtom);
  const totalAmount = useAtomValue(previewMode ? previewLabTotalAmountAtom : playerLabTotalAmountAtom);
  const progressMap = useAtomValue(previewMode ? previewLabProgressAtom : playerLabProgressAtom);
  const setSelectedLab = useSetAtom(selectedLabAtom);
  const setInfoModalData = useSetAtom(infoModalDataAtom);

  useEffect(() => {
    setSelectedLab(null);

    return () => {
      setInfoModalData(null);
    };
  }, []);

  useEffect(() => {
    setInfoModalData({
      title: 'Labs Stats',
      stats: [
        { label: 'Labs Collected', value: `${totalAmount.toLocaleString()} / ${MAX_LAB_AMOUNT.toLocaleString()}` },
        { label: 'Total Progress', value: `${(totalAmount / MAX_LAB_AMOUNT * 100).toFixed(2)}%` },
      ],
    });
  }, [totalAmount, MAX_LAB_AMOUNT]);

  const maxedLabsMap = useMemo(() => {
    const map: Record<string, boolean> = {};
    LabData.forEach(lab => {
      const progress = progressMap[lab.id as keyof typeof progressMap] ?? 0;
      map[lab.id] = progress >= lab.maxLevel;
    });
    return map;
  }, [progressMap]);

  const sections = useMemo(() => {
    const grouped: Record<string, typeof LabData[number][]> = {};
    LabData.forEach(item => {
      const key = item.section;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(item);
    });

    return Object.entries(grouped).map(([title, items]) => {
      // Filter out maxed labs if hideMaxedLabs is true
      const filteredItems = hideMaxedLabs ? items.filter(lab => !maxedLabsMap[lab.id]) : items;
      const rows: typeof items[] = [];
      for (let i = 0; i < filteredItems.length; i += 2) {
        rows.push(filteredItems.slice(i, i + 2));
      }
      return { title, data: rows };
    });
  }, [hideMaxedLabs, maxedLabsMap]);

  // Toggle section expansion
  const toggleSection = (title: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const renderItem = ({ item: row, section: { title } }: { item: typeof LabData[number][], section: { title: string } }) => {
    // Only render items if section is expanded
    if (!expandedSections[title]) return null;

    // Filter out maxed labs if hideMaxedLabs is true
    const filteredRow = hideMaxedLabs ? row.filter(lab => !maxedLabsMap[lab.id]) : row;

    if (filteredRow.length === 0) return null;

    return (
      <View style={styles.row}>
        {filteredRow.map(lab => (
          <LabModule key={lab.id} {...lab} />
        ))}
        {filteredRow.length === 1 && <View style={styles.placeholder} />}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.filterContainer}
        onPress={() => setHideMaxedLabs(!hideMaxedLabs)}
      >
        <View style={[styles.checkbox, hideMaxedLabs && styles.checkboxChecked]}>
          {hideMaxedLabs && <Ionicons name="checkmark" size={20} color={Colors.checkbox} />}
        </View>
        <Text style={Typography.screenHeader}>{'Hide Completed'}</Text>
      </Pressable>
      <SectionList
        sections={sections}
        keyExtractor={(row) => row.map(i => i.id).join('-')}
        renderSectionHeader={({ section: { title } }) => {
          const icon = expandedSections[title] ? 'chevron-down' : 'chevron-up';
          return (
            <TouchableOpacity
              onPress={() => toggleSection(title)}
              style={styles.headerContainer}
            >
              <Text style={Typography.labsHeader}>{title}</Text>
              <Ionicons name={icon} size={24} color={Colors.text} />
            </TouchableOpacity>
          )
        }}
        renderItem={renderItem}
        stickySectionHeadersEnabled={false}
      />
      <LabModal />
    </View>
  );
};

export default withBaseScreen(LabsScreen, {
  getTitle: () => 'Labs',
  getBannerColor: () => Colors.labsBanner,
  moduleType: 'lab',
  showInfoButton: true,
});

const styles = StyleSheet.create({
  checkbox: {
    alignItems: 'center',
    borderColor: Colors.text,
    borderWidth: 2,
    height: 24,
    justifyContent: 'center',
    marginRight: Spacing.sm,
    width: 24,
  },
  checkboxChecked: {
    backgroundColor: Colors.moduleBackgroundSelected,
  },
  container: {
    flex: 1,
    padding: Spacing.md,
  },
  filterContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: Spacing.sm,
    justifyContent: 'flex-end',
    marginBottom: Spacing.md,
    padding: Spacing.sm,
  },
  headerContainer: {
    alignItems: 'center',
    backgroundColor: Colors.background,
    flexDirection: 'row',
    gap: Spacing.md,
    justifyContent: 'center',
    marginVertical: Spacing.md,
    padding: Spacing.md,
  },
  placeholder: {
    backgroundColor: 'transparent',
    flex: 1,
    margin: Spacing.sm,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    gap: Spacing.sm,
    justifyContent: 'flex-start',
    marginBottom: Spacing.sm,
  },
}); 