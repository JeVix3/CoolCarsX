import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Button,
  Image,
  Animated,
} from "react-native";
import { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar"; //damit Menü-Bar nicht mit schwarzem Background überschrieben wird

import CarItem from "./components/CarItem";
import CarInput from "./components/CarInput";

export default function App() {
  //Hauptkomponente der App für Expo
  const [coolCars, setCoolCars] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false); //UseState(false) zeigt, dass Modal inizial nicht gezeigt werden soll
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  function startAddCarHandler() {
    //wenn AddCarHandler gestartet wird, dann wird setModualVisible true und Modal screen wird damit angezeigt
    setModalIsVisible(true);
  }

  function endAddCarHandler() {
    setModalIsVisible(false);
  }

  function addCarHandler(enteredCarText) {
    setCoolCars((currentCoolCars) => [
      ...currentCoolCars,
      { text: enteredCarText, id: Math.random().toString() }, //key anlegen damit unique Listeneinträge
    ]);
    endAddCarHandler();
  }

  function deleteCarHandler(id) {
    // ohne ID wird nur in console angezeigt, dass etwas gelöscht wird, es fehlt visuelle Rückmeldung in der App UI
    setCoolCars((currentCoolCars) => {
      return currentCoolCars.filter((car) => car.id !== id); //Funktion gibt false zurück, wenn Id die ist, die auch gelöscht werden soll
    });
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Animated.View // Animation
          style={{
            opacity: fadeAnim,
          }}
        >
          <Image
            source={require("../CoolCarsX/assets/images/nice.png")}
            style={{ width: 350, height: 200, margin: 50 }}
          />
        </Animated.View>

        <Button
          title="You checked out another cool car? Click here to add it to your list or tap to remove!"
          color="grey"
          onPress={startAddCarHandler}
        />

        <CarInput
          visible={modalIsVisible}
          onAddCar={addCarHandler}
          onCancel={endAddCarHandler}
        />

        <View style={styles.carsContainer}>
          <FlatList //für performance von langen Listen zum rendern
            data={coolCars} //als Wert mitgeben, damit Flatlist weiß, was ausgegeben werden muss
            renderItem={(itemData) => {
              return (
                <CarItem
                  text={itemData.item.text}
                  id={itemData.item.id} // über ID können Listeneinträge gelöscht werden
                  onDeleteItem={deleteCarHandler}
                />
              );
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
    backgroundColor: "black",
    color: "golden",
  },

  carsContainer: {
    flex: 5,
  },
});
