import axios from 'axios';

export const fetchConfiguracionSistema = async () => {
    try {
        const response = await axios.get('https://hotel-api-hzf6.onrender.com/api/parametrizacion/configuracionSistema');
        const configuracionSistemaData = response.data.data.map(item => ({
            id: item.id,
            UsuarioId: item.UsuarioId,
            Codigo: item.Codigo,
            Nombre: item.Nombre,
            Descripcion: item.Descripcion,
            Estado: item.Estado,
        }));
        return configuracionSistemaData;
    } catch (error) {
        console.error('Error al obtener las configuración del sistema:', error);
        throw error;
    }
};

export const agregarNuevaConfiguracionSistema = async (nuevaConfiguracionSistema) => {
    try {
        const response = await axios.post('https://hotel-api-hzf6.onrender.com/api/parametrizacion/configuracionSistema', nuevaConfiguracionSistema);

        if (response.status === 201) {
            return { success: true, message: 'Configuración del sistema creada con éxito' };
        } else {
            return { success: false, message: 'Error al configurar el sistema' };
        }
    } catch (error) {
        console.error('Error en la solicitud POST:', error);
        return false;
    }
};

export const fetchConfiguracionSistemaId = async (configuracionSistemaId) => {
    try {
        const response = await axios.get(`https://hotel-api-hzf6.onrender.com/api/parametrizacion/configuracionSistema/${configuracionSistemaId}`);

        const configuracionSistemaData = response.data.data;

        return configuracionSistemaData;
    } catch (error) {
        console.error('Error al obtener la configuración del sistema por ID:', error);
        throw error;
    }
};

export const actualizarConfiguracionSistema = async (id, nuevaConfiguracionSistema) => {
    try {
        const url = `https://hotel-api-hzf6.onrender.com/api/parametrizacion/configuracionSistema/${id}`;
        const response = await axios.put(url, nuevaConfiguracionSistema);

        if (response.status === 200 || response.status === 204) {
            return { success: true, message: 'Configuración del sistema actualizada con éxito' };
        } else {
            return { success: false, message: 'Error al actualizar la configuración del sistema' };
        }
    } catch (error) {
        console.error('Error en la solicitud PUT:', error);
        return { success: false, message: 'Error en la solicitud PUT' };
    }
};

export const fetchEliminarConfiguracionSistema = async (configuracionSistemaId) => {
    try {
        const response = await axios.delete(`https://hotel-api-hzf6.onrender.com/api/parametrizacion/configuracionSistema/${configuracionSistemaId}`);

        const configuracionSistemaData = response.data.message;

        return configuracionSistemaData;

    } catch (error) {
        console.error('Error al obtener la categoría por ID:', error);
        throw error;
    }
};