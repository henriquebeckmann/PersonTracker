import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

function ImageUploader(): JSX.Element {
  const [image, setImage] = useState("");
  const [response, setResponse] = useState("");

  async function getPermissionAsync() {
    if (Constants.platform?.ios) {
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
      if (status !== "granted") {
        alert(
          "Desculpe, precisamos da permissão de acesso às suas fotos para fazer isso funcionar."
        );
        return false;
      }
    }
    return true;
  }

  async function pickImage() {
    const permission = await getPermissionAsync();
    if (!permission) return;
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  function handlePress(event: GestureResponderEvent) {
    event.preventDefault();

    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      fetch("http://localhost:8000/uploadfile/", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((json) => setResponse(JSON.stringify(json.names)))
        .catch((error) => {
          console.error(error);
        });
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Selecione uma imagem</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <TouchableOpacity style={styles.button} onPress={(e) => handlePress(e)}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
      {response && <Text>{response}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#2196F3",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
});

export default ImageUploader;
