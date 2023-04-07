import { FlatList, KeyboardAvoidingView, ToastAndroid, View } from 'react-native'
import React, { useState } from 'react'
import SpentInput from '../../components/SpentInput'
import SpentButton from '../../components/SpentButton'
import { styles } from './style'
import SpentCard from '../../components/SpentCard'
import { object, string, number } from 'yup'

export default function SpentPage() {

    const schema = object({
        spentName: string().required("O nome do gasto não pode ser vazio."),
        spentValue: number().required("O valor do gasto não pode ser vazio.").positive("O valor do gasto deve ser um número positivo")
    })

    const [data, setData] = useState(
        [
            {
                id: 1,
                spentName: 'Aluguel',
                spentValue: 500
            },
        ]
    )
    let spentName; // TODA VEZ QUE APERTO O BOTÃO ADICIONAR, ESSAS VARÍAVEIS SÃO SERADAS. EM VIRTUDE DO useState
    let spentValue;

  return (
    <View style={styles.container}>
        <View style={styles.content}>
            <SpentInput 
            placeholder={"Digite o nome do gasto"} 
            onChangeText={(value) => {spentName = value}}/>
            
            <SpentInput placeholder={"Digte o valor do gasto"} keyBoardType={"number-pad"}
            onChangeText={(value) => {spentValue = value}}/>
            
            <SpentButton title={"Adicionar"}
            onPress={async () => {    
                
                const newSpent = {
                    spentName: spentName,
                    spentValue: spentValue
                }

                //const valid = await schema.isValid(newSpent); TRUE OU FALSE

                try {
                    await schema.validate(newSpent);

                    newSpent.id = data.length + 1;
                    setData([...data, newSpent]);

                } catch(error) {
                    ToastAndroid.show(error.errors[0], ToastAndroid.SHORT)
                    //console.log(error);

                }
            }}/>
        </View>
        <View style={styles.list}>
            <KeyboardAvoidingView> 
                <FlatList 
                    data={data}
                    ItemSeparatorComponent={<View style={{height: 15}}/>}
                    renderItem={({item}) => 
                    <SpentCard spentName={item.spentName}   spentValue={item.spentValue} />}
                    keyExtractor={item => item.id}
                />
            </KeyboardAvoidingView>
        </View>
    </View>
  )
}