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
      usuario: []
    }
  },
  methods: {
  },
  beforeMount () {
    axios.get("/JInicio").then((response) => {
      this.usuario = response.data
    }).catch(function (error) {
      console.log("fallo por esto: " + error)
    })
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
