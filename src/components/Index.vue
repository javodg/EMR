<template>
<div class="layout-view">
  <q-slider arrows dots class="text-white">
    <div slot="slide" class="centered no-padding slides slide2 categorias">
      <div class="card categorias bg-white">
        <div class="card-content">
          <div class="row">
            <button :class="'bg-' + colorprincipal" v-link="'/escuelas/estancia' ">
              Estancias
            </button>
            <button :class="'bg-' + colorprincipal" v-link="'/escuelas/kinder' ">
              Kinder
            </button>
            <button :class="'bg-' + colorprincipal" v-link="'/escuelas/primaria' ">
              Primaria
            </button>
            <button :class="'bg-' + colorprincipal" v-link="'/escuelas/secundaria' ">
              Secundaria
            </button>
            <button :class="'bg-' + colorprincipal" v-link="'/escuelas/Preparatoria' ">
              Preparatoria
            </button>
            <button :class="'bg-' + colorprincipal" v-link="'/escuelas/universidad' ">
              Universidad
            </button>
          </div>
        </div>
      </div>
    </div>
    <div slot="slide" class="centered no-padding slides slide1">
      <h4 class="text-bold">Encuentra la escuela que necesitas:</h4>
      <p>Te mostramos los mejores resultados para lo que buscas.</p>
      <div class="row index-busqueda">
        <q-search v-model="searchModel" class=""></q-search>
        <q-select type="list" v-model="select" :options="selectOptions" placeholder="Categoria" class="red"></q-select>
        <button class="primary small"><i class="on-left">search</i>Buscar</button>
      </div>
    </div>
    <div slot="slide" class="centered no-padding slides slide3">
      Slide 3
    </div>
  </q-slider>
  <div class="layout-padding">
    <div class="stitched">
      Prueba de Un estilo mas "infantil".
    </div>
    <div class="card card-noticias">
      <div class="card-title text-white" :class="'bg-' + colorprincipal">
        Noticias
      </div>
      <div class="card-content card-force-top-padding" :class="'text-' + colorprincipal + '-9'">
        <h5 class="text-bold">Titulo</h5>
        <div class="row justify-around sm-column">
          <div class="auto">
            <dl class="horizontal">
              <dt><i>mail</i></dt>
              <dd>
                A description list is perfect for defining terms.
                A description list is perfect for defining terms.
              </dd>
              <dt><i>mail</i></dt>
              <dd>Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.</dd>
            </dl>
          </div>
          <div class="auto">
            <dl class="horizontal">
              <dt><i>mail</i></dt>
              <dd>A description list is perfect for defining terms.</dd>
              <dt><i>mail</i></dt>
              <dd>Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { _root } from '../main'

export default {
  data () {
    return {
      colorprincipal: _root.colorprincipal,
      searchModel: '',
      select: 'Categoria',
      selectOptions: _root.catEscuelas
    }
  }
}
</script>

<style scoped>
#map { height: 50vh; }

.card.categorias {
  max-width: 30em;

}
.card.categorias .row {
  justify-content: space-between;
  flex-wrap: wrap;
}
.card.categorias .row button {
  width: 10em;
  margin: .4em;
}
i {
  font-size: 1.6em;
}
dl.horizontal dt {
  width: 10%;
}
dl.horizontal dd {
  margin-left: 15%
}
.index-busqueda div {
  width: 15em;
  margin: auto .5em;
  /*background-color: white;
  color: grey;*/
}
.slides {
  background-position: center;
  background-repeat: no-repeat;
  background-origin: content-box;
  background-size: cover;
  height: 70vh;
}
.slide1 {
  background-image: url(~assets/images/escuela1.jpg);
}

.slide2 {
  background-image: url(~assets/images/escuela2.jpg);
}

.slide3 {
  background-image: url(~assets/images/escuela3.jpg);
}
.card-noticias {
  /* width: 70em;*/
  margin: 0 auto;
  background-color: white;
}
.q-picker-textfield {
  background-color: #fff;
  color:#222;
  padding-left: .4em;
}
.q-picker-textfield::after {
  right: .4em;
}
button.primary.small {
  margin-left: .6em;
}
</style>
