import React, { Component } from 'react';
import './App.css';

import { DB_CONFIG } from './Config/config';
import firebase from 'firebase/app';
import 'firebase/database';

import Task from './Task';
import TaskForm from './TaskForm';
import BarGraph from './BarGraph';

class App extends Component {

  constructor(props){
    super(props)
    if (!firebase.apps.length) {
      this.app = firebase.initializeApp(DB_CONFIG);
      this.db = firebase.database().ref().child('tasks');
    }
    this.state = {
      tasks: [],
    }
  }

  componentWillMount() {
    const { tasks } = this.state;
    this.db.on('child_added', snap => {
      tasks.push({
        id: snap.key,
        name: snap.val().name,
        done: snap.val().done
      });
      this.setState({ tasks: tasks });
    })
  }

  addNote = (note) => {
    if (note !== '') {
      this.db.push().set({ name: note, done: false });
    }
  }

  taskStatus = (e) => {
    const { tasks } = this.state;
    const id = e.currentTarget.dataset.id;
    const name = e.currentTarget.dataset.name;
    const checkBox = document.querySelector(`input[data-id=${id}]`);
    if (checkBox.checked === true) {
      const index = tasks.findIndex(x => x.id === id);
      tasks[index].done = true;
      this.setState({ tasks }, () => {
        this.db.child(id).update({ name, done: true });
      })
    } else {
      const index = tasks.findIndex(x => x.id === id);
      tasks[index].done = false;
      this.setState({ tasks }, () => {
        this.db.child(id).update({ name, done: false });
      })
    }
  }

  render() {
    return (
      <div className="container">
        <h1>Todos</h1>
        <div className="row">
          <div className="col-md-6">
            <TaskForm addNote={this.addNote} />
            {
              this.state.tasks.map((task, index) => {
                return <Task {...task} key={index} taskStatus={this.taskStatus} />
              })
            }
          </div>
          <div className="col-md-6">
            {
              this.state.tasks.length > 0
              &&
              <BarGraph data={this.state.tasks} />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
