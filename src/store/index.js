import { createStore } from 'vuex'

export default createStore({
  state: {
    novaTarefa: '',
    dataPrevista: '',
    messageError: '',
    messageSuccess: '',
    posEdit: null,
    listaTarefas: JSON.parse(localStorage.getItem('listaTarefa')) ?? []
  },
  mutations: {
    clearMessages(state){
      state.messageError = ''
      state.messageSuccess = ''
    },
    salvar (state) {
      if (state.novaTarefa && state.dataPrevista) {
        state.listaTarefas.push({
          descricao: state.novaTarefa,
          dataPrevista: new Date(state.dataPrevista).toLocaleDateString("pt-BR", {timeZone: 'UTC'}),
          dataInicio: new Date().toLocaleDateString("pt-BR", {timeZone: 'UTC'})
        })
        state.novaTarefa = ''
        state.dataPrevista = ''
        this.commit('save')
        state.messageError = ''
        state.messageSuccess = 'Registro cadastrado com sucesso!'
      } else {
        state.messageError = 'Preencha todos os campos!'
      }
    },
    save (state) {
      localStorage.setItem('listaTarefa', JSON.stringify(state.listaTarefas))
    },
    cancelar (state) {
      state.novaTarefa = ''
      state.dataPrevista = ''
      state.posEdit = null
    },
    deletar (state, tarefa) {
      var pos = state.listaTarefas.indexOf(tarefa)
      state.listaTarefas.splice(pos, 1)
      state.messageSuccess = 'Registro deletado com sucesso!'
      this.commit('save')
      if(pos === state.posEdit){
        this.commit('cancelar')
      } else {
        this.state.posEdit = pos;
      }
    },
    editar (state, tarefa) {
      var pos = state.listaTarefas.indexOf(tarefa)
      state.posEdit = pos
      state.novaTarefa = state.listaTarefas[pos].descricao
      state.dataPrevista = state.listaTarefas[pos].dataPrevista
    },
    editarDo (state) {
      state.listaTarefas[state.posEdit].descricao = state.novaTarefa
      state.listaTarefas[state.posEdit].dataPrevista = state.dataPrevista
      state.messageSuccess = 'Registro atualizado com sucesso!'
      this.commit('save')
      this.commit('cancelar')
    }
  },
  actions: {
  },
  modules: {
  }
})
