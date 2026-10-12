
import React from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useApp } from '../context/AppContext';
import { styles } from '../styles';
import { Header, Button } from '../components';

export function QuizScreen() {
  const { quizComplete, goBack, quizScore, activeQuiz, startQuiz, quizIndex, activeLearningMode, quizChoice, setQuizChoice, setQuizScore, setQuizComplete, setQuizIndex } = useApp();

  if (quizComplete) {
    return (
      <ScrollView contentContainerStyle={styles.page}>
        <Header title="Quiz finished!" onBack={goBack} />
        <View style={styles.quizFinish}>
          <Text style={styles.quizBigEmoji}>{quizScore >= 4 ? '🏆' : quizScore >= 2 ? '⭐' : '🌱'}</Text>
          <Text style={styles.quizFinishTitle}>{quizScore >= 4 ? 'Amazing art explorer!' : 'Great job giving it a try!'}</Text>
          <Text style={styles.quizFinishBody}>You got {quizScore} out of {activeQuiz.length} questions right. Every question is a chance to learn something new.</Text>
          <Button title="Play again" onPress={startQuiz} style={{ marginTop: 18 }} />
          <Button title="Back to exploring" variant="outline" onPress={goBack} style={{ marginTop: 10 }} />
        </View>
      </ScrollView>
    );
  }

  const item = activeQuiz[quizIndex];
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Header title="Mini art quiz 🧠" subtitle={`${activeLearningMode.label} · Question ${quizIndex + 1} of ${activeQuiz.length}`} onBack={goBack} />
      <View style={styles.progressTrack}><View style={[styles.progressFill, { width: `${((quizIndex + 1) / activeQuiz.length) * 100}%` }]} /></View>
      <View style={styles.quizCard}>
        <Text style={styles.quizEmoji}>{['🖌️', '🌈', '🎨', '🗿', '🔵'][quizIndex]}</Text>
        <Text style={styles.quizQuestion}>{item.q}</Text>
        <View style={{ gap: 10, marginTop: 22 }}>
          {item.options.map((option: string, index: number) => { 
            const chosen = quizChoice === index; 
            const correct = quizChoice !== null && index === item.answer; 
            return (
              <Pressable key={option} disabled={quizChoice !== null} onPress={() => { setQuizChoice(index); if (index === item.answer) setQuizScore((score: number) => score + 1); }} style={[styles.answerOption, chosen && index === item.answer && styles.answerCorrect, chosen && index !== item.answer && styles.answerWrong, quizChoice !== null && correct && styles.answerCorrect]}>
                <Text style={[styles.answerLetter, correct && quizChoice !== null && styles.answerLetterCorrect]}>{String.fromCharCode(65 + index)}</Text>
                <Text style={styles.answerText}>{option}</Text>
                {quizChoice !== null && correct ? <Text>✓</Text> : null}
              </Pressable>
            ); 
          })}
        </View>
        {quizChoice !== null ? <View style={styles.quizExplain}><Text style={styles.quizExplainTitle}>{quizChoice === item.answer ? 'You got it! 🎉' : 'Nice try! 🌟'}</Text><Text style={styles.quizExplainBody}>{item.why}</Text></View> : null}
      </View>
      {quizChoice !== null ? <Button title={quizIndex === activeQuiz.length - 1 ? 'See my result →' : 'Next question →'} onPress={() => { if (quizIndex === activeQuiz.length - 1) setQuizComplete(true); else { setQuizIndex((old: number) => old + 1); setQuizChoice(null); } }} style={{ marginTop: 8 }} /> : <Text style={styles.quizHint}>Pick the answer you think is right. It's okay to learn as you go.</Text>}
    </ScrollView>
  );
}
