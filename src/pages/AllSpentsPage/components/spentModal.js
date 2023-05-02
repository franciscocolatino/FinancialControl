import { View, Text, StyleSheet, Modal } from 'react-native'
import React from 'react'
import SpentInput from '../../../components/SpentInput';
import ModalButton from '../../../components/ModalButton';

export default function SpentModal({ modalVisible, setModalVisible, onSave }) {

  let name = "";

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        this.setState({ modalVisible: !modalVisible });
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Insira um nome para a sua despesa:</Text>

          <SpentInput
            placeholder={"EX.: Aluguel"}
            onChangeText={(value) => name = value} />

          <View style={styles.buttons}>

            <ModalButton
              title="Cancelar"
              onPress={() => setModalVisible(!modalVisible)}
              style={{ backgroundColor: 'red' }} />

            <ModalButton
              title="Confirmar"
              onPress={() => {
                setModalVisible(!modalVisible)
                onSave(name);
              }}
              style={{ backgroundColor: 'green' }}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: 300,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    margin: 10,
    elevation: 2,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    //gap: 5
  }
});