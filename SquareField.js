import React from 'react';
import { FlatList, View } from 'react-native';

const SquareField = () => {
  const renderItem = ({ item }) => (
    <View
      style={{
        width: 52,
        height: 52,
        backgroundColor: 'blue',
        margin: 1,
      }}
    />
  );

  // Генерация данных для FlatList
  const data = Array.from({ length: 80 * 52 }).map((_, index) => ({ key: String(index) }));

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      numColumns={80}
      keyExtractor={(item) => item.key}
    />
  );
};

export default SquareField;
