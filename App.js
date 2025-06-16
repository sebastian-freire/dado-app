import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated
} from "react-native";

export default function App() {
  const [dado, setDado] = useState(0);
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const dadoValues = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

  const agrandar = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 10, // Agranda a 10x
        duration: 300,
        useNativeDriver: true
      }),
      Animated.timing(scaleAnim, {
        toValue: 1, // Vuelve al tamaño original
        duration: 300,
        useNativeDriver: true
      })
    ]).start();
  };

  const rotar = () => {
    rotateAnim.setValue(0);
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true
    }).start();
  };

  const numeroDado = () => {
    agrandar();
    rotar();
    const numero = Math.floor(Math.random() * 6);
    setDado(dadoValues[numero]);
  };

  useEffect(() => {
    numeroDado();
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"]
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={numeroDado}>
        <Animated.View
          style={[
            styles.dadoContainer,
            { transform: [{ rotate }, { scale: scaleAnim }] }
          ]}
        >
          <Text style={styles.dadoText}>{dado}</Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%"
  },
  dadoText: {
    fontSize: 300,
    color: "white"
  }
});
