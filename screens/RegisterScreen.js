import React, { useCallback, useLayoutEffect, useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import ButtonLogin from '../components/ButtonLogin';
import InputLogin from '../components/InputLogin';
import ScrollViewComponent from '../components/ScrollViewComponent';
import { auth, db } from '../firebase';
import { addUser } from '../store/actions/users';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';

const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Giriş',
    });
  }, [navigation]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password1: '',
  });

  const loginHandler = () => {
    if (!user.name && !user.email && !user.password && !user.password1) {
      Alert.alert('Xəta', 'Bütün xanalar daxil edilməyib', [{ text: 'OK' }]);
      return;
    }

    if (user.password !== user.password1) {
      Alert.alert('Xəta', 'Şifrələr eyni deyil', [{ text: 'OK' }]);
      return;
    }

    if (
      user.name &&
      user.email &&
      user.password &&
      user.password1 &&
      user.password === user.password1
    ) {
      auth
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((authUser) => {
          authUser.user
            .updateProfile({
              displayName: user.name,
              photoURL: null,
            })
            .then(() => {
              db.collection('Users')
                .doc(auth.currentUser.uid)
                .set({
                  name: authUser.user.providerData[0].displayName,
                  email: authUser.user.providerData[0].email,
                  photoURL: authUser.user.providerData[0].photoURL || null,
                  phoneNumber:
                    authUser.user.providerData[0].phoneNumber || null,
                  providerId: authUser.user.providerData[0].providerId,
                });
              let user = {
                name: authUser.user.providerData[0].displayName,
                email: authUser.user.providerData[0].email,
                photoURL: authUser.user.providerData[0].photoURL,
                phoneNumber: authUser.user.providerData[0].phoneNumber,
                providerId: authUser.user.providerData[0].providerId,
              };
              dispatch(addUser(user));
            })
            .catch((err) => alert(err.message));
        })
        .catch((err) => {
          if (
            err.message ==
            'The email address is already in use by another account.'
          ) {
            Alert.alert('Xəta', 'E-poçt artıq qeydiyyatdan keçib', [
              { text: 'OK' },
            ]);
          } else if (err.message == 'The email address is badly formatted.') {
            Alert.alert('Xəta', 'E-poçtun formatı uyğun deyil', [
              { text: 'OK' },
            ]);
          } else {
            Alert.alert('Xəta', err.message, [{ text: 'OK' }]);
          }
        });
    }
  };

  const nameHandler = useCallback(
    (name) => {
      setUser((prev) => ({ ...prev, name: name }));
    },
    [user.name]
  );

  const emailHandler = useCallback(
    (email) => {
      setUser((prev) => ({ ...prev, email: email }));
    },
    [user.email]
  );

  const pwdHandler = useCallback(
    (pwd) => {
      setUser((prev) => ({ ...prev, password: pwd }));
    },
    [user.password]
  );

  const pwdHandler1 = useCallback(
    (pwd) => {
      setUser((prev) => ({ ...prev, password1: pwd }));
    },
    [user.password1]
  );

  return (
    <ScrollViewComponent>
      <View style={styles.container}>
        <InputLogin
          placeholder='Ad Soyad'
          inputHandler={nameHandler}
          key={'input1'}
          icon={
            <TextInput.Icon
              name={() => <FontAwesome name='user' size={24} color='#034577' />}
            />
          }
        />
        <InputLogin
          placeholder='E-poçt'
          inputHandler={emailHandler}
          key={'input2'}
          icon={
            <TextInput.Icon
              name={() => (
                <MaterialIcons name='email' size={24} color='#034577' />
              )}
            />
          }
        />
        <InputLogin
          placeholder='Şifrə'
          inputHandler={pwdHandler}
          secure={true}
          key={'input3'}
          icon={
            <TextInput.Icon
              name={() => <FontAwesome5 name='key' size={24} color='#034577' />}
            />
          }
        />
        <InputLogin
          placeholder='Yenidən daxil edin'
          inputHandler={pwdHandler1}
          secure={true}
          key={'input4'}
          icon={
            <TextInput.Icon
              name={() => <FontAwesome5 name='key' size={24} color='#034577' />}
            />
          }
        />
        <ButtonLogin
          key={'login5'}
          api={false}
          text='Qeydiyyat'
          onPress={loginHandler}
        />
      </View>
    </ScrollViewComponent>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: 'green',
  },
});
