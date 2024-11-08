import { create } from 'zustand';

import { v4 as uuidv4 } from 'uuid';

export interface Player {
  id: string;
  name: string;
  color: string;
  score: number;
}

export interface Game {
  id: string;
  mostPointWins: boolean;
  leastPointWins: boolean;
  gameName: string;
  gameDescription: string;
  gameUrl: string;
  gameCode: string;
  gameColor: string;
  rounds: number;
  startingPoints: number;
  gameCounter: number;
  winner: string | null;
  isFinished: boolean;
  players: Player[];
}

interface GameState {
  games: Game[];
  currentGameIndex: number | null;
  soloPlayers: Player[];
  finishedGamesHistory: Game[];

  // Game management
  addGame: (game: Omit<Game, 'players' | 'id'>) => void;
  updateGame: (index: number, updatedGame: Partial<Game>) => void;
  removeGame: (index: number) => void;
  selectGame: (index: number) => void;
  finishGame: () => void;

  // Player management
  createSoloPlayer: () => void;
  addPlayerToCurrentGame: (playerId: string) => void;
  updatePlayerScoreInCurrentGame: (name: string, score: number) => void;
  removePlayerFromCurrentGame: (name: string) => void;
}

const randomNames = [
  'Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Heidi', 'Ivan', 'Judy', 'Kenny', 'Lara', 'Mallory',
  'Niaj', 'Oscar', 'Peggy', 'Quincy', 'Rupert', 'Sybil', 'Trent', 'Uma', 'Vera', 'Walter', 'Xander', 'Yvonne', 
  'Zane', 'Amber', 'Blake', 'Casey', 'Dakota', 'Emery', 'Finn', 'Gale', 'Harper', 'Indigo', 'Jesse', 'Kim', 
  'Logan', 'Morgan', 'Nova', 'Orion', 'Parker', 'Quinn', 'Reese', 'Sky', 'Tate', 'Uri', 'Val', 'Wren', 'Zara'
];

const randomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;

export const useGameStore = create<GameState>((set) => ({
  games: [],
  currentGameIndex: null,
  soloPlayers: [],
  finishedGamesHistory: [],

  addGame: (game) =>
    set((state) => ({
      games: [
        ...state.games,
        { ...game, players: [], id: uuidv4() },
      ],
    })),

  updateGame: (index, updatedGame) =>
    set((state) => ({
      games: state.games.map((game, i) =>
        i === index ? { ...game, ...updatedGame } : game
      ),
    })),

  removeGame: (index) =>
    set((state) => ({
      games: state.games.filter((_, i) => i !== index),
      currentGameIndex:
        state.currentGameIndex === index ? null : state.currentGameIndex,
    })),

  selectGame: (index) => set(() => ({ currentGameIndex: index })),

  finishGame: () =>
    set((state) => {
      if (state.currentGameIndex === null) return state;
      const finishedGame = {
        ...state.games[state.currentGameIndex],
        isFinished: true,
      };
      return {
        games: state.games.filter((_, i) => i !== state.currentGameIndex),
        finishedGamesHistory: [...state.finishedGamesHistory, finishedGame],
        currentGameIndex: null,
      };
    }),

  createSoloPlayer: () =>
    set((state) => ({
      soloPlayers: [
        ...state.soloPlayers,
        {
          id: uuidv4(),
          name: randomNames[Math.floor(Math.random() * randomNames.length)],
          color: randomColor(),
          score: 0,
        },
      ],
    })),

  addPlayerToCurrentGame: (playerId) =>
    set((state) => {
      if (state.currentGameIndex === null) return state;

      const playerToAdd = state.soloPlayers.find(
        (player) => player.id === playerId
      );

      if (!playerToAdd) return state;

      const updatedGames = [...state.games];
      updatedGames[state.currentGameIndex].players.push(playerToAdd);

      return {
        games: updatedGames,
        soloPlayers: state.soloPlayers.filter((player) => player.id !== playerId),
      };
    }),

  updatePlayerScoreInCurrentGame: (name, score) =>
    set((state) => {
      if (state.currentGameIndex === null) return state;
      const updatedGames = [...state.games];
      updatedGames[state.currentGameIndex].players = updatedGames[
        state.currentGameIndex
      ].players.map((player) =>
        player.name === name ? { ...player, score } : player
      );
      return { games: updatedGames };
    }),

  removePlayerFromCurrentGame: (name) =>
    set((state) => {
      if (state.currentGameIndex === null) return state;
      const updatedGames = [...state.games];
      updatedGames[state.currentGameIndex].players = updatedGames[
        state.currentGameIndex
      ].players.filter((player) => player.name !== name);
      return { games: updatedGames };
    }),
}));
