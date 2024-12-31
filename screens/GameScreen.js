import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useWindowDimensions,
} from "react-native";
import Title from "../components/ui/Title";
import { useState, useEffect } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);
  const { width, height } = useWindowDimensions();
  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver();
    }
  }, [currentGuess, userNumber, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "higher" && currentGuess > userNumber)
    ) {
      return;
    }
    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }

    const newRndNum = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess,
    );
    setCurrentGuess(newRndNum);
    setGuessRounds((prev) => [newRndNum, ...prev]);
  };

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  const marginTopDistance = height < 400 ? 20 : 70;

  return (
    <View style={[styles.screen, { marginTop: marginTopDistance }]}>
      <View style={styles.top}>
        <Title>Угадывание оппонента</Title>
        <NumberContainer>{currentGuess}</NumberContainer>
        <View>
          <Text style={styles.questionText}>Больше или меньше?</Text>
          <View style={styles.buttonsContainer}>
            <PrimaryButton onPress={() => nextGuessHandler("lower")}>
              <AntDesign name="minuscircleo" size={16} color="white" />
            </PrimaryButton>
            <PrimaryButton onPress={() => nextGuessHandler("higher")}>
              <AntDesign name="pluscircleo" size={16} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </View>
      <View style={styles.logsContainer}>
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => <GuessLogItem guess={itemData.item} />}
          keyExtractor={(item, index) => index}
        />
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 24,
  },
  buttonsContainer: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  questionText: {
    fontFamily: "open-sans",
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  logsContainer: {
    marginTop: 20,
    flex: 1,
  },
  top: {
    alignItems: "center",
  },
});
