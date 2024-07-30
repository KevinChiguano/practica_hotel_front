import axios from "axios";

const API_BASE_URL = 'http://13.88.42.134:8080'; // Cambia la URL si es necesario

export const fetchHoteles = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/hoteles`);
      return response.data;
    } catch (error) {
      console.error("Error fetching hoteles:", error);
      throw error;
    }
  };
  
  export const fetchHotelById = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/hoteles/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching hotel with id ${id}:`, error);
      throw error;
    }
  };
  
  export const createHotel = async (hotel) => {
    try {
      await axios.post(`${API_BASE_URL}/hoteles`, hotel, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return true;
    } catch (error) {
      console.error("Error creating hotel:", error);
      throw error;
    }
  };
  
  export const updateHotel = async (id, hotel) => {
    try {
      await axios.put(`${API_BASE_URL}/hoteles/${id}`, hotel, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return true;
    } catch (error) {
      console.error(`Error updating hotel with id ${id}:`, error);
      throw error;
    }
  };
  
  export const deleteHotel = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/hoteles/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting hotel with id ${id}:`, error);
      throw error;
    }
  };