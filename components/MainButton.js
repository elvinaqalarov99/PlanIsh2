import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import colors from '../constants/colors';
import fontSizes from '../constants/fontSizes';

const MainButton = ({ title, buttonHandler }) => {
  return (
    <View>
      <TouchableOpacity activeOpacity={0.5} onPress={buttonHandler}>
        <View style={styles.createProjectButton}>
          <Text style={styles.createProjectTitle}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MainButton;

const styles = StyleSheet.create({
  createProjectButton: {
    height: 50,
    width: 200,
    backgroundColor: colors.accentColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createProjectTitle: {
    color: 'white',
    fontSize: fontSizes.f18,
    fontWeight: 'bold',
  },
});
