/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import Hello from '@components/Hello';
import React, {Component, useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Linking
} from 'react-native';
// import {WebView} from 'react-native-webview';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SharedItem = {
  mimeType: string,
  data: string,
  extraData: any,
};

// 添加URL参数的类型
type UrlEvent = {
  url: string;
};

// 将handleSharedContent移到App组件外部，因为它不需要访问组件状态
const handleSharedContent = (url: string) => {
  console.log('Handling shared content for URL:', url);
  try {
    const parsedUrl = new URL(url);
    console.log('Parsed URL:', parsedUrl);
    
    if (parsedUrl.protocol === 'edpclient:') {
      const params = new URLSearchParams(parsedUrl.search);
      console.log('URL parameters:', Object.fromEntries(params));
      
      const sharedUrl = params.get('url');
      const sharedText = params.get('text');
      
      if (sharedUrl) {
        console.log('Received shared URL:', sharedUrl);
        // 处理URL
      }
      
      if (sharedText) {
        console.log('Received shared text:', sharedText);
        // 处理文本
      }
    }
  } catch (error) {
    console.error('Error handling shared content:', error);
  }
};

type SectionProps = PropsWithChildren<{
  title: string;
}>;


// class MyWeb extends Component {
//   render() {
//     return (
//       <WebView
//         source={{ uri: 'https://infinite.red' }}
//         style={{ marginTop: 20, width: '100%', height: 200, borderWidth: 1, borderColor: 'red' }}
//       />
//     );
//   }
// }

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  console.log('App component initialized');

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  console.log('-----App222()');

  useEffect(() => {
    console.log('Setting up Linking listeners in simulator');

    const handleUrl = ({url}: UrlEvent) => {
      console.log('[Simulator] Received URL through Linking:', url);
      handleSharedContent(url);
    };

    // 测试URL scheme在模拟器中是否正常工作
    Linking.canOpenURL('edpclient://share').then(supported => {
      console.log('[Simulator] Can open edpclient:// URLs:', supported);
    }).catch(err => {
      console.error('[Simulator] Error checking URL scheme:', err);
    });

    // 先检查初始URL
    Linking.getInitialURL().then((url: string | null) => {
      console.log('Initial URL:', url);
      if (url) {
        handleSharedContent(url);
      }
    }).catch(err => {
      console.error('Error getting initial URL:', err);
    });

    // 然后设置监听器
    const subscription = Linking.addEventListener('url', handleUrl);

    return () => {
      console.log('Cleaning up Linking listeners');
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          {/* <Hello name="World" /> */}
          {/* web-view-demo: */}
          {/* <MyWeb /> */}
          {/* <Section title="Step One  App.tsx">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
