import { useState } from 'react'; // erlaubt es use State Funktion zu nutzen
import { View, TextInput, Button, StyleSheet, Modal, Image} from 'react-native';


function CarInput(props) {
    const [enteredCarText, setEnteredCarText] = useState('');

    function carInputHandler (enteredText) {
        setEnteredCarText(enteredText);
      }

      function addCarHandler() {    //selber Name in react kein Probem da unterschiedliche Components
        props.onAddCar(enteredCarText);
        setEnteredCarText('');
      }      

      
    return (
      <Modal visible ={props.visible} animationType="slide"> 
        <View style={styles.inputContainer}>
          <Image style={styles.Image} source={require('../assets/images/car.png')}/> 
      <TextInput
      style={styles.textInput}
      placeholder="My car list"
      onChangeText={carInputHandler}
      value={enteredCarText}
      />

      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="Add Car" onPress={addCarHandler} color='gold'/>
        </View>
      <View style={styles.button}>
        <Button title="Cancel" onPress={props.onCancel} color='grey'/>
      </View>
          </View>
        </View>
      </Modal>
    );
}

export default CarInput;

const styles = StyleSheet.create({
    inputContainer: {
        // flexDirection: 'column'
        justifyContent:'center',
        alignItems: 'center', //zentriert Schrift in Button
        flex: 1,
        padding: 15,
        backgroundColor: 'black',
        borderWidth: 5
        
      },
      textInput: {
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#ffd700',
        backgroundColor: '#ffd700',
        width: '90%',
        marginRight: 4,
        padding: 20,
        color: 'black'
      },
      buttonContainer: {
        marginTop: 16,
        flexDirection: 'row',
      },
      button: {
        width: 100,
        marginHorizontal: 8
      },
      Image:{
        width: '70%',
        height: '20%',
        margin: 40
      }
});