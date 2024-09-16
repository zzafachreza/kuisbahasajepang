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
import { MyButton } from '../../components';

const ListTombol = ({ onPress, label, selesai = '', jumlah_soal = 50, akhir }) => {

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
                fontFamily: fonts.secondary[800],
                fontSize: 25,
                color: colors.white
            }}>{label}</Text>
            <Text style={{
                fontFamily: fonts.secondary[400],
                fontSize: 20,
                color: colors.white
            }}>{selesai.toString()}/{akhir}</Text>
        </TouchableOpacity>
    )
}


export default function SoalN3({ navigation, route }) {

    const JUMLAH_SOAL = 100;
    const JUMLAH_LEVEL = JUMLAH_SOAL / 50;
    const LEVEL = [];
    const THELEVEL = 'N3';
    const SUDAH = [];

    const [SELESAI, SETSELESAI] = useState([]);


    getData(THELEVEL + 0).then(r => {
        let vv = 0;
        if (!r) {
            vv = 0;
        } else {
            vv = r.length;
        }
        SUDAH.push(parseInt(vv));
    })

    for (let i = 1; i <= JUMLAH_LEVEL; i++) {
        LEVEL.push(i);
        let awal = i * 50;
        let akhir = (JUMLAH_SOAL / (JUMLAH_LEVEL)) + (50 * i);

        getData(THELEVEL + i).then(r => {
            let vv = 0;
            if (!r) {
                vv = 0;
            } else {
                vv = r.length;
            }
            SUDAH.push(parseInt(vv));
        })

    }


    const isFocus = useIsFocused();
    const [open, setOpen] = useState(false);

    const [jumlah, setJumlah] = useState(0);


    useEffect(() => {
        if (isFocus) {
            __getJumlahSoal();

            setTimeout(() => {
                SETSELESAI(SUDAH)
                console.log('sudah', SUDAH);
                setOpen(true)
            }, 1000)
        }
    }, [isFocus]);


    const __getJumlahSoal = () => {
        console.log('cek')
        axios.post(apiURL + 'get_jumlah_soal', {
            level: THELEVEL
        }).then(res => {
            console.log(res.data);
            setJumlah(res.data)
        })
    }


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            {open && <>

                <View style={{
                    flexDirection: 'row',
                    backgroundColor: colors.secondary,
                    padding: 5,
                    height: 80,
                    alignItems: 'center'
                }}>
                    <Text style={{
                        flex: 1,
                        textAlign: 'center',
                        fontFamily: fonts.secondary[800],
                        fontSize: 30,
                        color: colors.white
                    }}>{THELEVEL}</Text>



                </View>

                <ScrollView>
                    <View style={{
                        flex: 1,
                        padding: 20,
                        justifyContent: 'center'
                    }}>

                        <ListTombol label="MULAI SEMUA SOAL" selesai={SELESAI.reduce((partialSum, a) => partialSum + a, 0)} jumlah_soal={jumlah} akhir={jumlah} onPress={() => {

                            navigation.navigate('SoalTask', {
                                level: THELEVEL,
                                awal: 0,
                                akhir: jumlah,
                                halaman: 0
                            })

                        }} />

                        {LEVEL.map((i, index) => {

                            let awal = index * 50;
                            let akhir = (JUMLAH_SOAL / (JUMLAH_LEVEL)) + (0 * index);
                            return (
                                <ListTombol label={i} jumlah_soal={jumlah} selesai={SELESAI[i]} akhir={akhir} onPress={() => {
                                    // console.log(i)
                                    navigation.navigate('SoalTask', {
                                        level: THELEVEL,
                                        awal: awal,
                                        akhir: akhir,
                                        halaman: i
                                    })

                                }} />
                            )
                        })}
                    </View>
                </ScrollView>

            </>}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})