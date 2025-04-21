// localStorage helpers
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTodayKey } from './utils';
import dayjs from 'dayjs';

const TASKS_KEY = 'allTasks';

  export const saveTask = async (task) => {
    const all = await getAllTasks();
  
    // prevent duplicate routine task titles
    if (
      task.type === 'routine' &&
      all.some(t => t.title.toLowerCase() === task.title.toLowerCase())
    ) {
      throw new Error('Routine task with same name exists');
    }
  
    // misc tasks can be duplicated
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify([...all, task]));
  };

  export const addToTodayRoutine = async (taskId) => {
    const todayKey = `TODAY-${getTodayKey()}`; // Updated line
    const json = await AsyncStorage.getItem(todayKey);
    const current = json ? JSON.parse(json) : [];
  
    if (!current.includes(taskId)) {
      await AsyncStorage.setItem(todayKey, JSON.stringify([...current, taskId]));
    }
  };

  export const getTodayTasks = async () => {
    const todayKey = dayjs().format('YYYY-MM-DD');
    const data = await AsyncStorage.getItem(`TODAY-${todayKey}`);
    return data ? JSON.parse(data) : [];
  };

  export const getAllTasks = async () => {
    const json = await AsyncStorage.getItem(TASKS_KEY);
    return json ? JSON.parse(json) : [];
  };