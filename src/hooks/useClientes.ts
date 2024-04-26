import ColecaoCliente from "../backend/db/ColecaoCliente"
import Cliente from "../core/Cliente"
import ClienteRepositorio from "../core/ClienteRepositorio"
import { useEffect, useState } from "react";
import useTabelaOuForm from "./useTabelaOuForm";

export default function useClientes() {
const repo: ClienteRepositorio = new ColecaoCliente()                    

const {tabelaVisivel, exibirTabela, exibirFormulario} = useTabelaOuForm()   

  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())         
  const [clientes, setClientes] = useState<Cliente[]>([])                  
  
  useEffect(obterTodos, [] )

  function obterTodos() {                                                 
    repo.obterTodos().then(clientes => {                           
      setClientes(clientes)                                               
      exibirTabela()                                                   
    })
  }

  function selecionarCliente(cliente: Cliente) {                       
    setCliente(cliente)                                              
    exibirFormulario()                                                  //exibi o formulario do cliente
  }
  async function excluirCliente(cliente: Cliente) {                        
    await repo.excluir(cliente)                                              //exclui o cliente
    obterTodos()                                                             //e ja mostra a tabela sem o cliente
  }
function novoCliente() {                                              
  setCliente(Cliente.vazio())
  exibirFormulario()
}

  async function salvarCliente(cliente: Cliente) {                            //função para salvar cliente, aqui ele salva as alterações que foram feitas no formulario de cliente ja existente
    await repo.salvar(cliente)
    obterTodos()
  }


return {
    tabelaVisivel,
    cliente,
    clientes,
    novoCliente,
    salvarCliente,
    excluirCliente,
    selecionarCliente,
    obterTodos, 
    exibirTabela
}
}