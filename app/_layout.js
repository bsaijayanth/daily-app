import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
    return (

        <Tabs
        // screenOptions={{
        //     headerShown: false,
        //     tabBarActiveTintColor: "#e91e63",
        //     tabBarStyle: {
        //     position: "absolute",
        //     bottom: 0,
        //     left: 0,
        //     right: 0,
        //     elevation: 0,
        //     backgroundColor: "#fff",
        //     borderTopWidth: 0,
        //     height: 60,
        //     },
        // }}
        screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
    
              switch (route.name) {
                case 'dashboard':
                  iconName = 'home';
                  break;
                case 'routines':
                  iconName = 'list';
                  break;
                case 'workout':
                  iconName = 'barbell';
                  break;
                case 'stats':
                  iconName = 'stats-chart';
                  break;
                case 'create':
                  iconName = 'add-circle';
                  break;
              }
    
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#4B9CD3',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
          })}
        >
        <Tabs.Screen name="workout" options={{ title: 'Workouts' }} />
        <Tabs.Screen name="routines" options={{ title: 'Backlog' }} />
        <Tabs.Screen name="dashboard" options={{ title: 'Dashboard' }} />
        <Tabs.Screen name="create" options={{ title: 'Create' }} />
        <Tabs.Screen name="stats" options={{ title: 'Stats' }} />
        <Tabs.Screen name="index" options={{ href: null }} /> {/* 👈 Hide redirect tab */}
      </Tabs>
    );
    }