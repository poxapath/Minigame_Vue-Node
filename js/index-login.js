const app = Vue.createApp({
    data() {
        return {
            loginRealizado: false,
            cadastroRealizado: false,
            avisoLogin: '',
            avisoCadastro: '',
            nome: '',
            email: '',
            senha: '',
            newUsername: '',
            newPassword: ''
        };
    },
    methods: {
        async criarConta() {
            try {
                const response = await fetch('https://minigame-vue-node.onrender.com/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nome: this.nome,
                        email: this.email,
                        senha: this.senha
                    })
                });

                if (response.ok) {
                    alert('Conta criada com sucesso.');
                } else {
                    alert('Erro ao criar conta.');
                }
            } catch (error) {
                console.error('Erro ao criar conta:', error);
                alert('Erro ao criar conta.');
            }
        },

        async fazerLogin() {
            try {
                const response = await fetch('https://minigame-vue-node.onrender.com/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nome: this.nome,
                        senha: this.senha
                    })
                });

                if (response.status === 200) {
                    alert('Login bem-sucedido.');
                    window.open('/index.html');
                } else {
                    alert('Credenciais inválidas.');
                }
            } catch (error) {
                console.error('Erro ao fazer login:', error);
                alert('Erro ao fazer login.');
            }
        },

        login() {
            if (this.email && this.newUsername && this.newPassword) {
                this.loginRealizado = true;
                this.avisoLogin = "Login realizado";
            } else {
                this.avisoLogin = "Por favor, preencha todos os campos.";
            }
        },

        cadastrar() {
            if (this.nome && this.newUsername && this.newPassword) {
                this.cadastroRealizado = true;
                this.avisoCadastro = "Cadastro realizado";
                this.username = this.newUsername;
                this.password = this.newPassword;
            } else {
                this.avisoCadastro = "Por favor, preencha todos os campos.";
            }
        },

        mostrarCadastro() {
            this.cadastroRealizado = true;
            this.avisoCadastro = '';
        },

        mostrarLogin() {
            this.cadastroRealizado = false;
            this.avisoCadastro = '';
        },

        alterarLoginCadastro() {
            this.$emit('alterar', 'Cadastro');
        }
    }
});

app.mount("#app");