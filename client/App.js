import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AddModal from "./components/AddModal";
import EditModal from "./components/EditModal";
import DeleteModal from "./components/DeleteModal";

class App extends Component {
  state = {
    employee: [],
    isAddEmployeeModalOpen: false,
    isEditEmployeeModalOpen: false,
    isDeleteEmployeeModalOpen: false,
    loading: false,
    errorMessage: "",
    selectedEmployee: {},
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.setState({ errorMessage: "", loading: true });
    fetch("http://localhost:3001/api/v1/books/", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) =>
        this.setState({
          employee: res,
          loading: false,
          errorMessage: "",
        })
      )
      .catch(() =>
        this.setState({
          loading: false,
          errorMessage: "Ошибка сети. Пожалуйста, попробуйте снова.",
        })
      );
  };

  toggleAddEmployeeModal = () => {
    this.setState({
      isAddEmployeeModalOpen: !this.state.isAddEmployeeModalOpen,
    });
  };

  toggleEditEmployeeModal = () => {
    this.setState({
      isEditEmployeeModalOpen: !this.state.isEditEmployeeModalOpen,
    });
  };

  toggleDeleteEmployeeModal = () => {
    this.setState({
      isDeleteEmployeeModalOpen: !this.state.isDeleteEmployeeModalOpen,
    });
  };

  addEmployee = (data) => {
    this.setState({ employee: [data, ...this.state.employee] });
  };

  updateEmployee = (data) => {
    this.setState({
      employee: this.state.employee.map((emp) =>
        emp.id == data.id ? data : emp
      ),
    });
  };

  deleteEmployee = (employeeId) => {
    this.setState({
      employee: this.state.employee.filter((emp) => emp.id !== employeeId),
    });
  };

  render() {
    const {
      loading,
      errorMessage,
      employee,
      isAddEmployeeModalOpen,
      isEditEmployeeModalOpen,
      isDeleteEmployeeModalOpen,
      selectedEmployee,
    } = this.state;
    return (
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={this.toggleAddEmployeeModal}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Добавить Книгу</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Список книг:</Text>
          {employee.map((data, index) => (
            <View style={styles.employeeListContainer} key={data.id}>
              <Text style={{ ...styles.listItem, color: "tomato" }}>
                {index + 1}.
              </Text>
              <Text style={styles.name}>{data.title}</Text>
              <Text style={styles.listItem}>
                Дата выхода: {data.year_of_publication}
              </Text>
              <Text style={styles.listItem}>Автор: {data.author}</Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    this.toggleEditEmployeeModal();
                    this.setState({ selectedEmployee: data });
                  }}
                  style={{ ...styles.button, marginVertical: 0 }}
                >
                  <Text style={styles.buttonText}>Изменить</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    this.toggleDeleteEmployeeModal();
                    this.setState({ selectedEmployee: data });
                  }}
                  style={{
                    ...styles.button,
                    marginVertical: 0,
                    marginLeft: 10,
                    backgroundColor: "tomato",
                  }}
                >
                  <Text style={styles.buttonText}>Удалить</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {loading ? (
            <Text style={styles.message}>Загрузка...</Text>
          ) : errorMessage ? (
            <Text style={styles.message}>{errorMessage}</Text>
          ) : null}

          {isAddEmployeeModalOpen ? (
            <AddModal
              isOpen={isAddEmployeeModalOpen}
              closeModal={this.toggleAddEmployeeModal}
              addEmployee={this.addEmployee}
            />
          ) : null}

          {isEditEmployeeModalOpen ? (
            <EditModal
              isOpen={isEditEmployeeModalOpen}
              closeModal={this.toggleEditEmployeeModal}
              selectedEmployee={selectedEmployee}
              updateEmployee={this.updateEmployee}
            />
          ) : null}

          {isDeleteEmployeeModalOpen ? (
            <DeleteModal
              isOpen={isDeleteEmployeeModalOpen}
              closeModal={this.toggleDeleteEmployeeModal}
              selectedEmployee={selectedEmployee}
              updateEmployee={this.deleteEmployee}
            />
          ) : null}
        </View>
      </ScrollView>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
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
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
  employeeListContainer: {
    marginBottom: 25,
    elevation: 4,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 6,
    borderTopWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  listItem: {
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  message: {
    color: "tomato",
    fontSize: 17,
  },
});
