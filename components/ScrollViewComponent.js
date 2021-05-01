import React from 'react';
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native';

const ScrollViewComponent = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        {props.children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScrollViewComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
  },
  contentContainerStyle: {
    paddingVertical: 18,
    paddingHorizontal: 8,
    flexGrow: 1,
  },
});
