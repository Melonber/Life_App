import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DateInputPage from './DateInputPage';
import WeekMatrixPage from './WeekMatrixPage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DateInputPage">
        <Stack.Screen name="DateInputPage" component={DateInputPage} options={{ title: 'Ввод даты рождения' }} />
        <Stack.Screen name="WeekMatrixPage" component={WeekMatrixPage} options={{ title: 'Матрица прожитых недель' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
