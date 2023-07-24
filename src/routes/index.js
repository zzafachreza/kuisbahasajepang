import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Splash,
  Home,
  Login,
  Register,
  Account,
  AccountEdit,
  Pengaturan,
  InfoPdf,
  RumahSakit,
  Janji,
  WebInfo,
  SoalBasic,
  SoalN5,
  SoalN4,
  SoalTask,
  SoalBasicPilihan,
  SoalN5Pilihan,
  SoalN4Pilihan,
  SoalTaskSimpan,
  SoalTaskWaktu,





} from '../pages';
import { colors } from '../utils';
import { Icon } from 'react-native-elements';

const Stack = createStackNavigator();

export default function Router() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />





      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          // headerTitle: 'Detail',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />


      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
          headerTitle: 'Daftar Pengguna',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />





      <Stack.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: false,

        }}
      />
      <Stack.Screen
        name="AccountEdit"
        component={AccountEdit}
        options={{
          headerShown: true,
          headerTitle: 'Edit Profile',
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: '#000',
        }}
      />










      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />



      <Stack.Screen
        name="Pengaturan"
        component={Pengaturan}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="WebInfo"
        component={WebInfo}
        options={{
          headerShown: false,
        }}
      />


      <Stack.Screen
        name="InfoPdf"
        component={InfoPdf}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="RumahSakit"
        component={RumahSakit}
        options={{
          headerShown: false,
          headerTitle: 'Janji Temu',
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: '#000000',
        }}
      />

      <Stack.Screen
        name="Janji"
        component={Janji}
        options={{
          headerShown: false,
          headerTitle: 'Janji Temu',
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: '#000000',
        }}
      />



      <Stack.Screen
        name="SoalBasic"
        component={SoalBasic}
        options={{
          headerShown: false,
        }}
      />


      <Stack.Screen
        name="SoalN5"
        component={SoalN5}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="SoalN4"
        component={SoalN4}
        options={{
          headerShown: false,
        }}
      />




      <Stack.Screen
        name="SoalBasicPilihan"
        component={SoalBasicPilihan}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="SoalN5Pilihan"
        component={SoalN5Pilihan}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="SoalN4Pilihan"
        component={SoalN4Pilihan}
        options={{
          headerShown: false,
        }}
      />


      <Stack.Screen
        name="SoalTask"
        component={SoalTask}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="SoalTaskSimpan"
        component={SoalTaskSimpan}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="SoalTaskWaktu"
        component={SoalTaskWaktu}
        options={{
          headerShown: false,
        }}
      />



    </Stack.Navigator>
  );
}
