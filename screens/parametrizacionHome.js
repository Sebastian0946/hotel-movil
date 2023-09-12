import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import tipoHabitacion from './Parametrizacion/tipoHabitacion';
import configuracionSistema from './Parametrizacion/configuracionSistema';

const Tab = createBottomTabNavigator();

export default function parametrizacionHome() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Tipo habitación"
                component={tipoHabitacion}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="bedroom-parent" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Configuración sistema"
                component={configuracionSistema}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="app-settings-alt" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}