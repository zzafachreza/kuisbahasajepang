import React, { useEffect, useState } from 'react';
import { StyleSheet, Platform, Text, View, Image, ScrollView, ActivityIndicator, TouchableOpacity, BackHandler, Alert, Linking, TouchableWithoutFeedback } from 'react-native';
import { fonts, windowWidth, colors, windowHeight } from '../../utils';
import { MyInput, MyGap, MyButton } from '../../components';
import axios from 'axios';
import { apiURL, api_token, MYAPP, storeData } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';
import { Icon } from 'react-native-elements';


export default function Login({ navigation }) {

  const [cek, setCek] = useState(false);

  const [kirim, setKirim] = useState({
    api_token: api_token,
    username: null,
    password: null
  });
  const [loading, setLoading] = useState(false);

  const [comp, setComp] = useState({});






  const masuk = () => {

    if (!cek) {
      Alert.alert(MYAPP, 'Silahkan Centang Syarat & Ketentuan Dan Kebijakan Privasi !');
    }
    else if (kirim.username == null && kirim.password == null) {
      Alert.alert(MYAPP, 'Username dan Password tidak boleh kosong !');
    } else if (kirim.username == null) {
      Alert.alert(MYAPP, 'Username tidak boleh kosong !');
    } else if (kirim.password == null) {
      Alert.alert(MYAPP, 'Password tidak boleh kosong !');
    } else {


      setLoading(true);
      console.log(kirim);

      axios
        .post(apiURL + 'login', kirim)
        .then(res => {
          setLoading(false);
          console.log(res.data);
          if (res.data.status == 404) {
            showMessage({
              type: 'danger',
              message: res.data.message
            })
          } else {
            storeData('user', res.data.data);
            navigation.replace('Home')
          }

        });



    }




  }

  useEffect(() => {


    axios.post(apiURL + 'company').then(res => {
      console.log('cek', res.data.data.website)
      setComp(res.data.data);
    })

  }, [])

  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: colors.white, position: 'relative' }}>

        <View style={{
          backgroundColor: colors.white,
          justifyContent: 'center',
          alignItems: 'center'
        }}>

          <Text style={{
            fontFamily: fonts.secondary[800],
            color: colors.secondary,
            fontSize: 40,
            marginTop: 10,
          }}>MR. Y</Text>
          <Image
            source={require('../../assets/logo.png')}
            style={
              {
                marginVertical: 10,
                width: windowWidth / 2.5,
                height: windowWidth / 2.5,
                resizeMode: 'contain'
              }
            }
          />
          <Text style={{
            fontFamily: fonts.normal,
            fontSize: 20,
          }}>Cepat Bisa GOI日本語 (JLPT, JFT, NAT)</Text>




        </View>



        <View style={{ padding: 20, flex: 1, backgroundColor: colors.white }}>
          <MyInput textColor={colors.primary} colorIcon={colors.primary} label="Username" onChangeText={val => setKirim({
            ...kirim,
            username: val
          })}
            iconname="at" placeholder="Masukan username" />
          <MyGap jarak={20} />
          <MyInput textColor={colors.primary} colorIcon={colors.primary}
            onChangeText={val => setKirim({
              ...kirim,
              password: val
            })}
            secureTextEntry={true}
            label="Password"
            iconname="lock-closed"
            placeholder="Masukan kata sandi"
          />
          <MyGap jarak={20} />
          <View style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <TouchableOpacity onPress={() => setCek(!cek)} style={{
              paddingRight: 12,
            }}>
              <Icon type='ionicon' size={25} name={cek ? 'checkbox' : 'checkbox-outline'} />
            </TouchableOpacity>
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: 12,
              maxWidth: '80%'
            }}>
              Saya telah membaca dan setuju dengan <TouchableWithoutFeedback onPress={() => navigation.navigate('InfoPdf', {
                id: 1
              })}><Text style={{
                color: colors.primary
              }}>Syarat & Ketentuan</Text></TouchableWithoutFeedback> Dan <TouchableWithoutFeedback onPress={() => navigation.navigate('InfoPdf', {
                id: 2
              })}><Text style={{
                color: colors.primary
              }}>Kebijakan Privasi</Text></TouchableWithoutFeedback>
            </Text>
          </View>
          <MyGap jarak={20} />
          {!loading &&


            <>
              <MyButton
                onPress={masuk}
                title="Log in"
                warna={colors.primary}
                Icons="log-in-outline"
              />
              <MyGap jarak={10} />
              <MyButton
                onPress={() => {
                  if (!cek) {
                    Alert.alert(MYAPP, 'Silahkan Centang Syarat & Ketentuan Dan Kebijakan Privasi !');
                  } else {
                    Linking.openURL(comp.website)
                  }

                }}
                title="Dapatkan Akun Login"
                warna={colors.secondary}
                Icons="log-in-outline"
              />
              <MyGap jarak={10} />
              <MyButton
                onPress={() => {
                  // setLoading(true);
                  console.log(kirim);

                  axios
                    .post(apiURL + 'login', {
                      api_token: api_token,
                      username: 'demo',
                      password: '123'
                    })
                    .then(res => {
                      setLoading(false);
                      console.log(res.data);
                      if (res.data.status == 404) {
                        showMessage({
                          type: 'danger',
                          message: res.data.message
                        })
                      } else {
                        storeData('user', res.data.data);
                        navigation.replace('Home')
                      }

                    });

                }}
                title="Coba Aplikasi"
                warna={colors.tertiary}
                Icons="log-in-outline"
              />
            </>



          }

        </View>
        {loading && <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>}
      </ScrollView>

      {/* <TouchableOpacity activeOpacity={1} onPress={() => {

        navigation.navigate('Register')
      }} style={{
        padding: 10,   
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center'
      }}><Text style={{
        fontSize: windowWidth / 28,
        marginTop: 10,
        fontFamily: fonts.primary[400],
        textAlign: 'center',
        color: colors.primary
      }}>TIdak punya akun ? daftar disini</Text></TouchableOpacity> */}
    </>
  );
}

const styles = StyleSheet.create({});
