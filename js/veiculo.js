function formatarCPF(campo) {
    campo.value = campo.value.replace(/\D/g, '') // Remove tudo o que não é dígito
        .replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto entre o terceiro e o quarto dígitos
        .replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto entre o sexto e o sétimo dígitos
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Coloca um traço entre o nono e o décimo dígitos, se houver
}

class Veiculo {
    constructor() { //é chamado toda vez que a classe é instanciada
        this.veiculos = JSON.parse(localStorage.getItem('tbVeiculos')) || []
    }

    static fields = ['nome', 'cpf', 'carro', 'placa', 'dataServ', 'valorServ', 'servicoPrestado']

    salva(veiculo) {
        // Formatando o CPF para armazenamento
        veiculo.cpf = document.getElementById('cpf').value.replace(/\D/g, '');
        if (document.getElementById('nome').getAttribute('disabled') === 'disabled') {
            this.apaga(veiculo.nome)
        }
        this.veiculos.push(veiculo)
        localStorage.setItem("tbVeiculos", JSON.stringify(this.veiculos))
        veiculo.cpf = veiculo.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

        alert('Serviço salvo com sucesso ✔')
        this.limpa()
        return true
    }

    apaga(nome) {
        let index = this.veiculos.findIndex(veiculo => veiculo.nome == nome)
        this.veiculos.splice(index, 1) //o 1o parâmetro é o índice do array e o segundo o número de itens que serão removidos
        localStorage.setItem("tbVeiculos", JSON.stringify(this.veiculos))
        veiculo.atualiza()
    }

    limpa() {
        document.getElementById('nome').value = ''
        document.getElementById('cpf').value = ''
        document.getElementById('carro').value = ''
        document.getElementById('placa').value = ''
        document.getElementById('dataServ').value = ''
        document.getElementById('valorServ').value = ''
        document.getElementById('servicoPrestado').value = ''
    }

    edita(veiculo) {
        document.getElementById('nome').value = veiculo.nome
        document.getElementById('cpf').value = veiculo.cpf
        document.getElementById('carro').value = veiculo.carro
        document.getElementById('placa').value = veiculo.placa
        document.getElementById('dataServ').value = veiculo.dataServ
        document.getElementById('valorServ').value = veiculo.valorServ
        document.getElementById('servicoPrestado').checked = veiculo.servicoPrestado

        // Reassociar os eventos de clique aos botões "Salvar" e "Cancelar"
        const salvarButton = document.getElementById('salvar');
        const cancelarButton = document.getElementById('cancelar');
        salvarButton.onclick = () => {
            const registro = {
                nome: document.getElementById('nome').value,
                cpf: document.getElementById('cpf').value,
                carro: document.getElementById('carro').value,
                placa: document.getElementById('placa').value,
                dataServ: document.getElementById('dataServ').value,
                valorServ: document.getElementById('valorServ').value,
                servicoPrestado: document.getElementById('servicoPrestado').value
            };
            if (registro.nome == '') {
                alert('Favor inserir o Nome');
                return;
            }
            if (registro.cpf == '') {
                alert('Favor insirir o CPF');
                return;
            }
            if (registro.carro == '') {
                alert('Favor insirir o modelo do carro');
                return;
            }
            if (registro.placa == '') {
                alert('Favor insirir a placa do veículo');
                return;
            }
            if (registro.dataServ == '') {
                alert('Favor informar a data em que o serviço foi prestado');
                return;
            }
            if (registro.valorServ <= 0) {
                alert('Favor informar o valor cobrado pelo serviço');
                return;
            }
            if (registro.servicoPrestado == '') {
                alert('Favor informar a descrição sobre os serviços prestados');
                return;
            }

            // Salvar os dados
            veiculo.salva(registro);

            // Limpar os campos após salvar
            this.limpa();
        };
        cancelarButton.onclick = () => {
            // Limpar os campos ao cancelar
            this.limpa();
        };
    }

    lista() {
        const tbody = document.getElementById('listaVeiculos')
        const linhas = this.veiculos.map((veiculo, index) => (
            `<tr>
                <td>${veiculo.nome}</td>
                <td>${veiculo.cpf}</td>
                <td>${veiculo.carro}</td>
                <td>${veiculo.placa}</td>
                <td>${new Date(veiculo.dataServ).toLocaleDateString()}</td>
                <td>${veiculo.valorServ}</td>
                <td>${veiculo.servicoPrestado}</td>
                <td>
                    <button onClick='veiculo.apaga(${index})'>🗑️Apagar</button>
                    <button onClick='veiculo.edita(${JSON.stringify(veiculo)})'>📝Editar</button>
                </td>    
            </tr>`
        ))
        tbody.innerHTML = linhas.join('')
    }

    atualiza() {
        document.getElementById('tbVeiculos').innerHTML = veiculo.lista()
    }

}

const veiculo = new Veiculo()

document.getElementById('salvar').addEventListener('click', (event) => {
    event.preventDefault(); //evita que a página seja recarregada
    const registro = {
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        carro: document.getElementById('carro').value,
        placa: document.getElementById('placa').value,
        dataServ: document.getElementById('dataServ').value,
        valorServ: document.getElementById('valorServ').value,
        servicoPrestado: document.getElementById('servicoPrestado').value
    };
    if (registro.nome == '') {
        alert('Favor inserir o Nome');
        return;
    }
    if (registro.cpf == '') {
        alert('Favor insirir o CPF');
        return;
    }
    if (registro.carro == '') {
        alert('Favor insirir o modelo do carro');
        return;
    }
    if (registro.placa == '') {
        alert('Favor insirir a placa do veículo');
        return;
    }
    if (registro.dataServ == '') {
        alert('Favor informar a data em que o serviço foi prestado');
        return;
    }
    if (registro.valorServ == '') {
        alert('Favor informar o valor cobrado pelo serviço');
        return;
    }
    if (registro.servicoPrestado == '') {
        alert('Favor informar a descrição sobre os serviços prestados');
        return;
    }

    //salvando os dados
    veiculo.salva(registro);

    // Limpar os campos após salvar
    veiculo.limpa();
});

//Carregar a listagem no momento que carregar a página
window.onload = function () {
    veiculo.lista()
}