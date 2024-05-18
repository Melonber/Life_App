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

    const matrix = Array.from({ length: 75 }, () =>
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

  const getOrderNumber = (rowIndex, cellIndex) => {
    const linearIndex = rowIndex * 52 + cellIndex + 1;
    if ([1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50].includes(linearIndex)) {
      return linearIndex;
    }
    return null;
  };
  
  const renderMatrix = () => {
    return matrix.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {row.map((cell, cellIndex) => (
          <View key={cellIndex}>
            {getOrderNumber(rowIndex, cellIndex) && (
              <Text style={styles.orderNumber}>{getOrderNumber(rowIndex, cellIndex)}</Text>
            )}
            <Text style={styles.emoji}>{cell}</Text>
          </View>
        ))}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textVertical}>Age</Text>
      <View style={styles.content}>
        <Text style={styles.textHorizontal}>Weeks in 1 year</Text>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.matrixContainer}>
            {renderMatrix()}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top:-150
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
  textVertical: {
    transform: [{ rotate: '270deg' }],
    position: 'absolute',
    top: '50%',
    left: 0,
    marginTop: -250,
  },
  orderNumber: {
    position: 'absolute',
    fontSize: 5,
    top: -15,
    left: 0,
  },
  textHorizontal: {
    textAlign: 'center',
    top: 10, // Установите здесь 1 пиксель
  },
});

export default WeekMatrixPage;
