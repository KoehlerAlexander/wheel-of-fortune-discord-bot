/**
 * Enum for available commands.
 * @readonly
 * @enum {{name: string, options: string[]}}
 */
export const Commands = Object.freeze({
  GAMES: { name: "games", options: [] },
  ADD: { name: "add", options: [] },
  REMOVE: { name: "remove", options: [] },
  PLAY: { name: "play", options: [] },
  HELP: { name: "help", options: [] },
})

/**
 * List of all available commands for the bot
 */
export const availableCommands = Object.freeze(Object.values(Commands).map(command => command.name))

