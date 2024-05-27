const { createApp } = Vue

createApp({
    data() {
        return {
            heroi: {vida: 100},
            vilao: {vida: 100},
            log_acao: '',
            logs: []
        }
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
                this.acaoVilao();
                this.log_acao = "Herói atacou!";
                this.logs.push(this.log_acao);
            } else {
                console.log("Vilão atacou")
                this.heroi.vida -= dano;
                if (this.heroi.vida <= 0){
                    alert('O Herói morreu!')
                }
                this.logs.push('Vilão atacou');
            }
        },

        defender(isHeroi) {
            if (isHeroi) {
                console.log("Herói defendeu")
                this.acaoVilao();
            } else {
                console.log("Vilão defendeu")
            }            
        },

        usarPocao(isHeroi) {
            const cura = 20;
            if (isHeroi) {
                console.log("Herói usou poção");
                this.heroi.vida < 80 ? this.heroi.vida : cura;
                this.acaoVilao();
                this.logs.push('Poção do heroi');
            } else {
                console.log("Vilão usou poção");
                this.vilao.vida < 80 ? this.vilao.vida : cura;
                this.logs.push('Poção do vilão');
            }
        },

        correr(correrHeroi) {
            if (correrHeroi) {
                this.mensagemAcao = "Herói correu"; 
                // alert("Herói correu...");
                console.log("Herói correu");
                this.logs.push('Você Correu!');
            } else {
                this.mensagemAcao = "Vilão correu"; 
                // alert("Vilão correu...");
                console.log("Vilão correu");
                this.logs.push('O vilão correu');
            }
        },
        acaoVilao() {
            const acoes = ['atacar', 'atacar', 'atacar', 'atacar', 'defender','defender','defender', 'usarPocao', 'correr'];
            const acaoAleatoria = acoes[Math.floor(Math.random() * acoes.length)];
            this[acaoAleatoria](false);
        }
    }
}).mount("#app")