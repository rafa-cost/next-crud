
//vamos usar a maioria dessas logicas no useCliente.ts
import firebase from "../config";
import Cliente from "../../core/Cliente";
import ClienteRepositorio from "../../core/ClienteRepositorio";

export default class ColecaoCliente implements ClienteRepositorio {      
    #conversor = {
        toFirestore(cliente: Cliente) {
            return {
                nome: cliente.nome,
                idade: cliente.idade,
            }
        },
        fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Cliente {            
        const dados = snapshot.data(options)
        return new Cliente(dados.nome, dados.idade, snapshot.id)
    }
}

    async salvar(cliente: Cliente): Promise<Cliente> {                    //logica do botão salvar
        if(cliente?.id) {                                                 
           await this.colecao().doc(cliente.id).set(cliente)
           return cliente                                                  //se tiver tudo certo eu retorno o cliente que eu recebi como parametro
        } else {                                                          
            const docRef = await this.colecao().add(cliente)
            const doc = await docRef.get()
            return doc.data()
        }        
    }
    async excluir(cliente: Cliente): Promise<void> {                      //logica do botão excluir
        return this.colecao().doc(cliente.id).delete()
    }
    async obterTodos(): Promise<Cliente[]> {                              
        const query = await this.colecao().get()
        return query.docs.map(doc => doc.data()) ?? []                    
    }
    private colecao() {
        return firebase
        .firestore().collection('clientes')
        .withConverter(this.#conversor)
    }
}
