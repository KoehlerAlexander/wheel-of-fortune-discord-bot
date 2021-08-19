import dotenv from "dotenv"
dotenv.config()

import { Client, Intents } from "discord.js"
import { Commands, availableCommands } from "./commands.js"
import { handleHelpResponse, handleAddGame, hanldeListGames } from "./commandHandler.js"

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', () => {
  console.log('Ready!');
});

client.on('messageCreate', async message => {
  const { content } = message
  const messageComponents = content.split(" ")
  if (messageComponents[0] !== "!wg") return // reject non bot commands

  const command = messageComponents[1]
  if (!availableCommands.includes(command))
    message.reply("I don't know this command!")

  switch (command) {
    case Commands.HELP.name: handleHelpResponse(message)
    case Commands.ADD.name: handleAddGame(message, messageComponents)
    case Commands.GAMES.name: hanldeListGames(message)
  }

});

client.login(process.env.TOKEN);