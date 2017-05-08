<template>
	<div class="layout-view">
		<div>
			<div class="row justify-center sm-collumn pacientes">
				<div class="card submenu">
					<div class="card-title">Submenu Pacientes</div>
					<div class="card-content">Submenu</div>	
				</div>
				<div class="card listapacientes">
					<div class="card-title">Lista de Pacientes</div>
					<div class="">
						<paciente id="000000001"></paciente>
						<paciente id="000000001"></paciente>
						{{ pacientes }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { _root } from '../main'

var edad = _root.calcularEdad('24102014')
console.log('funciona funciones dentro de pacientes')
console.log(edad)

	export default {
		data () {
			return {
				pacientes: {
					'000000001': edad
				}
			}
		}
	}

</script>

<style scoped>
	.pacientes{
		padding-top: 1em;
	}
	paciente {
		margin-right: 1em;
	}
	.card {
		margin: .4em;
	 background-color: white;
	}
	.submenu {
		flex-basis: 30%;
		max-width: 300px;
	}
	.listapacientes {
  flex-wrap: wrap;
  justify-content: center;
  overflow-y: auto;
  height: 70vh;
  max-width: 700px;
 }  
</style>