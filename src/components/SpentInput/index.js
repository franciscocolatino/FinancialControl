import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { styles } from './style'

export default function SpentInput({placeholder, keyBoardType, onChangeText}) {
  return (
    <TextInput placeholder={placeholder} 
    keyboardType={keyBoardType}
    onChangeText={onChangeText}
    style={styles.input}/>
  )
}