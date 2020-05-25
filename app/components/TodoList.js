import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import Colors from "../customs/Colors";
import TodoModal from "../components/TodoModal";

export default TodoList = ({ list }) => {
  const completedCount = list.todos.filter((todo) => todo.completed).length;
  const remainingCount = list.todos.length - completedCount;
  const [showListVisble, setShowIsVisible] = useState(false);

  /*function toggleListModal() {
    setShowIsVisible(true);
  }*/

  return (
    <View>
      <Modal
        animationType="slide"
        visible={showListVisble}
        onRequestClose={() => setShowIsVisible(false)}
      >
        <TodoModal list={list} closeModal={() => setShowIsVisible(false)} />
      </Modal>
      <TouchableOpacity
        style={[styles.listContainer, { backgroundColor: list.color }]}
        onPress={() => setShowIsVisible(true)}
      >
        <Text style={styles.listTitle} numberOfLines={1}>
          {list.name}
        </Text>

        <View>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.count}> {completedCount} </Text>
            <Text style={styles.subTitle}>remaining</Text>
          </View>

          <View style={{ alignItems: "center" }}>
            <Text style={styles.count}> {remainingCount} </Text>
            <Text style={styles.subTitle}>Completed</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 12,
    alignItems: "center",
    width: 200,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.white,
    marginBottom: 18,
  },
  count: {
    fontSize: 48,
    fontWeight: "200",
    color: Colors.white,
  },
  subTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.white,
  },
});
