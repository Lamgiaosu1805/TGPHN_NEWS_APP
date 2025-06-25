import React, { useRef, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Dimensions } from 'react-native';
import WebView from 'react-native-webview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function WebViewComponent() {
  const webViewRef = useRef(null);
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(true);

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

        // Gửi thông báo về React Native sau khi đã ẩn xong
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

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#1e90ff" />
        </View>
      )}

      <WebView
        ref={webViewRef}
        style={[styles.webview, { opacity: loading ? 0 : 1 }]} // Ẩn WebView cho đến khi header được ẩn
        source={{ uri: 'https://www.tonggiaophanhanoi.org/category/phung-vu/lich-cong-giao/' }}
        onLoadEnd={injectScript}
        onMessage={handleMessage}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState={false}
        bounces={false}
        showsVerticalScrollIndicator={false}
        allowsBackForwardNavigationGestures={true}
        useWebView2
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
    right: 0, // dùng right thay vì width
    bottom: 0, // dùng bottom thay vì height
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  
});
