import React from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Colors from "../customs/Colors";
export default TodoModal = (props) => {
  const {
    list: { name, color, todos },
    closeModal,
  } = props;
  //console.log(todos);
  const taskCount = todos.length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  renderTodo = (todo) => {
    //console.log(todo);
    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity>
          <Ionicons
            name={todo.completed ? "ios-square" : "ios-square-outline"}
            color={Colors.gray}
            style={{ width: 32 }}
            size={24}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.todo,
            {
              textDecorationLine: todo.completed ? "line-through" : "none",
              color: todo.completed ? Colors.gray : Colors.black,
            },
          ]}
        >
          {todo.title}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={{ position: "absolute", top: 64, right: 32, zIndex: 10 }}
      >
        <AntDesign
          name="close"
          size={24}
          color={Colors.black}
          onPress={closeModal}
        />
      </TouchableOpacity>

      <View
        style={[styles.section, styles.header, { borderBottomColor: color }]}
      >
        <View>
          <Text style={styles.title}> {name} </Text>
          <Text style={styles.taskCount}>
            {completedCount} of {taskCount}
          </Text>
        </View>
      </View>

      <View style={[styles.section, { flex: 3 }]}>
        <FlatList
          data={todos}
          renderItem={({ item }) => renderTodo(item)}
          keyExtractor={(item) => item.title}
          contentContainerStyle={{ paddingHorizontal: 32, paddingVertical: 64 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <KeyboardAvoidingView
        style={[styles.section, styles.footer]}
        behavior="padding"
      >
        <TextInput style={[styles.input, { borderColor: color }]} />
        <TouchableOpacity style={[styles.addTodo, { backgroundColor: color }]}>
          <AntDesign name="plus" size={16} color={Colors.white} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    flex: 1,
    alignSelf: "stretch",
  },
  header: {
    justifyContent: "flex-end",
    marginLeft: 64,
    borderBottomWidth: 3,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: Colors.black,
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    color: Colors.gray,
  },
  footer: {
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  addTodo: {
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  todoContainer: {
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  todo: {
    color: Colors.black,
    fontWeight: "700",
    fontSize: 16,
  },
});
