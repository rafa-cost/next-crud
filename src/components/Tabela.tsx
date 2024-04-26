import Cliente from "../core/Cliente";                                         //importando Cliente 
import { IconeEdicao , IconeLixo} from "./Icones";                             //importando Icones(as figuras de ações)

interface TabelaProps {
    clientes: Cliente[]
    clienteSelecionado?: (cliente: Cliente) => void                            //criamos essa função e a de baixo em index.tsx. Aqui observamos que a função esta vazia. Lembrando quando tem esse ponto de "?" não é uma função obrigatoria, ou seja o usuario não é obrigado a executala
    clienteExcluido?: (cliente: Cliente) => void
}


export default function Tabela(props: TabelaProps) {                         
    const exibirAcoes = props.clienteExcluido || props.clienteSelecionado

    function renderizarCabecalho() {                                          //função renderizar cabeçalho da tabela
        return (
            <tr>
            <th className="text-left p-4">Código</th>                         
            <th className="text-left p-4">Nome</th>
            <th className="text-left p-4">Idade</th>
            {exibirAcoes ? <th className="p-4">Ações</th> : false}            
        </tr>                                                                 /*aqui no caso , se sim exibir as ações , caso contrario retorna false */
        )
    }

    function renderizarDados() {                                                                      //Função renderizar dados. Renderizando os dados da tabela em suas respectivas colunas
        return props.clientes?.map((cliente, i) => {                                                  
            return (                                                                                 
                <tr key={cliente.id}
                    className={`${i % 2 === 0 ? 'bg-purple-200' : 'bg-purple-100'}`}>              
                    <td className="text-left p-4">{cliente.id}</td>                                    
                    <td className="text-left p-4">{cliente.nome}</td>
                    <td className="text-left p-4">{cliente.idade}</td>
                    {exibirAcoes ? renderizarAcoes(cliente) : false}                                  
                </tr>                                                                                
            )
        })
    }
    function renderizarAcoes(cliente: Cliente) {                                                     
        return (
            <td className="flex justify-center">                                                      
                {props.clienteSelecionado ? (                                                        
        <button onClick={() => props.clienteSelecionado?.(cliente)} className={'flex justify-center items-center text-green-600 rounded-full p-2 m-1 hover:bg-purple-50'}>  
            {IconeEdicao}                                                                              
            </button>
        ) : false}
              {props.clienteExcluido ? (                                                               
        <button onClick={() => props.clienteExcluido?.(cliente)} className={'flex justify-center items-center text-red-500 rounded-full p-2 m-1 hover:bg-purple-50'}>      
            {IconeLixo}                                                                               
            </button>
        ) : false}    
            </td>
        )
    }

    return (                                                                                           //retornando a tabela com cabeçalho e os dados
        <table className="w-full rounded-xl overflow-hidden">                                          
            <thead className={` text-gray-100 bg-gradient-to-r from-purple-500 to-purple-800`}>  
            {renderizarCabecalho()}
            </thead>
            <tbody>
                {renderizarDados()}
            </tbody>
         
        </table>
    )
}