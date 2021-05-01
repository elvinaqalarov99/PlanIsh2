import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import Card from '../components/Card';
import ScrollViewComponent from '../components/ScrollViewComponent';
import fontSizes from '../constants/fontSizes';

const DeletedProjects = () => {
  const projects = useSelector((state) => state.projects.deletedProjects);

  return (
    <View style={styles.container}>
      <ScrollViewComponent>
        {projects.length == 0 ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Image
              source={require('../assets/images/no-data.png')}
              style={{ height: 200 }}
              resizeMode="contain"
            />
            <Text
              style={{ fontFamily: 'open-sans-bold', fontSize: fontSizes.f18 }}
            >
              Silinmiş modelləriniz yoxdur
            </Text>
          </View>
        ) : (
          projects.map((item, idx) => (
            <Card
              key={idx}
              style={{ height: 'auto', padding: 20 }}
              // handler={() =>
              //   navigation.navigate('ProjectScreen', {
              //     id: item.id,
              //     title: item.name,
              //   })
              // }
            >
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.descr}>{item.descr}</Text>
            </Card>
          ))
        )}
      </ScrollViewComponent>
    </View>
  );
};

export default DeletedProjects;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  name: {
    fontSize: fontSizes.f22,
    marginBottom: 10,
  },
  descr: {
    fontSize: fontSizes.projectDescr,
  },
});
