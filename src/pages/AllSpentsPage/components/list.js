import React from 'react'
import { FlatList, View } from 'react-native'
import SpentCard from '../../../components/SpentCard'

export default function List({ data, onRemove, navigation }) {

  return (
    <FlatList 
        data={data}
        renderItem={({item}) => <SpentCard 
        spentName={item.name} 
        spentValue={item.total}
        onLongPress={() => onRemove(item.id)}
        onPress={() => {
          navigation.navigate('SpentPage', {
            id: item.id,
            name: item.name
          });
        }}/>}
        ItemSeparatorComponent={<View style={{height: 10}}/>}
    />
    
  )
}