<template>
    <div>
      <h1>Hoteles</h1>
      
      <!-- Formulario para Agregar/Editar Hotel -->
      <div v-if="showForm">
        <h2>{{ hotelId ? 'Editar Hotel' : 'Agregar Hotel' }}</h2>
        <form @submit.prevent="saveHotel">
          <label for="nombre">Nombre:</label>
          <input v-model="hotel.nombre" id="nombre" required />
  
          <label for="direccion">Dirección:</label>
          <input v-model="hotel.direccion" id="direccion" required />
  
          <button type="submit">Guardar</button>
        </form>
      </div>
  
      <!-- Lista de Hoteles -->
      <div v-if="!showForm">
        <ul>
          <li v-for="hotel in hoteles" :key="hotel.id">
            {{ hotel.nombre }} - {{ hotel.direccion }}
            <button @click="editHotel(hotel.id)">Editar</button>
            <button @click="deleteHotel(hotel.id)">Eliminar</button>
          </li>
        </ul>
        <button @click="newHotel">Agregar Hotel</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { fetchHoteles, fetchHotelById, createHotel, updateHotel, deleteHotel } from '../helpers/AxiosHotel';
  
  export default {
    setup() {
      const hoteles = ref([]);
      const hotel = ref({ nombre: '', direccion: '' });
      const hotelId = ref(null);
      const showForm = ref(false);
  
      const loadHoteles = async () => {
        try {
          hoteles.value = await fetchHoteles();
        } catch (error) {
          console.error("Error loading hoteles:", error);
        }
      };
  
      const newHotel = () => {
        hotelId.value = null;
        hotel.value = { nombre: '', direccion: '' };
        showForm.value = true;
      };
  
      const editHotel = async (id) => {
        try {
          hotelId.value = id;
          const data = await fetchHotelById(id);
          hotel.value = data;
          showForm.value = true;
        } catch (error) {
          console.error(`Error loading hotel with id ${id}:`, error);
        }
      };
  
      const saveHotel = async () => {
        try {
          if (hotelId.value) {
            await updateHotel(hotelId.value, hotel.value);
          } else {
            await createHotel(hotel.value);
          }
          await loadHoteles();
          showForm.value = false;
        } catch (error) {
          console.error("Error saving hotel:", error);
        }
      };
  
      const deleteHotel = async (id) => {
        try {
          await deleteHotel(id);
          await loadHoteles();
        } catch (error) {
          console.error(`Error deleting hotel with id ${id}:`, error);
        }
      };
  
      onMounted(loadHoteles);
  
      return {
        hoteles,
        hotel,
        hotelId,
        showForm,
        newHotel,
        editHotel,
        saveHotel,
        deleteHotel,
      };
    },
  };
  </script>

<style scoped>
</style>
  