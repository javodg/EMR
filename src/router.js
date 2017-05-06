import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (component) {
  return () => System.import(`components/${component}.vue`)
}

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  routes: [
    { path: '/', component: load('Index') }, // Default
    { path: '/prueba', component: load('prueba') }, // Primera prueba de router
    { path: '/escuelas/:id', component: load('escuelas'), props: true }, // Primera prueba de router
    { path: '/cursos', component: load('colors') },
    { path: '/editarescuela/:id', component: load('editarescuela') },
    { path: '/nuevaescuela', component: load('nuevaescuela') },
    { path: '*', component: load('Error404') } // Not found
  ]
})
