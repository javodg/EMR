<template lang="html">
  <div class="layout-padding full-height">
    <div class="row md-column justify-center items-stretch">
      <div class="card formulario">
        <div class="card-title bg-white">
          Formulario
          <button class="primary small float-right" @click="actualizarInfo()">Actualizar</button>
        </div>
        <div v-if="escuela[id]" class="card-content bg-white">
          <div class="list">
            <div class="item multiple-lines">
              <div class="item-content">
                <div class="stacked-label">
                  <input class="full-width" v-model="escuela[id].nombre">
                  <label>Nombre</label>
                </div>
              </div>
            </div>
            <div class="row wrap justify-between">
              <label class="width-1of3"><q-checkbox v-model="escuela[id].categoria.estancia"></q-checkbox>Estancias</label>
              <label class="width-1of3"><q-checkbox v-model="escuela[id].categoria.kinder"></q-checkbox>Kinder</label>
              <label class="width-1of3"><q-checkbox v-model="escuela[id].categoria.primaria"></q-checkbox>Primaria</label>
              <label class="width-1of3"><q-checkbox v-model="escuela[id].categoria.secundaria"></q-checkbox>Secundaria</label>
              <label class="width-1of3"><q-checkbox v-model="escuela[id].categoria.preparatoria"></q-checkbox>Preparatoria</label>
              <label class="width-1of3"><q-checkbox v-model="escuela[id].categoria.universidad"></q-checkbox>Universidad</label>
            </div>
            <div class="item multiple-lines">
              <div class="item-content">
                <div class="stacked-label">
                  <textarea class="full-width" v-model="escuela[id].direccion"></textarea>
                  <label>Direccion:</label>
                </div>
                <div class="stacked-label">
                  <input class="full-width" v-model="escuela[id].telefono">
                  <label>Telefono:</label>
                </div>
                <div class="stacked-label">
                  <input class="full-width" v-model="escuela[id].mail">
                  <label>Correo:</label>
                </div>
                <div class="stacked-label">
                  <input class="full-width" v-model="escuela[id].web">
                  <label>Sitio web:</label>
                </div>
              </div>
            </div>
            <div class="item multiple-lines">
              <div class="item-content">
                <div class="stacked-label">
                  <textarea class="full-width descripcion" v-model="escuela[id].descripcion"></textarea>
                  <label>Descripcion:</label>
                </div>
              </div>
            </div>
            <div class="item multiple-lines">
              <div class="item-content">
                <h6>Enlaces a redes sociales.</h6>
                <div class="stacked-label" v-if="escuela[id].social">
                  <input class="full-width" v-model="escuela[id].social.facebook">
                  <label>Facebook:</label>
                </div>
              </div>
            </div>
            <button class="primary small float-right" @click="eliminarescuela()">Eliminar</button>
          </div>
        </div>
      </div>
      <div class="card ejemplo">
        <div class="card-title text-white" :class="'bg-' + colorprincipal">
          Ficha ejemplo
        </div>
        <div class="card-content bg-white flex column">
          <fichaescuela :escuela="escuela[id]" fichatipo="1"></fichaescuela>
          <gmap-map
            ref="mapa"
            :center="center"
            :zoom="15"
            style="width: 100%"
            class="auto"
            @click="clicklog">
            <gmap-marker v-if="mark.position.lat" :position="mark.position" :key="mark.id">
            </gmap-marker>
          </gmap-map>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 /* eslint-disable */

import { _root } from '../main'

export default {
  methods: {
    clicklog (mouseArgs) {
      this.mark = {
        id: 'location',
        position: {
          lat: mouseArgs.latLng.lat(),
          lng: mouseArgs.latLng.lng()
        }
      }
      this.escuela[this.$route.params.id].lat = mouseArgs.latLng.lat()
      this.escuela[this.$route.params.id].lng = mouseArgs.latLng.lng()
      console.log(mouseArgs.latLng.lat())
      console.log(mouseArgs.latLng.lng())
    },
    eliminarescuela () {
      let vm = this
      let id = this.$route.params.id
      let name = vm.escuela.nombre
      _root.database.ref('escuela/' + id).remove().then(function () {
        window.history.go(-1)
        console.log('Se elimino ' + name)
      }).catch(function (error) {
        console.log('Remove failed: ' + error.message)
      })
    },
    query () {
      var vm = this // ingresa la el objeto de VUE a la funcion
      vm.id = this.$route.params.id
      _root.database.ref('escuela').orderByKey().equalTo(vm.id).on('value', function (dataSnapshot) {
        // console.log(dataSnapshot.val())
        vm.escuela = dataSnapshot.exportVal() // pasa los resultados de la busqueda al objeto para hacer el Render
        // Ingresa los datos de latlng si existen, si no pasa strings vacias.
        vm.mark.position.lat = vm.escuela[vm.id].lat ? vm.escuela[vm.id].lat : ''
        vm.mark.position.lng = vm.escuela[vm.id].lng ? vm.escuela[vm.id].lng : ''
        // Centra el mapa al marcador
        vm.center.lat = vm.mark.position.lat
        vm.center.lng = vm.mark.position.lng
        // Inicio de arreglo para porblema social
        // TODO falta arreglar las otras redes sociales, solo funciona facebook
        if (!vm.escuela[vm.id].social) {
          console.log('falta social')
          vm.escuela[vm.id][ 'social' ] = { facebook: '' }
          console.log(vm.escuela.social)
        }
        var arraytemp = ['estancia', 'kinder', 'primaria', 'secundaria', 'preparatoria', 'universidad']
        for (var i = 0; i < arraytemp.length; i++) {
          if (vm.escuela[vm.id].categoria[ '' + arraytemp[i] ] === undefined) {
            console.log('falta ' + arraytemp[i])
            vm.escuela[vm.id].categoria[ '' + arraytemp[i] ] = false
          }
        }
      })
    },
    actualizarInfo () {
      var vm = this // ingresa la el objeto de VUE a la funcion
      vm.id = this.$route.params.id
      console.log(vm.escuela[vm.id])
      _root.database.ref('escuela/' + vm.id).set(vm.escuela[vm.id], function () {
        window.history.go(-1)
      })
    }
  },
  created () {
    // fetch the data when the view is created and the data is
    this.query()
    //  store.commit('querry')
  },
  watch: {
    // call again the method if the route changes
    '$route': 'query'
  },
  data () {
    return {
      colorprincipal: _root.colorprincipal,
      id: this.$route.params.id,
      center: {
        lat: 19.6723463,
        lng: -99.017131
      },
      escuela: {},
      mark: {
        'id': 'location',
        'position': {
          'lat': '',
          'lng': ''
        }
      }
    }
  }
}
</script>

<style lang="css" scoped>

.ejemplo {
  flex-basis: 60em;
}
.card.formulario {
  flex-basis: 30em;
}
.card-content {
  height: 100%;
}
.resultado {
  height: 15em;
}
.resultado-logo {
  width: 20em;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .5);
  height: 14em;
}
.resultado-logo .logo {
  height: 12.5em;
  margin: 0 auto;
  padding: .4em;
  text-align: center;
  display: block;
}

.resultado-logo .calificacion {
  height: 1.5em;
  background-color: #333;
  text-align: center;
  display: block;
}

.resultado .titulo {
  width: 100%;
  min-height: 0;
}

.resultado .titulo small {
  font-size: .8em;
  font-style: italic;
}

.resultado .cuerpo {
  width: 100%;
  padding: .8em;
}

.resultado .cuerpo .descripcion {
  margin-bottom: .8em;
  text-align: justify;
}
.resultado .cuerpo .datos-contacto {
  width: 100%;
}
.resultado .cuerpo .datos-contacto span {
  display: inline-block;
  width: 35em;
}
.resultado .cuerpo .datos-contacto > span:first-child {
  vertical-align: top;
  font-weight: bold;
  width: 5.5em;
}
.resultado .titulo>.nombre {
  font-size: 1.2em;
  font-weight: bold;
  float: left;
}

.resultado .titulo>.social {
  float: right;
  height: 1.4em;
}
textarea.descripcion {
  height: 6em;
}
</style>
