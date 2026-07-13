async function enviarMundo(

interaction,

fala

){



if(!fala){

return;

}





await interaction.channel.send(

{

content:

`🌍 **O Mundo diz:**\n\n"${fala}"`

}

);



}





module.exports = {


enviarMundo


};