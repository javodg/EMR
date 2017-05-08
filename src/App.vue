<template>
<!-- Don't drop "q-app" class -->
<div id="q-app">
  <div class="toolbar inverted " :class="colorprincipal">
    <img src="~assets/logovox.png" alt="" class="logovox">
    <div class="header-social float-left">
      <!-- TODO Pendiente modificar la barra social y la caja de busqueda -->
      <a href="https://www.facebook.com/El-Directorio-Comercial-190452041047611/?fref=ts" class="desktop-only">
        <i class="fa fa-facebook-square fa-2x" :class="'text-' + colorprincipal"></i>
      </a>
      <a class="desktop-only">
        <i class="fa fa-twitter-square fa-2x" :class="'text-' + colorprincipal"></i>
      </a>
      <a href="mail:ventas@voxmedia.mx" class="desktop-only">
        <i class="fa fa-envelope-square fa-2x" :class="'text-' + colorprincipal"></i>
      </a>
      <a href="tel:59387742"class="desktop-only">
        <i class="fa fa-phone-square fa-2x" :class="'text-' + colorprincipal"></i>
      </a>
      <!-- TODO Pendiente caja de busqueda principal -->
      <!-- <q-search v-model="searchModel"></q-search> -->
    </div>
  </div>
  <div class="toolbar " :class="colorprincipal">
    <button @click="$refs.leftDrawer.open()"><i>menu</i></button>
    <q-tabs class="" :class="colorprincipal" slot="navigation">
      <q-tab route="/" exact>Inicio</q-tab>
      <q-tab route="/pacientes" exact>Pacientes</q-tab>
      <q-tab route="/cursos" exact>Consultas</q-tab>
      <q-tab route="/blog" exact>Farmacia?</q-tab>
      <q-tab route="/contacto" exact>Calendario</q-tab>
    </q-tabs>
    <button @click="$refs.rightDrawer.open()"><i>more_vert</i></button>
  </div>  
  <!-- Left-side Drawer -->
  <q-drawer swipe-only ref="leftDrawer">
    <div class="toolbar">
      <q-toolbar-title>
        Vox Media
      </q-toolbar-title>
    </div>
    <div class="list no-border platform-delimiter">
      <q-drawer-link icon="mail" :to="{path: '/', exact: true}" class="hoverable-3">
        Inicio
      </q-drawer-link>
      <q-drawer-link icon="account_balance" :to="{path: '/escuelas', exact: true}" class="hoverable-3">
        Escuelas
      </q-drawer-link>
    </div>
  </q-drawer>
  <div class="layout-view">
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</div>
</template>

<script>
import { _root } from './main.js'

export default {
  data () {
    return {
      searchModel: 'Buscar',
      colorprincipal: _root.colorprincipal
    }
  }
}
</script>

<style scoped>
.logovox {
  height: 3.5em;
}
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.header-social {
  display: flex;
flex-wrap: wrap;
justify-content: space-between;
}

</style>
<style>
  html, body {
    font-size: 14px;
    background-image: url(~assets/bg.png);
  }
  .stitched {
   padding: 20px;
   margin: 10px;
   background: #ff0030;
   color: #fff;
   font-size: 21px;
   font-weight: bold;
   line-height: 1.3em;
   border: 2px dashed #fff;
   border-radius: 10px;
   box-shadow: 0 0 0 4px #ff0030, 2px 1px 6px 4px rgba(10, 10, 0, 0.5);
   text-shadow: -1px -1px #aa3030;
   font-weight: normal;
}
</style>
