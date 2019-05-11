import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Task extends Component {

  render(){
    const { id, name, done, taskStatus } = this.props;
    return (
      <div className="">
        <label>
          <input type="checkbox" name={name} data-id={id} data-name={name} onClick={(e)=> taskStatus(e)} defaultChecked={done}></input>
          &nbsp; {name}
        </label>
      </div>
    )
  }
}

Task.propTypes = {
  name: PropTypes.string,
  done: PropTypes.bool,
  taskDone: PropTypes.func,
}

export default Task;