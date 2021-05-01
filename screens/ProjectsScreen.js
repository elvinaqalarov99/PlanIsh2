import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Card from '../components/Card';
import ScrollViewComponent from '../components/ScrollViewComponent';
import { useSelector } from 'react-redux';
import fontSizes from '../constants/fontSizes';
import { Entypo } from '@expo/vector-icons';
import colors from '../constants/colors';

const ProjectsScreen = ({ navigation }) => {
  const projects = useSelector((state) => state.projects.projects);

  return (
    <View style={styles.container}>
      <ScrollViewComponent>
        {projects.map((item, idx) => (
          <Card
            key={idx}
            style={{ height: 'auto', padding: 20 }}
            handler={() =>
              navigation.navigate('ProjectScreen', {
                id: item.id,
                title: item.name,
                project: item,
              })
            }
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.descr}>{item.descr}</Text>
          </Card>
        ))}
      </ScrollViewComponent>
      <TouchableOpacity
        style={styles.addButton}
        activeOpacity={0.5}
        onPress={() => navigation.navigate('CreateProject')}
      >
        <Entypo name="plus" size={46} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default ProjectsScreen;

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
  addButton: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.accentColor,
    zIndex: 10,
    bottom: 40,
    right: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
