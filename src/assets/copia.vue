<template>
<div class="container mt-5">
  <div class="text-center">
    <h1>ToDoList</h1>
    <div class="row d-flex justify-content-center">
      <div class="col-3">
        <label for="desc">Descrição</label>
        <input class="form-control" type="text" id="desc" v-model="state.novaTarefa">
      </div>
      <div class="col-3">
        <label for="dataPrevista">Data prevista</label>
        <input class="form-control" type="date" id="dataPrevista" v-model="state.dataPrevista">
      </div>
    </div>
    <div class="alert alert-danger mt-4" role="alert" v-if="state.messageError" @click="state.messageError = ''">
      {{ state.messageError }}
    </div>
    <div class="alert alert-success mt-4" role="alert" v-if="state.messageSuccess" @click="state.messageSuccess = ''">
      {{ state.messageSuccess }}
    </div>
    <button class="btn btn-primary text-center mt-3" @click="salvar" v-if="state.posEdit == null">Cadastrar</button>
    <button class="btn btn-danger text-center mt-3 mr-3" @click="cancelar" v-if="state.posEdit !== null">Cancelar</button>
    <button class="btn btn-primary text-center mt-3" @click="editarDo" v-if="state.posEdit !== null">Atualizar</button>
  </div>
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
        <tr v-for="(tarefa, index) in state.listaTarefas" :key="index">
          <td>{{ tarefa.descricao }}</td>
          <td>{{ tarefa.dataInicio }}</td>
          <td>{{ tarefa.dataPrevista }}</td>
          <td>
            <span @click="editar(tarefa)" class="mr-2"><i class="nav-icon fas fa-edit"></i></span>
            <span  @click="deletar(tarefa)"><i class="fas fa-trash-alt"></i></span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

export default {
  setup () {
    const state = reactive({
      novaTarefa: '',
      dataPrevista: '',
      messageError: '',
      messageSuccess: '',
      posEdit: null,
      listaTarefas: JSON.parse(localStorage.getItem('listaTarefa')) ?? []
    })

    function salvar () {
      if (state.novaTarefa && state.dataPrevista) {
        state.listaTarefas.push({
          descricao: state.novaTarefa,
          dataPrevista: state.dataPrevista,
          dataInicio: new Date().toISOString().slice(0, 10)
        })
        state.novaTarefa = ''
        state.dataPrevista = ''
        save()
        state.messageError = ''
        state.messageSuccess = 'Registro cadastrado com sucesso!'
      } else {
        state.messageError = 'Preencha todos os campos!'
      }
    }

    function save () {
      localStorage.setItem('listaTarefa', JSON.stringify(state.listaTarefas))
    }

    function cancelar () {
      state.novaTarefa = ''
      state.dataPrevista = ''
      state.posEdit = null
    }

    function deletar (tarefa) {
      var pos = state.listaTarefas.indexOf(tarefa)
      state.listaTarefas.splice(pos, 1)
      state.messageSuccess = 'Registro deletado com sucesso!'
      save()
    }

    function editar (tarefa) {
      var pos = state.listaTarefas.indexOf(tarefa)
      state.posEdit = pos
      state.novaTarefa = state.listaTarefas[pos].descricao
      state.dataPrevista = state.listaTarefas[pos].dataPrevista
    }

    function editarDo () {
      state.listaTarefas[state.posEdit].descricao = state.novaTarefa
      state.listaTarefas[state.posEdit].dataPrevista = state.dataPrevista
      state.messageSuccess = 'Registro atualizado com sucesso!'
      save()
      cancelar()
    }

    return {
      state,
      salvar,
      deletar,
      editar,
      cancelar,
      editarDo
    }
  }
}
</script>

<style>
</style>
