import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  useWindowDimensions,
} from "react-native";
import { useState } from "react";
import PrimaryButton from "../components/ui/PrimaryButton";
import Colors from "../constants/colors";

function StartGameScreen({ onPickNumber }) {
  const [enteredNumber, setEnteredNumber] = useState("");
  const { width, height } = useWindowDimensions();

  const numberInputHandler = (enteredText) => {
    setEnteredNumber(enteredText);
  };

  const resetInputHandler = () => {
    setEnteredNumber("");
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredNumber);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Непраивльное число", "Введите число от 1 до 99!", [
        {
          text: "Ok",
          style: "destructive",
          onPress: resetInputHandler,
        },
      ]);
      return;
    }

    onPickNumber(chosenNumber);
  };

  const marginTop = height < 400 ? 30 : 100;

  return (
    <View style={[styles.inputContainer, { marginTop: marginTop }]}>
      <TextInput
        style={styles.textInput}
        maxLength={2}
        keyboardType="number-pad"
        autoCapitalize="none"
        autoCorrect={false}
        value={enteredNumber}
        onChangeText={numberInputHandler}
      />
      <View style={styles.buttonsContainer}>
        <PrimaryButton onPress={resetInputHandler}>Сбросить</PrimaryButton>
        <PrimaryButton onPress={confirmInputHandler}>Согласиться</PrimaryButton>
      </View>
    </View>
  );
}

export default StartGameScreen;

const styles = StyleSheet.create({
  inputContainer: {
    padding: 16,
    marginHorizontal: 24,
    backgroundColor: "#4e0329",
    borderRadius: 8,
    elevation: 8,
    shadowColor: "black", //iois
    shadowOffset: { width: 0, height: 2 }, //ios
    shadowRadius: 6, //ios
    shadowOpacity: 0.25, //ios
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  textInput: {
    height: 50,
    width: 50,
    fontSize: 18,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
