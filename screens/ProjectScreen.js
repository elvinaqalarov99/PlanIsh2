import React from 'react';
import { StyleSheet, Text, Image } from 'react-native';
import Card from '../components/Card';
import ScrollViewComponent from '../components/ScrollViewComponent';
import fonts from '../constants/fonts';
import fontSizes from '../constants/fontSizes';

const ProjectScreen = ({ route, navigation }) => {
  return (
    <ScrollViewComponent>
      <Card
        style={styles.card}
        handler={() =>
          navigation.navigate('BusinessModel', { id: route.params.id, type: 1 })
        }
      >
        <Image
          style={styles.image}
          source={require('../assets/images/BusinessCanvas.jpg')}
        />
        <Text
          style={{
            textAlign: 'center',
            fontFamily: fonts.openSansBold,
            fontSize: fontSizes.f18,
          }}
        >
          Business Model Canvas
        </Text>
      </Card>
      <Card
        style={styles.card}
        handler={() =>
          navigation.navigate('SwotAnalysis', { id: route.params.id, type: 2 })
        }
      >
        <Image
          style={styles.image}
          source={require('../assets/images/SWOT.png')}
        />
        <Text
          style={{
            textAlign: 'center',
            fontFamily: fonts.openSansBold,
            fontSize: fontSizes.f18,
          }}
        >
          SWOT Analysis
        </Text>
      </Card>
      <Card style={styles.card}>
        <Image
          style={[styles.image, { height: 170 }]}
          source={require('../assets/images/VPCmodel.png')}
        />
        <Text
          style={{
            textAlign: 'center',
            fontFamily: fonts.openSansBold,
            fontSize: fontSizes.f18,
          }}
        >
          Value Proposition Canvas
        </Text>
      </Card>
    </ScrollViewComponent>
  );
};

export default ProjectScreen;

const styles = StyleSheet.create({
  card: { height: 'auto', alignItems: 'center', padding: 20 },
  image: {
    resizeMode: 'contain',
    height: 130,
    marginBottom: 10,
  },
});
