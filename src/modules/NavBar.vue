<template>
  <div class="navigation">
    <nav class="nav justify-content-center bg-dark py-3">
      <router-link
        to="/"
        class="nav-link text-white"
        :class="{ active: $route.path === '/' }"
      >
        <i class="fas fa-users"></i> Hoteles
      </router-link>
      <router-link
        to="/habitacion"
        class="nav-link text-white"
        :class="{ active: $route.path === '/habitacion' }"
      >
        <i class="fas fa-box"></i> Habitaciones
      </router-link>
    </nav>
  </div>
</template>
  
  <script>
export default {};
</script>
  
  <style scoped>
.navigation {
  margin-top: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.nav-link {
  margin: 0 15px;
  font-weight: bold;
  transition: color 0.3s, background-color 0.3s;
  display: flex;
  align-items: center;
}

.nav-link i {
  margin-right: 8px;
}

.nav-link:hover {
  color: #ffcc00 !important;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.nav-link.active {
  color: #ffcc00 !important;
  border-bottom: 2px solid #ffcc00;
}
</style>
  