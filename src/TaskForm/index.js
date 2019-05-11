import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NoteForm extends Component {

  constructor(props){
    super(props)
    this.state = {
      newContent: ''
    }
  }

  handelUserInput = (e) => {
    this.setState({ newContent: e.target.value });
  }

  onClick = () => {
    this.props.addNote(this.state.newContent);
    this.setState({ newContent: '' });
  }

  render(props){
    return (
      <div className="row">
        <div className="col-md-8">
          <input type="text" className="form-control add-todo" placeholder="Add a task" value={this.state.newContent} onChange={this.handelUserInput} ></input>
        </div>
        <div className="col-md-4">
          <button type="button" className="btn btn-primary" onClick={this.onClick}>Add</button>
        </div>
      </div>
    )
  }
}

NoteForm.propTypes = {
  noteContent: PropTypes.string,
}

export default NoteForm;