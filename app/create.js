import React, { useState } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { saveTask, addToTodayRoutine } from '../lib/storage';
import uuid from 'react-native-uuid';

export default function CreateTaskScreen() {
  const [title, setTitle] = useState('');
  const [taskType, setTaskType] = useState('routine'); // routine | misc
  const [addToToday, setAddToToday] = useState(true);

  const handleCreate = async () => {
    if (!title.trim()) {
      Alert.alert('Task title is required!');
      return;
    }

    const task = {
      id: uuid.v4(),
      title: title.trim(),
      type: taskType,
      createdAt: new Date().toISOString(),
    };

    try {
      await saveTask(task);
      if (addToToday) {
        await addToTodayRoutine(task.id);
      }
      setTitle('');
      Alert.alert('Task added!');
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  const toggleType = (type) => {
    setTaskType(type);
  };

  return (
    <View style={styles.container}>
      {/* Toggles for Routine vs Misc */}
      <View style={styles.typeToggles}>
        <ToggleButton
          label="Routine"
          selected={taskType === 'routine'}
          onPress={() => toggleType('routine')}
        />
        <ToggleButton
          label="Misc"
          selected={taskType === 'misc'}
          onPress={() => toggleType('misc')}
        />
      </View>

      {/* Add to Today's List toggle */}
      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Add to Today's List</Text>
        <Switch
          value={addToToday}
          onValueChange={setAddToToday}
        />
      </View>

      {/* Title input in middle */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Task title..."
          value={title}
          onChangeText={setTitle}
        />
        <TouchableOpacity onPress={handleCreate} style={styles.createButton}>
          <Text style={styles.createText}>Create Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ToggleButton({ label, selected, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.toggleButton, selected && styles.toggleSelected]}
      onPress={onPress}
    >
      <Text style={[styles.toggleText, selected && styles.toggleTextSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  typeToggles: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  toggleSelected: {
    backgroundColor: '#333',
  },
  toggleText: {
    fontSize: 16,
    color: '#666',
  },
  toggleTextSelected: {
    color: '#fff',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    paddingHorizontal: 10,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  inputContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    width: '100%',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  createText: {
    color: '#fff',
    fontSize: 16,
  },
});
