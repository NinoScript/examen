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
      <tr v-for="dato in historial">
        <td>{{dato.pedido}}</td>
        <td>{{dato.total}}</td>
        <td>
          <button v-on:click="pedir(dato.id, dato.detalle)">+</button>
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
      detalles: []
    }
  },
  methods: {
    pedir: function(id_compra, detalle) {
      this.$emit("openCarroCompra", detalle)
    }
  },
  beforeMount () {
    axios.get("/JHistorial").then((response) => {
      this.detalles = response.data
    }).catch(function (error) {
      console.log("fallo por esto: " + error)
    })
  },
  computed: {
    historial: function(){
      function historial(detalles) {
        function groupBy(xs, key) {
          return xs.reduce(function(rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
          }, {});
        };
        
        const agrupados = groupBy(detalles, "id");
        
        return Object.keys(agrupados).map(id => {
          const valores = agrupados[id];
          
          const total = valores
            .map(detalle => detalle.precio * detalle.cantidad)
            .reduce((memoria, elemento) => memoria + elemento, 0);
          
          const pedido = valores
            .map(detalle => detalle.nombre)
            .join("-");
          
            const detalle = valores;
          
          return { "id": parseInt(id), "pedido": pedido, "total": total, "detalle": detalle };
        })
      }
      return historial(this.detalles);
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
