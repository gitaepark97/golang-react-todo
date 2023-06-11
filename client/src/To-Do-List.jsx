import { Component } from "react";
import axios from "axios";
import { Card, Header, Form, Input, Icon } from "semantic-ui-react";

const endpoint = "http://localhost:9000";

class ToDoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: "",
      items: [],
    };
  }

  getTask = () => {
    axios.get(endpoint + "/api/task").then((res) => {
      if (res.data) {
        this.setState({
          items: res.data.map((item) => {
            let color = "yellow";
            const style = {
              wordWrap: "break-word",
            };

            if (item.status) {
              color = "green";
              style["textDecoration"] = "line-through";
            }

            return (
              <Card className="rough" key={item._id} color={color} fluid>
                <Card.Content>
                  <Card.Header textAlign="left">
                    <div style={style}>{item.task}</div>
                  </Card.Header>
                  <Card.Meta textAlign="right">
                    <Icon name="check circle" color="blue" onClick={() => this.updateTask(item._id)}></Icon>
                    <span style={{ paddingRight: 10 }}>Done</span>
                    <Icon name="undo" color="yellow" onClick={() => this.undoTask(item._id)}></Icon>
                    <span style={{ paddingRight: 10 }}>Undo</span>
                    <Icon name="delete" color="red" onClick={() => this.deleteTask(item._id)}></Icon>
                    <span style={{ paddingRight: 10 }}>Delete</span>
                  </Card.Meta>
                </Card.Content>
              </Card>
            );
          }),
        });
      } else {
        this.setState({
          items: [],
        });
      }
    });
  };

  updateTask = (id) => {
    axios
      .put(endpoint + "/api/task/" + id, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        console.log(res);
        this.getTask();
      });
  };

  undoTask = (id) => {
    axios
      .put(endpoint + "/api/undoTask/" + id, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        console.log(res);
        this.getTask();
      });
  };

  deleteTask = (id) => {
    axios
      .put(endpoint + "/api/deleteTask/" + id, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        console.log(res);
        this.getTask();
      });
  };

  componentDidMount() {
    this.getTask();
  }

  onSubmit = () => {
    let { task } = this.state;

    if (task) {
      axios
        .post(endpoint + "/api/task", { task }, { headers: { "Content-Type": "application/x-www-form-urlencoded" } })
        .then((res) => {
          console.log(res);
          this.getTask();
          this.setState({
            task: "",
          });
        });
    }
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <div className="row">
          <Header className="header" as="h2" color="yellow">
            To Do List
          </Header>
        </div>
        <div className="row">
          <Form onSubmit={this.onSubmit}>
            <Input
              type="text"
              name="task"
              onChange={this.onChange}
              value={this.state.task}
              fluid
              placeholder="Create Task"
            />
          </Form>
        </div>
        <div className="row">
          <Card.Group>{this.state.items}</Card.Group>
        </div>
      </div>
    );
  }
}

export default ToDoList;
