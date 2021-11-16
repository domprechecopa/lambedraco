const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('preco').setDescription('Preço do draco agora!'),
	new SlashCommandBuilder().setName('wemix').setDescription('Preço do wemix agora!'),
	new SlashCommandBuilder()
		.setName('calcular')
		.setDescription('Quantos em wemix será para o draco valor tantos dolars.')
		.addNumberOption(option =>
			option.setName('dolar')
				.setDescription('Quantos dolars deve bater.')
				.setRequired(true)),
	new SlashCommandBuilder()
		.setName('sacar')
		.setDescription('Calcular quanto dinheiro sacará se vender agora!')
		.addNumberOption(option =>
			option.setName('dracos')
				.setDescription('Quantos dracos deseja vender?')
				.setRequired(true))
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);