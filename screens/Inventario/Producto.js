import React, { useState, useEffect } from 'react';
import styles from '../../assets/css/styles';
import Toast from 'react-native-toast-message';

import { Picker } from '@react-native-picker/picker';
import { View, Text, FlatList, Modal, TextInput, TouchableOpacity } from 'react-native';
import { fetchProducto, agregarNuevoProducto, fetchCategorias } from '../../assets/js/Inventario/Producto.js';
import { FontAwesome } from "@expo/vector-icons";


export default function Producto() {

    const [modalVisible, setModalVisible] = useState(false);
    const [codigo, setCodigo] = useState('');
    const [nombre, setNombre] = useState('');
    const [categoriaId, setCategoriaId] = useState('0');
    const [categorias, setCategorias] = useState([]);
    const [estado, setEstado] = useState('');

    const [productos, setProducto] = useState([]);

    const [selectedItem, setSelectedItem] = useState(null);


    useEffect(() => {
        fetchProductoData();
    }, []);

    const fetchProductoData = async () => {
        try {
            const productosData = await fetchProducto();
            setProducto(productosData);
        } catch (error) {
            console.error('Error al obtener las categorías:', error);
        }
    };

    useEffect(() => {
        fetchCategoriasData();
    }, []);

    const fetchCategoriasData = async () => {
        try {
            const categoriasData = await fetchCategorias();
            setCategorias(categoriasData);
        } catch (error) {
            console.error('Error al obtener las categorías:', error);
        }
    };

    const handleGuardar = async () => {
        const nuevoProducto = { Codigo: codigo, Nombre: nombre, Estado: estado };

        try {
            const successMessage = await agregarNuevoProducto(nuevoProducto);
            if (successMessage) {
                Toast.show({
                    type: 'success',
                    text1: 'Producto creado',
                    text2: successMessage,
                });

                fetchProductoData();
                closeModal();
            } else {
                console.error('Error al agregar producto');
            }
        } catch (error) {
            console.error('Error en la solicitud POST:', error);
        }
    };


    const handleItemPress = (item) => {
        if (selectedItem === item) {
            setSelectedItem(null);
        } else {
            setSelectedItem(item);
        }
    };


    const handleBuscarPorId = (item) => {
        // Lógica para buscar información por ID aquí
        // Puedes mostrar un modal o navegar a una nueva pantalla
        alert(`Buscar información por ID para el elemento con ID: ${item.id}`);
    };

    const handleEliminar = (item) => {
        // Lógica para eliminar el elemento aquí
        // Puedes mostrar un modal de confirmación antes de eliminar
        alert(`Eliminar elemento con ID: ${item.id}`);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => handleItemPress(item)}>
            <Text style={styles.cardText}>ID: {item.id}</Text>
            <Text style={styles.cardText}>Codigo: {item.Codigo}</Text>
            <Text style={styles.cardText}>Nombre: {item.Nombre}</Text>
            <Text style={styles.cardText}>Categoria: {item.CategoriaId.Descripcion}</Text>
            <Text style={[styles.cardText, { color: item.Estado === 'Activo' ? 'green' : 'red' }]}>Estado: {item.Estado} </Text>
            {selectedItem === item && ( // Mostrar botones solo si selectedItem coincide con el elemento actual
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.searchButton]} // Aplicar el estilo "searchButton"
                        onPress={() => handleBuscarPorId(item)}
                    >
                        <Text style={styles.buttonText}>Buscar por ID</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.deleteButton]} // Aplicar el estilo "deleteButton"
                        onPress={() => handleEliminar(item)}
                    >
                        <Text style={styles.buttonText}>Eliminar</Text>
                    </TouchableOpacity>
                </View>
            )}
        </TouchableOpacity>
    );

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.addButton} onPress={openModal} >
                <FontAwesome name="plus" style={styles.Icon} />
            </TouchableOpacity>

            <Modal animationType="slide" visible={modalVisible} onRequestClose={closeModal} >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Agregar nueo producto</Text>
                    <View style={styles.modalFieldContainer}>
                        <Text style={styles.modalLabel}>Código<Text style={styles.requiredAsterisk}>*</Text> :</Text>
                    </View>
                    <View style={styles.modalInputContainer}>
                        <TextInput style={styles.modalInput} placeholder="Ingrese el código" onChangeText={text => setCodigo(text)} value={codigo} />
                    </View>
                    <View style={styles.modalFieldContainer}>
                        <Text style={styles.modalLabel}>Nombre<Text style={styles.requiredAsterisk}>*</Text> :</Text>
                    </View>
                    <View style={styles.modalInputContainer}>
                        <TextInput style={styles.modalInput} placeholder="Ingrese la descripción" onChangeText={text => setNombre(text)} value={nombre} />
                    </View>
                    <View style={styles.modalFieldContainer}>
                        <Text style={styles.modalLabel}>Categoria<Text style={styles.requiredAsterisk}>*</Text>:</Text>
                    </View>
                    <View style={styles.pickerContainer}>
                        <Picker selectedValue={categoriaId} style={styles.picker} onValueChange={(itemValue) => { setCategoriaId(itemValue); }} >
                            <Picker.Item label="-- Seleccione Categoria --" value="0" />
                            {categorias.map(categoria => (
                                <Picker.Item key={categoria.id} label={categoria.Descripcion} value={categoria.id} />
                            ))}
                        </Picker>
                    </View>
                    <View style={styles.modalFieldContainer}>
                        <Text style={styles.modalLabel}>Estado<Text style={styles.requiredAsterisk}>*</Text>:</Text>
                    </View>
                    <View style={styles.pickerContainer}>
                        <Picker selectedValue={estado} style={styles.picker} onValueChange={(itemValue) => { if (itemValue !== '0') { setEstado(itemValue); } }} >
                            <Picker.Item label="-- Seleccione Estado --" value="0" />
                            <Picker.Item label="Activo" value="Activo" />
                            <Picker.Item label="Inactivo" value="Inactivo" />
                        </Picker>
                    </View>
                    <View style={styles.modalButtonsContainer}>
                        <TouchableOpacity style={[styles.modalButton, styles.saveButton]} onPress={handleGuardar} >
                            <Text style={styles.modalButtonText}>Guardar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={closeModal} >
                            <Text style={styles.modalButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <FlatList data={productos} keyExtractor={(item) => item.id.toString()} renderItem={renderItem} contentContainerStyle={styles.List}></FlatList>
        </View>
    );
}