import React, { Component } from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";

class DeleteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      author: "",
      ayear_of_publicationge: "",
      loading: false,
      errorMessage: "",
    };
  }

  handleChange = (value, state) => {
    this.setState({ [state]: value });
  };

  deleteEmployee = () => {
    this.setState({ errorMessage: "", loading: true });
    fetch(
      `http://localhost:3001/api/v1/books/${this.props.selectedEmployee.id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then(() => {
        this.props.closeModal();
        this.props.updateEmployee(this.props.selectedEmployee.id);
      });
  };

  render() {
    const { isOpen, closeModal, selectedEmployee } = this.props;
    return (
      <Modal
        visible={isOpen}
        onRequestClose={closeModal}
        animationType="slide"
        transparent
      >
        <View style={styles.BackgroundContainer}>
          <View style={styles.container}>
            <Text style={styles.title}>
              Хотите ли вы удалить название у ({selectedEmployee.title}
              )?
            </Text>
            <Text style={styles.subTitle}>
              Нажмите кнопку "Далее" если хотите удалить или если вы не хотите
              удалять, просто нажмите "Отмена".
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={this.deleteEmployee}>
                <Text style={styles.buttonText}>Далее</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ marginLeft: 10 }} onPress={closeModal}>
                <Text style={{ ...styles.buttonText, color: "skyblue" }}>
                  Отмена
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default DeleteModal;

const styles = StyleSheet.create({
  BackgroundContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  container: {
    width: "90%",
    padding: 15,
    maxHeight: "40%",
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 4,
  },
  title: {
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 16,
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
    alignSelf: "flex-end",
  },
  buttonText: {
    color: "tomato",
    fontSize: 17,
  },
  message: {
    color: "tomato",
    fontSize: 17,
  },
});
