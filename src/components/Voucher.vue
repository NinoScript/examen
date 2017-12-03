<template>
  <div>
    <h1>Voucher</h1>
    <div>Pedido Número: {{pedido}}</div>
    
  <div>
    <table>
      <tr>
        <th>Carretera</th>
        <th>Cantidad</th>
      </tr>
      <tr v-for="detalle, i in detalles">
        <td>{{detalle.nombre}}</td>
        <td>
          {{detalle.cantidad}}
        </td>
      </tr>
    </table>
  </div>
    
   Total a Pagar $ {{total}}
   <br/>
   Opción de Envío: {{retiro}}
   <br/>
   Muchas Gracias por preferirnos
  </div>
  
</template>

<script>
export default {
  name: 'Voucher',
  data () {
    return {
      pedido: 10000,
      detalles: 
      [
        {id:1,nombre:"Ruta 18",precio:100000,cantidad:2},
        {id:3,nombre:"Ruta 38",precio:300000,cantidad:4},
        {id:2,nombre:"Ruta 28",precio:200000,cantidad:1},
        {id:2,nombre:"Ruta 28",precio:200000,cantidad:8}
      ],
      retiro: "Oficina"
    }
  },
  methods: {
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
