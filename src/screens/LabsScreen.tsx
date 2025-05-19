import React, { useMemo, useState } from 'react';
import { StyleSheet, SectionList, View, Text, TouchableOpacity } from 'react-native';

import { Colors } from '../types/colors';
import withBaseScreen from '../components/withBaseScreen';
import { LabsData } from '../data/LabsData';

const LabsScreen = () => {
  // Add state to track expanded sections
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const sections = useMemo(() => {
    const grouped: Record<string, typeof LabsData[number][]> = {};
    LabsData.forEach(item => {
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
        keyExtractor={(row, index) => row.map(i => i.id).join('-')}
        renderSectionHeader={({ section: { title } }) => (
          <TouchableOpacity
            onPress={() => toggleSection(title)}
            style={styles.headerContainer}
          >
            <Text style={styles.header}>{title}</Text>
            <Text style={styles.expandIcon}>
              {expandedSections[title] ? '▼' : '▶'}
            </Text>
          </TouchableOpacity>
        )}
        renderItem={({ item: row, section: { title } }) => {
          // Only render items if section is expanded
          if (!expandedSections[title]) return null;

          return (
            <View style={styles.row}>
              {row.map(lab => (
                <View key={lab.id} style={styles.itemContainer}>
                  <Text style={styles.itemText}>{lab.name}</Text>
                </View>
              ))}
              {row.length === 1 && <View style={[styles.itemContainer, styles.placeholder]} />}
            </View>
          );
        }}
      />
    </View>
  );
};

export default withBaseScreen(LabsScreen, {
  getTitle: () => 'Labs',
  getBannerColor: () => Colors.labsBanner,
  showAmountSelector: false,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  expandIcon: {
    color: Colors.text,
    fontSize: 16,
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
    marginHorizontal: 8,
    padding: 12,
  },
  itemText: {
    fontSize: 16,
    textAlign: 'center',
  },
  placeholder: {
    backgroundColor: 'transparent',
    flex: 1,
    marginHorizontal: 8,
    padding: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
}); 