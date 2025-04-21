import { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getAllTasks, getTodayTasks } from '../lib/storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import dayjs from 'dayjs';

const DashboardScreen = () => {
    const [todayTasks, setTodayTasks] = useState([]);

    useEffect(() => {
        const checkStorage = async () => {
            console.log('in checkStorage');
          const keys = await AsyncStorage.getAllKeys();
          console.log('in checkStorage after getAllKeys');
          console.log('Keys:', keys);
          const result = await AsyncStorage.multiGet(keys);
          console.log('AsyncStorage Contents:', result);
        };
      
        checkStorage();
        console.log('Checking AsyncStorage contents...');
      }, []);

      useFocusEffect(
        useCallback(() => {
          const loadData = async () => {
            const allTasks = await getAllTasks();
            const todayIds = await getTodayTasks();
            const tasksForToday = allTasks.filter(task => todayIds.includes(task.id));
            setTodayTasks(tasksForToday);
          };
    
          loadData();
        }, [])
      );

      const renderItem = ({ item }) => (
        <View style={styles.taskCard}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.typeLabel}>
            {item.type === 'routine' ? '🔁 Routine' : '📌 Misc'}
          </Text>
        </View>
      );

 return (
    <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
      <Text style={styles.heading}>Today - {dayjs().format('DD MMM YYYY')}</Text>
      <FlatList
        data={todayTasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>No tasks yet. Create some!</Text>}
      />
    </View>
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
    },
    heading: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 12,
    },
    taskCard: {
      padding: 16,
      backgroundColor: '#f2f2f2',
      borderRadius: 10,
      marginBottom: 10,
    },
    title: {
      fontSize: 18,
      fontWeight: '500',
    },
    typeLabel: {
      marginTop: 4,
      color: '#888',
    },
    emptyText: {
      textAlign: 'center',
      marginTop: 40,
      color: '#aaa',
      fontSize: 16,
    },
  });

export default DashboardScreen;