
import React from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useApp } from '../context/AppContext';
import { styles } from '../styles';
import { Header } from '../components';
import { LEARNING_MODES } from '../constants';

export function MoreScreen() {
  const { learningMode, changeLearningMode, navigate, startQuiz, setFactIndex } = useApp();

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Header title="More to explore" subtitle="Keep your imagination curious." />
      <View style={styles.moreHero}><Text style={styles.moreHeroEmoji}>🧩</Text><View style={{ flex: 1 }}><Text style={styles.moreHeroTitle}>Play, notice, discover</Text><Text style={styles.moreHeroBody}>Small activities, big discoveries.</Text></View></View>
      <View style={styles.learningModeCard}>
        <Text style={styles.sectionTitle}>Choose a challenge level</Text>
        <Text style={styles.sectionSub}>Select the quiz and learning level that fits your curiosity. This preference is saved locally on this device.</Text>
        {LEARNING_MODES.map((mode) => {
          const selected = learningMode === mode.id;
          return (
            <Pressable key={mode.id} onPress={() => changeLearningMode(mode.id)} style={[styles.learningModeRow, selected && styles.learningModeRowSelected]} accessibilityRole="button" accessibilityState={{ selected }}>
              <View style={styles.learningModeEmoji}><Text style={{ fontSize: 24 }}>{mode.emoji}</Text></View>
              <View style={{ flex: 1 }}><Text style={styles.learningModeTitle}>{mode.label}</Text><Text style={styles.learningModeAge}>{mode.ages}</Text><Text style={styles.learningModeDescription}>{mode.description}</Text></View>
              <Text style={styles.learningModeCheck}>{selected ? '✓' : '○'}</Text>
            </Pressable>
          );
        })}
      </View>
      {[
        { title: 'Art categories', subtitle: 'Browse animals, flowers, portraits and more', emoji: '🗂️', action: () => navigate('categories'), tint: '#EEEAFE' },
        { title: 'Mini art quiz', subtitle: 'Five friendly questions', emoji: '🧠', action: startQuiz, tint: '#FFF0D4' },
        { title: 'Did you know?', subtitle: 'Collect a little art knowledge', emoji: '💡', action: () => { setFactIndex((old: number) => (old + 1) % 5); navigate('fact'); }, tint: '#E1F5EE' },
        { title: 'About Art Explorer', subtitle: 'Content, credits and privacy notes', emoji: 'ℹ️', action: () => navigate('about'), tint: '#E5F2FF' },
      ].map((item) => (
        <Pressable key={item.title} onPress={item.action} style={styles.moreRow}>
          <View style={[styles.moreIcon, { backgroundColor: item.tint }]}><Text style={{ fontSize: 25 }}>{item.emoji}</Text></View>
          <View style={{ flex: 1 }}><Text style={styles.moreTitle}>{item.title}</Text><Text style={styles.moreSubtitle}>{item.subtitle}</Text></View>
          <Text style={styles.moreArrow}>›</Text>
        </Pressable>
      ))}
      <View style={styles.sourceCard}><Text style={styles.sourceTitle}>A World of Art in Your Pocket</Text><Text style={styles.sourceBody}>Art Explorer celebrates timeless art, master paintings, and cultural artifacts from history, curated for curious minds.</Text></View>
    </ScrollView>
  );
}
