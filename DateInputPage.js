// DateInputPage.js

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const DateInputPage = ({ navigation }) => {
  const [birthDate, setBirthDate] = useState('');

  const handleInputChange = (text) => {
    setBirthDate(text);
  };

  const handleCalculateWeeks = () => {
    navigation.navigate('WeekMatrixPage', { birthDate });
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
});

export default DateInputPage;
