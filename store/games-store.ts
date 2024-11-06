import {create} from 'zustand';

interface Player {
  name: string;
  color: string;
  score: number;
}

interface GameState {
  // Game attributes
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

  // Player attributes
  players: Player[];

  // Methods to update attributes
  setMostPointWins: (value: boolean) => void;
  setLeastPointWins: (value: boolean) => void;
  setGameName: (name: string) => void;
  setGameDescription: (description: string) => void;
  setGameUrl: (url: string) => void;
  setGameCode: (code: string) => void;
  setGameColor: (color: string) => void;
  setRounds: (rounds: number) => void;
  setStartingPoints: (points: number) => void;
  setGameCounter: (counter: number) => void;
  setWinner: (winner: string | null) => void;
  setIsFinished: (finished: boolean) => void;

  // Player management methods
  addPlayer: (name: string, color: string, score?: number) => void;
  updatePlayerScore: (name: string, score: number) => void;
  removePlayer: (name: string) => void;
}

export const useGameStore = create<GameState>((set) => ({
  // Initial values for game attributes
  mostPointWins: true,
  leastPointWins: false,
  gameName: '',
  gameDescription: '',
  gameUrl: '',
  gameCode: '',
  gameColor: '#FFFFFF',
  rounds: 0,
  startingPoints: 0,
  gameCounter: 0,
  winner: null,
  isFinished: false,

  // Initial player list
  players: [],

  // Update methods for game attributes
  setMostPointWins: (value) => set(() => ({ mostPointWins: value })),
  setLeastPointWins: (value) => set(() => ({ leastPointWins: value })),
  setGameName: (name) => set(() => ({ gameName: name })),
  setGameDescription: (description) => set(() => ({ gameDescription: description })),
  setGameUrl: (url) => set(() => ({ gameUrl: url })),
  setGameCode: (code) => set(() => ({ gameCode: code })),
  setGameColor: (color) => set(() => ({ gameColor: color })),
  setRounds: (rounds) => set(() => ({ rounds })),
  setStartingPoints: (points) => set(() => ({ startingPoints: points })),
  setGameCounter: (counter) => set(() => ({ gameCounter: counter })),
  setWinner: (winner) => set(() => ({ winner })),
  setIsFinished: (finished) => set(() => ({ isFinished: finished })),

  // Player management methods
  addPlayer: (name, color, score = 0) =>
    set((state) => ({
      players: [...state.players, { name, color, score }]
    })),
  updatePlayerScore: (name, score) =>
    set((state) => ({
      players: state.players.map((player) =>
        player.name === name ? { ...player, score } : player
      )
    })),
  removePlayer: (name) =>
    set((state) => ({
      players: state.players.filter((player) => player.name !== name)
    })),
}));
