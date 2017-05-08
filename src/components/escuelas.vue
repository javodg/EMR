<template>
  <div class="layout-view">
    <q-parallax :src="'statics/escuela3.jpg'" :height="200" class="text-center">
      <div slot="loading">Loading...</div>
      <h2 class="text-white fit">Especial de Escuelas</h2>
      <h3 class="capitalize text-white">{{ $route.params.id }}</h3> </q-parallax>
    <div>
      <div class="row gutter justify-center sm-column">
        <div class="card card-busqueda">
          <div class="card-content">
            <h6><small>Categorias:</small></h6>
            <q-select type="list" v-model="categoria" @input="$router.push(categoria)" :options="selectOptions" class="fit"></q-select>
            <!--
            TODO Terminar la busqueda
            <busqueda database="algo"></busqueda>
            <q-search v-model="searchModel"></q-search>
            <button class="bg-light-green text-white small fit" @click="buscar(searchModel)"><i class="on-left">search</i>Buscar</button>
            -->
            <hr>
            <!-- TODO Arreglart el rating -->
            <!--
            <div class="categoria-component text-justify">
              <label v-for='ii in 5' class="block">
                <q-radio v-model="grade" :val="6-ii"></q-radio>
                <template v-for='i in 5'>
                  <i v-if='6-i>=ii' class="text-yellow-9 big">grade</i>
                  <i v-else class="text-black big">grade</i>
                </template>
                <span class="resultados text-right">({{ numeroEscuelas[ii-1] }})</span>
              </label>
            </div>
            <hr>
            -->
            <button class="text-white small fit" :class="'bg-' + colorprincipal" v-link="'/nuevaEscuela'"> Nueva escuela </button>
          </div>
        </div>
        <div class="card card-resultados no-padding">
          <gmap-map ref="mapaescuelas" :center="center" :zoom="15" style="width: 100%" class="card-media mapa gt-sm auto" @click="clicklog"> </gmap-map>
          <div class="card-content resultados">
            <fichaescuela v-for="escuela in infoRender" :escuela="escuela" :key="escuela.id" fichatipo="1"></fichaescuela>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { _root } from '../main'
export default {
  methods: {
    clicklog() {
      console.log('mapa')
    },
    enumerar(escuela) {
      let cats = escuela.categoria
      let temp = []
      for (var key in cats) {
        if (cats[key]) {
          temp.push(key)
        }
      }
      return temp
    },
    cats(id) {
      // Toma informacion de la base de datos segun categoria
      var vm = this // ingresa la el objeto de VUE a la funcion
        // Ingresa el query segun categoria
      vm.categoria = this.$route.params.id
        // Query para todas las escuelas
      if (vm.categoria === 'todas') {
        this.database.ref('escuela').once('value').then(function(dataSnapshot) {
          // console.log(dataSnapshot.val())
          vm.infoRender = dataSnapshot.val() // pasa los resultados de la busqueda al objeto para hacer el Render
        })
      } else {
        this.database.ref('escuela').orderByChild('categoria/' + this.categoria).equalTo(true).once('value').then(function(dataSnapshot) {
          // console.log(dataSnapshot.val())
          vm.infoRender = dataSnapshot.val() // pasa los resultados de la busqueda al objeto para hacer el Render
        })
      }
    },
    buscar(query) {
      // TODO Falta hacer la funcion para busqueda de la base de datos y mostrar la informacion.
      console.log(query)
      this.database.ref('escuela').orderByChild('nombre/').endAt(query + '\uf8ff').once('value').then(function(dataSnapshot) {
        console.log(dataSnapshot.val())
          // vm.infoRender = dataSnapshot.val() // pasa los resultados de la busqueda al objeto para hacer el Render
      })
    }
  },
  created() {
    // fetch the data when the view is created and the data is
    this.cats()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'cats'
  },
  data() {
    return {
      center: {
        lat: 19.6723463,
        lng: -99.017131
      },
      database: this.$root.database,
      categoria: this.$route.params.id,
      searchModel: '',
      infoRender: [],
      selectOptions: _root.catEscuelas,
      numeroEscuelas: ['21', '23', '12', '4', '1'],
      grade: '5'
    }
  }
}
</script>
<style scoped>
  .w80 {
    flex-basis: auto;
    width: 100%;
    padding: 0 !important;
  }

  .mapa {
    background-color: #ccc;
    margin: 0;
    padding: 0;
    height: 30vh;
    position: relative;
    overflow: hidden;
  }

  .mapa>button {
    margin: 0;
    position: absolute;
    bottom: 25px;
    right: 32px;
  }

  .resultados {
    flex-wrap: wrap;
    justify-content: center;
    overflow-y: auto;
    height: 70vh;
  }

  .card {
    margin: .4em;
    background-color: white;
  }

  .card-busqueda {
    flex-basis: 20em;
  }

  .card-resultados {
    flex-basis: 65em;
    height: 100vh;
  }

  .q-parallax {
    background-color: rgba(50, 50, 50, 0.5);
  }

  .big {
    font-size: 1.2em;
  }

  .categoria-component span {
    display: inline-block;
    width: 4em;
  }

  .categoria-component span.resultados {
    float: right;
  }

  button.primary.small {
    margin-top: .6em;
  }

  .q-picker-textfield {
    height: 38px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    border-radius: 2px;
    border: 0;
    outline: 0;
    margin-bottom: .4em;
    color: #222;
    padding-left: .4em;
  }

  .q-picker-textfield::after {
    right: .4em;
  }
</style>
