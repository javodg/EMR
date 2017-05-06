<template lang="html">
  <div class="layout-padding">
    <div v-for="color in colors" class="toolbar" :class="color">
      <button @click="$refs.leftDrawer.open()"><i>menu</i></button>
      <q-tabs :class="color" slot="navigation">
        <q-tab route="/" exact>{{ color }}</q-tab>
        <q-tab route="/escuelas/todas" exact>Escuelas</q-tab>
        <q-tab route="/cursos" exact>Cursos</q-tab>
        <q-tab route="/blog" exact>Blog</q-tab>
        <q-tab route="/contacto" exact>Contacto</q-tab>
      </q-tabs>
      <button @click="$refs.rightDrawer.open()"><i>more_vert</i></button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      colors: [
        'primary', 'secondary', 'primary', 'secondary', 'tertiary',
        'positive', 'negative', 'warning', 'info', 'light', 'dark',
        'white', 'red', 'pink', 'purple', 'deep-purple', 'indigo',
        'blue', 'light-blue', 'cyan', 'teal', 'green', 'light-green',
        'lime', 'yellow', 'amber', 'light-green', 'deep-light-green', 'brown',
        'grey', 'blue-grey'
      ]
    }
  }
}
</script>

<style scoped>
.toolbar {
  margin: .5em 0;
}
</style>
