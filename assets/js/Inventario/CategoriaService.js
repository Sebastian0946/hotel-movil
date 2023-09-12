import axios from 'axios';

export const fetchCategorias = async () => {
    try {
        const response = await axios.get('https://hotel-api-hzf6.onrender.com/api/inventario/categoria');
        const categoriasData = response.data.data.map(item => ({
            id: item.id,
            Codigo: item.Codigo,
            Descripcion: item.Descripcion,
            Estado: item.Estado,
        }));
        return categoriasData;
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        throw error;
    }
};

export const agregarNuevaCategoria = async (nuevaCategoria) => {
    try {
        const response = await axios.post('https://hotel-api-hzf6.onrender.com/api/inventario/categoria', nuevaCategoria);

        if (response.status === 201) {
            return { success: true, message: 'Categoría creado con éxito' };
        } else {
            return { success: false, message: 'Error al actualizar la categoría' };
        }
    } catch (error) {
        console.error('Error en la solicitud POST:', error);
        return false;
    }
};

export const fetchCategoriaId = async (categoriaId) => {
    try {
        const response = await axios.get(`https://hotel-api-hzf6.onrender.com/api/inventario/categoria/${categoriaId}`);

        const categoriaData = response.data.data;

        return categoriaData;
    } catch (error) {
        console.error('Error al obtener la categoría por ID:', error);
        throw error;
    }
};

export const actualizarCategoria = async (id, nuevaCategoria) => {
    try {
        const url = `https://hotel-api-hzf6.onrender.com/api/inventario/categoria/${id}`;
        const response = await axios.put(url, nuevaCategoria);

        if (response.status === 200 || response.status === 204) {
            return { success: true, message: 'Categoría actualizada con éxito' };
        } else {
            return { success: false, message: 'Error al actualizar la categoría' };
        }
    } catch (error) {
        console.error('Error en la solicitud PUT:', error);
        return { success: false, message: 'Error en la solicitud PUT' };
    }
};

export const fetchEliminar = async (categoriaId) => {
    try {
        const response = await axios.delete(`https://hotel-api-hzf6.onrender.com/api/inventario/categoria/${categoriaId}`);

        const categoriaData = response.data.message;

        return categoriaData;

    } catch (error) {
        console.error('Error al obtener la categoría por ID:', error);
        throw error;
    }
};
