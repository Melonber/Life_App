import React, { useState } from 'react';
import { View, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native';

const DateInputPage = ({ navigation }) => {
  const [birthDate, setBirthDate] = useState('');
  const [loading, setLoading] = useState(false); // Добавляем состояние для отображения загрузки

  const handleInputChange = (text) => {
    setBirthDate(text);
  };

  const handleCalculateWeeks = async () => {
    setLoading(true); // Устанавливаем состояние загрузки в true перед началом обработки

    // Имитируем задержку для наглядности (можно заменить на вашу функцию calculateWeeksLived)
    await new Promise(resolve => setTimeout(resolve, 2000));

    navigation.navigate('WeekMatrixPage', { birthDate });
    setLoading(false); // После завершения обработки снова устанавливаем состояние загрузки в false
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your date of bith (day.month.year)"
        onChangeText={handleInputChange}
        value={birthDate}
      />
      {loading ? ( // Если загрузка, отображаем индикатор загрузки
        <ActivityIndicator size="small" color="#0000ff" />
      ) : ( // Если не загрузка, отображаем кнопку
        <Button title="Submit" onPress={handleCalculateWeeks} />
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
    marginTop: -100,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default DateInputPage;
