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
import SoundPlayer from 'react-native-sound-player'
import ViewShot from "react-native-view-shot";
import Share from 'react-native-share';
import { showMessage } from 'react-native-flash-message';

export default function SoalTaskSimpan({ navigation, route }) {

    const ref = useRef();


    const item = route.params;
    const isFocus = useIsFocused();
    const [data, setData] = useState([]);
    const [user, setUser] = useState({});
    const [open, setOpen] = useState(false);
    const [betul, setBetul] = useState([]);
    const [skor, setSkor] = useState([]);

    const [modal1, setModal1] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [modal3, setModal3] = useState(false);

    const kode = route.params.level + route.params.halaman;

    const [sudah, setSudah] = useState([]);

    const __getTransaction = () => {


        getData('user').then(u => {
            setUser(u);
            axios.post(apiURL + 'soal_tersimpan', {
                level: item.level,
                fid_user: u.id,
                halaman: route.params.halaman,
            }).then(res => {
                console.log('soal tersimpan', res.data);

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
                res.data.map(i => {

                    if (!soalTersimpan.includes(i.id)) {
                        soalTersimpan.push(i.id)
                    }


                })
                console.log(soalTersimpan)
            });

        });

        getData(kode).then(ok => {
            let tmp;
            if (!ok) {
                setSudah([]);
                tmp = [];
            } else {
                setSudah(ok);
                tmp = ok;
            };

            axios.post(apiURL + 'soal', {
                level: item.level,
                halaman: route.params.halaman,
                sudah: tmp
            }).then(res => {


                if (res.data.length > 0) {

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
                                    setSudah([]);
                                    storeData(kode, []);
                                    navigation.goBack();
                                }
                            }
                        ])
                    } else {
                        Alert.alert('Maaf soal belum tersedia !')
                    }

                }

            })
        });

    }
    const [nomor, setNomor] = useState(0);
    const [pilih, setPilih] = useState([]);
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

    const [openjawaban, setOpenJawaban] = useState(false);
    const [soalTersimpan, setSoalTersimpan] = useState([]);


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
            setNilaiIndex('Sasuga senpai, tayorareru hitu desune, Selamat senpai hebat');
        }
        setNILAI(Math.round(nilai, 2));

        const kirim = {
            nilai: Math.round(nilai, 2),
            fid_user: user.id,
            level: route.params.level
        }

        axios.post(apiURL + 'nilai_add', kirim).then(response => {
            console.log(response.data)
        })



    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
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
                                    fontSize: 13,
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
                                    fontSize: 13,
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
                                    fontSize: 13,
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
                                    fontSize: 13,
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
                                fontSize: 13,
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
                            fontSize: 13,
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
                                fontSize: 13,
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
                                // navigation.reset({
                                //     index: 0,
                                //     routes: [{ name: 'Splash' }],
                                // });
                                setModal3(false)

                                // storeData(kode, []);
                            }} style={{
                                backgroundColor: colors.secondary,
                                padding: 10,
                                borderWidth: 3,
                                borderRadius: 10,
                                borderColor: colors.primary
                            }}>
                                <Text style={{
                                    fontSize: 13,
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
                                    fontSize: 13,
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
                height: 50,
                alignItems: 'center'
            }}>
                <Text style={{
                    flex: 1,
                    textAlign: 'center',
                    fontFamily: fonts.secondary[800],
                    fontSize: 25,
                    color: colors.white
                }}>{item.level}</Text>
                <Text style={{
                    flex: 1,
                    textAlign: 'center',
                    fontFamily: fonts.secondary[800],
                    fontSize: 25,
                    color: colors.white
                }}>{(item.awal + 1) + nomor} - {data.length}</Text>





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
                    <Icon type='ionicon' name='arrow-back-circle' color={colors.primary} size={50} />
                </TouchableOpacity>


                {!soalTersimpan.includes(data[nomor].id || pilih[nomor].a || pilih[nomor].b || pilih[nomor].c || pilih[nomor].d || data[nomor].tersimpan > 0) &&
                    <View style={{
                        flex: 1,
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress={() => {
                            const kirim = {
                                level: item.level,
                                fid_user: user.id,
                                fid_soal: data[nomor].id,
                                halaman: data[nomor].halaman
                            }

                            console.log(kirim);
                            axios.post(apiURL + 'save_soal', kirim).then(res => {
                                console.log(res.data);

                                showMessage({
                                    type: 'success',
                                    message: 'Soal berhasil di save !'
                                })
                                setSoalTersimpan(res.data)


                            })
                        }} style={{
                            backgroundColor: colors.white,
                            borderRadius: 25,
                            paddingVertical: 5,
                            paddingHorizontal: 25,
                            flexDirection: 'row',
                            alignItems: 'center'

                        }}><Icon type='ionicon' name='checkmark-circle' color={colors.success} size={30} />
                            <Text style={{
                                left: 5,
                                fontFamily: fonts.secondary[800],
                                fontSize: 15
                            }}>Save</Text>
                        </TouchableOpacity>

                    </View>
                }

                {soalTersimpan.includes(data[nomor].id) &&

                    <View style={{
                        flex: 1,
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress={() => {
                            const kirim = {
                                level: item.level,
                                fid_user: user.id,
                                fid_soal: data[nomor].id,
                                halaman: data[nomor].halaman
                            }

                            console.log(kirim);
                            axios.post(apiURL + 'unsave_soal', kirim).then(res => {
                                console.log(res.data);
                                showMessage({
                                    type: 'success',
                                    message: 'Soal berhasil di unsave !'
                                })
                                setSoalTersimpan(res.data)
                                // let tmpSoal = soalTersimpan.filter(i => i.indexOf(data[nomor].id) > -1);
                                // setSoalTersimpan(tmpSoal)

                            })
                        }} style={{
                            backgroundColor: colors.white,
                            borderRadius: 25,
                            paddingVertical: 5,
                            paddingHorizontal: 25,
                            flexDirection: 'row',
                            alignItems: 'center'

                        }}><Icon type='ionicon' name='trash' color={colors.danger} size={30} />
                            <Text style={{
                                left: 5,
                                fontFamily: fonts.secondary[800],
                                fontSize: 15
                            }}>Unsave</Text>
                        </TouchableOpacity>

                    </View>
                }


                {(pilih[nomor].a || pilih[nomor].b || pilih[nomor].c || pilih[nomor].d) && <TouchableOpacity onPress={() => {
                    setOpenJawaban(false)
                    if (nomor < parseFloat(data.length) - 1) {
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

                }} style={{
                    padding: 2,
                }}>
                    <Icon type='ionicon' name='arrow-forward-circle' color={colors.primary} size={50} />
                </TouchableOpacity>}

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
                    marginVertical: 10,
                    borderRadius: 20,
                }}>
                    <Text style={{
                        fontFamily: fonts.primary.normal,
                        fontSize: 25,
                        color: colors.black
                    }}>{data[nomor].hiragana}</Text>
                    <Text style={{
                        fontFamily: fonts.primary.normal,
                        fontSize: 25,
                        color: colors.black,
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
                            fontSize: 13,
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
                            fontSize: 13,
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
                            fontSize: 13,
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
                            fontSize: 13,
                            color: colors.white
                        }}>{data[nomor].d}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModal3(true)} style={{

                        padding: 20,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: colors.primary,
                        marginTop: 10,
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 13,
                            color: colors.white
                        }}>Nilai</Text>
                    </TouchableOpacity>
                </View>



            </View>}

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})