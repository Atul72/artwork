
import React from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useApp } from '../context/AppContext';
import { styles } from '../styles';
import { Header, Pill } from '../components';
import { CATEGORIES } from '../constants';

export function CategoriesScreen() {
  const { goBack, searchCategory, selectedTime, setSelectedTime } = useApp();

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Header title="Choose a category" subtitle="Pick a topic and see what you find." onBack={goBack} />
      <View style={styles.categoryGrid}>{CATEGORIES.map((category) => <Pressable key={category.label} onPress={() => searchCategory(category)} style={[styles.bigCategory, { backgroundColor: category.tint }]}><Text style={styles.bigCategoryEmoji}>{category.emoji}</Text><Text style={styles.bigCategoryTitle}>{category.label}</Text><Text style={styles.bigCategorySub}>Explore collection →</Text></Pressable>)}</View>
      <View style={styles.filterCard}><Text style={styles.sectionTitle}>Time period</Text><Text style={styles.sectionSub}>A simple browsing preference for your next search.</Text><View style={styles.pillWrap}>{['All time', 'Ancient', 'Medieval', 'Renaissance', 'Modern'].map((period) => <Pill key={period} title={period} selected={selectedTime === period} onPress={() => setSelectedTime(period)} />)}</View><Text style={styles.smallNote}>Time-period selection is a UI preference in this starter. It is not yet applied as a museum API date filter.</Text></View>
    </ScrollView>
  );
}
