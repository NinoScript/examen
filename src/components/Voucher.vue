<template>
  <div>
    <h1>Voucher</h1>
    <div>Pedido Número: {{datos.pedido}}</div>
    
  <div>
    <table class="greenTable">
      <tr>
        <th>Carretera</th>
        <th>Cantidad</th>
      </tr>
      <tr v-for="detalle, i in datos.detalles">
        <td>{{detalle.nombre}}</td>
        <td>
          {{detalle.cantidad}}
        </td>
      </tr>
    </table>
  </div>

   <h2>Total a Pagar ${{total}}</h2>
   <br/>
   Opción de Envío: {{datos.retiro}}
   <br/>
   Muchas Gracias por preferirnos
  </div>
  
</template>

<script>
export default {
  name: 'Voucher',
  data () {
    return {
    }
  },
  props: ['datos'],
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
