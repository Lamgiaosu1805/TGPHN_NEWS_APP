import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';

export default function GiaoXuScreen({ route, navigation }) {
  const { giaoHat, giaoXuList } = route.params;

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}
        onPress={() => item.link ? navigation.navigate('GXDetailScreen', {link: item.link}) : null}
        activeOpacity={0.7}
    >
      <Text style={styles.name}>Giáo xứ {item.tenGX}</Text>
      <Text style={styles.sub}>Tên khác: {item.tenKhac ? item.tenKhac : ""}</Text>
      {item.diaChi ? <Text style={styles.sub}>Địa chỉ: {item.diaChi}</Text> : null}
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, paddingTop: 60, backgroundColor: '#fff' }}>
      <Text style={styles.header}>Giáo xứ thuộc giáo hạt: {giaoHat}</Text>
      <FlatList
        data={giaoXuList}
        keyExtractor={(item, index) => item.tenGX + index}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 12 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 10,
    color: '#222',
  },
  card: {
    marginHorizontal: 16,
    marginVertical: 6,
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 8,
    elevation: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  sub: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  link: {
    fontSize: 12,
    color: '#007bff',
    marginTop: 4,
  },
});
