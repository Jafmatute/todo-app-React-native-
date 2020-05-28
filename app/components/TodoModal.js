import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  Animated,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Colors from "../customs/Colors";
import { Swipeable } from "react-native-gesture-handler";
export default TodoModal = (props) => {
  //console.log("Todo Modal Props!", props);
  const {
    list,
    list: { name, color, todos },
    closeModal,
    updateList,
  } = props;
  //console.log(list);
  const [newTodo, setNewTodo] = useState("");
  const taskCount = todos.length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  const toggleTodoCompleted = (index) => {
    let lists = list;
    lists.todos[index].completed = !lists.todos[index].completed;
    //console.log("ToggleTodoCompleted", list);

    updateList(list);
  };

  renderTodo = (todo, index) => {
    //console.log(todo);
    return (
      <Swipeable renderRightActions={(_, dragX) => rightActions(dragX, index)}>
        <View style={styles.todoContainer}>
          <TouchableOpacity onPress={() => toggleTodoCompleted(index)}>
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
      </Swipeable>
    );
  };

  const rightActions = (dragX, index) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0.9],
      extrapolate: "clamp",
    });

    /*const opacit = dragX.interpolate({
      inputRange: [-100, -20, 0],
      uotputRange: [1, 0.9, 0],
      extrapolate: "clamp",
    });*/
    return (
      <TouchableOpacity onPress={() => deleteTodo(index)}>
        <Animated.View style={[styles.deleteButton]}>
          <Animated.Text
            style={{
              color: Colors.white,
              fontWeight: "800",
              transform: [{ scale }],
            }}
          >
            Delete
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const addTodo = () => {
    //console.log(newTodo);
    let lists = list;
    if (!lists.todos.some((todo) => todo.title === newTodo)) {
      lists.todos.push({ title: newTodo, completed: false });
      updateList(list);
    }

    setNewTodo("");
    Keyboard.dismiss();
  };

  const deleteTodo = (index) => {
    let item = list;
    item.todos.splice(index, 1);

    updateList(item);
  };

  //console.log("updateList", updateList);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
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

        <View style={[styles.section, { flex: 3, marginVertical: 16 }]}>
          <FlatList
            data={todos}
            renderItem={({ item, index }) => renderTodo(item, index)}
            keyExtractor={(item) => item.title}
            //keyExtractor={(_, index) => index.toString()}
            /*contentContainerStyle={{
              paddingHorizontal: 32,
              paddingVertical: 64,
            }}*/
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View style={[styles.section, styles.footer]}>
          <TextInput
            style={[styles.input, { borderColor: color }]}
            onChange={(e) => setNewTodo(e.nativeEvent.text)}
            value={newTodo}
          />
          <TouchableOpacity
            style={[styles.addTodo, { backgroundColor: color }]}
            onPress={addTodo}
          >
            <AntDesign name="plus" size={16} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    //flex: 1,
    alignSelf: "stretch",
  },
  header: {
    justifyContent: "flex-end",
    marginLeft: 64,
    borderBottomWidth: 3,
    paddingTop: 16,
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
    paddingVertical: 20,
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
    paddingLeft: 50,
  },
  todo: {
    color: Colors.black,
    fontWeight: "700",
    fontSize: 16,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: Colors.red,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    marginTop: 20,
  },
});
