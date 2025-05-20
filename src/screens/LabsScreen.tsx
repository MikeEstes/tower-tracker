import React, { useMemo, useState } from 'react';
import { StyleSheet, SectionList, View, Text, TouchableOpacity } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { Colors } from '../types/colors';
import withBaseScreen from '../components/withBaseScreen';
import { LabData } from '../data/LabData';
import LabModule from '../components/LabModule';
import LabModal from '../components/LabModal';

const LabsScreen = () => {
  // Add state to track expanded sections
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const sections = useMemo(() => {
    const grouped: Record<string, typeof LabData[number][]> = {};
    LabData.forEach(item => {
      const key = item.section;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(item);
    });

    return Object.entries(grouped).map(([title, items]) => {
      const rows: typeof items[] = [];
      for (let i = 0; i < items.length; i += 2) {
        rows.push(items.slice(i, i + 2));
      }
      return { title, data: rows };
    });
  }, []);

  // Toggle section expansion
  const toggleSection = (title: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        style={styles.listContainer}
        keyExtractor={(row) => row.map(i => i.id).join('-')}
        renderSectionHeader={({ section: { title } }) => {
          const icon = expandedSections[title] ? 'chevron-down' : 'chevron-up';
          return (
            <TouchableOpacity
              onPress={() => toggleSection(title)}
              style={styles.headerContainer}
            >
              <Text style={styles.header}>{title}</Text>
              <Ionicons name={icon} size={24} color={Colors.text} />
            </TouchableOpacity>
          )
        }}
        renderItem={({ item: row, section: { title } }) => {
          // Only render items if section is expanded
          if (!expandedSections[title]) return null;

          return (
            <View style={styles.row}>
              {row.map(lab => (
                <LabModule key={lab.id} {...lab} />
              ))}
              {row.length === 1 && <View style={[styles.itemContainer, styles.placeholder]} />}
            </View>
          );
        }}
      />
      <LabModal />
    </View>
  );
};

export default withBaseScreen(LabsScreen, {
  getTitle: () => 'Labs',
  getBannerColor: () => Colors.labsBanner,
  showAmountSelector: true,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    marginTop: 16,
  },
  itemContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    flex: 1,
    padding: 12,
  },
  listContainer: {
    flex: 1,
  },
  placeholder: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    gap: 6,
    justifyContent: 'flex-start',
    marginBottom: 6,
  },
}); 