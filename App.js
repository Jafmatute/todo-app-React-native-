import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import Colors from "./app/customs/Colors";
import tempData from "./app/data/tempData";
import { AntDesign } from "@expo/vector-icons";
import TodoList from "./app/components/TodoList";
import AddListModal from "./app/components/AddListModal";
export default function App() {
  const [isVisible, setIsVisble] = useState(false);
  const [lists, setLists] = useState(tempData);

  /*const toggleAddTodoModal = () => {
    setIsVisble(true);
  };*/

  const renderList = (list) => {
    return <TodoList list={list} updateList={updateList} />;
  };

  const addList = (list) => {
    //console.log(list);
    setLists([...lists, { ...list, id: lists.length + 1, todos: [] }]);
  };

  updateList = (list) => {
    //console.log(list);
    setLists(
      lists.map((item) => {
        return item.id === list.id ? list : item;
      })
    );
  };

  //console.log("Probando el arreglo de datos", lists);

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        visible={isVisible}
        onRequestClose={() => setIsVisble(false)}
      >
        <AddListModal closeModal={() => setIsVisble(false)} addList={addList} />
      </Modal>

      <View style={{ flexDirection: "row" }}>
        <View style={styles.dividir} />
        <Text style={styles.title}>
          TODO
          <Text style={{ fontWeight: "300", color: Colors.blue }}> |APP</Text>
        </Text>
        <View style={styles.dividir} />
      </View>
      <View style={{ marginVertical: 48 }}>
        <TouchableOpacity
          style={styles.addList}
          onPress={() => setIsVisble(true)}
        >
          <AntDesign name="plus" size={16} color={Colors.blue} />
        </TouchableOpacity>

        <Text style={styles.add}>ADD</Text>
      </View>

      <View style={{ height: 275, paddingLeft: 32 }}>
        <FlatList
          data={lists}
          keyExtractor={(item) => item.name}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => renderList(item)}
          keyboardShouldPersistTaps="always"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: -700,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  dividir: {
    backgroundColor: Colors.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: Colors.black,
    paddingHorizontal: 64,
  },
  addList: {
    borderWidth: 2,
    borderColor: Colors.lightBlue,
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    color: Colors.blue,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 8,
  },
});
