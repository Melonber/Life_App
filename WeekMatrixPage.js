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
    const lastRow = matrix.length - 1;
    const lastColumn = matrix[0].length - 1;
    matrix[lastRow][lastColumn] = '🟧';

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
        <ScrollView scrollEnabled={false} contentContainerStyle={styles.scrollContainer}>
          <View style={styles.matrixContainer}>
            {renderMatrix()}
          </View>
        </ScrollView>
      </View>
      <Text style={{top:516,left:370, position: 'absolute',}}>75 y.o.</Text>
      <Text style={{width:400,top:600, position: 'absolute', fontSize:20,textAlign:'center'}}>Green squares shows how much fully free time u have for living till 75 years old. Red squares is time that u already lived + 1/3 of your whole life that will be "wasted"(sleeping, eating, hygiene, waiting in a red light and etc.)</Text>
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
    top:-120
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
    left: 4,
    marginTop: -150,
    fontSize:10
  },
  orderNumber: {
    position: 'absolute',
    fontSize: 5,
    top: -15,
    left: 0,
  },
  textHorizontal: {
    textAlign: 'center',
    top: 30,
    fontSize:10
  },
});

export default WeekMatrixPage;
