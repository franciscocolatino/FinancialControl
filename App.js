import { StyleSheet } from 'react-native';
import { NavigationContainer} from '@react-navigation/native'
import StackRoute from './src/routes/Stacks'
import DatabaseInit from './src/services/sqliteDB';

export default function App() {

  new DatabaseInit();
  return (
    <NavigationContainer>
      <StackRoute />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    /*flex: 1, // OCUPE TODA A TELA!!
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',*/
  }
});
