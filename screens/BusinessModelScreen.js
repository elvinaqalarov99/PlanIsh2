import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import ScrollViewComponent from '../components/ScrollViewComponent';
import fontSizes from '../constants/fontSizes';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MainButton from '../components/MainButton';

const BusinessModelScreen = ({ route, navigation }) => {
  return (
    <ScrollViewComponent>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            navigation.navigate('Strategies', {
              title: 'Key Partners',
              id: route.params.id,
            })
          }
        >
          <View style={styles.section}>
            <View style={styles.imgContainer}>
              <Image
                style={styles.img}
                source={require('../assets/images/deal.png')}
              />
            </View>
            <View>
              <Text style={styles.text}>Key Partners</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            navigation.navigate('Strategies', { title: 'Key Activities' })
          }
        >
          <View style={styles.section}>
            <View style={styles.imgContainer}>
              <Image
                style={styles.img}
                source={require('../assets/images/challenge.png')}
              />
            </View>
            <View>
              <Text style={styles.text}>Key Activities</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            navigation.navigate('Strategies', { title: 'Key Resources' })
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
              <Text style={styles.text}>Key Resources</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            navigation.navigate('Strategies', { title: 'Cost Structure' })
          }
        >
          <View style={styles.section}>
            <View style={styles.imgContainer}>
              <Image
                style={styles.img}
                source={require('../assets/images/budget.png')}
              />
            </View>
            <View>
              <Text style={styles.text}>Cost Structure</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            navigation.navigate('Strategies', { title: 'Value Propositions' })
          }
        >
          <View style={styles.section}>
            <View style={styles.imgContainer}>
              <Image
                style={styles.img}
                source={require('../assets/images/value.png')}
              />
            </View>
            <View>
              <Text style={styles.text}>Value Propositions</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            navigation.navigate('Strategies', {
              title: 'Customer Relationships',
            })
          }
        >
          <View style={styles.section}>
            <View style={styles.imgContainer}>
              <Image
                style={styles.img}
                source={require('../assets/images/crm.png')}
              />
            </View>
            <View>
              <Text style={styles.text}>Customer Relationships</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            navigation.navigate('Strategies', { title: 'Channels' })
          }
        >
          <View style={styles.section}>
            <View style={styles.imgContainer}>
              <Image
                style={styles.img}
                source={require('../assets/images/global-network.png')}
              />
            </View>
            <View>
              <Text style={styles.text}>Channels</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            navigation.navigate('Strategies', { title: 'Customer Segments' })
          }
        >
          <View style={styles.section}>
            <View style={styles.imgContainer}>
              <Image
                style={styles.img}
                source={require('../assets/images/customer.png')}
              />
            </View>
            <View>
              <Text style={styles.text}>Customer Segments</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            navigation.navigate('Strategies', { title: 'Revenue Streams' })
          }
        >
          <View style={styles.section}>
            <View style={styles.imgContainer}>
              <Image
                style={styles.img}
                source={require('../assets/images/revenue.png')}
              />
            </View>
            <View>
              <Text style={styles.text}>Revenue Streams</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: 'center' }}>
        <MainButton title='İxrac Et' />
      </View>
    </ScrollViewComponent>
  );
};

export default BusinessModelScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginBottom: 30,
  },
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
