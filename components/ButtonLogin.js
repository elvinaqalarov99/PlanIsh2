import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text } from 'react-native';

const ButtonLogin = ({ text, onPress, api, style }) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <LinearGradient
        colors={['#007AD1', '#034577']}
        style={[styles.button, style]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={{ fontSize: 20, color: 'white', textAlign: 'center' }}>
          {text} {api && 'ilə daxil olun'}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ButtonLogin;

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 10,
    width: 250,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
