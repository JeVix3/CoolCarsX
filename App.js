import React, { useEffect } from 'react';
import { StyleSheet, View, DynamicColorIOS, FlatList, Button, Image, Animated, ProgressViewIOSComponent} from 'react-native';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar'; //damit Urhzeit usw nicht mit schwarzem Background überschrieben wird

import CarItem from './components/CarItem';
import CarInput from './components/CarInput';

export default function App() {                           //Hauptkomponente der App für Expo
  const [coolCars, setCoolCars] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);  //UseState(false) zeigt, dass Modal inizial nicht gezeigt werden soll
  type FadeInViewProps = PropsWithChildren<{style: ViewStyle}>;

  const FadeInView: React.FC<FadeInViewProps> = props => {
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  
    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true,
      }).start();
    }, [fadeAnim]);


  function startAddCarHandler (){       //wenn AddCarHandler gestartet wird dann wird setModualVisible true und Modal screen wird damit angezeigt
    setModalIsVisible(true);
    
  }
  
  function endAddCarHandler(){
  setModalIsVisible(false);
  }

  function addCarHandler (enteredCarText) {
    setCoolCars((currentCoolCars) => [
      ...currentCoolCars,
      { text: enteredCarText, id: Math.random().toString() }, //key anlegen damit unique listeneinträge
    ]);
    endAddCarHandler();
  }
  
function deleteCarHandler(id){  // Funktion um zu löschen definiert, Verlinkung zu CarItem siehe unten, ohne id wird nur in console angezeigt, dass etwas gelöscht wird, es würde visuelle Rückmeldung fehlen
  setCoolCars(currentCoolCars => {
    return currentCoolCars.filter((car) => car.id !== id); //Funktion gibt true zurück wenn  , Funktion gibt false zurück, wenn Id die ist, die auch gelöscht werden soll
  });
}

  return (
    
    <>
    <StatusBar style='light'/>
    <View style={styles.appContainer}>
      

      <Animated.View 
      style={{ 
        ...props.style,
        opacity: fadeAnim}}> 
        <Image source={require('../CoolCarsX/assets/images/nice.png')}
         style={{width: 350, height: 200, margin: 50}}
         />
          {props.children}
        </Animated.View> 


      <Button
      title='You checked out another cool car? Click here to add it to your list or tap to remove!'
      color='darkgrey'
      onPress={startAddCarHandler}
     /> 
  
     <CarInput
     visible={modalIsVisible}
     onAddCar={addCarHandler}
     onCancel={endAddCarHandler}
     /> 

     <View style={styles.carsContainer}>

     <FlatList                                      //für performance von langen listen zum rendern, Zeile 26: verknüpfung mit Funktion vom Modal Screen über on Press Prop
     data={coolCars}                                //als Wert mitgeben, damit Flatlist weiß, was ausgegeben werden muss
     renderItem={(itemData) => {
      return (

      <CarItem text={itemData.item.text}
      id={itemData.item.id}                        // über id können Listeneinträge gelöscht werden
      onDeleteItem={deleteCarHandler}
      />
      
      );                                          //Löschfunktion verknüpft
     }}
     keyExtractor={(item, index) => {
      return item.id;
    
     }}
    />
    </View>
    </View>
    
    </>
  );
    }

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 120,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: 'black',
    color: 'red',
    dark: 'darkgray',
    light: 'lightgray',
    highContrastDark: 'black',
    highContrastLight: 'white',
  },
  
  carsContainer: {
    flex: 5,
  },

  Image2:{
    width: '70%',
    height: '20%',
    margin: 40
  }

});

