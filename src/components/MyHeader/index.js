import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import { colors, fonts, windowWidth } from '../../utils';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { getData } from '../../utils/localStorage';
import MyMenu from '../MyMenu';
export default function MyHeader({ onPress }) {
  const [user, setUser] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  useState(() => {
    getData('user').then(res => {
      setUser(res)
    })
  }, [])

  const navigation = useNavigation();
  return (

    <>

      <View style={{

        flexDirection: 'row',
      }}>
        <View style={{
          flex: 1,
          paddingLeft: '7%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <View>
            <Image style={{
              width: 40,
              height: 40,
              borderRadius: 10
            }} source={{
              uri: user.foto_user
            }} />
          </View>
          <View style={{
            left: 10,
            justifyContent: 'center'
          }}>
            <Text style={{
              fontFamily: fonts.primary.normal,
              fontSize: 20,
              color: colors.primary
            }}>{user.nama_lengkap}</Text>
            <Text style={{
              fontFamily: fonts.primary[400],
              fontSize: 12,
              color: colors.primary
            }}>{user.telepon}</Text>

          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Pengaturan')} style={{
          backgroundColor: colors.secondary,
          height: 70,
          width: 70,
          borderBottomLeftRadius: 100,
          alignItems: 'flex-end',
          padding: 5
        }}>
          <Icon type='ionicon' name='menu-outline' size={35} color={colors.white} />

        </TouchableOpacity>
      </View>


    </>
  );
}

const styles = StyleSheet.create({});
