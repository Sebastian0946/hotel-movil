import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import Categoria from './Inventario/Categoria';
import Producto from './Inventario/Producto';
import InventarioDetalle from './Inventario/InventarioDetalle';

const Tab = createBottomTabNavigator();

export default function InventarioHome() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Categoría"
                component={Categoria}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="category" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Producto"
                component={Producto}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="shopping-cart" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Inventario Detalle"
                component={InventarioDetalle}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="inventory" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
