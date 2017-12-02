<template>
  <div id="app">
    <img src="./assets/logo.png">
    <template v-if='vista == "Inicio"'>
      <Inicio/>
    </template>
    <template v-else-if='vista == "CarroCompra"'>
      <CarroCompra/>
    </template>
    <template v-else-if='vista == "Historial"'>
      <Historial/>
    </template>
    <template v-else-if='vista == "Voucher"'>
      <Voucher/>
    </template>
    <template v-else>
      <div>error</div>
    </template>
    <div id="menu">
      <button class='boton-menu' v-on:click='cambiarVista("Inicio")'>Inicio</button>
      <button class='boton-menu' v-on:click='cambiarVista("CarroCompra")'>Carro de Compras</button>
      <button class='boton-menu' v-on:click='cambiarVista("Historial")'>Historial</button>
      <button class='boton-menu' v-on:click='cambiarVista("Voucher")'>Voucher</button>
    </div>
  </div>
</template>

<script>
import Inicio from './components/Inicio'
import CarroCompra from './components/CarroCompra'
import Historial from './components/Historial'
import Voucher from './components/Voucher'

export default {
  name: 'app',
  components: {
    Inicio,
    CarroCompra,
    Historial,
    Voucher
  },
  data () {
    return {
      vista: 'Inicio'
    }
  },
  methods: {
    cambiarVista: function(vista) {
      this.vista = vista
    }
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

#menu {
  position: fixed;
  left: 50px;
  top: 50px;
}
.boton-menu {
  float: left;
  clear: left;
}
</style>
