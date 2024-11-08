import React from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";

import { Player, useGameStore } from "@/store/games-store";

// Componente para representar cada jogador solo
const SoloPlayerCard: React.FC<{ player: Player }> = ({ player }) => (
  <View style={[styles.card, { backgroundColor: player.color }]}>
    <Text style={styles.name}>{player.name}</Text>
    <Text style={styles.score}>Score: {player.score}</Text>
  </View>
);

// Componente para mostrar quando a lista estiver vazia
const EmptyState: React.FC<{ onAddPlayer: () => void }> = ({ onAddPlayer }) => (
  <View style={styles.emptyStateContainer}>
    <Text style={styles.emptyStateText}>No solo players available.</Text>
    <Button title="Add Solo Player" onPress={onAddPlayer} />
  </View>
);

export const SoloPlayersList = () => {
  const soloPlayers = useGameStore((state) => state.soloPlayers);
  const addPlayer = useGameStore((state) => state.createSoloPlayer);

  // Função para criar um novo jogador solo
  const handleAddPlayer = () => {
    addPlayer(); // Adiciona um novo jogador solo com nome e cor aleatórios
  };

  return (
    <FlatList<Player>
      data={soloPlayers}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <SoloPlayerCard player={item} />}
      contentContainerStyle={styles.listContainer}
      ListEmptyComponent={<EmptyState onAddPlayer={handleAddPlayer} />} // Exibe o componente de estado vazio
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
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
  },
  emptyStateText: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
  },
});
