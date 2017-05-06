<template lang="html">
    <div v-if="escuela" class="card row ficha" :class="'ficha' + fichatipo">
      <div class="logo">
        <!-- TODO pendiente implementar la subida de imagenes -->
        <!-- <img class="logo" :src="'statics/logos/' + nuevaEscuela.nombre.replace(' ', '').replace(' ', '').toLowerCase() +'.png'" alt=""> -->
        <img class="image" :src="escuela.imageref" alt="">
        <div class="calificacion vertical-bottom">
          <template v-for="ii in 5">
            <i v-if="ii<=escuela.rating" class="text-yellow-9">grade</i>
            <i v-if="ii>escuela.rating" class="text-white">grade</i>
          </template>
        </div>
      </div>
      <div class="card-content card-force-top-padding w80">
        <div class="toolbar titulo" :style="'height:3em'" :class="colorprincipal">
          <div class="nombre">
            {{ escuela.nombre }} -
            <small v-for="categoria in enumerar(escuela)" class="capitalize" :style="'font-size:.7em'">
              {{ categoria }}
            </small>
          </div>
          <div class="social">
            <!-- TODO Primeros modificaciones a la parte social de la fiche tipo 1 -->
            <!-- TODO Provar si funcionan adecuadamente, buscar errores -->
            <router-link :to="'/editarescuela/' + id" class="text-white ">
              <i class="fa fa-cog fa-lg vertical-middle"></i>
            </router-link>
            <template v-if="escuela.social" >
              <a v-if="escuela.social.facebook" :href="escuela.social.facebook" class="text-white">
                <i class="fa fa-facebook-square fa-lg"></i>
              </a>
              <a v-if="escuela.social.twitter" :href="escuela.social.twitter" class="text-white">
                <i class="fa fa-twitter-square fa-lg"></i>
              </a>
              <a v-if="escuela.social.foursquare" :href="escuela.social.foursquare" class="text-white">
                <i class="fa fa-foursquare fa-lg"></i>
              </a>
            </template>
          </div>
        </div>
        <div class="cuerpo row">
          <div class="descripcion">
            {{ escuela.descripcion }}
          </div>
          <div class="datos-contacto">
            <div v-if="escuela.direccion">
              <span>Direccion:</span>
              <span v-if="typeof(escuela.direccion)==='string'">{{ escuela.direccion }}</span>
              <span v-else v-for="dir in escuela.direccion">
                  {{ dir }}
              </span>
            </div>
            <div v-if="escuela.telefono">
              <span>Telefono:</span>
              <span>{{ escuela.telefono }}</span>
            </div>
            <div v-if="escuela.web">
              <span>Siio Web:</span>
              <span>{{ escuela.web }}</span>
            </div>
            <div v-if="escuela.mail">
              <span>Correo:</span>
              <span>{{ escuela.mail }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { _root } from '../main'

export default {
  props: {
    escuela: { type: Object },
    fichatipo: { type: String }
  },
  methods: {
    enumerar (escuela) {
      let cats = escuela.categoria
      let temp = []
      for (var key in cats) {
        if (cats[key]) {
          temp.push(key)
        }
      }
      return temp
    }
  },
  data () {
    return {
      colorprincipal: _root.colorprincipal,
      id: 0
    }
  }
}
</script>

<style scoped>
.ficha0 {
  height: 10em;
}
.ficha1 {
  height: 12em;
}
.ficha .logo {
  width: 20em;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .5);
  height: 12em;
  display: flex;
  flex-direction: column;
}
.ficha .logo>.image {
  flex-basis: 1;
  box-sizing: border-box;
  height: 11.5em;
  margin: 0 auto;
  padding: .4em;
  text-align: center;
}

.ficha .calificacion {
  height: 1.5em;
  background-color: #333;
  text-align: center;
  display: block;
  display: none !important; /* TODO pendiente implementar sistema de rating, quitar esta linea cuando este implementado para mostrar el riting */
}

.ficha .titulo {
  width: 100%;
  min-height: 0;
}

.ficha .titulo small {
  font-size: .8em;
  font-style: italic;
}

.ficha .cuerpo {
  width: 100%;
  padding: .8em;
}

.ficha .cuerpo .descripcion,
.ficha .cuerpo .datos-contacto {
  flex-basis: 50%;
  padding: .2em;
}
.ficha .cuerpo .datos-contacto div {
  display: flex;
}
.ficha .cuerpo .datos-contacto div span:first-child {
  font-weight: bold;
  width: 5em;
}
.ficha .cuerpo .datos-contacto div span:last-child {
  flex-basis: 70%;
  font-size: .9em;
}
.ficha .titulo>.nombre {
  font-size: 1.2em;
  font-weight: bold;
  float: left;
}

.ficha .titulo>.social {
  float: right;
  height: 1.4em;
}

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
