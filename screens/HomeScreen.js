import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Card from '../components/Card';
import { Avatar } from 'react-native-paper';
import ScrollViewComponent from '../components/ScrollViewComponent';
import fontSizes from '../constants/fontSizes';
import fonts from '../constants/fonts';
import MainButton from '../components/MainButton';
import { useSelector } from 'react-redux';
import Projects from '../components/Projects';
import { TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const projects = useSelector((state) => state.projects.projects);
  const user = useSelector((state) => state.user.user);

  const navigateCreate = () => {
    navigation.navigate('CreateProject');
  };

  return (
    <ScrollViewComponent>
      <Card style={{ height: 120, justifyContent: 'center' }} opacity={1}>
        <View style={styles.accountContainer}>
          <View
            style={{
              flexDirection: 'row',
              flex: 0.7,
              alignItems: 'center',
            }}
          >
            <View style={{ marginRight: 5 }}>
              <Avatar.Image
                source={
                  user?.photoURL
                    ? {
                        uri: user?.photoURL,
                      }
                    : require('../assets/images/customuser.png')
                }
                size={70}
                // containerStyle={styles.avatarContainer}
              />
            </View>
            <View>
              <Text style={{ fontSize: fontSizes.user, fontWeight: 'bold' }}>
                {user?.name}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Text
                  style={{
                    color: '#2474ff',
                    fontSize: fontSizes.account,
                    fontWeight: 'bold',
                  }}
                >
                  Hesabım
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Image
              style={{ width: 40, height: 40 }}
              source={require('../assets/images/notifications.png')}
            />
          </View>
        </View>
      </Card>
      {projects.length ? (
        <Projects
          length={projects.length}
          onPress={() => navigation.navigate('ProjectsScreen')}
        />
      ) : (
        <View style={styles.createProject}>
          <View style={{ marginVertical: 20 }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: fontSizes.f18,
                color: 'white',
              }}
            >
              İlk biznes modelinizi əlavə edərək başlayın
            </Text>
          </View>
          <View style={{ marginBottom: 25 }}>
            <Text style={styles.createProjectList}>
              {'\u2022'} Business Model Canvas
            </Text>
            <Text style={styles.createProjectList}>
              {'\u2022'} SWOT Analysis
            </Text>
            <Text style={styles.createProjectList}>
              {'\u2022'} Value Proposition Canvas
            </Text>
          </View>
          <MainButton
            title='Yeni Layihə Yarat'
            buttonHandler={navigateCreate}
          />
        </View>
      )}
      <Card style={{ height: 120, justifyContent: 'center' }}>
        <View style={styles.optionsContainer}>
          <View style={{ marginRight: 30 }}>
            <Image
              style={styles.optionsImage}
              source={require('../assets/images/notes.png')}
            />
          </View>
          <View>
            <Text style={styles.options}>Qeydlərim</Text>
          </View>
        </View>
      </Card>
      <Card style={{ height: 120, justifyContent: 'center' }}>
        <View style={styles.optionsContainer}>
          <View style={{ marginRight: 30 }}>
            <Image
              style={styles.optionsImage}
              source={require('../assets/images/fayllarım.png')}
            />
          </View>
          <View>
            <Text style={styles.options}>Fayllarım</Text>
          </View>
        </View>
      </Card>
      <Card
        style={{ height: 120, justifyContent: 'center' }}
        handler={() => navigation.navigate('DeletedProjects')}
      >
        <View style={styles.optionsContainer}>
          <View style={{ marginRight: 30 }}>
            <Image
              style={styles.optionsImage}
              source={require('../assets/images/deleted.png')}
            />
          </View>
          <View>
            <Text style={styles.options}>Silinmiş Modellər</Text>
          </View>
        </View>
      </Card>
    </ScrollViewComponent>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  createProject: {
    height: 230,
    width: '100%',
    backgroundColor: '#002060',
    alignItems: 'center',
  },
  accountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarContainer: {},
  createProjectList: {
    textAlign: 'left',
    alignSelf: 'stretch',
    color: 'white',
    fontSize: fontSizes.list,
  },
  optionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  options: { fontSize: fontSizes.options, fontFamily: fonts.openSansBold },
  optionsImage: { width: 60, height: 60 },
});
