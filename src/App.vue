<template>
  <div id="app">
    <img src="./assets/logo.png">
    <CarroCompra/>
  </div>
</template>

<script>
import CarroCompra from './components/CarroCompra'

export default {
  name: 'app',
  components: {
    CarroCompra
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
