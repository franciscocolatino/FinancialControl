import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AllSpents from '../../pages/AllSpentsPage';
import HomePage from '../../pages/HomePage';
import Ionicons from '@expo/vector-icons/Ionicons'

const Tabs = createBottomTabNavigator();

export const SpentContext = React.createContext();

export default function TabsRoute() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SpentContext.Provider value={{modalVisible, setModalVisible}}>
      <Tabs.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 18,
            fontWeight: "700",
            padding: 5
          },
          tabBarStyle: {
            height: 70
          },
          tabBarActiveTintColor: "#758a38"
        }}
      >
        <Tabs.Screen options={{
          // focused vai dizer se esse é o icone que foi clicado naquele momento!
          //color cor do icone naquele momento
          //size é o tamanho do icone
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name='pie-chart-outline' size={32} color={color} />
          }
        }}
          name="Home" component={HomePage} />
        <Tabs.Screen options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name='cash-outline' size={32} color={color}
            />
          },
          title: "Despesa",
          // ICONE DE + no canto superior direito!
          headerRight: () => {
            return <Ionicons name='add' size={32} style={{ marginRight: 10 }} 
            onPress={() => {
              setModalVisible(true);
            }}
            />
          }
        }}
          name='allSpents' component={AllSpents} />
      </Tabs.Navigator>
    </SpentContext.Provider>
  )
}