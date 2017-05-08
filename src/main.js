// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

import Vue from 'vue'
import Quasar from 'quasar'
import router from './router'
import Firebase from 'firebase'
import moment from 'moment'
import Vuex from 'vuex'
import 'normalize.css'

moment.locale()

// Inicio de coneccion con firebase
const config = {
  apiKey: 'AIzaSyAnhW4JuxrRahLlnRUU2FVmGTa_3HoWZgQ',
  authDomain: 'colegiosmexico.firebaseapp.com',
  databaseURL: 'https://colegiosmexico.firebaseio.com',
  storageBucket: 'colegiosmexico.appspot.com',
  messagingSenderId: '868558740161'
}
var appInit = Firebase.initializeApp(config, 'database')

export const _root =  { // constantes sin reactividad
  hoy: moment(),
  calcularEdad (fecha) {
    var F = moment(fecha,'DDMMYYYY')
    var diff = moment().diff(F)
    var duracion = moment.duration(diff)
    var edad
    if(moment().diff(F,'years') <= 5) edad = duracion.years() + ' años ' + duracion.months() + ' meses'
    else edad = duracion.years()
    return edad
  },
  colorprincipal: 'blue',
  database: appInit.database(), // Inicio de database
  storage: appInit.storage(), // inicio de storage
  catEscuelas: [
    { label: 'Estancias', value: 'estancia' },
    { label: 'Kinder', value: 'kinder' },
    { label: 'Primarias', value: 'primaria' },
    { label: 'Secundarias', value: 'secundaria' },
    { label: 'Preparatorias', value: 'preparatoria' }
  ]
}
Vue.config.productionTip = false

// Inicio de store general
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    count: 0,
    database: appInit.database(), // Inicio de database
    storage: appInit.storage(), // inicio de storage
    escuelas: {
      escuelaactual: {
        categoria: {
          estancia: false,
          kinder: false,
          preparatoria: false,
          primaria: false,
          secundaria: false,
          universidad: false
        },
        imageref: '',
        descripcion: '',
        direccion: '',
        mail: '',
        nombre: '',
        rating: '',
        social: {
          facebook: '',
          foursquare: ''
        },
        telefono: '',
        web: '',
        lat: 'a',
        lng: 'a'
      }
    }
  },
  mutations: {
    increment: state => state.count++,
    decrement: state => state.count--,
    query (state) {
      // var vm = this // ingresa la el objeto de VUE a la funcion
      var id = this.$route.params.id
      _root.database.ref('escuela').orderByKey().equalTo(id).on('value', function (dataSnapshot) {
        // console.log(dataSnapshot.val())
        state.escuelas.escuelaactual = dataSnapshot.exportVal() // pasa los resultados de la busqueda al objeto para hacer el Render
      })
    }
  }
})

// Inicio de caja de busqueda autocompletable
// TODO pendiente terminar funcion de busqueda y visualizacion de resultados
import busqueda from './components/busqueda'
Vue.component('busqueda', busqueda)

// TODO buscar toas la referencias de estas variable para eliminarlas. Estas variables ya son inservibles
var appDB = appInit.database()
// var bus = appInit.database()
// TODO quitar las funciones de debug del resto de componentes.
Firebase.database.enableLogging(function (message) {console.debug('[FIREBASE]', message)})

// Inicio de mapas
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDnqNEymj4RcippDywy4G4r_Iu9j40sjHA',
    v: '3'
  }
})

// Mis componenets
import fichaescuela from 'components/fichaescuela'
Vue.component('fichaescuela', fichaescuela)

import paciente from 'components/paciente.vue'
Vue.component('paciente', paciente)

// FontAwesome icons
// import Icon from 'vue-awesome/components/Icon.vue'
// Vue.component('icon', Icon)

Vue.use(Quasar) // Install Quasar Framework
// var mainAPP

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({ // eslint-disable
    el: '#q-app',
    data () {
      return {
        algo: 'asdasd',
        database: appDB
      }
    },
    router,
    render: h => h(require('./App'))
  })
})
