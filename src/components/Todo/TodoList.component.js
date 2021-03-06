/* eslint-disable comma-dangle */
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
import {insertNewTodoList, updateTodoList, deleteAllTodoList, deleteTodoList, queryAllTodoList} from '../../database/db';
import realm from '../../database/db';

export default function TodoListComponent({navigation, route}) {
    // console.log(new Date().toLocaleDateString(), 'date')
    const [todoLists, setTodoLists] = useState([]);
    // const [todoLists, setTodoLists] = useState([
    //     {
    //         id: new Date().getTime(),
    //         name: 'xlm',
    //         creationDate: '15-07-2021',
    //         todos: [
    //             {
    //                 id: 152,
    //                 name: 'manoush',
    //                 done: true,
    //             }
    //         ], // []
    //     },
    //     {
    //         id: new Date().getTime() + 2,
    //         name: 'Lorem',
    //         creationDate: '15-07-2021',
    //         todos: [
    //             {
    //                 id: 152,
    //                 name: 'manoush',
    //                 done: true,
    //             }
    //         ], // []
    //     }
    // ]);
    // console.log(todoLists,`todoListsXS`);
    // console.log('route.params.refresh', route.params.refresh)

   

    const [inputValue, setInputValue] = useState("");
    const [refresh, setRefresh] = useState(false);

    const addTodo = () => {
        const newTodoList = {
                id: Math.floor(Date.now() / 1000),
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
        insertNewTodoList(newTodoList).then().catch((error) => {
            alert(`Insert new todoList error ${error}`);
        });
    }

    const reloadData = () => {
        queryAllTodoList().then((todoList) => {
            setTodoLists(todoList);
            // console.log(todoList,`totodoListd ss`);
        }).catch((error) => {
            console.log(error,`error`);
            setTodoLists({ todoLists: [] });
        });
    }

    const deletedOneData = (id) => {
        console.log(id,`id simple`);
      deleteTodoList(id).then((res) => {
          reloadData()
            console.log(res,`id res`);
        }).catch((error) => {
            console.log(error,`error`);
        });
    }

    const deletedAllData = () => {
      deleteAllTodoList().then((res) => {
        reloadData()
      }).catch((error) => {
          console.log(error,`error`);
      });
  }

    const Item = ({ name, creationDate }) => (
        <View>
          <Text>{name} - {creationDate}</Text>
        </View>
      );

        const renderItem = ({ item }) => (
          <Item name={item.name} creationDate={item.creationDate} />
        );
          

    useEffect(()=>{
        reloadData();
    },[refresh])

    return (
        <NativeBaseProvider>
        <IconButton onPress={()=>{navigation.toggleDrawer()}} icon={<Icon size="xs" as={<Feather name="menu" size={24} color="black" />} color="orange" />} />

        <Center flex={1}>
          <Heading textAlign={'center'} color="emerald.400">Todo App with Realm database</Heading>

          <TouchableOpacity 
            onPress={()=>{
              deletedAllData()
            }}
          >
            <Text>supprimer Tout </Text>
          </TouchableOpacity>
        <VStack space={4} flex={1} w="90%" mt={4}>

          <Input
            variant="filled"
            
            InputRightElement={
              <IconButton
                icon={<Icon as={FontAwesome5} name="plus" size={4} />}
               colorScheme="emerald"
                ml={1}
                onPress={() => {
                  addTodo(inputValue);
                  setRefresh(!refresh)
                  setInputValue("");
                }}
    
                mr={1}/>
    
            }
            onChangeText={(v) => setInputValue(v)}
            value={inputValue}
            placeholder="Add Item"
          />
           {/* <FlatList
                data={todoLists}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            /> */}

            <VStack>
            {todoLists != null &&  (
                  todoLists.map((item, id) => (
                    <HStack
                        w="100%"
                        justifyContent="space-between"
                        alignItems="center"
                        key={item.name + id.toString()}
                    >
                        <Checkbox
                        colorScheme="emerald"
                        isChecked={false}
                        //   onChange={() => handleStatusChange(itemI)}
                        // value={item.name}
                        >
                        <Text mx={2} strikeThrough={false}>
                          {/* detail :  {item.id}  */}
                           {item.name} - {item.creationDate}
                        </Text>
                        </Checkbox>
                        <IconButton
                        colorScheme="emerald"
                        icon={<Icon as={FontAwesome5} name="trash" size={5} />}
                          onPress={() => deletedOneData(item.id)}
                        />
                        <IconButton
                        colorScheme="emerald"
                        icon={<Icon as={FontAwesome5} name="edit" size={5} />}
                          onPress={() => navigation.navigate('TodoEdit',{
                            id: item.id,
                            name: item.name
                          })}
                        />
                    </HStack>
                    ))
            )}
          
            </VStack>

        </VStack>
        </Center>
       </NativeBaseProvider>
    );
}
