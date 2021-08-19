import dotenv from "dotenv"
dotenv.config()

import { Client, Intents } from "discord.js"
import { Commands } from "./commands.js"
import { handleHelpResponse, handleAddGame, handleListGames, handlePlay, handleRemoveGame } from "./commandHandler.js"

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', () => {
  console.log('Ready!');
});

client.on('message', async message => {
  const { content } = message
  const messageComponents = content.split(" ")
  if (messageComponents[0] !== "!wg") return // reject non bot commands

  const command = messageComponents[1]
  switch (command) {
    case Commands.HELP.name: handleHelpResponse(message); break
    case Commands.ADD.name: handleAddGame(message, messageComponents); break
    case Commands.GAMES.name: handleListGames(message); break
    case Commands.PLAY.name: handlePlay(message); break
    case Commands.REMOVE.name: handleRemoveGame(message, messageComponents); break
    default: message.reply("I don't know this command!"); break
  }
});

client.login(process.env.TOKEN);