
import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useApp } from '../context/AppContext';
import { styles } from '../styles';
import { Header, Button } from '../components';
import { FUN_FACTS } from '../constants';

export function FactScreen() {
  const { factIndex, goBack, nextFact, startQuiz } = useApp();
  const fact = FUN_FACTS[factIndex]; 
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Header title="Did you know? 💡" subtitle="A little art fact for curious minds" onBack={goBack} />
      <View style={styles.factFeature}>
        <Text style={styles.factFeatureEmoji}>{fact.emoji}</Text>
        <Text style={styles.factFeatureTitle}>{fact.title}</Text>
        <Text style={styles.factFeatureBody}>{fact.text}</Text>
        <View style={styles.factDecor}><Text>✦</Text><Text>✧</Text><Text>✦</Text></View>
      </View>
      <Text style={styles.factCounter}>FACT {factIndex + 1} OF {FUN_FACTS.length}</Text>
      <Button title="Another fun fact →" onPress={nextFact} style={{ marginTop: 12 }} />
      <Button title="Try the art quiz" variant="outline" onPress={startQuiz} style={{ marginTop: 10 }} />
    </ScrollView>
  );
}
