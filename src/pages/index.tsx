//aqui é a pagina principal importamos todos os componentes para ca, para imprimir na pagina
import Layout from "../components/Layout";                              
import Tabela from "../components/Tabela";
import Botao from "../components/Botao";
import Formulario from "../components/Formulario";
import useClientes from "../hooks/useClientes";

export default function Home() {

  const { cliente, clientes, novoCliente, salvarCliente, selecionarCliente, excluirCliente, tabelaVisivel, exibirTabela } = useClientes()
  
  return (
    <div className={`flex justify-center items-center h-screen           
    bg-gradient-to-r from-blue-500 to-purple-500 text-white`}>     
      <Layout titulo="Cadastro Simples">                                  {/*titulo da pagina */}                 
       {tabelaVisivel ? (                                        
        <>
        <div className="flex justify-end">                                {/*alinhando o botão para o lado direito */}
        <Botao cor="green" className="mb-4" 
        onClick = {novoCliente} >Novo Cliente</Botao>         
        </div>
        <Tabela 
        clientes={clientes}                                                  
        clienteSelecionado={selecionarCliente}                         
        clienteExcluido={excluirCliente}/>                                
      </>
       ) : (
      <Formulario 
      cliente={cliente}                                                    //formulario de cliente, com seus dados 
      clienteMudou={salvarCliente}                                        
      cancelado={exibirTabela}                                             
      />
       )}
      </Layout>
    </div>
  ) 
  }