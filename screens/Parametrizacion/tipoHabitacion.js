import React, { useState, useEffect } from 'react';
import styles from '../../assets/css/styles';

import { Picker } from '@react-native-picker/picker';
import { View, Text, FlatList, Modal, TextInput, TouchableOpacity, Alert } from 'react-native';
import { fetchTipoHabitacion, agregarNuevoTipoHabitacion, fetchTipoHabitacionId, actualizarTipoHabitacion, fetchEliminarTipoHabitacion } from '../../assets/js/Parametrizacion/tipoHabitacionService';
import { FontAwesome } from "@expo/vector-icons";

export default function tipoHabitacion() {
  
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState(0);
  const [codigo, setCodigo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [estado, setEstado] = useState('');
  const [tipoHabitacion, setTipoHabitacion] = useState([]);

  const [selectedItem, setSelectedItem] = useState(null);

  const [showIdInput, setShowIdInput] = useState(false);
  
  useEffect(() => {
    fetchTipoHabitacionData();
  }, []);
  
  const fetchTipoHabitacionData = async () => {
    try {
        const tipoHabitacionData = await fetchTipoHabitacion();
        tipoHabitacionData.sort((a, b) => a.id - b.id);
        setTipoHabitacion(tipoHabitacionData);
    } catch (error) {
        console.error('Error al obtener el tipo e habitación:', error);
    }
  };

  const handleGuardar = async () => {

    const numericId = id === '' ? 0 : parseFloat(id);

    const nuevoTipoHabitacion = { Codigo: codigo, Descripcion: descripcion, Cantidad: cantidad, Estado: estado };

    try {

        let successMessage = '';

        if (numericId !== 0) {
            successMessage = await actualizarTipoHabitacion(numericId, nuevoTipoHabitacion);
        } else {
            successMessage = await agregarNuevoTipoHabitacion(nuevoTipoHabitacion);
        }

        if (successMessage) {
            const message = numericId !== 0 ? 'Tipo de habitación actualizada' : 'Tipo de habitación creada';
            Alert.alert(message, successMessage.message, [{ text: 'OK', onPress: () => closeModal() }]);
            fetchTipoHabitacionData();
            closeModal();
            limpiarInputs();
        } else {
            console.error(`Error al ${numericId !== 0 ? 'actualizar' : 'agregar'} tipo de habitación`);
        }
    } catch (error) {
        console.error(`Error en la solicitud ${numericId !== 0 ? 'PUT' : 'POST'}:`, error);
    }
  };

  const handleItemPress = (item) => {
    if (selectedItem === item) {
        setSelectedItem(null);
    } else {
        setSelectedItem(item);
    }
  };

  const handleBuscarPorId = async (item) => {
    try {
        const fetchedTipoHabitacionData = await fetchTipoHabitacionId(item.id);
        setId(fetchedTipoHabitacionData.id);
        setCodigo(fetchedTipoHabitacionData.Codigo);
        setDescripcion(fetchedTipoHabitacionData.Descripcion);
        setCantidad(fetchedTipoHabitacionData.Cantidad);
        setEstado(fetchedTipoHabitacionData.Estado);
        setShowIdInput(false);
        setModalVisible(true);
    } catch (error) {
        console.error('Error al buscar el tipo de habitación por ID:', error);
    }
  };

  const handleEditarTipoHabitacion = (tipoHabitacion) => {
    setCodigo(tipoHabitacion.Codigo);
    setDescripcion(tipoHabitacion.Descripcion);
    setCantidad(tipoHabitacion.Cantidad);
    setEstado(tipoHabitacion.Estado);
    setId(tipoHabitacion.id); // Configura id con el valor de la categoría existente
    setEditandoTipoHabitacion(true); // Establece editandoTipoHabitacion en verdadero
    setModalVisible(true); // Abre la modal
  };

  const handleEliminar = (item) => {
    Alert.alert(
        'Eliminar elemento',
        `¿Estás seguro de que quieres eliminar el elemento con ID: ${item.id}?`,
        [
            {
                text: 'Cancelar',
                style: 'cancel',
            },
            {
                text: 'Eliminar',
                onPress: async () => {
                    try {
                        // Llama a la función eliminarTipoHabitacion pasando el ID
                        const successMessage = await fetchEliminarTipoHabitacion(item.id);
                        if (successMessage) {
                            // Si la eliminación es exitosa, muestra el mensaje de la API
                            Alert.alert(
                                'Elemento eliminado',
                                successMessage,
                                [{ text: 'OK', onPress: () => fetchTipoHabitacionData() }]
                            );
                        } else {
                            console.error('Error al eliminar elemento');
                        }
                    } catch (error) {
                        console.error('Error en la solicitud DELETE:', error);
                    }
                },
            },
        ]
    );
  };

  const limpiarInputs = () => {
    setId('');
    setCodigo('');
    setDescripcion('');
    setCantidad('');
    setEstado('');
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleItemPress(item)}>
        <Text style={styles.cardText}>ID: {item.id}</Text>
        <Text style={styles.cardText}>Código: {item.Codigo}</Text>
        <Text style={styles.cardText}>Descripción: {item.Descripcion}</Text>
        <Text style={styles.cardText}>Cantidad: {item.Cantidad}</Text>
        <Text style={[styles.cardText, { color: item.Estado === 'Activo' ? 'green' : 'red' },]}>Estado: {item.Estado}</Text>
        {selectedItem === item && (
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.searchButton]}
                    onPress={() => handleBuscarPorId(item)}
                >
                    <Text style={styles.buttonText}>Buscar por ID</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.deleteButton]}
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
      <TouchableOpacity style={styles.addButton} onPress={() => { limpiarInputs(); openModal(); }} >
        <FontAwesome name="plus" style={styles.Icon} />
      </TouchableOpacity>
      <Modal animationType="slide" visible={modalVisible} onRequestClose={closeModal} >
        <View style={styles.modalContainer}>

          <Text style={styles.modalTitle}>Tipo habitaciones</Text>

          {showIdInput && (
            <View style={styles.modalInputContainer}>
              <TextInput style={styles.modalInput} onChangeText={Number => setId(Number)} />
            </View>
          )}

          <View style={styles.modalFieldContainer}>
            <Text style={styles.modalLabel}>Código<Text style={styles.requiredAsterisk}>*</Text> :</Text>
          </View>
          <View style={styles.modalInputContainer}>
            <TextInput style={styles.modalInput} placeholder="Ingrese el código" onChangeText={text => setCodigo(text)} value={codigo} />
          </View>

          <View style={styles.modalFieldContainer}>
            <Text style={styles.modalLabel}>Descripción<Text style={styles.requiredAsterisk}>*</Text> :</Text>
          </View>
          <View style={styles.modalInputContainer}>
            <TextInput style={styles.modalInput} placeholder="Ingrese la descripción" onChangeText={text => setDescripcion(text)} value={descripcion} />
          </View>

          <View style={styles.modalFieldContainer}>
            <Text style={styles.modalLabel}>Cantidad<Text style={styles.requiredAsterisk}>*</Text> :</Text>
          </View>
          <View style={styles.modalInputContainer}>
            <TextInput style={styles.modalInput} placeholder="Ingrese la cantidad" onChangeText={text => setCantidad(text)} value={cantidad} />
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
            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => { limpiarInputs(); closeModal(); }}>
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <FlatList
        data={tipoHabitacion}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.List} />
    </View>
  )
}