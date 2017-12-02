<template>
  <div>
    <div>Rut: </div>
    <div>Nombre: </div>
    <div>Dirección: </div>
    <div>Comprado Por: </div>
  
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
   
   Total a Pagar $ 
   <button v-on:click="eliminar">Hacer Pedido</button>
  </div>
  
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      selected: "Seleccione una carretera",
      carreteras: [],
      detalles: []
    }
  },
  methods: {
    eliminar: function(indice) {
      this.detalles.splice(indice,1)
    },
    agregar: function(event) {
      this.detalles.push({ id: this.selected.id, nombre: this.selected.nombre, precio: this.selected.precio, cantidad: 1 })
    }
  },
  beforeMount () {
    mock.onGet("carreteras").reply(200, [
      { id: 1, nombre: "Ruta 18", precio: 100000 },
      { id: 2, nombre: "Ruta 28", precio: 200000 },
      { id: 3, nombre: "Ruta 38", precio: 300000 },
    ])
    
    axios.get("carreteras").then((response) => {
      this.carreteras = response.data
      this.selected = this.carreteras[0]
    }).catch(function (error) {
      console.log("fallo por esto: " + error)
    })
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
