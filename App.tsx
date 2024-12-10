import React, { Component } from 'react';
import { SafeAreaView, Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview';

class MyWeb extends Component {
  render() {
    return (
      <WebView
        source={{ uri: 'https://infinite.red' }}
        style={{ marginTop: 20, width: '100%', height: 200, borderWidth: 1, borderColor: 'red' }}
      />
    );
  }
}

class App extends Component {
  state = {
    sharedContent: '',
  };

  async componentDidMount() {
    const content = await AsyncStorage.getItem('sharedContent');
    if (content) {
      this.setState({ sharedContent: content });
    }
  }

  render() {
    return (
      <SafeAreaView>
        <View>
          <Text>共享内容: {this.state.sharedContent}</Text>
          <Button title="编辑内容" onPress={() => {/* 处理编辑逻辑 */}} />
          <MyWeb />
        </View>
      </SafeAreaView>
    );
  }
}

export default App;