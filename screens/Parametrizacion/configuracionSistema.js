import React, { useState, useEffect } from 'react';
import styles from '../../assets/css/styles';

import { Picker } from '@react-native-picker/picker';
import { View, Text, FlatList, Modal, TextInput, TouchableOpacity, Alert } from 'react-native';
import { fetchConfiguracionSistema, agregarNuevaConfiguracionSistema, fetchConfiguracionSistemaId, actualizarConfiguracionSistema, fetchEliminarConfiguracionSistema } from '../../assets/js/Parametrizacion/configuracionSistemaService';
import { FontAwesome } from "@expo/vector-icons";

export default function configuracionSistema() {
  
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState(0);
  const [usuarioId, setUsuarioId] = useState('');
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState('');
  const [configuracionSistema, setConfiguracionSistema] = useState([]);

  const [selectedItem, setSelectedItem] = useState(null);

  const [showIdInput, setShowIdInput] = useState(false);
  
  useEffect(() => {
    fetchConfiguracionSistemaData();
  }, []);
  
  const fetchConfiguracionSistemaData = async () => {
    try {
        const configuracionSistemaData = await fetchConfiguracionSistema();
        configuracionSistemaData.sort((a, b) => a.id - b.id);
        setConfiguracionSistema(configuracionSistemaData);
    } catch (error) {
        console.error('Error al obtener la configuración del sistema:', error);
    }
  };

  const handleGuardar = async () => {

    const numericId = id === '' ? 0 : parseFloat(id);

    const nuevaConfiguracionSistema = { Codigo: codigo, UsuarioId: usuarioId, Descripcion: descripcion, Nombre: nombre, Estado: estado };

    try {

        let successMessage = '';

        if (numericId !== 0) {
            successMessage = await actualizarConfiguracionSistema(numericId, nuevaConfiguracionSistema);
        } else {
            successMessage = await agregarNuevaConfiguracionSistema(nuevaConfiguracionSistema);
        }

        if (successMessage) {
            const message = numericId !== 0 ? 'Configuración del sistema actualizada' : 'Configuración del sistema creada';
            Alert.alert(message, successMessage.message, [{ text: 'OK', onPress: () => closeModal() }]);
            fetchConfiguracionSistemaData();
            closeModal();
            limpiarInputs();
        } else {
            console.error(`Error al ${numericId !== 0 ? 'actualizar' : 'agregar'} configuración sistema`);
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
        const fetchedConfiguracionSistemaData = await fetchConfiguracionSistemaId(item.id);
        setId(fetchedConfiguracionSistemaData.id);
        setCodigo(fetchedConfiguracionSistemaData.UsuarioId);
        setCodigo(fetchedConfiguracionSistemaData.Codigo);
        setCodigo(fetchedConfiguracionSistemaData.Nombre);
        setDescripcion(fetchedConfiguracionSistemaData.Descripcion);
        setEstado(fetchedConfiguracionSistemaData.Estado);
        setShowIdInput(false);
        setModalVisible(true);
    } catch (error) {
        console.error('Error al buscar la configuración del sistema por ID:', error);
    }
  };

  const handleEditarConfiguracionSistema = (configuracionSistema) => {
    setUsuarioId(configuracionSistema.UsuarioId);
    setCodigo(configuracionSistema.Codigo);
    setNombre(configuracionSistema.Nombre);
    setDescripcion(configuracionSistema.Descripcion);
    setEstado(configuracionSistema.Estado);
    setId(configuracionSistema.id); // Configura id con el valor de la configuración del sistema existente
    setEditandoconfiguracionSistema(true); // Establece editandoConfiguracionSistema en verdadero
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
                        // Llama a la función eliminarConfiguracionSistema pasando el ID
                        const successMessage = await fetchEliminarConfiguracionSistema(item.id);
                        if (successMessage) {
                            // Si la eliminación es exitosa, muestra el mensaje de la API
                            Alert.alert(
                                'Elemento eliminado',
                                successMessage,
                                [{ text: 'OK', onPress: () => fetchConfiguracionSistemaData() }]
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
    setUsuarioId('');
    setCodigo('');
    setNombre('');
    setDescripcion('');
    setEstado('');
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleItemPress(item)}>
        <Text style={styles.cardText}>ID: {item.id}</Text>
        <Text style={styles.cardText}>Id Usuario: {item.UsuarioId.Usuario}</Text>
        <Text style={styles.cardText}>Código: {item.Codigo}</Text>
        <Text style={styles.cardText}>Nombre: {item.Nombre}</Text>
        <Text style={styles.cardText}>Descripción: {item.Descripcion}</Text>
        <Text style={[styles.cardText, { color: item.Estado === 'Activo' ? 'green' : 'red' },]}>Estado: {item.Estado}</Text>
        {selectedItem === item && ( // Mostrar botones solo si selectedItem coincide con el elemento actual
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

          <Text style={styles.modalTitle}>Configuracion sistema</Text>

          {showIdInput && (
            <View style={styles.modalInputContainer}>
              <TextInput style={styles.modalInput} onChangeText={Number => setId(Number)} />
            </View>
          )}

          <View style={styles.modalFieldContainer}>
            <Text style={styles.modalLabel}>Id Usuario<Text style={styles.requiredAsterisk}>*</Text> :</Text>
          </View>
          <View style={styles.modalInputContainer}>
            <TextInput style={styles.modalInput} placeholder="Ingrese el id del usuario" onChangeText={text => setUsuarioId(text)} value={usuarioId} />
          </View>

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
            <TextInput style={styles.modalInput} placeholder="Ingrese el nombre" onChangeText={text => setNombre(text)} value={nombre} />
          </View>

          <View style={styles.modalFieldContainer}>
            <Text style={styles.modalLabel}>Descripción<Text style={styles.requiredAsterisk}>*</Text> :</Text>
          </View>
          <View style={styles.modalInputContainer}>
            <TextInput style={styles.modalInput} placeholder="Ingrese la descripción" onChangeText={text => setDescripcion(text)} value={descripcion} />
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
        data={configuracionSistema}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.List} />
    </View>
  )
}