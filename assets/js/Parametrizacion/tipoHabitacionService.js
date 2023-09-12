import axios from 'axios';

export const fetchTipoHabitacion = async () => {
    try {
        const response = await axios.get('https://hotel-api-hzf6.onrender.com/api/parametrizacion/tipoHabitacion');
        const tipoHabitacionData = response.data.data.map(item => ({
            id: item.id,
            Codigo: item.Codigo,
            Descripcion: item.Descripcion,
            Cantidad: item.Cantidad,
            Estado: item.Estado,
        }));
        return tipoHabitacionData;
    } catch (error) {
        console.error('Error al obtener el tipo de habitación:', error);
        throw error;
    }
};

export const agregarNuevoTipoHabitacion = async (nuevotipoHabitacion) => {
    try {
        const response = await axios.post('https://hotel-api-hzf6.onrender.com/api/parametrizacion/tipoHabitacion', nuevotipoHabitacion);

        if (response.status === 201) {
            return { success: true, message: 'Tipo de habitación creada con éxito' };
        } else {
            return { success: false, message: 'Error al actualizar el tipo de habitación' };
        }
    } catch (error) {
        console.error('Error en la solicitud POST:', error);
        return false;
    }
};

export const fetchTipoHabitacionId = async (tipoHabitacionId) => {
    try {
        const response = await axios.get(`https://hotel-api-hzf6.onrender.com/api/parametrizacion/tipoHabitacion/${tipoHabitacionId}`);

        const tipoHabitacionData = response.data.data;

        return tipoHabitacionData;
    } catch (error) {
        console.error('Error al obtener el tipo de habitación por ID:', error);
        throw error;
    }
};

export const actualizarTipoHabitacion = async (id, nuevoTipoHabitacion) => {
    try {
        const url = `https://hotel-api-hzf6.onrender.com/api/parametrizacion/tipoHabitacion/${id}`;
        const response = await axios.put(url, nuevoTipoHabitacion);

        if (response.status === 200 || response.status === 204) {
            return { success: true, message: 'Tipo de habitación actualizada con éxito' };
        } else {
            return { success: false, message: 'Error al actualizar el tipo de habitación' };
        }
    } catch (error) {
        console.error('Error en la solicitud PUT:', error);
        return { success: false, message: 'Error en la solicitud PUT' };
    }
};

export const fetchEliminarTipoHabitacion = async (tipoHabitacionId) => {
    try {
        const response = await axios.delete(`https://hotel-api-hzf6.onrender.com/api/parametrizacion/tipoHabitacion/${TipoHabitacion}`);

        const tipoHabitacionData = response.data.message;

        return tipoHabitacionData;

    } catch (error) {
        console.error('Error al obtener el tipo de habitación por ID:', error);
        throw error;
    }
};