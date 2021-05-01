import React, { useCallback, useRef, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import ScrollViewComponent from '../components/ScrollViewComponent';
import CreateProjectInput from '../components/CreateProjectInput';
import MainButton from '../components/MainButton';
import { addProject } from '../store/actions/projects';
import { useDispatch } from 'react-redux';
import { auth, db } from '../firebase';
import * as firebase from 'firebase';

const CreateProject = ({ navigation }) => {
  const projectId = useRef(db.collection('Projects').doc());
  const dispatch = useDispatch();
  const [project, setProject] = useState({
    name: '',
    descr: '',
    id: projectId.current.id,
    uid: auth.currentUser.uid,
    deleted: false,
    created: firebase.default.firestore.FieldValue.serverTimestamp(),
  });
  const addPorject = () => {
    if (project.name == '') {
      Alert.alert(
        'Layihənizin Adını Qeyd Edilməyib',
        'Zəhmət olmasa layihənizin adını qeyd edin',
        [{ text: 'OK' }]
      );
      return;
    }
    dispatch(addProject(project));
    projectId.current.set(project);
    navigation.navigate('Home');
  };

  const setPorjectName = useCallback(
    (name) => {
      setProject((prev) => ({ ...prev, name: name }));
    },
    [project.name]
  );

  const setPorjectDescr = useCallback(
    (descr) => {
      setProject((prev) => ({ ...prev, descr: descr }));
    },
    [project.descr]
  );

  return (
    <ScrollViewComponent>
      <CreateProjectInput
        label="Layihənizin Adı* :"
        inputHeight={120}
        onType={setPorjectName}
      />
      <CreateProjectInput
        label="Layihə Açıqlaması : (istəyə bağlı)"
        inputHeight={360}
        onType={setPorjectDescr}
      />
      <View style={styles.button}>
        <MainButton title="Əlavə Et" buttonHandler={addPorject} />
      </View>
    </ScrollViewComponent>
  );
};

export default CreateProject;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
  },
});
