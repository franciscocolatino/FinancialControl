import { View } from 'react-native'
import React, { useState } from 'react'
import ExpenseService from '../../services/expenseService';
import { DatabaseConnection } from '../../services/dbinit';
import Dashboard from '../../components/Dashboard';

export default function HomePage({ navigation }) {

  const [data, setData] = useState([]);

  React.useEffect(() => {
    const unsubiscribe = navigation.addListener('focus', () => getAllExpenses());
  }, []);

  const getAllExpenses = async () => {
    const expenseService = new ExpenseService(DatabaseConnection.getConnection());
    console.log("Conexão realizada!");

    try {
      const result = await expenseService.getExpenses();

      const formatedData = formatData(result['_array'])
      setData(formatedData);
    } catch (error) {
      console.log(error);
    }
  }


  const formatData = (values) => {
    return values.map((value, index) => {

      const red = Math.random() * 255;
      const green = Math.random() * 255;
      const blue = Math.random() * 255;

      return {
        name: value.name,
        total: value.total,
        color: `rgb(${red}, ${green}, ${blue})`,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      }
    })
  }

  return (
    <View>
      <Dashboard data={data} accessor={'total'}/>
    </View>
  )
}