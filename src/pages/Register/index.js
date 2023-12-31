import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    Button,
    View,
    Image,
    ScrollView,
    ImageBackground,
    Dimensions,
    Switch,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { MyInput, MyGap, MyButton, MyPicker } from '../../components';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import { apiURL, api_token, MYAPP } from '../../utils/localStorage';
import DatePicker from 'react-native-datepicker'
import moment from 'moment';
import { Icon } from 'react-native-elements';

export default function Register({ navigation }) {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [loading, setLoading] = useState(false);
    const [valid, setValid] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const [cek, setCek] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const validate = text => {
        // console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            // console.log('nama_lengkap is Not Correct');
            setData({ ...data, nama_lengkap: text });
            setValid(false);
            return false;
        } else {
            setData({ ...data, nama_lengkap: text });
            setValid(true);
            // console.log('nama_lengkap is Correct');
        }
    };

    const [sama, setSama] = useState(true)

    const [data, setData] = useState({
        api_token: api_token,
        username: '',
        password: '',
        repassword: '',
        telepon: '',
        nama_lengkap: '',
        alamat: '',
    });

    const simpan = () => {
        if (!cek) {
            showMessage({
                message: 'Kamu belum ceklis syarat dan ketentuan !',
            });
        }
        else if (
            data.nama_lengkap.length === 0 &&
            data.username.length === 0 &&
            data.telepon.length === 0 &&
            data.password.length === 0

        ) {
            showMessage({
                message: 'Formulir pendaftaran tidak boleh kosong !',
            });
        } else if (data.nama_lengkap.length === 0) {
            showMessage({
                message: 'Masukan nama kamu',
            });
        }

        else if (data.telepon.length === 0) {
            showMessage({
                message: 'Masukan nomor telepon',
            });
        } else if (data.username.length === 0) {
            showMessage({
                message: 'Masukan username',
            });
        } else if (data.password.length === 0) {
            showMessage({
                message: 'Masukan kata sandi kamu',
            });
        } else {

            console.log(data);

            setLoading(true);
            axios
                .post(apiURL + 'register', data)
                .then(res => {
                    console.warn(res.data);
                    setLoading(false);
                    if (res.data.status == 404) {
                        showMessage({
                            type: 'danger',
                            message: res.data.message
                        })
                    } else {
                        Alert.alert(MYAPP, res.data.message);
                        navigation.goBack();
                    }


                });
        }
    };

    const [desa, setDesa] = useState([]);



    return (
        <ImageBackground
            style={{
                flex: 1,
                backgroundColor: colors.white,
                padding: 10,
                position: 'relative'
            }}>

            {/* <Switch onValueChange={toggleSwitch} value={isEnabled} /> */}
            <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontSize: windowWidth / 12,
                        fontFamily: fonts.primary[800],
                        color: colors.black,

                    }}>Daftar Pengguna</Text>
                </View>


                <MyInput
                    placeholder="Masukan username"
                    label="Username"
                    iconname="at"
                    value={data.username}
                    onChangeText={value =>
                        setData({
                            ...data,
                            username: value,
                        })
                    }
                />
                <MyGap jarak={10} />
                <MyInput
                    placeholder="Masukan nama lengkap"
                    label="Nama Lengkap"
                    iconname="person"
                    value={data.nama_lengkap}
                    onChangeText={value =>
                        setData({
                            ...data,
                            nama_lengkap: value,
                        })
                    }
                />


                <MyGap jarak={10} />
                <MyInput
                    placeholder="Masukan telepon / Email"
                    label="Telepon / Email"
                    iconname="call"
                    value={data.telepon}
                    onChangeText={value =>
                        setData({
                            ...data,
                            telepon: value,
                        })
                    }
                />

                <MyGap jarak={10} />
                <MyInput
                    placeholder="Masukan kota tinggal"
                    label="Kota Tinggal"
                    iconname="location"
                    value={data.alamat}
                    onChangeText={value =>
                        setData({
                            ...data,
                            alamat: value,
                        })
                    }
                />






                <MyGap jarak={10} />
                <MyInput
                    placeholder="Masukan buat sandi"
                    label="Buat Sandi"
                    iconname="lock-closed"
                    secureTextEntry
                    value={data.password}
                    onChangeText={value =>
                        setData({
                            ...data,
                            password: value,
                        })
                    }
                />
                <MyGap jarak={10} />
                <MyInput
                    borderColor={sama ? colors.border : colors.danger}
                    borderWidth={sama ? 0 : 1}
                    placeholder="Masukan ulang kata sandi"
                    label="Tulis Ulang Kata Sandi"
                    iconname="lock-closed"
                    secureTextEntry
                    value={data.repassword}
                    onChangeText={value => {

                        if (value !== data.password) {
                            setSama(false)
                        } else {
                            setSama(true)
                        }

                        setData({
                            ...data,
                            repassword: value,
                        })
                    }

                    }
                />
                <MyGap jarak={20} />


                <View style={{
                    flexDirection: 'row',
                    padding: 10,
                    marginVertical: 5,
                    alignItems: 'center'
                }}>
                    <TouchableOpacity onPress={() => {
                        cek ? setCek(false) : setCek(true);
                    }} style={{

                    }}>
                        <View style={{
                            marginRight: 5,

                        }}>
                            <Icon type='ionicon' name={cek ? 'checkbox' : 'checkbox-outline'} color={colors.black} size={windowWidth / 20} />
                        </View>
                    </TouchableOpacity>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('InfoPdf', {
                            id: 1
                        })}>
                            <Text style={{
                                fontFamily: fonts.secondary[400],
                                fontSize: windowWidth / 35
                            }}>Saya telah membaca dan setuju dengan

                                <Text style={{
                                    fontFamily: fonts.secondary[400],
                                    fontSize: windowWidth / 35,
                                    color: colors.primary,
                                }}> Syarat & Ketentuan</Text>

                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('InfoPdf', {
                            id: 2
                        })}>
                            <Text style={{
                                fontFamily: fonts.secondary[400],
                                fontSize: windowWidth / 35
                            }}>Dan

                                <Text style={{
                                    fontFamily: fonts.secondary[400],
                                    fontSize: windowWidth / 35,
                                    color: colors.primary,
                                }}> Kebijakan Privasi</Text>

                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>



                {!loading &&
                    <>
                        <MyButton

                            warna={colors.primary}
                            title="Buat Akun"
                            Icons="log-in"
                            onPress={simpan}
                        />
                        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{
                            padding: 10,
                            marginTop: 10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}><Text style={{
                            fontSize: windowWidth / 28,
                            fontFamily: fonts.primary[400],
                            textAlign: 'center',
                            color: colors.primary
                        }}>Sudah punya akun ? <Text style={{
                            fontSize: windowWidth / 28,
                            fontFamily: fonts.primary[600],
                            textAlign: 'center',
                            color: colors.primary
                        }}>Masuk sekarang</Text></Text></TouchableOpacity>
                    </>
                }

                <MyGap jarak={10} />
                {loading && <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator color={colors.primary} size="large" />
                </View>}
            </ScrollView>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        padding: 10,
    },
    image: {
        width: 620 / 4,
        height: 160 / 4,
    },
});
