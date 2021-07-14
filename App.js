/* eslint-disable eol-last */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import {stylesApp} from './App.style';
import TodoAddComponent from './src/components/Todo/TodoAdd.component';
import store from './src/redux/store';
import NavigationApp from './src/navigation.nav';

export default function  App () {
  return (
    <Provider store={store}>
      <NavigationApp />
    </Provider>
  )
}