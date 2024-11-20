import React, { useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

import { Player, useGameStore } from "@/store/games-store";
import { Card } from "./Card";
import { Button } from "./Button";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

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
const EmptyState: React.FC = () => (
  <View style={styles.emptyStateContainer}>
    <Text style={styles.emptyStateText}>No player was added yet</Text>
  </View>
);
const EmptyStateButton: React.FC<{ onAddPlayer: () => void }> = ({
  onAddPlayer,
}) => (
  <View style={styles.emptyStateButtomContainer}>
    <Button title="add new player" onPressButton={onAddPlayer} />
  </View>
);

export const SoloPlayersList = () => {
  const soloPlayers = useGameStore((state) => state.soloPlayers);
  const addPlayer = useGameStore((state) => state.createSoloPlayer);

  const winner = useGameStore((state) => state.winner);
  const isTie = useGameStore((state) => state.isTie);

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

  // Reanimated shared values
  const scale = useSharedValue(1);

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // Trigger animation when winner or tie state changes
  useEffect(() => {
    scale.value = 1.5; // Start with a zoomed-in effect
    scale.value = withTiming(1, { duration: 300 }); // Animate back to normal size
  }, [winner, isTie]); // Dependencies: re-run when winner or isTie changes

  return (
    <>
      {soloPlayers.length > 0 && (
        <Animated.View style={[styles.resultContainer, animatedStyle]}>
          {isTie ? (
            <Text style={styles.tie}>🫸 🫷It's a tie!</Text>
          ) : winner ? (
            <Text style={styles.winner}>
              🏆 Winner: {winner.name} ({winner.score} points)
            </Text>
          ) : (
            <Text style={styles.noWinner}>No winner yet</Text>
          )}
        </Animated.View>
      )}
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
        ListEmptyComponent={<EmptyState />} // Exibe o componente de estado vazio
      />
      {<EmptyStateButton onAddPlayer={handleAddPlayer} />}
    </>
  );
};

const styles = StyleSheet.create({
  winner: { fontSize: 18, color: "green" },
  tie: { fontSize: 18, color: "orange" },
  noWinner: { fontSize: 18, color: "red" },
  resultContainer: {
    margin: 16,
    padding: 8,

    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    padding: 8,
    paddingBottom: 70,
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
    // borderWidth: 1,
    // borderColor: "red",
    gap: 20,
  },
  emptyStateButtomContainer: {
    // borderWidth: 1,
    // borderColor: "red",
    position: "absolute",
    zIndex: 1000,
    bottom: 20,
    left: "50%",
    transform: [{ translateX: -60 }], // Ajuste horizontal para centralizar
  },
  emptyStateText: {
    fontSize: 14,
    color: "#b3b3b3",
    textAlign: "center",
  },
});
