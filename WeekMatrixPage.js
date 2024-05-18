import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const WeekMatrixPage = ({ route }) => {
  const birthDate = route.params.birthDate;

  const generateMatrix = (birthDate) => {
    // Функция для расчета количества недель прожитых и создания матрицы
    const birthDateParts = birthDate.split('.');
    if (birthDateParts.length !== 3) {
      alert('Введите дату в формате "день.месяц.год"');
      return;
    }
    const currentDate = new Date();
    const inputDate = new Date(birthDateParts[2], birthDateParts[1] - 1, birthDateParts[0]);
    if (inputDate > currentDate) {
      alert('Дата рождения не может быть в будущем');
      return;
    }
    const diffInMilliseconds = currentDate.getTime() - inputDate.getTime();
    const diffInWeeks = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 7));

    const matrix = Array.from({ length: 70 }, () =>
      Array.from({ length: 52 }, () => '🟩')
    );

    if (diffInWeeks > 0) {
      for (let i = 0; i < diffInWeeks + 1092; i++) {
        const row = Math.floor(i / 52);
        const col = i % 52;
        matrix[row][col] = '🟥';
      }
    }

    return matrix;
  };

  const matrix = generateMatrix(birthDate);

  const renderMatrix = () => {
    return matrix.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {row.map((cell, cellIndex) => (
          <Text key={cellIndex} style={styles.emoji}>{cell}</Text>
        ))}
      </View>
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.matrixContainer}>
        {renderMatrix()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  matrixContainer: {
    borderWidth: 1,
    borderColor: 'black',
  },
  row: {
    flexDirection: 'row',
  },
  emoji: {
    fontSize: 5,
  },
});

export default WeekMatrixPage;
