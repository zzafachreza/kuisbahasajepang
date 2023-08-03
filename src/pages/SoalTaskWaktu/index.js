import { Alert, StyleSheet, Text, View, Image, FlatList, BackHandler, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback, Linking } from 'react-native'
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
import CountDown from 'react-native-countdown-component';
import SoundPlayer from 'react-native-sound-player'
import ViewShot from "react-native-view-shot";
import Share from 'react-native-share';

export default function SoalTaskWaktu({ navigation, route }) {
    const ref = useRef();
    const item = route.params;
    const isFocus = useIsFocused();
    const [data, setData] = useState([]);
    const [user, setUser] = useState({});
    const [open, setOpen] = useState(false);
    const [betul, setBetul] = useState([]);
    const [skor, setSkor] = useState([]);

    const [openjawaban, setOpenJawaban] = useState(false);
    const [soalTersimpan, setSoalTersimpan] = useState([]);

    const [modal1, setModal1] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [modal3, setModal3] = useState(false);

    const kode = route.params.level + route.params.halaman;

    const [sudah, setSudah] = useState([]);

    const [salah, setSalah] = useState(0);

    const __getTransaction = () => {


        getData('user').then(u => {
            setUser(u);
        });



        axios.post(apiURL + 'soal_waktu', {
            level: item.level,
            halaman: route.params.halaman,
        }).then(res => {
            console.log(res.data);

            if (res.data.length > 0) {
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
            } else {

                if (tmp.length > 0) {
                    Alert.alert('Cepat Bisa GOI日本語 (JLPT, JFT, NAT)', 'Kamu sudah mengerjakan semua soal !', [
                        {
                            text: 'KEMBALI',
                            onPress: () => navigation.goBack()
                        },
                        {
                            text: 'COBA LAGI',
                            onPress: () => {

                                navigation.goBack();
                            }
                        }
                    ])
                } else {
                    Alert.alert('Maaf soal belum tersedia !')
                }

            }

        })


    }
    const [nomor, setNomor] = useState(0);
    const [pilih, setPilih] = useState([]);
    const [waktu, setWaktu] = useState(30)

    const sendWaktuHabis = () => {
        setModal2(true);
        setWaktu(10);
    }


    useEffect(() => {


        const backAction = () => {
            Alert.alert('Kamu yakin akan keluar dari mengerjakan soal ?', '', [
                {
                    text: 'TIDAK',
                    onPress: () => null,
                    style: 'cancel',
                },
                { text: 'KELUAR', onPress: () => navigation.goBack() },
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );



        if (isFocus) {
            __getTransaction();
        }
        return () => backHandler.remove();
    }, [isFocus]);


    const [NILAI, setNILAI] = useState(0);
    const [nilaiIndex, setNilaiIndex] = useState('Semangat lagi ya kak, kak kurang belajar ya.')

    const sendServer = () => {



        let totalNilai = skor.reduce((a, b) => a + b, 0);


        let nilai = (totalNilai / data.length) * 100;

        console.log(nilai);

        if (nilai < 50) {
            setNilaiIndex('Semangat lagi ya kak, kak kurang belajar ya.');
        } else if (nilai >= 50 && nilai < 60) {
            setNilaiIndex('Kakak hayu dikit lagi lulus');
        } else if (nilai >= 60 && nilai < 70) {
            setNilaiIndex('Kamu sudah bekerja keras, usaha mu tak akan sia-sia');
        } else if (nilai >= 70 && nilai < 80) {
            setNilaiIndex('Homeru kotoba shikanai desune, senpai hebat');
        } else if (nilai >= 80) {
            setNilaiIndex('Sasuga senpai, tauorareru hitu desune, Selamat senpai hebat');
        }
        setNILAI(nilai);

        const kirim = {
            nilai: nilai,
            fid_user: user.id,
            level: route.params.level
        }



    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.primary,
            position: 'relative'

        }}>

            {/* modal 1 */}

            {modal1 && <View style={{
                position: 'absolute',
                height: windowHeight,
                width: windowWidth,
                zIndex: 99,
                backgroundColor: '#000000BF',
                justifyContent: 'center',
                alignItems: 'center'
            }}>

                <View style={{
                    backgroundColor: colors.white,
                    width: windowWidth / 1.2,
                    height: windowWidth / 1.2,
                    borderRadius: 20,
                    padding: 10,
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        fontFamily: fonts.primary.normal,
                        fontSize: 50,
                        textAlign: 'center', marginBottom: 20,
                    }}>頑張ろう</Text>
                    <Image source={require('../../assets/logo.png')} style={{
                        alignSelf: 'center',
                        width: 150,
                        height: 150,
                    }} />

                    <View style={{
                        marginTop: 20,
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            flex: 1,
                            paddingRight: 5,
                        }}>
                            <TouchableOpacity onPress={() => {
                                setModal1(false);
                            }} style={{
                                backgroundColor: colors.secondary,
                                padding: 10,
                                borderWidth: 3,
                                borderRadius: 10,
                                borderColor: colors.primary
                            }}>
                                <Text style={{
                                    fontSize: 20,
                                    fontFamily: fonts.secondary[600],
                                    color: colors.white,
                                    textAlign: 'center'
                                }}>LANJUT</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            flex: 1,
                            paddingLeft: 5,
                        }}>
                            <TouchableOpacity onPress={() => {
                                setModal1(false);
                                sendServer();
                                setModal3(true);
                            }} style={{
                                backgroundColor: colors.secondary,
                                padding: 10,
                                borderWidth: 3,
                                borderRadius: 10,
                                borderColor: colors.primary
                            }}>
                                <Text style={{
                                    fontSize: 20,
                                    fontFamily: fonts.secondary[600],
                                    color: colors.white,
                                    textAlign: 'center'
                                }}>SELESAI</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>}


            {/* modal 2 */}

            {modal2 && <View style={{
                position: 'absolute',
                height: windowHeight,
                width: windowWidth,
                zIndex: 99,
                backgroundColor: '#000000BF',
                justifyContent: 'center',
                alignItems: 'center'
            }}>

                <View style={{
                    backgroundColor: colors.white,
                    width: windowWidth / 1.2,
                    height: windowWidth / 1.2,
                    borderRadius: 20,
                    padding: 10,
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        fontFamily: fonts.primary.normal,
                        fontSize: 50,
                        textAlign: 'center', marginBottom: 20,
                    }}>頑張ろう</Text>
                    <Image source={require('../../assets/logo.png')} style={{
                        alignSelf: 'center',
                        width: 150,
                        height: 150,
                    }} />

                    <View style={{
                        marginTop: 20,
                        flexDirection: 'row'
                    }}>

                        {nomor < parseFloat(data.length) - 1 && <View style={{
                            flex: 1,
                            paddingRight: 5,
                        }}>
                            <TouchableOpacity onPress={() => {
                                let pilihan = null

                                if (pilih[nomor].a) {
                                    pilihan = data[nomor].a;
                                } else if (pilih[nomor].b) {
                                    pilihan = data[nomor].b;
                                } else if (pilih[nomor].c) {
                                    pilihan = data[nomor].c;

                                } else if (pilih[nomor].d) {
                                    pilihan = data[nomor].d;
                                }


                                if (user.suara == 1) {
                                    if (pilihan == data[nomor].jawaban) {

                                        SoundPlayer.playSoundFile('success', 'mp3')
                                    } else {

                                        SoundPlayer.playSoundFile('failed', 'mp3')
                                    }
                                }



                                setModal2(false);
                                let tmpSudah = sudah;
                                tmpSudah.push(data[nomor].id);
                                setSudah(tmpSudah);
                                storeData(kode, tmpSudah);
                                setNomor(nomor + 1);


                            }} style={{
                                backgroundColor: colors.secondary,
                                padding: 10,
                                borderWidth: 3,
                                borderRadius: 10,
                                borderColor: colors.primary
                            }}>
                                <Text style={{
                                    fontSize: 20,
                                    fontFamily: fonts.secondary[600],
                                    color: colors.white,
                                    textAlign: 'center'
                                }}>LANJUT </Text>
                            </TouchableOpacity>
                        </View>}


                        <View style={{
                            flex: 1,
                            paddingLeft: 5,
                        }}>
                            <TouchableOpacity onPress={() => {


                                let pilihan = null

                                if (pilih[nomor].a) {
                                    pilihan = data[nomor].a;
                                } else if (pilih[nomor].b) {
                                    pilihan = data[nomor].b;
                                } else if (pilih[nomor].c) {
                                    pilihan = data[nomor].c;

                                } else if (pilih[nomor].d) {
                                    pilihan = data[nomor].d;
                                }


                                if (user.suara == 1) {
                                    if (pilihan == data[nomor].jawaban) {

                                        SoundPlayer.playSoundFile('success', 'mp3')
                                    } else {

                                        SoundPlayer.playSoundFile('failed', 'mp3')
                                    }
                                }

                                setModal2(false);
                                sendServer();
                                setModal3(true);
                                let tmpSudah = sudah;
                                tmpSudah.push(data[nomor].id);
                                setSudah(tmpSudah);
                                storeData(kode, tmpSudah);
                            }} style={{
                                backgroundColor: colors.secondary,
                                padding: 10,
                                borderWidth: 3,
                                borderRadius: 10,
                                borderColor: colors.primary
                            }}>
                                <Text style={{
                                    fontSize: 20,
                                    fontFamily: fonts.secondary[600],
                                    color: colors.white,
                                    textAlign: 'center'
                                }}>SELESAI</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>}

            {/* modal 2 */}

            {modal3 && <View style={{
                position: 'absolute',
                height: windowHeight,
                width: windowWidth,
                zIndex: 99,
                backgroundColor: '#000000BF',
                justifyContent: 'center',
                alignItems: 'center'
            }}>

                <View style={{
                    backgroundColor: colors.white,
                    width: windowWidth / 1.2,
                    height: windowHeight / 1.5,
                    borderRadius: 20,
                    padding: 10,
                    justifyContent: 'center'
                }}>
                    <ViewShot style={{
                        backgroundColor: colors.white,
                        padding: 10,
                    }} ref={ref} options={{ fileName: "BASIC", format: "jpg", quality: 0.9 }}>
                        <View style={{
                            backgroundColor: colors.secondary,
                            padding: 10,
                            borderWidth: 3,
                            borderRadius: 10,
                            borderColor: colors.primary,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                color: colors.white,
                                fontSize: 20,
                            }}>Nilai</Text>
                            <Text style={{
                                fontFamily: fonts.secondary[800],
                                color: colors.white,
                                fontSize: 35,
                            }}>{NILAI}</Text>
                        </View>

                        <Text style={{
                            textAlign: 'center',
                            marginVertical: 20,
                            fontFamily: fonts.secondary[800],
                            color: colors.black,
                            fontSize: 20,
                        }}>{nilaiIndex}</Text>

                        <Image source={require('../../assets/logo.png')} style={{
                            alignSelf: 'center',
                            width: 150,
                            height: 150,
                        }} />
                    </ViewShot>


                    <View style={{

                    }}>
                        <TouchableOpacity onPress={() => {
                            ref.current.capture().then(uri => {
                                Share.open({
                                    url: uri
                                }).then((res) => {
                                    console.log(res);
                                })
                                    .catch((err) => {
                                        err && console.log(err);
                                    });
                            });
                        }} style={{
                            backgroundColor: colors.secondary,
                            padding: 10,
                            borderWidth: 3,
                            borderRadius: 10,
                            borderColor: colors.primary
                        }}>
                            <Text style={{
                                fontSize: 20,
                                fontFamily: fonts.secondary[600],
                                color: colors.white,
                                textAlign: 'center'
                            }}>SHARE</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        marginTop: 20,
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            flex: 1,
                            paddingRight: 5,
                        }}>
                            <TouchableOpacity onPress={() => {
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Splash' }],
                                });
                                storeData(kode, []);
                            }} style={{
                                backgroundColor: colors.secondary,
                                padding: 10,
                                borderWidth: 3,
                                borderRadius: 10,
                                borderColor: colors.primary
                            }}>
                                <Text style={{
                                    fontSize: 20,
                                    fontFamily: fonts.secondary[600],
                                    color: colors.white,
                                    textAlign: 'center'
                                }}>COBA LAGI</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            flex: 1,
                            paddingLeft: 5,
                        }}>
                            <TouchableOpacity onPress={() => {
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Splash' }],
                                });
                            }} style={{
                                backgroundColor: colors.secondary,
                                padding: 10,
                                borderWidth: 3,
                                borderRadius: 10,
                                borderColor: colors.primary
                            }}>
                                <Text style={{
                                    fontSize: 20,
                                    fontFamily: fonts.secondary[600],
                                    color: colors.white,
                                    textAlign: 'center'
                                }}>HOME</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>}

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
                }}>{1 + nomor} - {data.length}</Text>





            </View>



            {open && <View style={{
                marginTop: 10,

                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 20,

            }}>
                <TouchableOpacity onPress={() => setModal1(true)} style={{
                    padding: 2,
                }}>
                    <Icon type='ionicon' name='arrow-back-circle' color={colors.white} size={50} />
                </TouchableOpacity>





                {(pilih[nomor].a || pilih[nomor].b || pilih[nomor].c || pilih[nomor].d) && <TouchableOpacity onPress={() => setModal2(true)} style={{
                    padding: 2,
                }}>
                    <Icon type='ionicon' name='arrow-forward-circle' color={colors.white} size={50} />
                </TouchableOpacity>}
                <View style={{
                    flex: 1,
                }} />

                <View>
                    <CountDown
                        id={data[nomor].id.toString()}
                        until={waktu}
                        onFinish={sendWaktuHabis}
                        onPress={() => alert('hello')}
                        timeToShow={['M', 'S']}
                        digitStyle={{ backgroundColor: colors.white }}
                        timeLabels={{ m: null, s: null }}
                        showSeparator
                        size={20}
                    />

                    <CountDown
                        id={'last' + data[nomor].id.toString()}
                        until={waktu - 5}
                        onFinish={() => {
                            if (user.suara == 1) {
                                SoundPlayer.playSoundFile('timer', 'mp3')
                            }
                        }}
                        onPress={() => alert('hello')}
                        timeToShow={['M', 'S']}
                        digitStyle={{ backgroundColor: colors.white }}
                        timeLabels={{ m: null, s: null }}
                        showSeparator
                        size={0}
                    />

                </View>



            </View>}


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
                            setOpenJawaban(true);
                            if (!pilih[nomor].a) {

                                pilih[nomor] = { b: false, c: false, d: false, a: true };
                                setPilih([...pilih])

                                if (data[nomor].jawaban == data[nomor].a && !betul[nomor]) {
                                    betul[nomor] = true;
                                    setBetul([...betul])
                                    SoundPlayer.playSoundFile('success', 'mp3')
                                    skor[nomor] = 1;
                                } else if (data[nomor].jawaban != data[nomor].a && !betul[nomor]) {
                                    betul[nomor] = true;
                                    setBetul([...betul])
                                    setSalah(salah + 1)
                                    SoundPlayer.playSoundFile('failed', 'mp3')
                                    skor[nomor] = 0;
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

                            setTimeout(() => {
                                if (nomor < parseFloat(data.length) - 1 && salah < 5) {
                                    let tmpSudah = sudah;
                                    tmpSudah.push(data[nomor].id);
                                    setSudah(tmpSudah);
                                    storeData(kode, tmpSudah);
                                    setNomor(nomor + 1);
                                } else {
                                    sendServer();
                                    setModal3(true);
                                    let tmpSudah = sudah;
                                    tmpSudah.push(data[nomor].id);
                                    setSudah(tmpSudah);
                                    storeData(kode, tmpSudah);
                                }


                            }, 1000)

                        }}
                        style={{
                            flexDirection: 'row',
                            marginVertical: 5,
                            position: 'relative',
                            backgroundColor: pilih[nomor].a && data[nomor].jawaban !== data[nomor].a ? colors.danger : colors.secondary,
                            padding: 20,
                            borderRadius: 10,
                            borderWidth: openjawaban && data[nomor].jawaban == data[nomor].a ? 5 : 0,
                            borderColor: openjawaban && data[nomor].jawaban == data[nomor].a ? colors.success : colors.white,
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
                            setOpenJawaban(true);
                            if (!pilih[nomor].b) {
                                pilih[nomor] = { a: false, c: false, d: false, b: true };
                                setPilih([...pilih])
                                if (data[nomor].jawaban == data[nomor].b && !betul[nomor]) {
                                    betul[nomor] = true;
                                    setBetul([...betul])
                                    SoundPlayer.playSoundFile('success', 'mp3')
                                    skor[nomor] = 1;
                                } else if (data[nomor].jawaban != data[nomor].b && !betul[nomor]) {
                                    betul[nomor] = true;
                                    setBetul([...betul])
                                    setSalah(salah + 1)
                                    SoundPlayer.playSoundFile('failed', 'mp3')
                                    skor[nomor] = 0;
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

                            setTimeout(() => {
                                if (nomor < parseFloat(data.length) - 1 && salah < 5) {
                                    let tmpSudah = sudah;
                                    tmpSudah.push(data[nomor].id);
                                    setSudah(tmpSudah);
                                    storeData(kode, tmpSudah);
                                    setNomor(nomor + 1);
                                } else {
                                    sendServer();
                                    setModal3(true);
                                    let tmpSudah = sudah;
                                    tmpSudah.push(data[nomor].id);
                                    setSudah(tmpSudah);
                                    storeData(kode, tmpSudah);
                                }
                            }, 1000)

                        }}

                        style={{
                            flexDirection: 'row',
                            marginVertical: 5,
                            position: 'relative',
                            backgroundColor: pilih[nomor].b && data[nomor].jawaban !== data[nomor].b ? colors.danger : colors.secondary,
                            borderWidth: openjawaban && data[nomor].jawaban == data[nomor].b ? 5 : 0,
                            borderColor: openjawaban && data[nomor].jawaban == data[nomor].b ? colors.success : colors.white,
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
                            setOpenJawaban(true);
                            if (!pilih[nomor].c) {
                                pilih[nomor] = { b: false, a: false, d: false, c: true };
                                setPilih([...pilih])
                                if (data[nomor].jawaban == data[nomor].c && !betul[nomor]) {
                                    betul[nomor] = true;
                                    setBetul([...betul])
                                    SoundPlayer.playSoundFile('success', 'mp3')
                                    skor[nomor] = 1;
                                } else if (data[nomor].jawaban != data[nomor].c && !betul[nomor]) {
                                    betul[nomor] = true;
                                    setBetul([...betul])
                                    setSalah(salah + 1)
                                    SoundPlayer.playSoundFile('failed', 'mp3')
                                    skor[nomor] = 0;
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
                            setTimeout(() => {
                                if (nomor < parseFloat(data.length) - 1 && salah < 5) {
                                    let tmpSudah = sudah;
                                    tmpSudah.push(data[nomor].id);
                                    setSudah(tmpSudah);
                                    storeData(kode, tmpSudah);
                                    setNomor(nomor + 1);
                                } else {
                                    sendServer();
                                    setModal3(true);
                                    let tmpSudah = sudah;
                                    tmpSudah.push(data[nomor].id);
                                    setSudah(tmpSudah);
                                    storeData(kode, tmpSudah);
                                }
                            }, 1000)

                        }}

                        style={{
                            flexDirection: 'row',
                            marginVertical: 5,
                            position: 'relative',
                            backgroundColor: pilih[nomor].c && data[nomor].jawaban !== data[nomor].c ? colors.danger : colors.secondary,
                            borderWidth: openjawaban && data[nomor].jawaban == data[nomor].c ? 5 : 0,
                            borderColor: openjawaban && data[nomor].jawaban == data[nomor].c ? colors.success : colors.white,
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
                            setOpenJawaban(true);
                            if (!pilih[nomor].d) {
                                pilih[nomor] = { b: false, c: false, a: false, d: true };
                                setPilih([...pilih])
                                if (data[nomor].jawaban == data[nomor].d && !betul[nomor]) {
                                    betul[nomor] = true;
                                    setBetul([...betul])
                                    SoundPlayer.playSoundFile('success', 'mp3')
                                    skor[nomor] = 1;
                                } else if (data[nomor].jawaban != data[nomor].d && !betul[nomor]) {
                                    betul[nomor] = true;
                                    setBetul([...betul])
                                    setSalah(salah + 1)
                                    SoundPlayer.playSoundFile('failed', 'mp3')
                                    skor[nomor] = 0;
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

                            setTimeout(() => {
                                if (nomor < parseFloat(data.length) - 1 && salah < 5) {
                                    let tmpSudah = sudah;
                                    tmpSudah.push(data[nomor].id);
                                    setSudah(tmpSudah);
                                    storeData(kode, tmpSudah);
                                    setNomor(nomor + 1);
                                } else {
                                    sendServer();
                                    setModal3(true);
                                    let tmpSudah = sudah;
                                    tmpSudah.push(data[nomor].id);
                                    setSudah(tmpSudah);
                                    storeData(kode, tmpSudah);
                                }
                            }, 1000)

                        }}

                        style={{
                            flexDirection: 'row',
                            marginVertical: 5,
                            position: 'relative',
                            backgroundColor: pilih[nomor].d && data[nomor].jawaban !== data[nomor].d ? colors.danger : colors.secondary,
                            borderWidth: openjawaban && data[nomor].jawaban == data[nomor].d ? 5 : 0,
                            borderColor: openjawaban && data[nomor].jawaban == data[nomor].d ? colors.success : colors.white,
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


                    <TouchableOpacity onPress={sendServer} style={{

                        padding: 20,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: colors.primary,
                        marginTop: 20,
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 20,
                            color: colors.white
                        }}>Nilai</Text>
                    </TouchableOpacity>
                </View>



            </View>}

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})