import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Card from '../components/Card';
import ProfileInfo from '../components/ProfileInfo';
import ScrollViewComponent from '../components/ScrollViewComponent';
import { Avatar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { auth, db, storage } from '../firebase';
import { addUser, updatePhoto } from '../store/actions/users';
import { emptyProject } from '../store/actions/projects';
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import LoadingScreen from './LoadingScreen';

const ProfileScreen = ({ navigation }) => {
  const [loading, SetLoading] = useState(false);

  const pickImage = async () => {
    if (Platform.OS !== 'web') {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      const response = await fetch(result.uri);
      const blob = await response.blob();
      SetLoading(true);
      let profilePicRef = storage
        .ref()
        .child('profile_photos/' + auth.currentUser.uid);
      profilePicRef.put(blob).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((img) => {
          auth.currentUser
            .updateProfile({
              photoURL: img,
            })
            .then(() => {
              db.collection('Users')
                .doc(auth.currentUser.uid)
                .update({
                  photoURL: img,
                })
                .then(() => {
                  SetLoading(false);
                  dispatch(updatePhoto(img));
                });
            });
        });
      });
    }
    return result;
  };

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const appInfoAlertHandler = () =>
    Alert.alert('Tətbiq Versiyası', 'Versiyası: 1.0.0', [{ text: 'OK' }]);

  const logOut = () => {
    Alert.alert('Çıxış', 'Çıxmaq istədiyinizdən əminsiniz?', [
      {
        text: 'İmtina',
      },
      {
        text: 'Bəli',
        onPress: () => {
          auth.signOut();
          dispatch(addUser(null));
          dispatch(emptyProject());
        },
      },
    ]);
  };

  return !loading ? (
    <ScrollViewComponent>
      <Card
        style={{ height: 'auto', paddingVertical: 20, marginBottom: 20 }}
        opacity={1}
      >
        <View style={styles.accountContainer}>
          <View
            style={{
              flexDirection: 'row',
              flex: 0.7,
              alignItems: 'center',
            }}
          >
            <TouchableOpacity onPress={pickImage} activeOpacity={0.5}>
              <View style={{ marginRight: 10 }}>
                <Avatar.Image
                  size={80}
                  source={
                    user?.photoURL
                      ? {
                          uri: user?.photoURL,
                        }
                      : require('../assets/images/customuser.png')
                  }
                  // containerStyle={styles.avatarContainer}
                />
                <View
                  style={{
                    opacity: 0.3,
                    position: 'absolute',
                    left: '28%',
                    top: '28%',
                  }}
                >
                  <Entypo name='camera' size={35} color='black' />
                </View>
              </View>
            </TouchableOpacity>
            <View>
              <Text
                adjustsFontSizeToFit={true}
                style={{
                  fontSize: 22,
                  flexShrink: 1,
                  fontWeight: 'bold',
                  flexWrap: 'wrap',
                }}
              >
                {user?.name}
              </Text>
              <Text
                adjustsFontSizeToFit={true}
                style={{ fontSize: 16, fontWeight: 'bold' }}
              >
                {user?.email}
              </Text>
            </View>
          </View>
        </View>
      </Card>
      <Card style={{ height: 'auto', padding: 20 }} opacity={1}>
        <ProfileInfo
          iconParent='ant'
          icon='staro'
          title='Qiymətləndir'
          marginBottom={30}
          arrow={true}
          //   onPress={appInfoAlertHandler}
        />
        <ProfileInfo
          iconParent='fontawesome'
          icon='commenting-o'
          title='Bizə Rəy Bildirin'
          marginBottom={30}
          arrow={true}
          //   onPress={appInfoAlertHandler}
        />
        <ProfileInfo
          iconParent='ionic'
          icon='people-outline'
          title='Haqqımızda'
          marginBottom={30}
          //   onPress={appInfoAlertHandler}
          arrow={false}
        />
        <ProfileInfo
          iconParent='material'
          icon='logout'
          title='Çıxış'
          marginBottom={0}
          onPress={logOut}
          arrow={false}
        />
      </Card>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'auto',
        }}
      >
        <Card
          style={{
            width: '75%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          opacity={1}
        >
          <ProfileInfo
            iconParent='octi'
            icon='versions'
            title='Tətbiq Versiyası'
            onPress={appInfoAlertHandler}
            arrow={false}
          />
        </Card>
      </View>
    </ScrollViewComponent>
  ) : (
    <LoadingScreen />
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  accountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarContainer: {},
});
