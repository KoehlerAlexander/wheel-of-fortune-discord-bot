import { Message } from "discord.js"
import { availableCommands } from "./commands.js"
import fs from "fs"

/**
 * Returns the json data for a given messages guildId
 * @param {String} guildId 
 */
const getGuildData = (guildId) => {
  const guildPath = `./data/${guildId}.json`

  try {
    const rawData = fs.readFileSync(guildPath)
    return JSON.parse(rawData)
  }
  catch {
    return null
  }
}

/**
 * 
 * @param {Message} message 
 */
export const handleHelpResponse = (message) => {
  const helpText = `Here is a list of available commands:\n${availableCommands.map(command => command).join("\n")}`

  message.reply(helpText)
}


/**
 * 
 * @param {Message} message 
 * @param {String[]} messageComponents
 */
export const handleAddGame = (message, messageComponents) => {
  const { guildId } = message
  const guildPath = `./data/${guildId}.json`
  const gameName = messageComponents[2]
  const guildData = getGuildData(guildId)

  // no games for this guild registered yet
  if (!guildData) {
    const gamesData = {
      [gameName]: { name: gameName, timesPlayed: 0 }
    }
    fs.writeFileSync(guildPath, JSON.stringify(gamesData))

    // games already registered for a guild
  } else {
    const existingGames = Object.keys(guildData)
    if (existingGames.includes(gameName)) {
      message.reply("Game already present!")
      return
    }
    else {
      guildData[gameName] = { name: gameName, timesPlayed: 0 }
      fs.writeFileSync(guildPath, JSON.stringify(guildData))
    }
  }
  message.reply("Game added!")
}

/**
 * @param {Message} message
 */
export const handleListGames = (message) => {
  const guildData = getGuildData(message.guildId)
  if (!guildData) {
    message.reply("No games added yet!")
    return
  }

  const games = Object.values(guildData)

  const gamesText = `Here is a list of the currently registered games:\n${games.map(game => `${game.name}, ${game.timesPlayed} Plays`).join("\n")}`
  message.reply(gamesText)
}

/**
 * Handles a spin of the wheel
 * @param {Message} message 
 */
export const handlePlay = (message) => {
  const guildData = getGuildData(message.guildId)
  if (!guildData) {
    message.reply("No games added yet!")
    return
  }

  const games = Object.values(guildData)
  const index = Math.floor(Math.random() * games.length)
  const selectedGame = games[index]
  message.reply(`Yay you are going to play:\n${selectedGame.name}, ${selectedGame.timesPlayed} Plays`)

  //Update guild file
  selectedGame.timesPlayed++
  const guildPath = `./data/${message.guildId}.json`
  fs.writeFileSync(guildPath, JSON.stringify(guildData))
}

/**
* Handles a spin of the wheel
* @param {Message} message 
 * @param {String[]} messageComponents
*/
export const handleRemoveGame = (message, messageComponents) => {
  const gameName = messageComponents[2]
  const guildData = getGuildData(message.guildId)
  if (!guildData) {
    message.reply("No games added yet!")
    return
  }

  const games = Object.values(guildData)
  const gameToRemove = games.find(game => game.name === gameName)
  if (!gameToRemove) {
    message.reply(`Cannot find "${gameName}" in the registered games!`)
    return
  }

  delete guildData[gameName]
  const guildPath = `./data/${message.guildId}.json`
  fs.writeFileSync(guildPath, JSON.stringify(guildData))

  message.reply(`Game ${gameName} sucesfully removed!`)
}