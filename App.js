import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Clipboard, Keyboard, TouchableWithoutFeedback } from 'react-native';



export default function App() {
  const [url, setUrl] = useState('');
  const [name, setname] = useState('');
  const [urlFinal, setUrlFinal] = useState('');

  const short = async () => {
    if (url.includes('https://') || url.includes('http://')){
      await fetch(`https://cutt.ly/api/api.php?key=5177224c6776e13fb534c3257ee6678c0b8fc&short=${url}&name=${name}`)
      .then( async Response =>{
        const data = await response.json();

        if (data.url.status === 3){
          alert('Esse nome ja está em uso');
          return;
        }
        if (data.url.status === 2){
          alert('url é invalida');
          return;
        }

        console.log(data)
        setUrlFinal(data.url.shortLink);
        Keyboard.dismiss();
      })
    }
  }

  function copyUrl(){
    Clipboard.setString(urlFinal);
  }

  return (
    <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
    <View style={styles.container}>
      <Text style={styles.title}> 
        Encurtador de
        <Text> URL </Text>
      </Text>
      
      <TextInput 
      style={styles.input}
      onChangeText = { (texto) => setUrl(texto)}
      value ={url}
      placeholder = "Digite a Url"
      />

      <TextInput 
      style={styles.input}
      onChangeText = { (texto) => setname(texto)}
      value ={name}
      placeholder = "Nome personalidado de Url"
      />

      <TouchableOpacity onPress={() => short()} style={styles.btn}>
        <Text style={ {color: '#FFF'}}> Encurtar </Text>
      </TouchableOpacity>

      <TouchableWithoutFeedback onPress={urlFinal ? copyUrl : () => {}}>
        <Text style={styles.urlfinal}> {urlFinal} </Text>
      </TouchableWithoutFeedback>

    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#21243d',
    fontWeight: 'bold',
    fontSize: 40,
    marginBottom: 20,
  },
  input: {
    height: 60,
    width: '80%',
    borderColor: '#21243d',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#FAFAFA',
    marginBottom: 20,
    fontSize: 20,
  },
  btn: {
    backgroundColor: '#ff7c7c',
    borderRadius: 20,
    height: 40,
    width: '80%',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  urlfinal: {
    height: 40,
    width: '80%',
    marginTop: 20,
    fontSize: 20,
    textAlign: 'center'
  }
});
