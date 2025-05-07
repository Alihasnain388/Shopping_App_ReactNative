import {Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

const FirstScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../assets/background.jpg')} 
      style={styles.container}
      resizeMode="cover"
    >
      <Text style={styles.text1}>Welcome to the Shopping List App!</Text>
      <Text style={styles.text2}>Organize your shopping with ease!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ItemList')}
      >
        <Text style={styles.buttonText}>Start Shopping</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  text1: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'black', 
  },
  text2: {
    fontSize: 20,
    marginBottom: 22,
    fontWeight: 'bold',
    color: 'black', 
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20, 
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default FirstScreen;
