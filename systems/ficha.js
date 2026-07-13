const database = require("../database/database");
const logger = require("../utils/logger");



class Ficha {



    async buscarCompleta(personagemId){


        const personagem = await database.buscarUm(

            `

            SELECT *

            FROM personagens

            WHERE id=$1

            `,

            [

                personagemId

            ]

        );



        if(!personagem){

            throw new Error(

                "Personagem não encontrado."

            );

        }







        const atributos = await database.buscarUm(

            `

            SELECT *

            FROM atributos

            WHERE personagem_id=$1

            `,

            [

                personagemId

            ]

        );








        const aptidoes = await database.buscarUm(

            `

            SELECT *

            FROM aptidoes

            WHERE personagem_id=$1

            `,

            [

                personagemId

            ]

        );








        const magias = await database.buscarTodos(

            `

            SELECT *

            FROM magias

            WHERE personagem_id=$1

            `,

            [

                personagemId

            ]

        );








        const habilidades = await database.buscarTodos(

            `

            SELECT *

            FROM habilidades

            WHERE personagem_id=$1

            `,

            [

                personagemId

            ]

        );






        return {


            personagem,


            atributos,


            aptidoes,


            magias,


            habilidades


        };


    }








    formatar(ficha){



        const p = ficha.personagem;

        const a = ficha.atributos;

        const ap = ficha.aptidoes;






        let texto = `

🌍 **${p.titulo}**

━━━━━━━━━━━━━━━━

👤 **Nome:** ${p.nome}

🎂 **Idade:** ${p.idade}

📏 **Altura:** ${p.altura}

🧬 **Raça:** ${p.raca}

⚔️ **Classe:** ${p.classe}

✨ **Subclasse:** ${p.subclasse}


━━━━━━━━━━━━━━━━

📈 **Nível:** ${p.nivel}

⭐ **XP:** ${p.xp}/${p.xp_proximo}


━━━━━━━━━━━━━━━━

❤️ Vida: ${a.vida}

💪 Força: ${a.forca}

🏃 Agilidade: ${a.agilidade}

🔥 Estamina: ${a.estamina}

🔮 Mana: ${a.mana}

🧠 Inteligência: ${a.inteligencia}

🎭 Carisma: ${a.carisma}

🌌 Aura: ${a.aura}

🍀 Sorte: ${a.sorte}

🎯 Crítico: ${a.chance_critica}%


━━━━━━━━━━━━━━━━

✨ **Aptidões**

Magia: ${ap.magica}%

Fogo: ${ap.fogo}%

Terra: ${ap.terra}%

Ar: ${ap.ar}%

Água: ${ap.agua}%

Luz: ${ap.luz}%

Escuridão: ${ap.escuridao}%


━━━━━━━━━━━━━━━━

`;





        texto += "📖 **Magias**\n";


        if(ficha.magias.length === 0){


            texto += "Nenhuma\n";


        } else {


            ficha.magias.forEach(m => {


                texto +=

                `• ${m.nome} (${m.xp} XP)\n`;


            });


        }





        texto += "\n⚔️ **Habilidades**\n";



        if(ficha.habilidades.length === 0){


            texto += "Nenhuma\n";


        } else {


            ficha.habilidades.forEach(h=>{


                texto +=

                `• ${h.nome} (${h.xp} XP)\n`;


            });


        }




        return texto;


    }









    async salvarMensagem(personagemId, mensagemId, canalId){



        await database.executar(

            `

            INSERT INTO fichas_discord

            (

            personagem_id,

            mensagem_id,

            canal_id

            )

            VALUES($1,$2,$3)


            ON CONFLICT(personagem_id)

            DO UPDATE SET

            mensagem_id=$2,

            canal_id=$3,

            atualizada_em=NOW()

            `,

            [

                personagemId,

                mensagemId,

                canalId

            ]

        );



    }







    async buscarMensagem(personagemId){



        return await database.buscarUm(

            `

            SELECT *

            FROM fichas_discord

            WHERE personagem_id=$1

            `,

            [

                personagemId

            ]

        );


    }




}



module.exports = new Ficha();