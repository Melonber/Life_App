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
        <Stack.Screen name="DateInputPage" component={DateInputPage} options={{ title: '',
        headerStyle: {
        backgroundColor: '#f2f2f2', // Измените на желаемый цвет фона
    },
        }}
         />
        <Stack.Screen name="WeekMatrixPage" component={WeekMatrixPage} options={{ title: '',
        headerStyle: {
        backgroundColor: '#f2f2f2', // Измените на желаемый цвет фона
    },
        }}
         />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
