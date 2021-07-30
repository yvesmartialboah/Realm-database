/* eslint-disable jsx-quotes */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import {
    Stack, 
    Input,
    Button,
    IconButton,
    Checkbox,
    Text,
    VStack,
    HStack,
    Heading,
    Icon,
    Center,
    NativeBaseProvider
  } from "native-base";
  import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {insertNewTodoList, updateTodoList, deleteAllTodoList, deleteTodoList, queryAllTodoList} from '../../database/db';
import realm from '../../database/db';

export default function TodoEditComponent ({navigation, route}) {
    const [refresh, setRefresh] = useState(false);
    const [inputValue, setInputValue] = useState(route.params.name);

    const EditTodo = () => {
    const id_pass = route.params.id;
        const todo = {
                id: id_pass,
                name: inputValue,
                creationDate: new Date().toLocaleDateString(),
                todos: [
                    {
                        id: Math.floor(Date.now() / 1200),
                        name: "manoush",
                        done: true,
                    }
                ]
            };
        updateTodoList(todo).then().catch((error) => {
            alert(`Insert new todoList error ${error}`);
        });
        navigation.navigate('TodoList',{
            refresh: 'refresh'
        })
    }

    useEffect(() => {
        // console.log('r')
        setInputValue(route.params.name)
    }, [route.params.name]);


    return (
        <NativeBaseProvider>
            <IconButton onPress={()=>{navigation.toggleDrawer()}} icon={<Icon size="xs" as={<Feather name="menu" size={24} color="black" />} color="orange" />} />
            <Center flex={1}>
          <Heading textAlign={'center'} color="emerald.400"> Edit Todo App </Heading>

        <VStack space={4} flex={1} w="90%" mt={4}>

          <Input
            variant="filled"
            
            InputRightElement={
              <IconButton
                icon={<MaterialIcons name="update" size={24} color="black" />}
               colorScheme="emerald"
                ml={1}
                onPress={() => {
                    EditTodo(inputValue);
                  setRefresh(!refresh)
                  setInputValue("");
                }}
    
                mr={1}/>
    
            }
            onChangeText={(v) => setInputValue(v)}
            value={inputValue}
            placeholder="Add Item"
          />
        </VStack>
        </Center>
        </NativeBaseProvider>
    )
}
