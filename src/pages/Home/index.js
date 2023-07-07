import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback, Linking } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import 'intl';
import 'intl/locale-data/jsonp/en';
import moment from 'moment';
import 'moment/locale/id';
import MyCarouser from '../../components/MyCarouser';

const ListTombol = ({ onPress, label }) => {

  return (
    <TouchableOpacity onPress={onPress} style={{
      backgroundColor: colors.secondary,
      padding: 20,
      borderRadius: 10,
      borderWidth: 3,
      marginVertical: 10,
      borderColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Text style={{
        fontFamily: fonts.secondary[600],
        fontSize: 20,
        color: colors.white
      }}>{label}</Text>
    </TouchableOpacity>
  )
}

export default function Home({ navigation, route }) {

  const [user, setUser] = useState({});
  const isFocus = useIsFocused();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [comp, setComp] = useState({});

  const _getTransaction = async () => {

    await getData('user').then(u => {
      setUser(u);
    })

    await axios.post(apiURL + 'company').then(res => {

      setComp(res.data.data);

    });

    await axios.post(apiURL + 'rumah_sakit').then(res => {

      console.log(res.data);
      setData(res.data);

    });
  }


  useEffect(() => {
    if (isFocus) {
      _getTransaction();
    }
  }, [isFocus]);

  const __renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => navigation.navigate('InfoPdf', item)}>
        <View style={{
          flex: 1,
          width: 170,
          height: 120,
          padding: 10,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: colors.primary,
          margin: 5,
        }}>
          <Image source={{
            uri: item.image
          }} style={{
            width: '100%',
            height: 60,
            resizeMode: 'contain',
            marginBottom: 10,
          }} />
          <Text style={{
            fontFamily: fonts.secondary[600],
            fontSize: 12,
            textAlign: 'center'
          }}>{item.nama_rs}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }


  return (

    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white
    }}>
      <View style={{
        padding: 20,
        backgroundColor: colors.white,
        flexDirection: 'row'
      }}>
        <View style={{
          flex: 1,
        }}>
          <Text style={{
            fontFamily: fonts.secondary[600],
            fontSize: 16,
            color: colors.black
          }}>Hi, {user.nama_lengkap}</Text>
          <Text style={{
            fontFamily: fonts.secondary[400],
            fontSize: 16,
            color: colors.black
          }}>Selamat datang</Text>
        </View>
        <TouchableNativeFeedback onPress={() => navigation.navigate('Account')}>
          <Image source={require('../../assets/logo.png')} style={{
            width: 50,
            height: 50
          }} />
        </TouchableNativeFeedback>
      </View>

      <Text style={{
        fontFamily: fonts.secondary[800],
        color: colors.secondary,
        fontSize: 30,
        textAlign: 'center',
      }}>MR. Y</Text>
      <Text style={{
        fontFamily: fonts.secondary[600],
        color: colors.secondary,
        fontSize: 30,
        textAlign: 'center',
      }}>BAHASA JEPANG</Text>

      <View style={{
        flex: 1,
        padding: 20,
        justifyContent: 'center'
      }}>

        <ListTombol label="BASIC" onPress={() => navigation.navigate('SoalBasic')} />
        <ListTombol label="N5" onPress={() => navigation.navigate('SoalN5')} />
        <ListTombol label="N4" onPress={() => navigation.navigate('SoalN4')} />
        <ListTombol label="N3" />
        <ListTombol label="N2" />




      </View>

    </SafeAreaView >
  )
}

const styles = StyleSheet.create({})