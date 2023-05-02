import { View } from 'react-native'
import { SpentContext } from '../../routes/Tabs';
import SpentModal from './components/spentModal';
import { styles } from './style';
import List from './components/list.js';
import ExpenseService from '../../services/expenseService';
import { DatabaseConnection } from '../../services/dbinit';
import React, { useState } from 'react';
import { ToastAndroid } from 'react-native';

export default function AllSpents({ navigation }) {

  const { modalVisible, setModalVisible } = React.useContext(SpentContext);

  const [data, setData] = useState([]);

  React.useEffect(() => {
    // NÃO ESTÁ ATUALIZADO O VALOR!
    getAllExpenses();
  }, [])

  const getAllExpenses = async () => {
    const expenseService = new ExpenseService(DatabaseConnection.getConnection());

    try {
      const result = await expenseService.getExpenses();
      console.log(result)
      setData(result['_array']);
    } catch (error) {
      console.log(error);
    }
  }

  const onSave = async (name) => {
    const expenseService = new ExpenseService(DatabaseConnection.getConnection());

    await expenseService.addExpense(name, 0);

    await getAllExpenses();
  }
  const onRemove = async (id) => {
    const expenseService = new ExpenseService(DatabaseConnection.getConnection());

    try {
      await expenseService.deleteById(id);
      await getAllExpenses();
    } catch (error) {
      ToastAndroid.show('Não é possível apagar despesas com gastos', ToastAndroid.SHORT);
    }
  }

  return (
    <View style={styles.container}>
      <SpentModal modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onSave={onSave} />

      <List data={data}
        onRemove={onRemove}
        navigation={navigation} />
    </View>
  )
}

