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

const ListTombol = ({ onPress, label, level }) => {

  return (
    <TouchableOpacity onPress={onPress} style={{
      backgroundColor: level > 0 ? colors.secondary : colors.black,
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
  const [DATALEVEL, SETDATALEVEL] = useState({});

  const _getTransaction = async () => {

    await getData('user').then(u => {
      setUser(u);
      axios.post(apiURL + 'get_current_level', {
        fid_user: u.id
      }).then(rr => {
        console.log(rr.data);
        SETDATALEVEL(rr.data);
        setOpen(true)
      })

    })

    await axios.post(apiURL + 'company').then(res => {

      setComp(res.data.data);

    });


  }


  useEffect(() => {
    if (isFocus) {
      _getTransaction();
    }
  }, [isFocus]);




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
        <TouchableOpacity onPress={() => {

          if (user.suara == 1) {

            axios.post(apiURL + 'update_suara', {
              id: user.id,
              suara: 0
            }).then(res => {
              setUser(res.data);
              storeData('user', res.data);
            })

          } else {
            axios.post(apiURL + 'update_suara', {
              id: user.id,
              suara: 1
            }).then(res => {
              setUser(res.data);
              storeData('user', res.data);
            })

          }

        }} style={{
          padding: 10,
        }}>
          <Icon type='ionicon' name={user.suara == 1 ? 'volume-high' : 'volume-mute'} size={30} />

        </TouchableOpacity>
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

      {open &&

        <View style={{
          flex: 1,
          padding: 20,
          justifyContent: 'center'
        }}>

          <ListTombol label="BASIC" level={1} onPress={() => navigation.navigate('SoalBasicPilihan')} />
          <ListTombol level={DATALEVEL.BASIC} label="N5" onPress={() => {
            DATALEVEL.BASIC == 0 ? Alert.alert(MYAPP, 'Level BASIC belum selesai !') : navigation.navigate('SoalN5Pilihan')
          }} />
          <ListTombol level={DATALEVEL.N5} label="N4" onPress={() => {
            DATALEVEL.N5 == 0 ? Alert.alert(MYAPP, 'Level N5 belum selesai !') : navigation.navigate('SoalN4Pilihan')
          }} />
          <ListTombol level={0} label="N3" />
          <ListTombol level={0} label="N2" />




        </View>}

    </SafeAreaView >
  )
}

const styles = StyleSheet.create({})