import type { GamePresence } from '..'
import {
  getActivePlayerId,
  getCurrentGameState,
  getCurrentGameStateType,
  getPlayerAvatar,
  getPlayerData,
  getPlayerScore,
  getUserPlayerId,
} from '../../util'

const twinpalms: GamePresence = {
  logo: 'https://cdn.rcd.gg/PreMiD/websites/B/Board%20Game%20Arena/assets/590.png',
  async getData(presence: Presence) {
    const gameState = await getCurrentGameState(presence)
    const activePlayer = await getActivePlayerId(presence)
    const gameStateType = await getCurrentGameStateType(presence)
    const userPlayer = await getUserPlayerId(presence)
    const activePlayerData = await getPlayerData(presence, activePlayer)
    const data: PresenceData = {
      smallImageKey: getPlayerAvatar(userPlayer),
      smallImageText: `Score: ${getPlayerScore(userPlayer)}`,
    }
    if (activePlayer === userPlayer || gameStateType !== 'activeplayer') {
      switch (gameState) {
        case 'bidTurn':
          data.state = 'Bidding'
          break
        case 'playerTurn':
          data.state = 'Playing cards'
          break
        case 'wildSelect':
          data.state = 'Selecting a wild suit'
          break
        case 'gameEnd':
          data.state = 'Viewing game results'
          break
      }
    }
    else {
      data.state = `Waiting for ${activePlayerData.name}`
    }
    return data
  },
}
export default twinpalms
