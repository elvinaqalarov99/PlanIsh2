import React from 'react';
import { StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const InputLogin = ({ placeholder, icon, iconP, inputHandler, secure }) => {
  return (
    <Input
      placeholder={placeholder}
      errorStyle={{ color: 'red' }}
      secureTextEntry={secure}
      onChangeText={(text) => inputHandler(text)}
      leftIcon={
        iconP == 'font' ? (
          <FontAwesome name={icon} size={30} color="#034577" />
        ) : (
          <MaterialIcons name={icon} size={30} color="#034577" />
        )
      }
      style={{ width: 100 }}
    />
  );
};

export default InputLogin;

const styles = StyleSheet.create({});
