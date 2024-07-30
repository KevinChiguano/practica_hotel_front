import axios from "axios";

const API_BASE_URL = 'http://13.93.211.243:8080'; // Cambia la URL si es necesario

export const fetchHabitaciones = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/habitaciones`);
    return response.data;
  } catch (error) {
    console.error("Error fetching habitaciones:", error);
    throw error;
  }
};

export const fetchHabitacionById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/habitaciones/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching habitacion with id ${id}:`, error);
    throw error;
  }
};

export const createHabitacion = async (habitacion) => {
  try {
    await axios.post(`${API_BASE_URL}/habitaciones`, habitacion, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return true;
  } catch (error) {
    console.error("Error creating habitacion:", error);
    throw error;
  }
};

export const updateHabitacion = async (id, habitacion) => {
  try {
    await axios.put(`${API_BASE_URL}/habitaciones/${id}`, habitacion, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return true;
  } catch (error) {
    console.error(`Error updating habitacion with id ${id}:`, error);
    throw error;
  }
};

export const deleteHabitacion = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/habitaciones/${id}`);
    return true;
  } catch (error) {
    console.error(`Error deleting habitacion with id ${id}:`, error);
    throw error;
  }
};