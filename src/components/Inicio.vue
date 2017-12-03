<template>
  <div>
    <h1>Inicio</h1>
    <div>Bienvenido {{usuario.nombre}}</div>

  </div>
  
  
</template>

<script>
export default {
  name: 'Inicio',
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
  },
  beforeMount () {
  },
  computed: {
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
