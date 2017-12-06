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

      <form action="/privado/logout.jsp">
          <input class='boton-menu' type="submit" value="Salir" />
      </form>
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
      this.datosUsuario = response.data;
      console.log("datos usuario: ", response.data)
    }).catch(function (error) {
      console.log("fallo por esto: " + error)
    })
  }
}
</script>

<style>
  .boton-menu {
    border-radius: 4px;
    background-color: #66CDAA;
    border: none;
    color: #FFFFFF;
    text-align: center;
    font-size: 15px;
    padding: 10px;
    width: 150px;
    transition: all 0.5s;
    cursor: pointer;
    margin: 5px;
  }
  
  .boton_chico {
    border-radius: 4px;
    background-color: #66CDAA;
    border: none;
    color: #000000;
    text-align: center;
    font-size: 12px;
    padding: 7px;
    width: 125px;
    transition: all 0.5s;
    cursor: pointer;
    margin: 5px;
  }
  
  .boton_enano {
    border-radius: 4px;
    background-color: #66CDAA;
    border: none;
    color: #000000;
    text-align: center;
    font-size: 12px;
    padding: 7px;
    width: 30px;
    transition: all 0.5s;
    cursor: pointer;
    margin: 5px;
  }

  .button span {
    cursor: pointer;
    display: inline-block;
    position: relative;
    transition: 0.5s;
  }

  .button span:after {
    content: '\00bb';
    position: absolute;
    opacity: 0;
    top: 0;
    right: -20px;
    transition: 0.5s;
  }

  .button:hover span {
    padding-right: 25px;
  }

  .button:hover span:after {
    opacity: 1;
    right: 0;
  }
  table {
      border-collapse: collapse;
      margin:auto;
  }

  th, td {
    border-bottom: 1px solid #ddd;
      padding: 8px;
  }

  tr:nth-child(even){background-color: #f2f2f2}
  
  table.greenTable {
    border: 2px solid #FFFFFF;
    background-color: #FFFFFF;
    text-align: center;
    border-collapse: collapse;
  }
  table.greenTable td, table.greenTable th {
    border: 1px solid #FFFFFF;
    padding: 3px 4px;
  }
  table.greenTable tbody td {
    font-size: 13px;
  }
  table.greenTable tr:nth-child(even) {
    background: #BDF0E3;
  }
  table.greenTable thead {
    background: #FFFFFF;
    border-bottom: 4px solid #333333;
  }
  table.greenTable thead th {
    font-size: 15px;
    font-weight: bold;
    color: #333333;
    text-align: center;
    border-left: 2px solid #333333;
  }
  table.greenTable thead th:first-child {
    border-left: none;
  }

  table.greenTable tfoot {
    font-size: 14px;
    font-weight: bold;
    color: #333333;
    border-top: 4px solid #333333;
  }
  table.greenTable tfoot td {
    font-size: 14px;
  }
  
  html{
    background-image: url("http://www.mulierchile.com/aqua-wallpaper/aqua-wallpaper-006.jpg") ;
    -webkit-background-size: cover;
    -moz-background-size:cover;
    -o-background-size:cover;
    background-size:cover;
  }
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
