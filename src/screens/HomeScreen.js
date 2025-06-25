import React, { useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import WebView from 'react-native-webview';
import * as Progress from 'react-native-progress';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [progress, setProgress] = useState(0);
  const insets = useSafeAreaInsets();
  const webViewRef = useRef(null);

  const injectedJSBeforeLoad = `
    (function() {
      const spacer = document.createElement('div');
      spacer.style.height = '${insets.top - 20}px';
      spacer.style.width = '100%';
      spacer.style.background = 'transparent';
      document.addEventListener('DOMContentLoaded', function() {
        document.body.insertBefore(spacer, document.body.firstChild);
      });
    })();
  `;

  const scrollToTopJS = `
    window.scrollTo({ top: 0, behavior: 'smooth' });
    true;
  `;

  const handleScrollToTop = () => {
    webViewRef.current?.injectJavaScript(scrollToTopJS);
  };

  return (
    <View style={styles.container}>
      {progress < 1 && (
        <View style={{ position: 'absolute', top: insets.top, left: 0, right: 0, zIndex: 100 }}>
          <Progress.Bar
            progress={progress}
            width={null}
            borderWidth={0}
            color="#1e90ff"
            unfilledColor="#f0f0f0"
            height={4}
          />
        </View>
      )}

      <WebView
        ref={webViewRef}
        source={{ uri: 'https://www.tonggiaophanhanoi.org/' }}
        onLoadProgress={({ nativeEvent }) => setProgress(nativeEvent.progress)}
        injectedJavaScriptBeforeContentLoaded={injectedJSBeforeLoad}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        style={{ flex: 1 }}
        useWebView2
        bounces={false}
        showsVerticalScrollIndicator={false}
        allowsBackForwardNavigationGestures={true}
      />

      {/* Nút scroll lên top */}
      {/* <TouchableOpacity
        onPress={handleScrollToTop}
        style={styles.scrollTopButton}
      >
        <Text style={styles.scrollTopText}>↑</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollTopButton: {
    position: 'absolute',
    bottom: 32,
    left: 20, // chuyển sang bên trái
    backgroundColor: '#1e90ff',
    padding: 8, // nhỏ hơn
    borderRadius: 20,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 4,
  },
  scrollTopText: {
    color: '#fff',
    fontSize: 16, // nhỏ hơn
    fontWeight: 'bold',
  },
});
