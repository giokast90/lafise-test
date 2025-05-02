import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@/screens/HomeScreen';
import { Home, CreditCard, RepeatIcon } from 'lucide-react-native';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator id={ undefined }
                       screenOptions={ {
                           headerShown: false,
                           tabBarActiveTintColor: '#018765'
                       } }>
            <Tab.Screen name="Home" component={ HomeScreen } options={ {
                tabBarIcon: ({ color }) => <Home color={ color }/>,
                title: 'Inicio'
            } }/>
            <Tab.Screen name="Operaciones" component={ HomeScreen } options={ {
                tabBarIcon: ({ color }) => <RepeatIcon color={ color }/>,
                title: 'Operaciones'
            } }/>
            <Tab.Screen name="Productos" component={ HomeScreen } options={ {
                tabBarIcon: ({ color }) => <CreditCard color={ color }/>,
                title: 'Productos'
            } }/>
        </Tab.Navigator>
    );
}