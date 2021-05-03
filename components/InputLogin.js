import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

const InputLogin = ({ placeholder, inputHandler, secure = false, icon }) => {
  return (
    <TextInput
      secureTextEntry={secure}
      label={placeholder}
      mode='flat'
      disabled={false}
      onChangeText={(text) => inputHandler(text)}
      style={{
        width: '100%',
        marginBottom: 15,
      }}
      theme={{
        colors: {
          primary: '#034577',
          accent: '#034577',
          underlineColor: 'transparent',
        },
      }}
      left={icon}
    />
  );
};

export default InputLogin;

const styles = StyleSheet.create({});
