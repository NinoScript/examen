<template>
  <div>
    <h1>Historial</h1>
  
  <div>
    <table>
      <tr>
        <th>Pedido</th>
        <th>Total</th>
        <th>Pedir</th>
      </tr>
      <tr>
        <td >{{juntar}}</td>
        <td>
            {{total}}
        </td>
        <td>
          <button v-on:click="">+</button>
        </td>
      </tr>
    </table>
    <table>
      <tr>
        <th>Pedido</th>
        <th>Total</th>
        <th>Pedir</th>
      </tr>
      <tr v-for="detalle, i in detalles">
        <td>{{juntar}}</td>
        <td>
          <input v-model="total">
        </td>
        <td>
          <button v-on:click="eliminar(i)">+</button>
        </td>
      </tr>
    </table>
  </div>
    
   
  </div>
  
</template>

<script>
  
export default {
  name: 'Historial',
  data () {
    return {
      id:[2],
      nombres: "",
      detalles: 
      [
      ],
      cantidad:0
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
    axios.get("http://localhost:8080/Highway/JHistorial").then((response) => {
      this.detalles = response.data
    }).catch(function (error) {
      console.log("fallo por esto: " + error)
    })
  },
  computed: {
    total: function () {
      return this.detalles
        .filter(detalle => detalle.id == 2)
        .map(detalle => detalle.precio * detalle.cantidad)
        .reduce((memoria, elemento) => memoria + elemento, 0)
    },
    juntar: function(){
      this.detalles.filter(r=> r.id == 2).forEach(r=> this.nombres+=r.nombre+"-" )
      return this.nombres;
      
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
