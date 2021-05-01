import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import ScrollViewComponent from '../components/ScrollViewComponent';
import fontSizes from '../constants/fontSizes';

const SwotAnalysisScreen = ({ route, navigation }) => {
  return (
    <ScrollViewComponent>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() =>
          navigation.navigate('Strategies', {
            title: 'Strengths',
            id: route.params.id,
          })
        }
      >
        <View style={styles.section}>
          <View style={styles.imgContainer}>
            <Image
              style={styles.img}
              source={require('../assets/images/willpower.png')}
            />
          </View>
          <View>
            <Text style={styles.text}>Strengths</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() =>
          navigation.navigate('Strategies', { title: 'Weaknesses' })
        }
      >
        <View style={styles.section}>
          <View style={styles.imgContainer}>
            <Image
              style={styles.img}
              source={require('../assets/images/weak.png')}
            />
          </View>
          <View>
            <Text style={styles.text}>Weaknesses</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() =>
          navigation.navigate('Strategies', { title: 'Opportunities' })
        }
      >
        <View style={styles.section}>
          <View style={styles.imgContainer}>
            <Image
              style={styles.img}
              source={require('../assets/images/resources.png')}
            />
          </View>
          <View>
            <Text style={styles.text}>Opportunities</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => navigation.navigate('Strategies', { title: 'Threats' })}
      >
        <View style={styles.section}>
          <View style={styles.imgContainer}>
            <Image
              style={styles.img}
              source={require('../assets/images/budget.png')}
            />
          </View>
          <View>
            <Text style={styles.text}>Threats</Text>
          </View>
        </View>
      </TouchableOpacity>
    </ScrollViewComponent>
  );
};

export default SwotAnalysisScreen;

const styles = StyleSheet.create({
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  divider: { backgroundColor: '#034577' },
  imgContainer: { marginRight: 35 },
  img: { width: 60, height: 60 },
  text: {
    fontSize: fontSizes.f18,
    fontFamily: 'open-sans-bold',
  },
});
