import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

const Card = (props) => {
  return (
    <TouchableOpacity
      style={[styles.card, props.style]}
      onPress={props.handler}
      activeOpacity={props.opacity}
    >
      <View>{props.children}</View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    padding: 10,
    backgroundColor: 'white',
    width: '100%',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowRadius: 2,
    marginVertical: 8,
  },
});
