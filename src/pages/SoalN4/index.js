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

const ListTombol = ({ onPress, label, selesai }) => {

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
            }}>{selesai}/50</Text>
        </TouchableOpacity>
    )
}


export default function SoalN4({ navigation, route }) {

    const JUMLAH_SOAL = 1250;
    const JUMLAH_LEVEL = JUMLAH_SOAL / 50;
    const LEVEL = [];
    for (let i = 0; i < JUMLAH_LEVEL; i++) {
        LEVEL.push(i);
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
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
                }}>N4</Text>



            </View>

            <ScrollView>
                <View style={{
                    flex: 1,
                    padding: 20,
                    justifyContent: 'center'
                }}>
                    {LEVEL.map(i => {

                        let awal = i * 50;
                        let akhir = (JUMLAH_SOAL / (JUMLAH_LEVEL)) + (50 * i);
                        return (
                            <ListTombol label={i + 1} selesai={0} onPress={() => navigation.navigate('SoalTask', {
                                level: 'BASIC',
                                awal: awal,
                                akhir: akhir
                            })} />
                        )
                    })}
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})