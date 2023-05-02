import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './style';
import { Pressable } from 'react-native';

export default function ModalButton({title, onPress, style}) {
    return (
        <Pressable
            style={[styles.button, style]}
            onPress={onPress}>
            <Text style={styles.textStyle}>{title}</Text>
        </Pressable>
    )
}