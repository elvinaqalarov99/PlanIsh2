import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { auth, db } from '../firebase';
import { addUser } from '../store/actions/users';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateProjectScreen from '../screens/CreateProjectScreen';
import HomeScreen from '../screens/HomeScreen';
import ProjectsScreen from '../screens/ProjectsScreen';
import ProjectScreen from '../screens/ProjectScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoadingScreen from '../screens/LoadingScreen';
import { LinearGradient } from 'expo-linear-gradient';
import {
  addDeletedProjects,
  addToDeletedProjects,
  setProjects,
} from '../store/actions/projects';
import BusinessModelScreen from '../screens/BusinessModelScreen';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import StrategiesScreen from '../screens/StrategiesScreen';
import { Entypo } from '@expo/vector-icons';
import DeletedProjects from '../screens/DeletedProjects';
import SwotAnalysisScreen from '../screens/SwotAnalysisScreen';

enableScreens();
const Stack = createStackNavigator();

export default function PlanIshNavigator() {
  const dispatch = useDispatch();
  const [state, setState] = useState(true);
  const [loggedIn, setLogged] = useState(false);
  const [trash, setTrash] = useState(
    <FontAwesome5 name='trash' size={22} color='white' />
  );
  useEffect(() => {
    const authenticate = auth.onAuthStateChanged((user) => {
      if (user) {
        let userData = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          phoneNumber: user.phoneNumber,
          providerId: auth.currentUser.uid,
        };
        dispatch(addUser(userData));
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
            setLogged(true);
            setState(false);
          })
          .catch((error) => {
            alert('Error getting documents: ', error);
          });
      } else {
        setState(false);
        setLogged(false);
      }
    });
    return () => {
      authenticate();
    };
  }, [dispatch]);

  if (state) {
    return <LoadingScreen />;
  }

  const deleteProject = (id, project, navigation) => {
    Alert.alert('Sil', 'Silmək istədiyinizdən əminsiniz?', [
      {
        text: 'İmtina',
      },
      {
        text: 'Bəli',
        onPress: () => {
          setTrash(<ActivityIndicator size='small' color='white' />);
          db.collection('Projects')
            .doc(id)
            .update({
              deleted: true,
            })
            .then(() => {
              setTrash(<FontAwesome5 name='trash' size={22} color='white' />);
              dispatch(addToDeletedProjects(id, project));
              navigation.navigate('Home');
            })
            .catch((error) => {
              alert('Error updating document: ', error);
            });
        },
      },
    ]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'open-sans-bold',
            fontSize: 20,
          },
          headerTintColor: 'white',
          headerBackground: () => (
            <LinearGradient
              colors={['#007AD1', '#034577']}
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          ),
        }}
      >
        {loggedIn ? (
          <>
            <Stack.Screen
              name='Home'
              component={HomeScreen}
              options={{ title: 'PlanIsh' }}
            />
            <Stack.Screen
              name='Profile'
              component={ProfileScreen}
              options={({ navigation }) => ({
                title: 'Hesabım',
                headerRight: () => (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={{ marginRight: 15, marginTop: 3 }}
                    onPress={() => navigation.navigate('Home')}
                  >
                    <Entypo name='home' size={25} color='white' />
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen
              name='CreateProject'
              component={CreateProjectScreen}
              options={({ navigation }) => ({
                title: 'Yeni Layihə Yarat',
                headerRight: () => (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={{ marginRight: 15, marginTop: 3 }}
                    onPress={() => navigation.navigate('Home')}
                  >
                    <Entypo name='home' size={25} color='white' />
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen
              name='ProjectsScreen'
              component={ProjectsScreen}
              options={({ navigation }) => ({
                title: 'Layihələr',
                headerRight: () => (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={{ marginRight: 15, marginTop: 3 }}
                    onPress={() => navigation.navigate('Home')}
                  >
                    <Entypo name='home' size={25} color='white' />
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen
              name='ProjectScreen'
              component={ProjectScreen}
              options={({ route, navigation }) => ({
                title: route.params.title,
                headerRight: () => (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      style={{ marginRight: 15, marginTop: 3 }}
                      onPress={() =>
                        deleteProject(
                          route.params.id,
                          route.params.project,
                          navigation
                        )
                      }
                    >
                      {trash}
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      style={{ marginRight: 15, marginTop: 3 }}
                      onPress={() => navigation.navigate('Home')}
                    >
                      <Entypo name='home' size={25} color='white' />
                    </TouchableOpacity>
                  </View>
                ),
              })}
            />
            <Stack.Screen
              name='BusinessModel'
              component={BusinessModelScreen}
              options={{
                title: 'Business Model Canvas',
                headerRight: () => (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={{ marginRight: 15, marginTop: 3 }}
                  >
                    <AntDesign name='infocirlceo' size={25} color='white' />
                  </TouchableOpacity>
                ),
              }}
            />
            <Stack.Screen
              name='SwotAnalysis'
              component={SwotAnalysisScreen}
              options={{
                title: 'Swot Analysis',
                headerRight: () => (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={{ marginRight: 15, marginTop: 3 }}
                  >
                    <AntDesign name='infocirlceo' size={25} color='white' />
                  </TouchableOpacity>
                ),
              }}
            />
            <Stack.Screen
              name='DeletedProjects'
              component={DeletedProjects}
              options={({ navigation }) => ({
                title: 'Silinmiş Modellər',
                headerRight: () => (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={{ marginRight: 15, marginTop: 3 }}
                    onPress={() => navigation.navigate('Home')}
                  >
                    <Entypo name='home' size={25} color='white' />
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen
              name='Strategies'
              component={StrategiesScreen}
              options={({ route }) => ({
                title: route.params.title,
                headerRight: () => (
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      style={{ marginRight: 15, marginTop: 3 }}
                    >
                      <FontAwesome name='unsorted' size={25} color='white' />
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      style={{ marginRight: 15, marginTop: 3 }}
                    >
                      <AntDesign name='infocirlceo' size={25} color='white' />
                    </TouchableOpacity>
                  </View>
                ),
              })}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name='Login'
              component={LoginScreen}
              options={{ title: 'Giriş' }}
            />
            <Stack.Screen
              name='Register'
              component={RegisterScreen}
              options={{ title: 'Qeydiyyat' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
