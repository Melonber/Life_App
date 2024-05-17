import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, TouchableOpacity, Keyboard } from 'react-native';

export default function GridGraph() {
  const [age, setAge] = useState(''); // Состояние для хранения возраста пользователя

  // Обработчик изменения текста в поле ввода
  const handleChange = (text) => {
    setAge(text); // Обновляем состояние возраста
  };

  // Обработчик нажатия на экран для скрытия клавиатуры
  const handlePress = () => {
    Keyboard.dismiss(); // Скрываем клавиатуру
  };

  // Генерация квадратиков
  const renderSquares = () => {
    const squares = [];
    let count = 0; // Переменная для отслеживания количества квадратиков
    const redCount = parseInt(age) * 52; // Количество красных квадратиков
    const yellowCount = 1196; // Количество желтых квадратиков

    for (let y = 0; y <= 52; y++) {
      for (let x = 0; x < 70; x++) {
        count++; // Увеличиваем счетчик квадратиков
        let color = 'blueSquare'; // Цвет по умолчанию

        if (count <= redCount) {
          color = 'redSquare'; // Красный цвет
        } else if (count <= redCount + yellowCount) {
          color = 'yellowSquare'; // Желтый цвет
        }

        squares.push(
          <View
            key={`${x}-${y}`}
            style={[styles.square, styles[color]]} // Применяем стиль в зависимости от цвета
          />
        );
      }
    }
    return squares;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View>
        <Text>Из расчета 71 год</Text>
      </View>
      <View style={[styles.graphContainer, { marginTop: 70 }]}>
        {renderSquares()}
        <Text>                         71</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Введите свой возраст"
          keyboardType="numeric"
          value={age}
          onChangeText={handleChange}
        />
        <Button title="Применить" onPress={() => console.log('Применено')} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  graphContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  square: {
    width: 5,
    height: 5,
    margin: 1,
  },
  redSquare: {
    backgroundColor: '#FA1219',
  },
  yellowSquare: {
    backgroundColor: '#FA1219',
  },
  blueSquare: {
    backgroundColor: 'green',
  },
});
