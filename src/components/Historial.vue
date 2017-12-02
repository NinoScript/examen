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
  </div>
    
   
  </div>
  
</template>

<script>
  
export default {
  name: 'Historial',
  data () {
    return {
      nombres: "",
      selected: "Seleccione una carretera",
      carreteras: [],
      detalles: 
      [
        {id:1,nombre:"Ruta 18",precio:100000,cantidad:2},
        {id:3,nombre:"Ruta 38",precio:300000,cantidad:4},
        {id:2,nombre:"Ruta 28",precio:200000,cantidad:8}
      ]
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
  },
  computed: {
    total: function () {
      return this.detalles
        .map(detalle => detalle.precio * detalle.cantidad)
        .reduce((memoria, elemento) => memoria + elemento, 0)
    },
    juntar: function(){
      this.detalles.forEach(r=> this.nombres+=r.nombre+"-")
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
