import React, { useState } from 'react';
import { LogBox } from 'react-native';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import PlanIshNavigator from './navigation/PlanIshNavigator';
import projectsReducer from './store/reducers/projects';
import userReducer from './store/reducers/users';

LogBox.ignoreLogs(['Setting a timer']);

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const rootReducer = combineReducers({
    projects: projectsReducer,
    user: userReducer,
  });
  const store = createStore(rootReducer);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <PlanIshNavigator />
    </Provider>
  );
};

export default App;
