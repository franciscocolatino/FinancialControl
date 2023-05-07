import { FlatList, KeyboardAvoidingView, ToastAndroid, View } from 'react-native'
import React, { useState } from 'react'
import SpentInput from '../../components/SpentInput'
import SpentButton from '../../components/SpentButton'
import { styles } from './style'
import SpentCard from '../../components/SpentCard'
import { object, string, number } from 'yup'
import { Keyboard } from 'react-native'
import SpentService from '../../services/spentService'
import { DatabaseConnection } from '../../services/dbinit'
import ExpenseService from '../../services/expenseService'

export default function SpentPage({ navigation, route }) {

    const [data, setData] = useState([]);
    const [spentName, setSpentName] = useState('');
    const [spentValue, setSpentValue] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const expenseId = route.params?.id;
    const expenseName = route.params?.name;

    React.useEffect(() => {
        // ALTERANDO PRÓPRIEDADES DO ARQUIVO DE NAVEGAÇÃO!
        navigation.setOptions({ title: expenseName });
        const unsubscribe = navigation.addListener('beforeRemove', () => {
            // PARA PEGAR O VALOR ATUAL
            setData((current) => {
                sum(current);
                return [];
            })
        })
        return unsubscribe;
    }, []);

    React.useEffect(() => {
        console.log("o id é " + expenseId);
        if (isLoading) {
            // PQ NÃO USOU O AWAIT AQUI??
            // POIS ESSE useEffect por baixo dos planos ele retorna essa função que
            // por ela mesma, já se torna assíncrona!
            getAllSpentsByExpense(expenseId);

        }
        // quando essas variaveis alteram ele chama essa função!
        // estando vázio, ele será chamado uma vez!
    }, [isLoading])

    const sum = async (spents) => {
        const expenseService = new ExpenseService(DatabaseConnection.getConnection());

        try {
            const total = spents.reduce((previous, current) => previous + current.spentValue , 0)
            await expenseService.updateById(expenseId, total);
        } catch (error) {
            console.log(error);

        }
    }

    const getAllSpentsByExpense = async (id) => {
        const spentService = new SpentService(DatabaseConnection.getConnection());

        try {
            const result = await spentService.getSpentsByExpenseId(id);
            setData(result['_array']);
            setIsLoading(false);
        } catch (error) {
            console.log(error)

        }

    }

    const schema = object({
        spentName: string().required("O nome do gasto não pode ser vazio."),
        spentValue: number().required("O valor do gasto não pode ser vazio.").positive("O valor do gasto deve ser um número positivo")
    })


    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <SpentInput
                    placeholder={"Digite o nome do gasto"}
                    value={spentName}
                    onChangeText={setSpentName} />

                <SpentInput
                    placeholder={"Digte o valor do gasto"}
                    keyBoardType={"number-pad"}
                    value={spentValue}
                    onChangeText={setSpentValue} />

                <SpentButton title={"Adicionar"}
                    onPress={async () => {
                        const spentService = new SpentService(DatabaseConnection.getConnection());
                        const newSpent = {
                            spentName: spentName,
                            spentValue: spentValue
                        }

                        //const valid = await schema.isValid(newSpent); TRUE OU FALSE

                        try {
                            await schema.validate(newSpent);
                            await spentService.addSpent(newSpent.spentName, newSpent.spentValue, expenseId);
                        } catch (error) {
                            ToastAndroid.show(error.errors[0], ToastAndroid.SHORT)
                            //console.log(error);
                        } finally {
                            Keyboard.dismiss();
                            setSpentName('');
                            setSpentValue('');
                            setIsLoading(true);
                        }
                    }} />
            </View>
            <View style={styles.list}>
                <KeyboardAvoidingView>
                    <FlatList
                        data={data}
                        ItemSeparatorComponent={<View style={{ height: 15 }} />}
                        renderItem={({ item }) =>
                            <SpentCard
                                spentName={item.spentName}
                                spentValue={item.spentValue}
                                onLongPress={async () => {
                                    const spentService = new SpentService(DatabaseConnection.getConnection());

                                    try {
                                        await spentService.deleteById(item.id);
                                    } catch (error) {
                                        console.log(error);
                                    } finally {
                                        setIsLoading(true);
                                    }
                                }} />}
                        keyExtractor={item => item.id}
                    />
                </KeyboardAvoidingView>
            </View>
        </View>
    )
}