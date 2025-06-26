import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  BackHandler,
} from 'react-native';
import WebView from 'react-native-webview';
import * as Progress from 'react-native-progress';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [progress, setProgress] = useState(0);
  const [canGoBack, setCanGoBack] = useState(false);
  const insets = useSafeAreaInsets();
  const webViewRef = useRef(null);

  const injectedJSBeforeLoad = `
    (function() {
      document.addEventListener('DOMContentLoaded', function() {
        const spacer = document.createElement('div');
        spacer.style.height = '${insets.top - 20}px';
        spacer.style.width = '100%';
        spacer.style.background = 'transparent';
        spacer.style.display = 'block';
        document.body.insertBefore(spacer, document.body.firstChild);

        document.body.style['-webkit-overflow-scrolling'] = 'touch';
        document.body.style.overflow = 'scroll';
      });
    })();
    true;
  `;

  const scrollToTopJS = `
    window.scrollTo({ top: 0, behavior: 'smooth' });
    true;
  `;

  const handleScrollToTop = () => {
    webViewRef.current?.injectJavaScript(scrollToTopJS);
  };

  // ✅ Bắt sự kiện nút/quét back Android
  useEffect(() => {
    const onBackPress = () => {
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => backHandler.remove();
  }, [canGoBack]);

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
        onNavigationStateChange={(navState) => setCanGoBack(navState.canGoBack)} // 👈 thêm dòng này
        injectedJavaScriptBeforeContentLoaded={injectedJSBeforeLoad}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        useWebKit={true}
        decelerationRate={Platform.OS === 'ios' ? 'normal' : 0.985}
        bounces={false}
        showsVerticalScrollIndicator={false}
        allowsBackForwardNavigationGestures={Platform.OS === 'ios'}
        style={{ flex: 1 }}
      />

      {/* Nếu cần thêm nút scroll top, mở comment dòng sau */}
      {/* 
      <TouchableOpacity onPress={handleScrollToTop} style={styles.scrollTopButton}>
        <Text style={styles.scrollTopText}>↑</Text>
      </TouchableOpacity>
      */}
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
    left: 20,
    backgroundColor: '#1e90ff',
    padding: 8,
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
    fontSize: 16,
    fontWeight: 'bold',
  },
});
