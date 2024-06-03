const { createApp } = Vue;
const API_URL = 'https://minigame-vue-node.onrender.com';

createApp({
    data() {
        return {
            heroi: { vida: 100 },
            vilao: { vida: 100 },
            log_acao: '',
            logs: []        
        };        
    },
    methods: {
        atacar(isHeroi) {
            const dano = 10;
            if (isHeroi) {
                console.log("Herói atacou")
                this.vilao.vida -= dano;
                if (this.vilao.vida <= 0){
                    alert('O Vilão morreu!')
                }                
                this.atualizarVidaNoBancoDeDados(this.heroi.vida, this.vilao.vida);
                this.log_acao = "Herói atacou!";
                this.logs.push(this.log_acao);
                this.acaoVilao();
            } else {
                console.log("Vilão atacou")
                this.heroi.vida -= dano;
                if (this.heroi.vida <= 0){
                    alert('O Herói morreu!')
                }
                this.logs.push('Vilão atacou');
                this.atualizarVidaNoBancoDeDados(this.heroi.vida, this.vilao.vida);
            }
        },
        async atualizarVidaNoBancoDeDados(vidaHeroi, vidaVilao) {
            try {
                const response = await fetch(`${API_URL}/atualizarVida`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ vidaHeroi, vidaVilao })
                });
                if (!response.ok) {
                    throw new Error('Erro ao atualizar a vida no banco de dados.');
                }
                console.log('Vida do herói e do vilão atualizada com sucesso.');
            } catch (error) {
                console.error('Erro ao atualizar a vida no banco de dados:', error);
            }
        },
        defender(isHeroi) {
            if (isHeroi) {
                console.log("Herói defendeu")
                this.logs.push('Herói defendeu');
                this.acaoVilao();
            } else {
                console.log("Vilão defendeu")
                this.logs.push('Vilão defendeu');
            } 
        },
        usarPocao(isHeroi) {
            const cura = 20;
            if (isHeroi) {
                console.log("Herói usou poção");
                this.heroi.vida < 80 ? this.heroi.vida : cura;
                this.logs.push('Poção do heroi');
                this.atualizarVidaNoBancoDeDados(this.heroi.vida, this.vilao.vida);
                this.acaoVilao();
            } else {
                console.log("Vilão usou poção");
                this.vilao.vida < 80 ? this.vilao.vida : cura;
                this.logs.push('Poção do vilão');
                this.atualizarVidaNoBancoDeDados(this.vilao.vida, this.heroi.vida);
            }
        },
        correr(isHeroi) {
            if (isHeroi) {
                alert("Herói correu!");
                // console.log("Herói correu");
                this.logs.push('Herói correu!');
            } else {
                alert("Vilão correu!");
                // console.log("Vilão correu");
                this.logs.push('Vilão correu!');
            }
            this.acaoVilao();
        },
        acaoVilao() {
            const acoes = ['atacar', 'atacar', 'atacar', 'atacar', 'defender','defender','defender', 'usarPocao', 'correr'];
            const acaoAleatoria = acoes[Math.floor(Math.random() * acoes.length)];
            this[acaoAleatoria](false);
            // console.log('O vilão...' + acaoAleatoria)
        }
    }
}).mount("#app");