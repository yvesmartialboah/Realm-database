/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View } from 'react-native';
import {  } from "native-base"
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

export default function TodoListComponent({navigation}) {

    const [inputValue, setInputValue] = React.useState("");

    const addTodo = (title: string) => {}

    return (
        <NativeBaseProvider>
        <IconButton onPress={()=>{navigation.toggleDrawer()}} icon={<Icon size="xs" as={<Feather name="menu" size={24} color="black" />} color="orange" />} />

        <Center flex={1}>
          <Heading textAlign={'center'} color="emerald.400">Todo App with Realm database</Heading>
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
                  setInputValue("");
                }}
    
                mr={1}/>
    
            }
            onChangeText={(v) => setInputValue(v)}
            value={inputValue}
            placeholder="Add Item"
          />
          {/* <VStack>
            {list.map((item, itemI) => (
              <HStack
                w="100%"
                justifyContent="space-between"
                alignItems="center"
                key={item.title + itemI.toString()}
              >
                <Checkbox
                  colorScheme="emerald"
                  isChecked={item.isCompleted}
                  onChange={() => handleStatusChange(itemI)}
                  value={item.title}
                >
                  <Text mx={2} strikeThrough={item.isCompleted}>
                    {item.title}
                  </Text>
                </Checkbox>
                <IconButton
                  colorScheme="emerald"
                  icon={<Icon as={FontAwesome5} name="trash" size={5} />}
                  onPress={() => handleDelete(itemI)}
                />
              </HStack>
            ))}
          </VStack> */}
        </VStack>
        </Center>
       </NativeBaseProvider>
    );
}
