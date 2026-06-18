export default class ServicoDePagamento {
  #pagamentos
  
  constructor() {
    this.#pagamentos = [];
  }
  
  pagar(codigoBarras, empresa, valor) { 
    this.#pagamentos.push({
      codigoBarras: codigoBarras,
      empresa: empresa,
      valor: valor,
      categoria: valor > 100 ? 'cara' : 'padrão'
    });
  }
  
  consultarUltimoPagamento() {
    return this.#pagamentos.at(-1);
  }
}