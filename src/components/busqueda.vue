<template lang="html">
  <div class="">
    Busqueda <br>
    <q-autocomplete v-model="escuela" @search="buscar" :delay="100"></q-autocomplete>
    <br>
    <button type="button" @click="prueba" name="button">Prueba</button>
    {{ escuela }}
  </div>
</template>

<script>
// import { Utils } from 'quasar'
import { _root } from '../main'

function parseEscuelas (vm) {
  return vm.lista.map(escuela => {
    return {
      value: escuela,
      label: escuela
    }
  })
}
function filtro (terms, {field, list}) {
  const token = terms.toLowerCase()
  return list.filter(item => ('' + item[field]).toLowerCase().includes(token))
}

export default {
  data () {
    return {
      info: 1,
      escuela: '',
      database: this.$root.database,
      lista: []
    }
  },
  created () {
    // TODO Falta hacer la funcion para busqueda de la base de datos y mostrar la informacion.
    var vm = this
    _root.database.ref('busqueda').once('value').then(function (dataSnapshot) {
      vm.lista = dataSnapshot.val()
    })
  },
  methods: {
    prueba () {
      _root.log()
      _root.database.ref('busqueda').once('value').then(function (dataSnapshot) {
        console.log(dataSnapshot.val())
      })
    },
    buscar (terms, done) {
      var vm = this
      setTimeout(() => {
        done(filtro(terms, {field: 'value', list: parseEscuelas(vm)}))
      }, 500)
    }
  }
}
</script>

<style lang="css">
</style>
