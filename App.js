import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
//Importa todas las funciones como ImagePicker
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
// import uploadToAnonymousFilesAsync from 'anonymous-files';

const App = () => {

  //Empieza vacia la imagen con null en el estado
  const [selectedImage, setSelectedImage] = useState(null)

  const openImagePickerAsync = async () => {
  //Pide permiso al usuario para lanzar la lectura de archivos
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
  
  if(permissionResult.granted === false){
    alert('Permission to access the camera is required');
    return
  }

  const pickerResult = await ImagePicker.launchImageLibraryAsync()
  
  //Si el usuario da permiso pero no selecciona imagen
  if(pickerResult.cancelled === true){
    return
  }

  //Validacion para Web
  if(Platform.OS === "web"){
    //Devuelve la url del sitio al que se subio (anonymous files)
    //no existe ya anonymousfiles.io
    // const remoteUri = await uploadToAnonymousFilesAsync(pickerResult.uri);
  }else{
    //Si la selecciona
  setSelectedImage({ localUri: pickerResult.uri })
  }
}

  const openShareDialog = async () => {
    //Si el telf no puede compartir la imagen
    if(!(await Sharing.isAvailableAsync())){
      alert(`Share is not available on your platform`)
      return
    }

    await Sharing.shareAsync(selectedImage.localUri)
  }


  return (
  <View style={styles.container}>
    <Text style={styles.title}> Pick an Image </Text>
    <TouchableOpacity
      onPress={openImagePickerAsync}
    >
      <Image
        //Es un if en el source entre la imagen del usuario y la imagen random
        source={{uri: selectedImage !== null ? selectedImage.localUri: "https://picsum.photos/200/200"}}
        style={styles.image}
      />
    </TouchableOpacity>
    {/* Para que solo salga el boton de compartir si hay una imagen en el local uri */}
    {
      selectedImage ?
      <TouchableOpacity
      style={styles.button}
      onPress={openShareDialog}
    >
      <Text style={styles.buttonText}>Share me</Text>
    </TouchableOpacity>
    : <View/>
    }
  </View>
  )
}

//Como si fuera el archivo de CSS
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: "black", 
  },
  
  title: { 
    fontSize: 30, 
    color: '#FFF', 
    marginBottom: 20,
  },

  image: {
    height: 200,
    width: 200,
    borderRadius: 100,
    resizeMode: 'contain'
  },

  button: {
    backgroundColor: 'blue',
    padding: 7,
    marginTop: 25,
  },

  buttonText: {
    color: '#FFF',
    fontSize: 20,
  },

})

export default App;

              