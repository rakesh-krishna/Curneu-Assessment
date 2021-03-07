import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Employee from './Profile';
import EmployeeDetails from './EmployeeDetails';
import { Button } from 'react-native';

export default function App() {
  return (
    <ScrollView>
    <View>
      <Button></Button>
      {/* <EmployeeDetails></EmployeeDetails> */}
      <Employee></Employee>


    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
