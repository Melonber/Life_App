import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button } from 'react-native';

const DateInputPage = ({ onCalculateWeeks }) => {
  const [birthDate, setBirthDate] = useState('');

  const handleInputChange = (text) => {
    setBirthDate(text);
  };

  const handleCalculateWeeks = () => {
    onCalculateWeeks(birthDate);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Введите дату рождения (день.месяц.год)"
        onChangeText={handleInputChange}
        value={birthDate}
      />
      <Button title="Рассчитать" onPress={handleCalculateWeeks} />
    </View>
  );
};

const WeekMatrixPage = ({ matrix }) => {
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

const GridGraph = () => {
  const [matrix, setMatrix] = useState(null);

  const calculateWeeksLived = (birthDate) => {
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

    const newMatrix = Array.from({ length: 70 }, () =>
      Array.from({ length: 52 }, () => '🟩')
    );

    if (diffInWeeks > 0) {
      for (let i = 0; i < diffInWeeks + 1092; i++) {
        const row = Math.floor(i / 52);
        const col = i % 52;
        newMatrix[row][col] = '🟥';
      }
    }

    setMatrix(newMatrix);
  };

  return (
    <View style={styles.container}>
      {!matrix ? (
        <DateInputPage onCalculateWeeks={calculateWeeksLived} />
      ) : (
        <WeekMatrixPage matrix={matrix} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 50,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
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

export default GridGraph;
