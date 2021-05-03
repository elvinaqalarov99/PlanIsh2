import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as Google from 'expo-google-app-auth';
// import * as GoogleSignIn from 'expo-google-sign-in';
// import * as AppAuth from 'expo-app-auth';
import * as Facebook from 'expo-facebook';
import * as firebase from 'firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../store/actions/users';
import { auth, db, provider, provider1 } from '../firebase';
import InputLogin from '../components/InputLogin';
import ScrollViewComponent from '../components/ScrollViewComponent';
import ButtonLogin from '../components/ButtonLogin';
import { Alert } from 'react-native';
import fonts from '../constants/fonts';
import { ActivityIndicator } from 'react-native';
import { addDeletedProjects, setProjects } from '../store/actions/projects';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';

// const { URLSchemes } = AppAuth;

const LoginScreen = ({ navigation }) => {
  // useEffect(() => {
  //   const initAsync = async () => {
  //     const initGoogle = await GoogleSignIn.initAsync({
  //       clientId:
  //         '1031453441842-jqci6hg6784m70j0j8nr0i2rkt0cpfhu.apps.googleusercontent.com',
  //     });
  //    return initGoogle ;
  //   };
  //   initAsync();
  // return () => {
  //   initAsync();
  // };
  // }, []);
  useEffect(() => {
    const initFb = async () => {
      const initializeFb = await Facebook.initializeAsync({
        appId: '247558417105136',
        appName: 'PlanIsh',
      });
      return initializeFb;
    };
    initFb();
    return () => {
      initFb();
    };
  }, []);

  const dispatch = useDispatch();
  const [googleText, setGoogleText] = useState(
    <AntDesign name='google' size={30} color='white' />
  );
  const [loginText, setLoginText] = useState('Giriş');
  const [gApi, setGApi] = useState(true);
  const [facebookText, setfacebookText] = useState(
    <AntDesign name='facebook-square' size={30} color='white' />
  );
  const [fApi, setFApi] = useState(true);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const signInFacebook = useCallback(async () => {
    try {
      setFApi(false);
      setfacebookText(<ActivityIndicator size='small' color='white' />);
      const result = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });

      if (result.type === 'success') {
        await auth.setPersistence(firebase.default.auth.Auth.Persistence.LOCAL);
        const credential = provider1.credential({ accessToken: result.token });
        const facebookProfileData = await firebase
          .auth()
          .signInWithCredential(credential);
        if (facebookProfileData.additionalUserInfo.isNewUser) {
          db.collection('Users').doc(auth.currentUser.uid).set({
            name: facebookProfileData.user.displayName,
            email: facebookProfileData.user.email,
            photoURL: facebookProfileData.user.photoURL,
            phoneNumber: facebookProfileData.user.phoneNumber,
            providerId: facebookProfileData.user.providerData[0].providerId,
          });
        }
        let user = {
          name: facebookProfileData.user.displayName,
          email: facebookProfileData.user.email,
          photoURL: facebookProfileData.user.photoURL,
          phoneNumber: facebookProfileData.user.phoneNumber,
          providerId: facebookProfileData.user.providerData[0].providerId,
        };
        dispatch(addUser(user));
        db.collection('Projects')
          .where('uid', '==', auth.currentUser.uid)
          .get()
          .then((querySnapshot) => {
            let projects = [];
            let delProjects = [];
            querySnapshot.forEach((doc) => {
              let obj = doc.data();
              obj.id = doc.id;
              if (obj?.deleted) {
                delProjects.push(obj);
              } else {
                projects.push(obj);
              }
            });
            dispatch(setProjects(projects));
            dispatch(addDeletedProjects(delProjects));
          })
          .catch((error) => {
            alert('Error getting documents: ', error);
          });
      } else {
        setFApi(true);
        setfacebookText(
          <AntDesign name='facebook-square' size={30} color='white' />
        );
      }
      return result;
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }, []);

  const signInGoogle = useCallback(async () => {
    try {
      setGApi(false);
      setGoogleText(<ActivityIndicator size='small' color='white' />);
      const result = await Google.logInAsync({
        androidStandaloneAppClientId: `1031453441842-a4a6isp070aprhl9bujil3dampkpu7u3.apps.googleusercontent.com`,
        iosStandaloneAppClientId: `1031453441842-jqci6hg6784m70j0j8nr0i2rkt0cpfhu.apps.googleusercontent.com`,
        androidClientId: `1031453441842-ms2k31mc3bb1pd3vmu9gv0a0t0mv0sgo.apps.googleusercontent.com`,
        iosClientId: `1031453441842-okm44u1bee1hs7vmj3rl1nes0jih9t43.apps.googleusercontent.com`,
        scopes: ['profile', 'email'],
      });
      // await GoogleSignIn.askForPlayServicesAsync();
      // const result = await GoogleSignIn.signInAsync();
      if (result.type === 'success') {
        await auth.setPersistence(firebase.default.auth.Auth.Persistence.LOCAL);
        const credential = provider.credential(
          // result.user.auth.idToken,
          // result.user.auth.accessToken
          result.idToken,
          result.accessToken
        );
        const googleProfileData = await firebase.default
          .auth()
          .signInWithCredential(credential);
        if (googleProfileData.additionalUserInfo.isNewUser) {
          db.collection('Users').doc(auth.currentUser.uid).set({
            name: googleProfileData.user.displayName,
            email: googleProfileData.user.email,
            photoURL: googleProfileData.user.photoURL,
            phoneNumber: googleProfileData.user.phoneNumber,
            providerId: googleProfileData.user.providerData[0].providerId,
          });
        }
        let user = {
          name: googleProfileData.user.displayName,
          email: googleProfileData.user.email,
          photoURL: googleProfileData.user.photoURL,
          phoneNumber: googleProfileData.user.phoneNumber,
          providerId: googleProfileData.user.providerData[0].providerId,
        };
        dispatch(addUser(user));
        db.collection('Projects')
          .where('uid', '==', auth.currentUser.uid)
          .get()
          .then((querySnapshot) => {
            let projects = [];
            let delProjects = [];
            querySnapshot.forEach((doc) => {
              let obj = doc.data();
              obj.id = doc.id;
              if (obj?.deleted) {
                delProjects.push(obj);
              } else {
                projects.push(obj);
              }
            });
            dispatch(setProjects(projects));
            dispatch(addDeletedProjects(delProjects));
          })
          .catch((error) => {
            alert('Error getting documents: ', error);
          });
      } else {
        setGApi(true);
        setGoogleText(<AntDesign name='google' size={30} color='white' />);
      }
      return result;
    } catch ({ message }) {
      alert('Login: Error:' + message);
    }
  }, []);

  const loginHandler = () => {
    if (user.password && user.email) {
      setLoginText(<ActivityIndicator size='small' color='white' />);
      auth
        .signInWithEmailAndPassword(user.email, user.password)
        .then((authUser) => {
          let user = {
            name: authUser.user.displayName,
            email: authUser.user.email,
            photoURL: authUser.user.photoURL,
            phoneNumber: authUser.user.phoneNumber,
            providerId: authUser.user.providerData[0].providerId,
          };
          dispatch(addUser(user));
          db.collection('Projects')
            .where('uid', '==', auth.currentUser.uid)
            .get()
            .then((querySnapshot) => {
              let projects = [];
              let delProjects = [];
              querySnapshot.forEach((doc) => {
                let obj = doc.data();
                obj.id = doc.id;
                if (obj?.deleted) {
                  delProjects.push(obj);
                } else {
                  projects.push(obj);
                }
              });
              dispatch(setProjects(projects));
              dispatch(addDeletedProjects(delProjects));
            })
            .catch((error) => {
              alert('Error getting documents: ', error);
            });
        })
        .catch((err) => {
          setLoginText('Giriş');
          if (
            err.message ==
            'There is no user record corresponding to this identifier. The user may have been deleted.'
          ) {
            Alert.alert('Xəta', 'İstifadəçi mövcud deyil', [{ text: 'OK' }]);
            return;
          }
          Alert.alert('Xəta', 'Şifrə və ya e-poçt yanlışdır', [{ text: 'OK' }]);
          return;
        });
    } else {
      Alert.alert('Xəta', 'İsifadəçi adı və ya Şifrə daxil edilməyib', [
        { text: 'OK' },
      ]);
      return;
    }
  };

  const usernameHandler = useCallback(
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

  return (
    <ScrollViewComponent>
      <View style={styles.container}>
        <InputLogin
          placeholder='E-poçt'
          inputHandler={usernameHandler}
          key={'input1'}
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
          secure={true}
          inputHandler={pwdHandler}
          key={'input2'}
          icon={
            <TextInput.Icon
              name={() => <FontAwesome5 name='key' size={24} color='#034577' />}
            />
          }
        />
        <ButtonLogin
          key={'login1'}
          api={false}
          text={loginText}
          onPress={loginHandler}
          style={{ marginBottom: 50 }}
        />
        <ButtonLogin
          key={'login2'}
          text={googleText}
          api={gApi}
          onPress={signInGoogle}
        />
        <ButtonLogin
          text={facebookText}
          key={'login3'}
          api={fApi}
          onPress={signInFacebook}
        />
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={{ fontSize: 18, fontFamily: fonts.openSansBold }}>
            Qeydiyyatdan keçin
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollViewComponent>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    width: 250,
    marginBottom: 10,
  },
});
