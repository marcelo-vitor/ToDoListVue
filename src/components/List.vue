<template>
    <div class="mt-5">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Data Criada</th>
          <th>Data Prevista</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(tarefa, index) in listaTarefas" :key="index">
          <td>{{ tarefa.descricao }}</td>
          <td>{{ tarefa.dataInicio }}</td>
          <td>{{ tarefa.dataPrevista }}</td>
          <td>
            <span @click="editar(tarefa)"><i class="nav-icon fas fa-edit"></i> - </span>
            <span  @click="deletar(tarefa)"><i class="fas fa-trash-alt"></i></span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore()

    return {
      listaTarefas: computed(() => store.state.listaTarefas),
      editar: (tarefa) => store.commit('editar', tarefa),
      deletar: (tarefa) => store.commit('deletar', tarefa)
    }
  }
}
</script>
