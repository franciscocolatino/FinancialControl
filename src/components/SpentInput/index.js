import { TextInput } from 'react-native'
import React from 'react'
import { styles } from './style'

export default function SpentInput({placeholder, keyBoardType, onChangeText, value}) {
  return (
    <TextInput placeholder={placeholder} 
    keyboardType={keyBoardType}
    onChangeText={onChangeText}
    value={value}
    style={styles.input}/>
  )
}