import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View, Image } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView } from "@react-navigation/drawer";
import { createStackNavigator } from '@react-navigation/stack';


import User from "./assets/user.jpg";
import inventarioHome from './screens/inventarioHome';

const Drawer = createDrawerNavigator();
const stack = createStackNavigator();


const CustomDrawerContent = (props) => {
    return (
        <DrawerContentScrollView >
            <View style={styles.profileContainer}>
                <Image source={User} style={styles.profileImage} />
                <Text style={styles.profileName}>Juliana Martinez</Text>
                <Text style={styles.profileRole}>Administrador</Text>
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
};

export default function App() {

    return (
        <NavigationContainer>
            <Drawer.Navigator drawerContent={CustomDrawerContent} screenOptions={{ drawerStyle: { backgroundColor: "#fff", width: 250 }, headerStyle: { backgroundColor: "#28a745", }, headerTintColor: "#fff", headerTitleStyle: { fontWeight: "bold" }, drawerActiveTintColor: "blue", drawerLabelStyle: { color: "#111" } }}>
                <stack.Screen
                    name="Inventario"
                    component={inventarioHome}
                    options={{
                        drawerLabel: "Inventario",
                        title: "Inventario",
                        drawerIcon: ({ color, size }) => (
                            <MaterialIcons name="category" size={size} color={color} />
                        )
                    }}
                />
                <stack.Screen
                    name="Sistema"
                    component={inventarioHome}
                    options={{
                        drawerLabel: "Sistema",
                        title: "Sistema",
                        drawerIcon: ({ color, size }) => (
                            <MaterialIcons name="category" size={size} color={color} />
                        )
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );

}

const styles = StyleSheet.create({
    profileContainer: {
        height: 200,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: "#f4f4f4",
        borderBottomWidth: 1,
    },
    profileImage: {
        height: 130,
        width: 130,
        borderRadius: 65,
    },
    profileName: {
        fontSize: 22,
        marginVertical: 6,
        fontWeight: "bold",
        color: "#111",
    },
    profileRole: {
        fontSize: 16,
        color: "#111",
    },
});
