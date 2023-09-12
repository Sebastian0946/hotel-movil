// api.js
import axios from 'axios';

export const fetchProducto = async () => {
    try {
        const response = await axios.get('https://hotel-api-hzf6.onrender.com/api/inventario/producto');
        const productoData = response.data.data.map(item => ({
            id: item.id,
            Codigo: item.Codigo,
            Nombre: item.Nombre,
            CategoriaId: item.CategoriaId,
            Estado: item.Estado,
        }));
        return productoData;
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        throw error;
    }
};

export const agregarNuevoProducto = async (nuevoProducto) => {
    try {
        const response = await axios.post('https://hotel-api-hzf6.onrender.com/api/inventario/producto', nuevoProducto);

        if (response.status === 201) {
            return response.data.message;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error en la solicitud POST:', error);
        return false;
    }
};

export const fetchCategorias = async () => {
    try {
        const response = await axios.get('https://hotel-api-hzf6.onrender.com/api/inventario/categoria');
        const categoriasData = response.data.data;
        return categoriasData;
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        throw error;
    }
};