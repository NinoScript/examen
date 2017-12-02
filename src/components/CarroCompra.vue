<template>
  <div>
    <div>Rut: </div>
    <div>Nombre: </div>
    <div>Dirección: </div>
    <div>Comprado Por: </div>
  
    <div>
      Seleccione Carretera, indique la cantidad y agregue al pedido.
      <br/>
      <select>
        <template v-for="carretera in carreteras">
          <option v-bind:value="{id: carretera.id}">{{carretera.nombre}}</option>
        </template>
      </select>
    </div>
    <table>
      <tr>
        <th>Carretera</th>
        <th>Cantidad</th>
        <th>Eliminar</th>
      </tr>
      <tr v-for="detalle in detalles">
        <td>{{detalle.nombre}}</td>
        <td>
          <input v-model="detalle.cantidad">
        </td>
        <td>
          <button v-on:click="algo">-</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      carreteras: [
        { id: 1, nombre: "Ruta 18", precio: 100000 },
        { id: 2, nombre: "Ruta 28", precio: 200000 },
        { id: 3, nombre: "Ruta 38", precio: 300000 },
      ],
      detalles: [
        { id: 1, nombre: "Ruta 18", precio: 100000 },
        { id: 2, nombre: "Ruta 28", precio: 200000 },
        { id: 3, nombre: "Ruta 38", precio: 300000 },
      ]
    }
  },
  methods: {
    algo: function(event) {
      console.log(this.detalles[0].cantidad)
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
