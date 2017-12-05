<template>
  <div>
    <h1>Carro de Compra</h1>
    <div>Rut: {{datosUsuario.empresa.rutEmpresa}}</div>
    <div>Nombre: {{datosUsuario.empresa.nombreEmpresa}}</div>
    <div>Dirección: {{datosUsuario.empresa.direccion}}</div>
    <div>Comprado Por: {{datosUsuario.encargado.nombre}}</div>
  
    <div>
      Seleccione Carretera, indique la cantidad y agregue al pedido.
      <br/>
      <select v-model="datos.selected">
        <option selected disabled>Seleccione una carretera</option>
        <template v-for="carretera in datos.carreteras">
          <option v-bind:value="carretera">{{carretera.nombre}}</option>
        </template>
      </select>
    <button v-on:click="agregar">Agregar</button>
  </div>
  <div>
    Opciones de Pago:
    <input type="radio" v-model="datos.pago" value="transferencia">Transferencia
    <input type="radio" v-model="datos.pago" value="pagoEnLinea">Pago en Línea
    <input type="radio" v-model="datos.pago" value="ordenDeCompra">Orden de Compra
  </div>
  <div>
    Opciones de Retiro:
    <input type="radio" v-model="datos.retiro" value="oficina">Oficina
    <input type="radio" v-model="datos.retiro" value="envioCliente">Envío Cliente
  </div>
  <div>
    <table>
      <tr>
        <th>Carretera</th>
        <th>Cantidad</th>
        <th>Eliminar</th>
      </tr>
      <tr v-for="detalle, i in datos.detalles">
        <td>{{detalle.nombre}}</td>
        <td>
          <input type="number" v-model="detalle.cantidad">
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
  props: ['datos', 'datosUsuario'],
  data () {
    return {
    }
  },
  methods: {
    eliminar: function(indice) {
      this.datos.detalles.splice(indice,1)
    },
    agregar: function(event) {
      this.datos.detalles.push({
        id: this.datos.selected.id,
        nombre: this.datos.selected.nombre,
        precio: this.datos.selected.precio,
        cantidad: 1
      })
    },
    hacerPedido: function() {
      const jayson = {
        pago: this.datos.pago,
        retiro: this.datos.retiro,
        detalle: this.datos.detalles
      }
      console.log("hacemos un POST con "+JSON.stringify(jayson))
    
      axios.post("/JCompras", jayson)
        .then((response) => {
          console.log("funciono")
          console.log(response.data.nombre);
          this.$emit("openVoucher", response.data)
        }).catch(function (error) {
          console.log("fallo por esto: " + error)
        })
    }
  },
  beforeMount () {
    axios.get("/JCarreteras").then((response) => {
      this.datos.carreteras = response.data
      this.datos.selected = this.datos.carreteras[0]
    }).catch(function (error) {
      console.log("fallo por esto: " + error)
    })
  },
  computed: {
    total: function () {
      return this.datos.detalles
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
