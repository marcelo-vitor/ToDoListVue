<template>
    <div class="text-center">
    <h1>ToDoList</h1>
    <div class="row d-flex justify-content-center">
      <div class="col-3">
        <label for="desc">Descrição</label>
        <input class="form-control" type="text" id="desc" v-model="novaTarefa">
      </div>
      <div class="col-3">
        <label for="dataPrevista">Data prevista</label>
        <input class="form-control" type="date" id="dataPrevista" v-model="dataPrevista">
      </div>
    </div>
    <div class="alert alert-danger mt-4" role="alert" v-if="messageError" @click="clearMessages">
      {{ messageError }}
    </div>
    <div class="alert alert-success mt-4" role="alert" v-if="messageSuccess" @click="clearMessages">
      {{ messageSuccess }}
    </div>
    <button class="btn btn-primary text-center mt-3" @click="salvar" v-if="posEdit == null">Cadastrar</button>
    <button class="btn btn-danger text-center mt-3 mx-3 mm" @click="cancelar" v-if="posEdit !== null">Cancelar</button>
    <button class="btn btn-primary text-center mt-3 mx-3 mm" @click="editarDo" v-if="posEdit !== null">Atualizar</button>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore()

    return {
      novaTarefa: computed({
        get: () => store.state.novaTarefa,
        set: (value) => store.state.novaTarefa = value 
      }),
      dataPrevista: computed({
        get: () => store.state.dataPrevista,
        set: (value) => store.state.dataPrevista = value
      }),
      messageError: computed(() => store.state.messageError),
      messageSuccess: computed(() => store.state.messageSuccess),
      posEdit: computed(() => store.state.posEdit),
      salvar: () => store.commit('salvar') ,
      cancelar: () => store.commit('cancelar'),
      editarDo: () => store.commit('editarDo'),
      clearMessages: () => store.commit('clearMessages')
    }
  }
}
</script>

<style scoped>
.mm {
  width: 90px;
}
</style>