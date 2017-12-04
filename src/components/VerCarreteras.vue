<template>
  <div>
    <h1>Ver Carreteras</h1>
    <div>
      <h2>Ruta 68</h2>
      <iframe
        width="550"
        height="300"
        frameborder="0" style="border:0"
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCPpU9xywkETFG03xmgRvPuqSsFBbA1ViQ
          &q=Ruta+68,Chile" allowfullscreen>
      </iframe>
    </div>
    <div>
      <h2>Autopista del Sol</h2>
      <iframe
        width="550"
        height="300"
        frameborder="0" style="border:0"
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCPpU9xywkETFG03xmgRvPuqSsFBbA1ViQ
          &q=Ruta+del+Sol,Chile" allowfullscreen>
      </iframe>
    </div>
    <div>
      <h2>Guardia Vieja</h2>
      <iframe
        width="550"
        height="300"
        frameborder="0" style="border:0"
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCPpU9xywkETFG03xmgRvPuqSsFBbA1ViQ
          &q=guardia+vieja,Chile" allowfullscreen>
      </iframe>
    </div>
    <div>
      <h2>Troncal Sur</h2>
      <iframe
        width="550"
        height="300"
        frameborder="0" style="border:0"
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCPpU9xywkETFG03xmgRvPuqSsFBbA1ViQ
          &q=Troncal+Sur,Chile" allowfullscreen>
      </iframe>
    </div>
   
  </div>
  
</template>

<script>
export default {
  name: 'VerCarreteras',
  data () {
    return {
      usuario: {
        nombre: "Perez Ltda",
        rut: "12.345.678-K",
        direccion: "4 Norte 1329, Viña del Mar",
        encargado: "Juanito Perez"
      }
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
