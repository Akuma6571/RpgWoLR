// ==========================================
// 🌍 O MUNDO BOT V2
// EVENTO INTERACTION CREATE
// CENTRAL DE INTERAÇÕES
// ==========================================



module.exports = {


    name: "interactionCreate",


    once: false,



    async execute(interaction){



        const client = interaction.client;




        try{



            // ==========================================
            // COMANDOS SLASH
            // ==========================================


            if(interaction.isChatInputCommand()){



                const comando = client.commands.get(

                    interaction.commandName

                );





                if(!comando){


                    return interaction.reply({

                        content:

                        "🌍 O Mundo não reconhece este comando.",


                        ephemeral:true

                    });


                }






                await comando.execute(

                    interaction

                );



                return;


            }







            // ==========================================
            // BOTÕES
            // ==========================================


            if(interaction.isButton()){



                const comando = client.commands.find(

                    comando =>

                    comando.processarBotao

                );





                if(comando){



                    await comando.processarBotao(

                        interaction

                    );



                }else{



                    await interaction.reply({


                        content:

                        "🌍 Este caminho ainda não foi observado pelo Mundo.",


                        ephemeral:true


                    });



                }



                return;


            }








            // ==========================================
            // MENUS DE SELEÇÃO
            // ==========================================


            if(interaction.isAnySelectMenu()){



                const comando = client.commands.find(

                    comando =>

                    comando.processarMenu

                );





                if(comando){


                    await comando.processarMenu(

                        interaction

                    );


                }



                return;


            }








            // ==========================================
            // MODAIS
            // ==========================================


            if(interaction.isModalSubmit()){



                const comando = client.commands.find(

                    comando =>

                    comando.processarModal

                );





                if(comando){


                    await comando.processarModal(

                        interaction

                    );


                }



                return;


            }







        }catch(erro){



            console.error(

                "❌ Erro em interactionCreate:",

                erro

            );






            const mensagemErro = {


                content:

                "🌍 As leis do mundo foram perturbadas. Algo que deveria acontecer falhou.",


                ephemeral:true


            };






            if(interaction.replied || interaction.deferred){



                await interaction.followUp(

                    mensagemErro

                );



            }else{



                await interaction.reply(

                    mensagemErro

                );


            }



        }



    }



};