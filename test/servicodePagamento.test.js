import ServicoDePagamento from '../src/servicoDePagamento.js';
import assert from 'node:assert';

describe('Classe de Serviço de Pagamento', () => {
    describe('Método de realizar pagamento', () => {
        it('Validar que o pagamento é adicionado na lista de pagamentos', function () {
            const codigoBarras = '0987-7656-3475';
            const empresa = 'Samar';
            const valor = 156.87;
            const servicoDePagamento = new ServicoDePagamento();

            servicoDePagamento.pagar(codigoBarras, empresa, valor);
            const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();

            assert.equal(ultimoPagamento.codigoBarras, codigoBarras);
            assert.equal(ultimoPagamento.empresa, empresa);
            assert.equal(ultimoPagamento.valor, valor);
        });

        it('Validar que a propriedade categoria é salva como "cara" quando o valor pago é maior que 100', function () {
            const codigoBarras = '0987-7656-3475';
            const empresa = 'Samar';
            const valor = 156.87;
            const categoria = 'cara';
            const servicoDePagamento = new ServicoDePagamento();

            servicoDePagamento.pagar(codigoBarras, empresa, valor);
            const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();

            assert.equal(ultimoPagamento.categoria, categoria);
        });

        it('Validar que a propriedade categoria é salva como "padrão" quando o valor pago é menor ou igual a 100', function () {
            const codigoBarras = '0987-7656-3475';
            const empresa = 'Samar';
            const valor = 100;
            const categoria = 'padrão';
            const servicoDePagamento = new ServicoDePagamento();

            servicoDePagamento.pagar(codigoBarras, empresa, valor);
            const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();

            assert.equal(ultimoPagamento.categoria, categoria);
        });
    });

    describe('Método de consulta do último pagamento', () => {
        it('Validar que o método de consulta do último pagamento está retornando o último pagamento com os dados corretos', function () {
            const codigoBarrasUltimoPagamento = '2387-0648-9963';
            const empresaUltimoPagamento = 'Loggi';
            const valorUltimoPagamento = 170;
            const categoriaUltimoPagamento = 'cara';
            const servicoDePagamento = new ServicoDePagamento();

            servicoDePagamento.pagar('6615-8621-4402', 'Sedex', 80);
            servicoDePagamento.pagar('8652-9001-3774', 'PAC', 90);
            servicoDePagamento.pagar(codigoBarrasUltimoPagamento, empresaUltimoPagamento, valorUltimoPagamento);
            const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();

            assert.equal(ultimoPagamento.codigoBarras, codigoBarrasUltimoPagamento);
            assert.equal(ultimoPagamento.empresa, empresaUltimoPagamento);
            assert.equal(ultimoPagamento.valor, valorUltimoPagamento);
            assert.equal(ultimoPagamento.categoria, categoriaUltimoPagamento);
        });
    });
});