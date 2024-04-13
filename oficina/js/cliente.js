function formatarCPF(campo) {
    campo.value = campo.value.replace(/\D/g, '') // Remove tudo o que não é dígito
        .replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto entre o terceiro e o quarto dígitos
        .replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto entre o sexto e o sétimo dígitos
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Coloca um traço entre o nono e o décimo dígitos, se houver
}

function formatarTelefone(campo) {
    campo.value = campo.value.replace(/\D/g, '') // Remove tudo o que não é dígito
        .replace(/^(\d{2})(\d)/g, '($1) $2') // Coloca parênteses em volta dos dois primeiros dígitos
        .replace(/(\d{4,5})(\d{4})$/, '$1-$2'); // Coloca um hífen entre o quarto e o quinto dígitos
}

class Cliente {
    constructor() { //é chamado toda vez que a classe é instanciada
        this.clientes = JSON.parse(localStorage.getItem('tbClientes')) || []
    }

    static fields = ['nome', 'cpf', 'telefone', 'email', 'estadoCivil', 'genero', 'veiculoProprio']

    salva(cliente) {
        // Formatando o CPF para armazenamento
        cliente.cpf = document.getElementById('cpf').value.replace(/\D/g, '');
        // Formatando o telefone para armazenamento
        cliente.telefone = document.getElementById('telefone').value.replace(/\D/g, '');

        if (document.getElementById('nome').getAttribute('disabled') === 'disabled') {
            this.apaga(cliente.nome)
        }
        this.clientes.push(cliente)
        localStorage.setItem("tbClientes", JSON.stringify(this.clientes))

        // Formatando o CPF para exibição na tabela
        cliente.cpf = cliente.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        // Formatando o telefone para exibição na tabela
        cliente.telefone = cliente.telefone.replace(/^(\d{2})(\d{4,5})(\d{4})$/, '($1) $2-$3');

        alert('Cliente salvo com sucesso ✔')
        this.limpa()
        return true
    }

    apaga(nome) {
        let index = this.clientes.findIndex(cliente => cliente.nome == nome)
        this.clientes.splice(index, 1) //o 1o parâmetro é o índice do array e o segundo o número de itens que serão removidos
        localStorage.setItem("tbClientes", JSON.stringify(this.clientes))
        cliente.atualiza()
    }

    limpa() {
        document.getElementById('nome').value = ''
        document.getElementById('cpf').value = ''
        document.getElementById('telefone').value = ''
        document.getElementById('email').value = ''
        document.getElementById('estadoCivil').value = ''
    }

    edita(cliente) {
        document.getElementById('nome').value = cliente.nome
        document.getElementById('cpf').value = cliente.cpf
        document.getElementById('telefone').value = cliente.telefone
        document.getElementById('email').value = cliente.email
        document.getElementById('estadoCivil').value = cliente.estadoCivil
        document.getElementById('genero').value = cliente.genero
        document.getElementById('veiculoProprio').checked = cliente.veiculoProprio === 'Sim'

        // Reassociar os eventos de clique aos botões "Salvar" e "Cancelar"
        const salvarButton = document.getElementById('salvar');
        const cancelarButton = document.getElementById('cancelar');
        salvarButton.onclick = () => {
            const registro = {
                nome: document.getElementById('nome').value,
                cpf: document.getElementById('cpf').value,
                telefone: document.getElementById('telefone').value,
                email: document.getElementById('email').value,
                estadoCivil: document.getElementById('estadoCivil').value,
                genero: valorGenero,
                veiculoProprio: valorVeiculo
            };
            if (registro.nome == '') {
                alert('Favor inserir o Nome');
                return;
            }
            if (registro.cpf == '') {
                alert('Favor insirir o CPF');
                return;
            }
            if (registro.telefone == '') {
                alert('Favor insirir um telefone para contato');
                return;
            }
            if (registro.email == '') {
                alert('Favor insirir um Email');
                return;
            }
            if (registro.estadocivil == '') {
                alert('Favor informar o estado civil');
                return;
            }

            // Salvar os dados
            cliente.salva(registro);

            // Limpar os campos após salvar
            this.limpa();
        };
        cancelarButton.onclick = () => {
            // Limpar os campos ao cancelar
            this.limpa();
        };
    }

    lista() {
        const tbody = document.getElementById('listaClientes')
        const linhas = this.clientes.map((cliente, index) => (
            `<tr>
                <td>${cliente.nome}</td>
                <td>${cliente.cpf}</td>
                <td>${cliente.telefone}</td>
                <td>${cliente.email}</td>
                <td>${cliente.estadoCivil}</td>
                <td>${cliente.genero}</td>
                <td>${cliente.veiculoProprio === 'Sim' ? 'Sim' : 'Não'}</td>
                <td>
                    <button onClick='cliente.apaga(${index})'>🗑️Apagar</button>
                    <button onClick='cliente.edita(${JSON.stringify(cliente)})'>📝Editar</button>
                </td>    
            </tr>`
        ))
        tbody.innerHTML = linhas.join('')
    }

    atualiza() {
        document.getElementById('tbClientes').innerHTML = cliente.lista()
    }

}

/* criando o objeto */
const cliente = new Cliente()

document.getElementById('salvar').addEventListener('click', (event) => {
    event.preventDefault(); //evita que a página seja recarregada
    let valorGenero = '';
    if (document.getElementById('masculino').checked) {
        valorGenero = 'Masculino';
    } else {
        valorGenero = 'Feminino';
    }

    let valorVeiculo = '';
    if (document.getElementById('veiculoProprio').checked) {
        valorVeiculo = 'Sim';
    } else {
        valorVeiculo = 'Não';
    }
    const registro = {
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value,
        estadoCivil: document.getElementById('estadoCivil').value,
        genero: valorGenero,
        veiculoProprio: valorVeiculo
    };
    if (registro.nome == '') { /* verificar se o campo está preenchido */
        alert('Favor inserir o Nome');
        return;
    }
    if (registro.cpf == '') {
        alert('Favor insirir o CPF');
        return;
    }
    if (registro.telefone == '') {
        alert('Favor insirir um telefone para contato');
        return;
    }
    if (registro.email == '') {
        alert('Favor insirir um Email');
        return;
    }
    if (registro.estadocivil == '') {
        alert('Favor informar o estado civil');
        return;
    }

    //salvando os dados
    cliente.salva(registro);

    // Limpar os campos após salvar
    cliente.limpa();
});

//Carregar a listagem no momento que carregar a página
window.onload = function(){
    cliente.lista()
}
