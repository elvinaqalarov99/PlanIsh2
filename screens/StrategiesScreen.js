import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import fontSizes from '../constants/fontSizes';
import colors from '../constants/colors';
import DraggableFlatList from 'react-native-draggable-flatlist';

const StrategiesScreen = ({ route, navigation }) => {
  const initialData = [
    {
      order: 1,
      label: 'Örnək Strategiya 1',
    },
    {
      order: 2,
      label: 'Örnək Strategiya 2',
    },
    {
      order: 3,
      label: 'Örnək Strategiya 3',
    },
  ];
  const [items, setItems] = useState(initialData);

  const renderItem = ({ item, index, drag, isActive }) => (
    <View style={styles.section}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {}}
        onLongPress={drag}
      >
        <View style={styles.strategicContainer}>
          <Text style={styles.text}>{item.label}</Text>
        </View>
      </TouchableOpacity>
      <View style={{ zIndex: 10 }}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
          <Entypo name='dots-three-vertical' size={28} color='black' />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <DraggableFlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onDragEnd={({ data }) => setItems(data)}
      />
      <TouchableOpacity
        style={styles.addButton}
        activeOpacity={0.5}
        onPress={() => {}}
      >
        <Entypo name='plus' size={46} color='white' />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default StrategiesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
    paddingVertical: 18,
    paddingHorizontal: 8,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 7,
    paddingVertical: 20,
  },
  divider: { backgroundColor: '#034577' },
  text: {
    fontSize: fontSizes.f18,
    fontFamily: 'open-sans-bold',
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
