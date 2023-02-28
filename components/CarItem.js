import React from 'react';
import {StyleSheet, View, Text, Pressable, ImageBackground} from 'react-native';    //anlegen einzelner js componenten(Dateien), einbinden damit Style übernommen wird, sobald view und text drin ist neu importieren, anders als bei anderen programmiersprachen h2.


function CarItem(props) {                               //props object einfügen, text property ist für text verantwortlich, pressable an der stelle macht dass listeneinträge pressable sind
    return (                        
        <View style={styles.carItem}> 
          <Pressable
          android_ripple={{ color:'red'}}  //// über bind (standard java script) kann funktion vorkonfigurieren für die zukünftige Ausführung, ripple effekt bei Android beim löschen/tippen
          onPress={props.onDeleteItem.bind(this, props.id)}
          style={({ pressed }) => pressed && styles.pressedItem}
          >     
            <Text style={styles.carText}>{props.text}</Text>
      </Pressable>
      </View>
     
    );
}

export default CarItem;

const styles = StyleSheet.create({
    carItem: {
        margin: 8,
        borderRadius: 6,
        backgroundColor: '#ffd700',
      },

      carText: {
        color: 'black',
        padding: 8,
      },

      pressedItem: {
        opacity: 0.5,
      },

      button: {
        width: 50,
        marginHorizontal: 6
      },

});