<template>
  <div>
    <h1>Habitaciones</h1>

    <!-- Formulario para Agregar/Editar Habitación -->
    <div v-if="showForm">
      <h2>{{ habitacionId ? "Editar Habitación" : "Agregar Habitación" }}</h2>
      <form @submit.prevent="saveHabitacion">
        <label for="numeroHabitacion">Número de Habitación:</label>
        <input
          v-model="habitacion.numeroHabitacion"
          id="numeroHabitacion"
          required
        />

        <label for="tipo">Tipo:</label>
        <input v-model="habitacion.tipo" id="tipo" required />

        <label for="precio">Precio:</label>
        <input v-model="habitacion.precio" type="number" step="0.01" id="precio" required />

        <label for="hotelId">ID del Hotel:</label>
        <input v-model="habitacion.hotelId" id="hotelId" required />

        <button type="submit">Guardar</button>
      </form>
    </div>

    <!-- Lista de Habitaciones -->
    <div v-if="!showForm">
      <ul>
        <li v-for="habitacion in habitaciones" :key="habitacion.id">
          {{ habitacion.numeroHabitacion }} - {{ habitacion.tipo }} -
          {{ habitacion.precio }}
          <button @click="editHabitacion(habitacion.id)">Editar</button>
          <button @click="deleteHabitacion(habitacion.id)">Eliminar</button>
        </li>
      </ul>
      <button @click="newHabitacion">Agregar Habitación</button>
    </div>
  </div>
</template>
  
  <script>
import { ref, onMounted } from "vue";
import {
  fetchHabitaciones,
  fetchHabitacionById,
  createHabitacion,
  updateHabitacion,
  deleteHabitacion,
} from "../helpers/AxiosHabitacion";

export default {
  setup() {
    const habitaciones = ref([]);
    const habitacion = ref({
      numeroHabitacion: "",
      tipo: "",
      precio: "",
      hotelId: "",
    });
    const habitacionId = ref(null);
    const showForm = ref(false);

    const loadHabitaciones = async () => {
      try {
        habitaciones.value = await fetchHabitaciones();
      } catch (error) {
        console.error("Error loading habitaciones:", error);
      }
    };

    const newHabitacion = () => {
      habitacionId.value = null;
      habitacion.value = {
        numeroHabitacion: "",
        tipo: "",
        precio: "",
        hotelId: "",
      };
      showForm.value = true;
    };

    const editHabitacion = async (id) => {
      try {
        habitacionId.value = id;
        const data = await fetchHabitacionById(id);
        habitacion.value = data;
        showForm.value = true;
      } catch (error) {
        console.error(`Error loading habitacion with id ${id}:`, error);
      }
    };

    const saveHabitacion = async () => {
      try {
        if (habitacionId.value) {
          await updateHabitacion(habitacionId.value, habitacion.value);
        } else {
          await createHabitacion(habitacion.value);
        }
        await loadHabitaciones();
        showForm.value = false;
      } catch (error) {
        console.error("Error saving habitacion:", error);
      }
    };

    const deleteHabitacion = async (id) => {
      try {
        await deleteHabitacion(id);
        await loadHabitaciones();
      } catch (error) {
        console.error(`Error deleting habitacion with id ${id}:`, error);
      }
    };

    onMounted(loadHabitaciones);

    return {
      habitaciones,
      habitacion,
      habitacionId,
      showForm,
      newHabitacion,
      editHabitacion,
      saveHabitacion,
      deleteHabitacion,
    };
  },
};
</script>

<style scoped>
</style>
  