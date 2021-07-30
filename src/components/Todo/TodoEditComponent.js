/* eslint-disable jsx-quotes */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, View } from 'react-native';
import { Stack, Center, Heading, IconButton, Icon, Button, NativeBaseProvider } from "native-base"
import Feather from 'react-native-vector-icons/Feather';

export default function TodoEditComponent ({navigation}) {
    return (
        <NativeBaseProvider>
            <IconButton onPress={()=>{navigation.toggleDrawer()}} icon={<Icon size="xs" as={<Feather name="menu" size={24} color="black" />} color="orange" />} />
            <Text>TodoEditComponent</Text>
        </NativeBaseProvider>
    )
}
