import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { colors, fonts, windowWidth } from '../../utils'
import axios from 'axios'
import { MYAPP, apiURL, getData, storeData } from '../../utils/localStorage'
import { useIsFocused } from '@react-navigation/native'
import { Alert } from 'react-native'


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
                fontSize: 16,
                color: colors.white
            }}>{label}</Text>
        </TouchableOpacity>
    )
}



export default function SoalBasicPilihan({ navigation, route }) {

    const THELEVEL = 'BASIC';
    const __getSoalTersimpan = () => {
        getData('user').then(u => {
            axios.post(apiURL + 'get_jumlah_soal_simpan', {
                level: THELEVEL,
                fid_user: u.id
            }).then(res => {
                console.log(res.data);
                SETSOALTERSIMPAN(res.data);
            })
        })
    }


    const JUMLAH_SOAL = 200;
    const JUMLAH_LEVEL = JUMLAH_SOAL / 50;

    const [user, setUser] = useState({});

    const [open, setOpen] = useState(false);

    const [rank, setRank] = useState([]);
    const __getRangking = () => {

        axios.post(apiURL + 'ranking', {
            level: THELEVEL,
        }).then(res => {
            console.log(res.data);
            setRank(res.data);
            setOpen(true)

        })

    }

    const setCharAt = (str, index, chr) => {
        if (index > str.length - 1) return str;
        return str.substring(0, index) + chr + str.substring(index + 1);
    }
    const [jumlah, setJumlah] = useState(0);
    const [SOALTERSIMPAN, SETSOALTERSIMPAN] = useState(0)
    const __getJumlahSoal = () => {
        console.log('cek')
        axios.post(apiURL + 'get_jumlah_soal', {
            level: THELEVEL
        }).then(res => {
            console.log(res.data);
            setJumlah(res.data)
        })
    }

    const isFocus = useIsFocused();
    useEffect(() => {

        if (isFocus) {
            __getSoalTersimpan();
            __getRangking();
            __getJumlahSoal();
            getData('user').then(uu => {
                setUser(uu);
            })
        }


    }, [isFocus]);

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
            }}>
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
                <Text style={{
                    flex: 1,
                    textAlign: 'center',
                    fontFamily: fonts.secondary[800],
                    fontSize: 20,
                }}>BASIC</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{
                    padding: 10,
                }}>
                    <Icon type='ionicon' size={30} name='home' />
                </TouchableOpacity>
            </View>
            <View>
                <Text style={{
                    textAlign: 'center',
                    fontFamily: fonts.secondary[800],
                    fontSize: 20,
                }}>TINGKAT DASAR</Text>
                <Text style={{
                    textAlign: 'center',
                    fontFamily: fonts.secondary[800],
                    fontSize: 20,
                }}>MR. Y</Text>
            </View>

            <View style={{
                flex: 1,
                justifyContent: 'center',
                padding: 20
            }}>
                <ListTombol label="MULAI SOAL DAN SIMPAN" onPress={() => navigation.navigate('SoalBasic')} />
                <ListTombol label="MULAI SOAL CEPAT" onPress={() => navigation.navigate('SoalTaskWaktu', {
                    level: 'BASIC',
                    halaman: 0
                })} />

                <View style={{
                    flexDirection: 'row'
                }}>
                    <View style={{
                        flex: 1,
                        paddingRight: 5,
                    }}>

                        <ListTombol label="TERSIMPAN" onPress={() => {
                            if (SOALTERSIMPAN == 0) {
                                Alert.alert(MYAPP, 'Soal tersimpan belum ada !')
                            } else {
                                navigation.navigate('SoalTaskSimpan', {
                                    level: THELEVEL,
                                    awal: 0,
                                    akhir: jumlah,
                                    halaman: 0
                                })
                            }
                        }} />
                    </View>
                    <View style={{
                        flex: 1,
                        paddingLeft: 5,
                    }}>
                        <ListTombol label={SOALTERSIMPAN} />
                    </View>
                </View>

                {open && rank.length > 2 &&
                    <View style={{
                        flexDirection: 'row',
                        padding: 10,
                        borderWidth: 3,
                        borderRadius: 10,
                        borderColor: colors.primary,
                        backgroundColor: colors.secondary
                    }}>
                        <View style={{
                            flex: 1,
                            justifyContent: 'flex-end',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                color: colors.white,
                                fontFamily: fonts.secondary[600],
                                marginBottom: 5,
                                fontSize: 25,
                            }}>2</Text>
                            <View style={{
                                height: 100,
                                backgroundColor: colors.white,
                                width: windowWidth / 4, justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    fontSize: 15,
                                    color: colors.secondary,
                                    textAlign: 'center'
                                }}>{rank[1].nama_lengkap.replace(rank[1].nama_lengkap.substring(2, rank[1].nama_lengkap.length - 2), '***')}</Text>
                                <Text style={{
                                    fontFamily: fonts.secondary[800],
                                    fontSize: 15
                                }}>{rank[1].nilai}</Text></View>
                        </View>
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                color: colors.white,
                                fontFamily: fonts.secondary[600],
                                marginBottom: 5,
                                fontSize: 25,
                            }}>1</Text>
                            <View style={{
                                height: 130,
                                backgroundColor: colors.white,
                                width: windowWidth / 4,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    fontSize: 15,
                                    color: colors.secondary,
                                    textAlign: 'center'
                                }}>{rank[0].nama_lengkap.replace(rank[0].nama_lengkap.substring(2, rank[0].nama_lengkap.length - 2), '***')}</Text>
                                <Text style={{
                                    fontFamily: fonts.secondary[800],
                                    fontSize: 15
                                }}>{rank[0].nilai}</Text>

                            </View>
                        </View>
                        <View style={{
                            flex: 1,
                            justifyContent: 'flex-end',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                color: colors.white,
                                fontFamily: fonts.secondary[600],
                                marginBottom: 5,
                                fontSize: 25,
                            }}>3</Text>
                            <View style={{
                                height: 80,
                                backgroundColor: colors.white,
                                width: windowWidth / 4,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    fontSize: 15,
                                    color: colors.secondary,
                                    textAlign: 'center'
                                }}>{rank[2].nama_lengkap.replace(rank[2].nama_lengkap.substring(2, rank[2].nama_lengkap.length - 2), '***')}</Text>
                                <Text style={{
                                    fontFamily: fonts.secondary[800],
                                    fontSize: 15
                                }}>{rank[2].nilai}</Text>
                            </View>
                        </View>
                    </View>
                }
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})