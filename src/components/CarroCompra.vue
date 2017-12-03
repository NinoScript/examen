<template>
  <div>
    <h1>Carro de Compra</h1>
    <div>Rut: {{usuario.rut}}</div>
    <div>Nombre: {{usuario.nombre}}</div>
    <div>Dirección: {{usuario.direccion}}</div>
    <div>Comprado Por: {{usuario.encargado}}</div>
  
    <div>
      Seleccione Carretera, indique la cantidad y agregue al pedido.
      <br/>
      <select v-model="selected">
        <option selected disabled>Seleccione una carretera</option>
        <template v-for="carretera in carreteras">
          <option v-bind:value="carretera">{{carretera.nombre}}</option>
        </template>
      </select>
    <button v-on:click="agregar">Agregar</button>
  </div>
  <div>
    Opciones de Pago:
    <input type="radio" v-model="pago" value="transferencia">Transferencia
    <input type="radio" v-model="pago" value="pagoEnLinea">Pago en Línea
    <input type="radio" v-model="pago" value="ordenDeCompra">Orden de Compra
  </div>
  <div>
    Opciones de Retiro:
    <input type="radio" v-model="retiro" value="oficina">Oficina
    <input type="radio" v-model="retiro" value="envioCliente">Envío Cliente
  </div>
  <div>
    <table>
      <tr>
        <th>Carretera</th>
        <th>Cantidad</th>
        <th>Eliminar</th>
      </tr>
      <tr v-for="detalle, i in detalles">
        <td>{{detalle.nombre}}</td>
        <td>
          <input v-model="detalle.cantidad">
        </td>
        <td>
          <button v-on:click="eliminar(i)">-</button>
        </td>
      </tr>
    </table>
  </div>
    
   
   Total a Pagar $ {{total}}
   <button v-on:click="hacerPedido">Hacer Pedido</button>
  </div>
  
</template>

<script>
export default {
  name: 'CarroCompra',
  data () {
    return {
      usuario: {
        nombre: "Perez Ltda",
        rut: "12.345.678-K",
        direccion: "4 Norte 1329, Viña del Mar",
        encargado: "Juanito Perez"
      },
      selected: "Seleccione una carretera",
      carreteras: [],
      detalles: [],
      pago: undefined,
      retiro: undefined
    }
  },
  methods: {
    eliminar: function(indice) {
      this.detalles.splice(indice,1)
    },
    agregar: function(event) {
      this.detalles.push({ id: this.selected.id, nombre: this.selected.nombre, precio: this.selected.precio, cantidad: 1 })
    },
    hacerPedido: function() {
      const jayson = {
        pago: this.pago,
        retiro: this.retiro,
        detalle: this.detalles
      }
      console.log("hacemos un POST con "+JSON.stringify(jayson))
    
      axios.post("carreteras", jayson)
        .then((response) => {
          console.log(response);
        }).catch(function (error) {
          console.log("fallo por esto: " + error)
        })
    }
  },
  beforeMount () {
    // var mock = new MockAdapter(axios, {delayResponse:200});
    // mock.onGet("http://localhost:8080/Highway/JCarreteras").reply(200, [
    //   { id: 1, nombre: "Ruta 18", precio: 100000 },
    //   { id: 2, nombre: "Ruta 28", precio: 200000 },
    //   { id: 3, nombre: "Ruta 38", precio: 300000 },
    // ]).onAny().passThrough();
    
    axios.get("http://localhost:8080/Highway/JCarreteras").then((response) => {
      this.carreteras = response.data
      this.selected = this.carreteras[0]
    }).catch(function (error) {
      console.log("fallo por esto: " + error)
    })
  },
  computed: {
    total: function () {
      return this.detalles
        .map(detalle => detalle.precio * detalle.cantidad)
        .reduce((memoria, elemento) => memoria + elemento, 0)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
