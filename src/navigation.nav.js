/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import TodoAddComponent from './components/Todo/TodoAdd.component';
import TodoListComponent from './components/Todo/TodoList.component';
// import SidebarComponent from './components/_Shared/Sidebar/index';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationApp = ({props}) => (
    <NavigationContainer>
        <Drawer.Navigator initialRouteName="TodoList"
            // drawerContent={props => <SidebarComponent {...props} />}
        >
            <Drawer.Screen options={{ swipeEnabled: false }} name="TodoAdd" component={TodoAddComponent} />
            <Drawer.Screen options={{ swipeEnabled: false }}  name="TodoList" component={TodoListComponent} 
                // options={{headerLeft: () => null}}
            />
        </Drawer.Navigator>
    </NavigationContainer>
);

export default NavigationApp;


/* 
<Stack.Navigator
  screenOptions={{
    headerShown: false
  }}
>
  <Stack.Screen name="route-name" component={ScreenComponent} />
</Stack.Navigator>
*/