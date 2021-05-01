import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import colors from '../constants/colors';
import fonts from '../constants/fonts';
import Card from './Card';

const CreateProjectInput = ({ label, inputHeight, onType }) => {
  const searchInput = useRef(null);
  const [project, setProject] = useState('');

  return (
    <View>
      <Text style={styles.inputLabel}>{label}</Text>
      <Card
        style={{ height: inputHeight }}
        handler={() => {
          searchInput.current.focus();
        }}
      >
        <TextInput
          style={styles.input}
          multiline={true}
          ref={searchInput}
          onChangeText={(value) => {
            setProject(value);
            onType(value);
          }}
          value={project}
        />
      </Card>
    </View>
  );
};

export default CreateProjectInput;

const styles = StyleSheet.create({
  inputLabel: {
    color: colors.inputLabelColor,
    fontFamily: fonts.openSansBold,
    fontSize: 16,
  },
  input: {
    width: '100%',
    alignItems: 'stretch',
  },
});
