import React, { useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Platform, TouchableOpacity, Keyboard } from 'react-native';
import Task from './components/Task'

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task])
    setTask(null);
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }
  return (
    <View style={styles.container}>
      { /*Today's task*/ }
      <View style={styles.textWrapper}>
        <Text style={styles.sectionTitle}>To Do</Text>
      </View>
      <View style={styles.items}>
        {/* This is where the task will go */}
        {
          taskItems.map((item, index) => {
            return(
              <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                <Task text = {item}/>
              </TouchableOpacity>
            )
          })
        }
        {/* <Task text = {'Task 1'}/>
        <Task text = {'Task 2'}/>*/}
      </View>
      { /*Writing a task*/ }
    <KeyboardAvoidingView behavior={Platform.OS === "ios"? "padding" : "height"}
    style={styles.writeTaskWrapper}>
    {/* Task Input box */}
    <TextInput style={styles.input} placeholder={"Write a task"} placeholderTextColor='grey' value={task} onChangeText={text => setTask(text)}></TextInput>
    {/* Add Task button */}
    <TouchableOpacity onPress={ () => handleAddTask() }>
      <View style={styles.addWrapper}>
        <Text style={styles.addText}>+</Text>
      </View>
    </TouchableOpacity>
    </KeyboardAvoidingView>
      <Text style={styles.footer}>Coded By Piyush Kumar Das</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  textWrapper: {
    paddingTop: 50,
    paddingHorizontal: 20,
    color: 'white',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 250,
    borderRadius: 60,
    borderColor: '#c0c0c0',
    borderWidth: 1,
    backgroundColor: 'black',
    color: 'white',
  },
  addWrapper: {
    width: 50,
    height: 50,
    backgroundColor: 'black',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C0C0C0',
    color: 'white',
  },
  addText: {
    color: 'white'
  },
  footer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    margin: 12,
    fontSize: 12,
    textAlign: 'center',
    color: 'white',
  },
});
