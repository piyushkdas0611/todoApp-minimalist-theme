import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Platform, TouchableOpacity, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';

import Task from './components/Task';

export default function App() {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);
  const [sound, setSound] = useState();

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks();
  }, [taskItems]);

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync( require('./assets/notification.wav')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks !== null) {
        setTaskItems(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(taskItems));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const handleAddTask = () => {
    Keyboard.dismiss();
    if (task.trim() !== '') {
      setTaskItems([...taskItems, task]);
      setTask('');
    }
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
    playSound();
  };

  return (
    <View style={styles.container}>
      {/* Today's tasks */}
      <View style={styles.textWrapper}>
        <Text style={styles.sectionTitle}>To Do</Text>
      </View>
      <View style={styles.items}>
        {/* Task list */}
        {taskItems.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => completeTask(index)}>
            <Task text={item} />
          </TouchableOpacity>
        ))}
      </View>
      {/* Task input */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.writeTaskWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Write a task"
          placeholderTextColor="grey"
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      {/* Footer */}
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
    color: 'white',
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
    color: 'white',
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
