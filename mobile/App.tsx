import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

function ImageUploader() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => 1}>
        <Text style={styles.buttonText}>Selecione uma imagem</Text>
      </TouchableOpacity>
      <Image style={styles.image} source={require('./assets/unknow.jpg')} />
      <TouchableOpacity style={styles.button} onPress={(e) => handlePress(e)}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
      <Text>Bill Gates</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
});

export default ImageUploader;
