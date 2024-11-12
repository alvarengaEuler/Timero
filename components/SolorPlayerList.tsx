import React from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";

import { Player, useGameStore } from "@/store/games-store";
import { Card } from "./Card";

// Componente para representar cada jogador solo
const SoloPlayerCard: React.FC<{
  player: Player;
  addPoints: () => void;
  removePoints: () => void;
  removePlayer: () => void;
}> = ({ player, addPoints, removePoints, removePlayer }) => (
  <Card
    onClickLeftButton={removePoints}
    onClickRightButton={addPoints}
    onClickTrash={removePlayer}
    onClickPencil={() => {}}
    name={player.name}
    score={player.score}
    bgColor={player.color}
  />
);

// Componente para mostrar quando a lista estiver vazia
const EmptyState: React.FC<{ onAddPlayer: () => void }> = ({ onAddPlayer }) => (
  <View style={styles.emptyStateContainer}>
    <Text style={styles.emptyStateText}>No solo players available.</Text>
    <Button title="Add a New Player" onPress={onAddPlayer} />
  </View>
);

export const SoloPlayersList = () => {
  const soloPlayers = useGameStore((state) => state.soloPlayers);
  const addPlayer = useGameStore((state) => state.createSoloPlayer);
  const removeCurrentSoloPlayer = useGameStore(
    (state) => state.removeSoloPlayer
  );

  const addPoints = useGameStore((state) => state.addPointsToSoloPlayer);
  const removePoints = useGameStore(
    (state) => state.removePointsFromSoloPlayer
  );

  // Função para criar um novo jogador solo
  const handleAddPlayer = () => {
    addPlayer(); // Adiciona um novo jogador solo com nome e cor aleatórios
  };

  const addNewPoints = (id: string, points: number) => {
    addPoints(id, points); // Adiciona um novo jogador solo com nome e cor aleatórios
  };

  const removeCurrentPoints = (id: string, points: number) => {
    removePoints(id, points); // Adiciona um novo jogador solo com nome e cor aleatórios
  };

  const removeClickedPlayer = (id: string) => {
    removeCurrentSoloPlayer(id); // Adiciona um novo jogador solo com nome e cor aleatórios
  };

  return (
    <FlatList<Player>
      style={{ width: "100%" }}
      data={soloPlayers}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <SoloPlayerCard
          player={item}
          addPoints={() => addNewPoints(item.id, 1)}
          removePoints={() => removeCurrentPoints(item.id, 1)}
          removePlayer={() => removeClickedPlayer(item.id)}
        />
      )}
      contentContainerStyle={styles.listContainer}
      ListEmptyComponent={<EmptyState onAddPlayer={handleAddPlayer} />} // Exibe o componente de estado vazio
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 8,
  },
  card: {
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  score: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderWidth: 1,
    borderColor: "red",
  },
  emptyStateText: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
  },
});
