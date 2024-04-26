                                                         
export default class Cliente {                                 //aqui abaixo são os tipos dos dados
    #id: string
    #nome: string
    #idade: number

constructor(nome: string, idade: number, id: string = null) {  //função construtor
    this.#nome = nome
    this.#idade = idade
    this.#id = id
}

static vazio() {                                               
    return new Cliente('', 0)
}

get id() {
    return this.#id
}

get nome() {
    return this.#nome
}

get idade() {
    return this.#idade
}

}