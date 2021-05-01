import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import colors from '../constants/colors';
import fontSizes from '../constants/fontSizes';
import { TouchableOpacity } from 'react-native-gesture-handler';
import fonts from '../constants/fonts';
const ProfileInfo = ({
  iconParent,
  icon,
  title,
  marginBottom,
  onPress,
  arrow,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: marginBottom,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {iconParent == 'material' ? (
            <MaterialIcons
              name={icon}
              size={30}
              color={colors.primaryColor}
              style={{ marginRight: 18 }}
            />
          ) : iconParent == 'ionic' ? (
            <Ionicons
              name={icon}
              size={30}
              color={colors.primaryColor}
              style={{ marginRight: 18 }}
            />
          ) : iconParent == 'ant' ? (
            <AntDesign
              name={icon}
              size={30}
              color={colors.primaryColor}
              style={{ marginRight: 18 }}
            />
          ) : iconParent == 'fontawesome' ? (
            <FontAwesome
              name={icon}
              size={30}
              color={colors.primaryColor}
              style={{ marginRight: 18 }}
            />
          ) : (
            iconParent == 'octi' && (
              <Octicons
                name={icon}
                size={30}
                color={colors.primaryColor}
                style={{ marginRight: 18 }}
              />
            )
          )}

          <Text style={{ fontSize: fontSizes.f18, fontFamily: fonts.openSans }}>
            {title}
          </Text>
        </View>
        {arrow && (
          <View>
            <AntDesign
              name="arrowright"
              size={25}
              color={colors.primaryColor}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ProfileInfo;

const styles = StyleSheet.create({});
