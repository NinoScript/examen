<template>
  <div id="app">
    <img src="logo.svg">
    <template v-if='vista == "Inicio"'>
      <Inicio v-bind:datosUsuario="datosUsuario"/>
    </template>
    <template v-else-if='vista == "CarroCompra"'>
      <CarroCompra
        v-on:openVoucher="abrirVoucher"
        v-bind:datos="datosCarroCompra"
        v-bind:datosUsuario="datosUsuario"/>
    </template>
    <template v-else-if='vista == "Historial"'>
      <Historial v-on:openCarroCompra="abrirCarroCompra"/>
    </template>
    <template v-else-if='vista == "Voucher"'>
      <Voucher v-bind:datos="datosVoucher"/>
    </template>
    <template v-else-if='vista == "VerCarreteras"'>
      <VerCarreteras/>
    </template>
    <template v-else>
      <div>error</div>
    </template>
    <div id="menu">
      <button class='boton-menu' v-on:click='cambiarVista("Inicio")'>Inicio</button>
      <button class='boton-menu' v-on:click='cambiarVista("CarroCompra")'>Carro de Compras</button>
      <button class='boton-menu' v-on:click='cambiarVista("Historial")'>Historial</button>
      <button class='boton-menu' v-on:click='cambiarVista("VerCarreteras")'>Ver Carreteras</button>
      <button v-if='datosVoucher != undefined' class='boton-menu' v-on:click='cambiarVista("Voucher")'>Ver último Voucher</button>
    </div>
  </div>
</template>

<script>
import Inicio from './components/Inicio'
import CarroCompra from './components/CarroCompra'
import Historial from './components/Historial'
import Voucher from './components/Voucher'
import VerCarreteras from './components/VerCarreteras'

export default {
  name: 'app',
  components: {
    Inicio,
    CarroCompra,
    Historial,
    Voucher,
    VerCarreteras
  },
  data () {
    return {
      vista: 'Inicio',
      datosVoucher: undefined,
      datosCarroCompra: {
        selected: "Seleccione una carretera",
        carreteras: [],
        detalles: [],
        pago: "transferencia",
        retiro: "oficina"
      },
      datosUsuario: {
        "encargado": {
          "rutEmpresa": "11111111-1",
          "nombre": "Juan Perez",
          "login": "jperez"
        },
        "empresa": {
          "rutEmpresa": "11111111-1",
          "nombreEmpresa": "empresa 1",
          "direccion": "direccion 1"
        }
      }
    }
  },
  methods: {
    cambiarVista: function(vista) {
      this.vista = vista
    },
    abrirVoucher: function(datos) {
      this.datosVoucher = datos
      this.vista = 'Voucher'
      console.log("el dato del voucher:", datos)
    },
    abrirCarroCompra: function(datos) {
      this.datosCarroCompra.detalles = datos
      this.vista = 'CarroCompra'
      console.log("el dato del carro de compra:", datos)
    }
  },
  beforeMount () {
    axios.get("/JInicio").then((response) => {
      // this.datosUsuario = response.data;
      console.log("datos usuario: ", response.data)
    }).catch(function (error) {
      console.log("fallo por esto: " + error)
    })
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
