import React, { Component } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

class AddEmployeeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      author: "",
      year_of_publication: "",
      loading: false,
      errorMessage: "",
    };
  }

  handleChange = (value, state) => {
    this.setState({ [state]: value });
  };

  addEmployee = () => {
    const { title, year_of_publication, author } = this.state;
    this.setState({ errorMessage: "", loading: true });

    if (title && year_of_publication && author) {
      fetch("http://localhost:3001/api/v1/books/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: this.state.title,
          author: this.state.author,
          year_of_publication: this.state.year_of_publication,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          this.props.closeModal();
          this.props.addEmployee({
            title: res.title,
            year_of_publication: res.year_of_publication,
            author: res.author,
            id: res.id,
          });
        })
        .catch(() => {
          this.setState({
            errorMessage: "Ошибка сети. Пожалуйста, попробуйте снова.",
            loading: false,
          });
        });
    } else {
      this.setState({ errorMessage: "Поля пустые.", loading: false });
    }
  };

  render() {
    const { isOpen, closeModal } = this.props;
    const { loading, errorMessage } = this.state;
    return (
      <Modal visible={isOpen} onRequestClose={closeModal} animationType="slide">
        <View style={styles.container}>
          <Text style={styles.title}>Добавить книгу</Text>

          <TextInput
            style={styles.textBox}
            onChangeText={(text) => this.handleChange(text, "title")}
            placeholder="Название"
          />

          <TextInput
            style={styles.textBox}
            onChangeText={(text) => this.handleChange(text, "author")}
            placeholder="Автор"
          />
          <TextInput
            style={styles.textBox}
            keyboardType="numeric"
            onChangeText={(number) =>
              this.handleChange(number, "year_of_publication")
            }
            placeholder="Дата выхода: 01.01.2024"
          />

          {loading ? (
            <Text style={styles.message}>Загрузка...</Text>
          ) : errorMessage ? (
            <Text style={styles.message}>{errorMessage}</Text>
          ) : null}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={this.addEmployee}
              style={{ ...styles.button, marginVertical: 0 }}
            >
              <Text style={styles.buttonText}>Создать</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={closeModal}
              style={{
                ...styles.button,
                marginVertical: 0,
                marginLeft: 10,
                backgroundColor: "tomato",
              }}
            >
              <Text style={styles.buttonText}>Отмена</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

export default AddEmployeeModal;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
  },
  textBox: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "rgba(0,0,0,0.3)",
    marginBottom: 15,
    fontSize: 18,
    padding: 10,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    borderRadius: 5,
    marginVertical: 20,
    alignSelf: "flex-start",
    backgroundColor: "gray",
  },
  buttonText: {
    color: "white",
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  message: {
    color: "tomato",
    fontSize: 17,
  },
});
