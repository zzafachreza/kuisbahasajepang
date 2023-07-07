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


export default function SoalTask({ navigation, route }) {

    const item = route.params;
    const isFocus = useIsFocused();
    const [data, setData] = useState([]);
    const [user, setUser] = useState({});
    const [open, setOpen] = useState(false);
    const [betul, setBetul] = useState([]);
    const [skor, setSkor] = useState([]);

    const __getTransaction = () => {
        getData('user').then(u => {
            setUser(u);
        });

        axios.post(apiURL + 'soal', {
            level: item.level,
            awal: item.awal,
            akhir: item.akhir
        }).then(res => {
            console.log(res.data);
            res.data.map(i => {
                skor.push(0);
                betul.push(false);
                pilih.push(
                    {
                        a: false,
                        b: false,
                        c: false,
                        d: false
                    }
                )
            })
            setData(res.data);
            setTimeout(() => {
                setOpen(true)
            }, 500);
        })

    }
    const [nomor, setNomor] = useState(0);
    const [pilih, setPilih] = useState([]);
    useEffect(() => {
        if (isFocus) {
            __getTransaction();
        }
    }, [isFocus]);

    const sendServer = () => {

        let totalNilai = skor.reduce((a, b) => a + b, 0);


        let nilai = (totalNilai / data.length) * 100;

        console.log(nilai)



    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.primary,

        }}>
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
                }}>{item.level}</Text>
                <Text style={{
                    flex: 1,
                    textAlign: 'center',
                    fontFamily: fonts.secondary[800],
                    fontSize: 30,
                    color: colors.white
                }}>{item.awal} - {item.akhir}</Text>



            </View>

            {!open && <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator size="large" color={colors.secondary} />
            </View>}

            {open && <View style={{
                flex: 1,
                backgroundColor: colors.white,
                margin: 20,
                borderRadius: 20,
            }}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                    backgroundColor: colors.secondary,
                    margin: 20,
                    borderRadius: 20,
                }}>
                    <Text style={{
                        fontFamily: fonts.primary.normal,
                        fontSize: 40,
                        color: colors.white
                    }}>{data[nomor].hiragana}</Text>
                    <Text style={{
                        fontFamily: fonts.primary.normal,
                        fontSize: 60,
                        color: colors.white,
                        marginTop: 10,
                    }}>{data[nomor].kanji}</Text>
                </View>

                <View style={{
                    flex: 1,
                    padding: 20,
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            if (!pilih[nomor].a) {
                                pilih[nomor] = { b: false, c: false, d: false, a: true };
                                setPilih([...pilih])

                                if (data[nomor].jawaban == data[nomor].a && !betul[nomor]) {
                                    betul[nomor] = true;
                                    setBetul([...betul])
                                    skor[nomor] = 1;
                                } else if (data[nomor].jawaban == data[nomor].a && betul[nomor]) {
                                    betul[nomor] = false;
                                    setBetul([...betul])
                                    skor[nomor] = skor[nomor] - 1;
                                } else if (data[nomor].jawaban !== data[nomor].a && betul[nomor]) {
                                    betul[nomor] = false;
                                    setBetul([...betul])
                                    skor[nomor] = skor[nomor] - 1;
                                }
                            } else {
                                pilih[nomor] = { ...pilih[nomor], a: false };
                                setPilih([...pilih])
                                if (data[nomor].jawaban == data[nomor].a && betul[nomor]) {
                                    betul[nomor] = false;
                                    setBetul([...betul])
                                    skor[nomor] = skor[0] - 1;
                                }

                            }

                        }}
                        style={{
                            flexDirection: 'row',
                            marginVertical: 5,
                            position: 'relative',
                            backgroundColor: pilih[nomor].a ? colors.primary : colors.secondary,
                            padding: 20,
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 20,
                            color: colors.white
                        }}>{data[nomor].a}</Text>

                    </TouchableOpacity>

                    <TouchableOpacity

                        onPress={() => {
                            if (!pilih[nomor].b) {
                                pilih[nomor] = { a: false, c: false, d: false, b: true };
                                setPilih([...pilih])
                                if (data[nomor].jawaban == data[nomor].b && !betul[nomor]) {
                                    betul[nomor] = true;
                                    setBetul([...betul])

                                    skor[nomor] = 1;
                                } else if (data[nomor].jawaban == data[nomor].b && betul[nomor]) {
                                    betul[nomor] = false;
                                    setBetul([...betul])
                                    skor[nomor] = skor[nomor] - 1;
                                } else if (data[nomor].jawaban !== data[nomor].b && betul[nomor]) {
                                    betul[nomor] = false;
                                    setBetul([...betul])
                                    skor[nomor] = skor[nomor] - 1;
                                }
                            } else {
                                pilih[nomor] = { ...pilih[nomor], b: false };
                                setPilih([...pilih])
                                if (data[nomor].jawaban == data[nomor].b && betul[nomor]) {
                                    betul[nomor] = false;
                                    setBetul([...betul])
                                    skor[nomor] = skor[0] - 1;
                                }

                            }

                        }}

                        style={{
                            flexDirection: 'row',
                            marginVertical: 5,
                            position: 'relative',
                            backgroundColor: pilih[nomor].b ? colors.primary : colors.secondary,
                            padding: 20,
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 20,
                            color: colors.white
                        }}>{data[nomor].b}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity

                        onPress={() => {

                            if (!pilih[nomor].c) {
                                pilih[nomor] = { b: false, a: false, d: false, c: true };
                                setPilih([...pilih])
                                if (data[nomor].jawaban == data[nomor].c && !betul[nomor]) {
                                    betul[nomor] = true;
                                    setBetul([...betul])
                                    skor[nomor] = 1;
                                } else if (data[nomor].jawaban == data[nomor].c && betul[nomor]) {
                                    betul[nomor] = false;
                                    setBetul([...betul])
                                    skor[nomor] = skor[nomor] - 1;
                                } else if (data[nomor].jawaban !== data[nomor].c && betul[nomor]) {
                                    betul[nomor] = false;
                                    setBetul([...betul])
                                    skor[nomor] = skor[nomor] - 1;
                                }
                            } else {
                                pilih[nomor] = { ...pilih[nomor], c: false };
                                setPilih([...pilih])
                                if (data[nomor].jawaban == data[nomor].c && betul[nomor]) {
                                    betul[nomor] = false;
                                    setBetul([...betul])
                                    skor[nomor] = skor[0] - 1;
                                }

                            }

                        }}

                        style={{
                            flexDirection: 'row',
                            marginVertical: 5,
                            position: 'relative',
                            backgroundColor: pilih[nomor].c ? colors.primary : colors.secondary,
                            padding: 20,
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 20,
                            color: colors.white
                        }}>{data[nomor].c}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity

                        onPress={() => {

                            if (!pilih[nomor].d) {
                                pilih[nomor] = { b: false, c: false, a: false, d: true };
                                setPilih([...pilih])
                                if (data[nomor].jawaban == data[nomor].d && !betul[nomor]) {
                                    betul[nomor] = true;
                                    setBetul([...betul])
                                    skor[nomor] = 1;
                                } else if (data[nomor].jawaban == data[nomor].d && betul[nomor]) {
                                    betul[nomor] = false;
                                    setBetul([...betul])
                                    skor[nomor] = skor[nomor] - 1;
                                } else if (data[nomor].jawaban !== data[nomor].d && betul[nomor]) {
                                    betul[nomor] = false;
                                    setBetul([...betul])
                                    skor[nomor] = skor[nomor] - 1;
                                }
                            } else {
                                pilih[nomor] = { ...pilih[nomor], d: false };
                                setPilih([...pilih])
                                if (data[nomor].jawaban == data[nomor].d && betul[nomor]) {
                                    betul[nomor] = false;
                                    setBetul([...betul])
                                    skor[nomor] = skor[0] - 1;
                                }

                            }

                        }}

                        style={{
                            flexDirection: 'row',
                            marginVertical: 5,
                            position: 'relative',
                            backgroundColor: pilih[nomor].d ? colors.primary : colors.secondary,
                            padding: 20,
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 20,
                            color: colors.white
                        }}>{data[nomor].d}</Text>
                    </TouchableOpacity>
                </View>
            </View>}

            <View style={{
                flexDirection: 'row',
                height: 40,
            }}>
                <View style={{
                    flex: 1,
                }}>
                    {nomor > 0 && <TouchableOpacity onPress={() => {
                        // data.length
                        setNomor(nomor - 1);
                    }} style={{
                        padding: 5,
                        height: 40,
                        backgroundColor: colors.secondary,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Icon type='ionicon' name='arrow-back' color={colors.white} />
                        <Text style={{
                            left: 10,
                            fontFamily: 'Poppins-SemiBold',
                            color: colors.white,
                            fontSize: 12
                        }}>Sebelumnya</Text>
                    </TouchableOpacity>}
                </View>

                <View style={{
                    flex: 1,
                }}>
                    <TouchableOpacity onPress={sendServer} style={{
                        padding: 5,
                        height: 40,
                        backgroundColor: colors.tertiary,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            fontFamily: 'Poppins-SemiBold',
                            color: colors.white,
                            fontSize: 12
                        }}>Nilai</Text>
                    </TouchableOpacity>
                </View>

                <View style={{
                    flex: 1,
                    height: 40,
                }}>
                    {nomor < (data.length - 1) &&
                        <TouchableOpacity onPress={() => {
                            // data.length
                            setNomor(nomor + 1);
                        }} style={{
                            padding: 5,
                            height: 40,

                            backgroundColor: colors.secondary,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>

                            <Text style={{

                                fontFamily: 'Poppins-SemiBold',
                                color: colors.white,
                                fontSize: 12,
                                right: 10
                            }}>Berikutnya</Text>

                            <Icon type='ionicon' name='arrow-forward' color={colors.white} />

                        </TouchableOpacity>}

                    {nomor == (data.length - 1) &&
                        <TouchableOpacity onPress={sendServer} style={{
                            padding: 5,
                            height: 40,
                            flexDirection: 'row',
                            backgroundColor: colors.success,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>

                            <Text style={{


                                fontFamily: 'Poppins-SemiBold',
                                color: colors.white,
                                fontSize: 12
                            }}>Selesai</Text>

                        </TouchableOpacity>}
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})