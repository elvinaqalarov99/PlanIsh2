import React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import ScrollViewComponent from '../components/ScrollViewComponent';
import fonts from '../constants/fonts';
import fontSizes from '../constants/fontSizes';
import * as Print from 'expo-print';

const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pdf Content</title>
        <style>
            body {
                font-size: 16px;
                color: rgb(255, 196, 0);
            }

            h1 {
                text-align: center;
            }
        </style>
    </head>
    <body>
        <h1>Hello, UppLabs!</h1>
    </body>
    </html>
`;

const createPDFHandler = () => {
  const createPDF = async (html) => {
    try {
      const { uri } = await Print.printToFileAsync({ html });
      console.log(uri);
      return uri;
    } catch (err) {
      console.error(err);
    }
  };
  createPDF();
};

const ProjectScreen = ({ route, navigation }) => {
  return (
    <ScrollViewComponent>
      <View style={{ flexGrow: 1 }}>
        <Card
          style={styles.card}
          handler={() =>
            navigation.navigate('BusinessModel', {
              id: route.params.id,
              type: 1,
            })
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
            navigation.navigate('SwotAnalysis', {
              id: route.params.id,
              type: 2,
            })
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
        <Card
          style={styles.card}
          handler={() =>
            navigation.navigate('ValuePropCanvas', {
              id: route.params.id,
              type: 3,
            })
          }
        >
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
      </View>
      <View style={{ alignItems: 'center' }}>
        <MainButton
          title='İxrac Et'
          buttonHandler={createPDFHandler(htmlContent)}
        />
      </View>
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
