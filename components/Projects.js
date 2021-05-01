import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import fonts from '../constants/fonts';
import fontSizes from '../constants/fontSizes';
import Card from './Card';
const Projects = ({ length, onPress }) => {
  return (
    <Card style={{ height: 180, justifyContent: 'center' }} handler={onPress}>
      <View style={{ alignItems: 'center' }}>
        <Image
          style={styles.optionsImage}
          source={require('../assets/images/project.png')}
        />
        <Text style={[styles.text, styles.title]}>Layihələrim</Text>
        <Text style={[styles.text, styles.quantity]}>{length}</Text>
      </View>
    </Card>
  );
};

export default Projects;

const styles = StyleSheet.create({
  optionsImage: { width: 60, height: 60 },
  text: {
    fontFamily: fonts.openSansBold,
  },
  title: {
    fontSize: fontSizes.f18,
    marginVertical: 8,
  },
  quantity: {
    fontSize: fontSizes.f22,
  },
});
