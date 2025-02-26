import React, { useReducer, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

const initialState = {
  todos: [],
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case "DELETE_TASK":
      return {
        ...state,
        todos: state.todos.filter((_, index) => index !== action.payload),
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() === "") return;
    dispatch({
      type: "ADD_TASK",
      payload: newTask,
    });
    setNewTask("");
  };

  const handleDeleteTask = (index) => {
    dispatch({
      type: "DELETE_TASK",
      payload: index,
    });
  };

  const renderTask = ({ item, index }) => (
    <TouchableOpacity
      style={styles.taskItem}
      onPress={() => handleDeleteTask(index)}
    >
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newTask}
          onChangeText={setNewTask}
          placeholder="Add new..."
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleAddTask}>
          <Text>Save</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={state.todos}
        renderItem={renderTask}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text>My todo</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    padding: 5,
    marginRight: 5,
  },
  saveButton: {
    padding: 5,
  },
  taskItem: {
    padding: 10,
    borderBottomWidth: 1,
  },
});

export default App;
