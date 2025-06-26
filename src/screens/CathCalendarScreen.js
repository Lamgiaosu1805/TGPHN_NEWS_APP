import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Platform, BackHandler } from 'react-native';
import WebView from 'react-native-webview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CathCalendarScreen() {
  const webViewRef = useRef(null);
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);

  const injectScript = () => {
    const spacerHeight = insets.top + 8;

    const script = `
      (function() {
        const spacer = document.createElement('div');
        spacer.style.height = '${spacerHeight}px';
        spacer.style.width = '100%';
        spacer.style.background = 'transparent';
        spacer.style.display = 'block';
        if (document.body && document.body.firstChild) {
          document.body.insertBefore(spacer, document.body.firstChild);
        }

        const classNames = ['site-header', 'elementor-button-wrapper'];
        classNames.forEach(function(className) {
          const elements = document.getElementsByClassName(className);
          for (var i = 0; i < elements.length; i++) {
            elements[i].style.setProperty('display', 'none', 'important');
            elements[i].style.setProperty('visibility', 'hidden', 'important');
            elements[i].style.setProperty('opacity', '0', 'important');
          }
        });

        window.ReactNativeWebView.postMessage("header-hidden");
      })();
      true;
    `;
    webViewRef.current?.injectJavaScript(script);
  };

  const handleMessage = (event) => {
    if (event.nativeEvent.data === 'header-hidden') {
      setLoading(false);
    }
  };

  // ✅ Xử lý nút back trên Android
  useEffect(() => {
    const onBackPress = () => {
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack();
        return true; // Đã xử lý back
      }
      return false; // Cho hệ thống xử lý (thoát màn hình)
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => backHandler.remove();
  }, [canGoBack]);

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#1e90ff" />
        </View>
      )}

      <WebView
        ref={webViewRef}
        style={[styles.webview, { opacity: loading ? 0 : 1 }]}
        source={{ uri: 'https://www.tonggiaophanhanoi.org/category/phung-vu/lich-cong-giao/' }}
        onLoadEnd={injectScript}
        onMessage={handleMessage}
        onNavigationStateChange={(navState) => setCanGoBack(navState.canGoBack)} // <- 👈 theo dõi khả năng back
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState={false}
        bounces={false}
        showsVerticalScrollIndicator={false}
        useWebKit={true}
        allowsBackForwardNavigationGestures={Platform.OS === 'ios'} // <- chỉ iOS dùng
        decelerationRate={Platform.OS === 'ios' ? 'normal' : 0.985}
        injectedJavaScriptBeforeContentLoaded={`
          document.body.style['-webkit-overflow-scrolling'] = 'touch';
          document.body.style.overflow = 'scroll';
          true;
        `}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
});
