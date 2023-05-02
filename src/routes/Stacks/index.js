import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import SpentPage from '../../pages/SpentPage';
import TabsRoute from '../Tabs';

const Stack = createStackNavigator();

export default function StackRoute() {
  return (
    <Stack.Navigator>
        <Stack.Screen options={{
          headerShown: false
        }}
        name='tabs' component={TabsRoute}/>
        <Stack.Screen name='SpentPage' component={SpentPage} />
    </Stack.Navigator>
  )
}