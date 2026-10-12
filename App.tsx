
import React from 'react';
import { SafeAreaView, StatusBar, View, Pressable, Text } from 'react-native';
import { AppProvider, useApp } from './src/context/AppContext';
import { styles } from './src/styles';
import { C, ONBOARDING } from './src/constants';
import { Button, LoadingBlock } from './src/components';
import { 
  HomeScreen, SearchScreen, FavoritesScreen, CategoriesScreen, 
  DetailScreen, ArtistScreen, QuizScreen, FactScreen, MoreScreen, AboutScreen 
} from './src/screens';

function MainNavigator() {
  const { ready, onboarded, screen, isRoot, switchTab, favorites, onboardingStep, completeOnboarding, setOnboardingStep } = useApp();

  if (!ready) {
    return <SafeAreaView style={styles.app}><StatusBar barStyle="dark-content" /><LoadingBlock text="Getting your art corner ready..." /></SafeAreaView>;
  }

  if (!onboarded) {
    const slide = ONBOARDING[onboardingStep];
    return (
      <SafeAreaView style={[styles.app, styles.onboardingApp]}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.onboardTop}><Text style={styles.brandSmall}>ART EXPLORER 🎨</Text><Text style={styles.skipText} onPress={completeOnboarding}>Skip</Text></View>
        <View style={[styles.onboardIllustration, { backgroundColor: slide.bg }]}>
          <View style={styles.confettiOne} /><View style={styles.confettiTwo} /><View style={styles.confettiThree} />
          <Text style={styles.onboardEmoji}>{slide.emoji}</Text>
          <Text style={styles.onboardWordArt}>MAKE • LOOK • LEARN</Text>
        </View>
        <View style={styles.onboardCopy}>
          <Text style={styles.kicker}>{slide.kicker}</Text>
          <Text style={styles.onboardTitle}>{slide.title}</Text>
          <Text style={styles.onboardBody}>{slide.body}</Text>
        </View>
        <View style={styles.dots}>{ONBOARDING.map((item, index) => <View key={item.title} style={[styles.dot, index === onboardingStep && styles.dotActive]} />)}</View>
        <View style={styles.onboardActions}>
          <Button title={onboardingStep === ONBOARDING.length - 1 ? "Let's explore! ✨" : 'Next →'} onPress={() => onboardingStep === ONBOARDING.length - 1 ? completeOnboarding() : setOnboardingStep((old: number) => old + 1)} />
        </View>
      </SafeAreaView>
    );
  }

  let body;
  switch (screen) {
    case 'home': body = <HomeScreen />; break;
    case 'search': body = <SearchScreen />; break;
    case 'favorites': body = <FavoritesScreen />; break;
    case 'more': body = <MoreScreen />; break;
    case 'categories': body = <CategoriesScreen />; break;
    case 'detail': body = <DetailScreen />; break;
    case 'artist': body = <ArtistScreen />; break;
    case 'quiz': body = <QuizScreen />; break;
    case 'fact': body = <FactScreen />; break;
    case 'about': body = <AboutScreen />; break;
    default: body = <HomeScreen />;
  }

  return (
    <SafeAreaView style={styles.app}>
      <StatusBar barStyle="dark-content" backgroundColor={C.bg} />
      <View style={styles.main}>{body}</View>
      {isRoot ? <View style={styles.tabBar}>
        {[{ name: 'home', label: 'Home', icon: '⌂' }, { name: 'search', label: 'Search', icon: '⌕' }, { name: 'favorites', label: 'Favorites', icon: '♡' }, { name: 'more', label: 'More', icon: '•••' }].map((tab) => {
          const active = screen === tab.name;
          return <Pressable key={tab.name} onPress={() => switchTab(tab.name)} style={styles.tabItem} accessibilityRole="button" accessibilityLabel={tab.label}><Text style={[styles.tabIcon, active && styles.tabIconActive]}>{tab.name === 'favorites' && active && favorites.length ? '♥' : tab.icon}</Text><Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{tab.label}</Text><View style={[styles.tabDot, active && styles.tabDotActive]} /></Pressable>;
        })}
      </View> : null}
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainNavigator />
    </AppProvider>
  );
}
