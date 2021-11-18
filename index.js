const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');
const axios = require('axios');

const instanceDraco = axios.create({
	baseURL: 'https://api.mir4global.com/wallet/prices/draco'
});

const instancePriceDolar = axios.create({
	baseURL: 'https://economia.awesomeapi.com.br/last/'
})
// Create a new client instanceDraco
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

instanceDraco.post('lastest')
	.then(function (response) {
		console.log(response.data.Data);
	})
	.catch(function (error) {
		console.log(error);
	});

async function atualizarTopic(){
	let dracochannel = client.channels.cache.get("909187273847877632");
	await dracochannel.setTopic(`💰Draco: \$${draco.toFixed(4)} | 💵Real: R\$${(draco * dolar).toFixed(2)} | 📈Porcetagem: ${porcetagem.toFixed(2)}\%`)
	.then(updated => console.log(`Update Topic`))
	.catch(console.log(`Deu jaca`));

}
async function atualizarValores() {
	await instanceDraco.post('lastest')
		.then(function (response) {
			draco = parseFloat(response.data.Data.USDDracoRate);
			valor_ant = parseFloat(response.data.Data.USDDracoRatePrev)
			porcetagem = ((draco / valor_ant) - 1) * 100
			wemix = parseFloat(response.data.Data.USDWemixRate);
			valor_ant_wemix = parseFloat(response.data.Data.USDWemixRatePrev)
			valor_wemix = parseFloat(response.data.Data.DracoPriceWemix)
			porcetagem_wemix = ((wemix / valor_ant_wemix) - 1) * 100
			console.log(`Draco: ${draco}`)
		})
		.catch(function (error) {
			console.log(error);
		});
	await instancePriceDolar.get('USD-BRL')
		.then(function (response) {
			dolar = parseFloat(response.data.USDBRL.ask);
		})
		.catch(function (error) {
			console.log(error);
		});

}

setInterval(atualizarValores, 60000);
setInterval(atualizarTopic,300000);


// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
	atualizarValores();
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'preco') {
		await interaction.reply(`O draco ta custando 💰\$${draco.toFixed(5)} doletas, em real💵 R\$${(draco * dolar).toFixed(2)}, variação📈 de ${porcetagem.toFixed(2)}\%`)
			.then((response) => {
				console.log(response);
			}).catch((error) => {
				console.log(error)
			});
	} else if (commandName === 'wemix') {
		await interaction.reply(`A unidade de Wemix👛 esta valendo \$${wemix.toFixed(4)} doletas com variação📈 ${porcetagem_wemix.toFixed(2)}\%, em reais R\$${(wemix * dolar).toFixed(4)}.\nE o draco vale ${valor_wemix.toFixed(4)}WEMIX`).then((response) => {
			console.log(response);
		}).catch((error) => {
			console.log(error)
		});
	} else if (commandName === 'calcular') {
		dolar_request = interaction.options.getNumber('dolar')
		await interaction.reply(`Você precisara vender o draco por ${(dolar_request / wemix).toFixed(5)} WEMIX credit⚖.`).then((response) => {
			console.log(response);
		}).catch((error) => {
			console.log(error)
		});
	} else if (commandName === 'sacar') {
		quantidade = interaction.options.getNumber('dracos')
		await interaction.reply(`Você sacará \$${(draco * quantidade).toFixed(3)} dolares, em real R\$${(draco * quantidade * dolar).toFixed(2)}🏧.`).then((response) => {
			console.log(response);
		}).catch((error) => {
			console.log(error)
		});
	}
});


// Login to Discord with your client's token
client.login(token);