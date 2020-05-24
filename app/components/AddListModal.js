import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../customs/Colors";
import tempData from "../data/tempData";
export default AddListModal = (props) => {
  const { closeModal } = props;
  const backGroundColors = [
    "#5CDB59",
    "#24A6D9",
    "#5958D9",
    "#8022D9",
    "#D15908",
    "#D85963",
    "#D88559",
  ];
  const [color, setColor] = useState(backGroundColors[0]);
  const [name, setName] = useState("");

  const createTodo = () => {
    tempData.push({
      name,
      color,
      todos: [],
    });

    setName("");
    closeModal();
  };
  function renderColor() {
    //console.log(color);
    return backGroundColors.map((color) => {
      return (
        <TouchableOpacity
          key={color}
          style={[styles.colorSelected, { backgroundColor: color }]}
          onPress={() => setColor(color)}
        />
      );
    });
  }

  //console.log(name);
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableOpacity
        style={{ position: "absolute", top: 64, right: 32 }}
        onPress={closeModal}
      >
        <AntDesign name="close" size={24} color={Colors.black} />
      </TouchableOpacity>
      <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
        <Text style={styles.title}>Titulo</Text>
        <TextInput
          style={styles.input}
          onChange={(e) => setName(e.nativeEvent.text)}
          placeholder="Ingrese el titulo"
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 12,
          }}
        >
          {renderColor()}
        </View>

        <TouchableOpacity
          style={[styles.create, { backgroundColor: color }]}
          onPress={createTodo}
        >
          <Text style={{ fontWeight: "500", color: Colors.white }}>ADD</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: Colors.black,
    alignSelf: "center",
    marginHorizontal: 10,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.black,
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18,
  },
  create: {
    marginTop: 24,
    height: 50,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  colorSelected: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
});
