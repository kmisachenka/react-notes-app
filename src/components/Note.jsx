import React from 'react'
import './Note.css'

class Note extends React.Component {

  static propTypes = {
    color: React.PropTypes.string.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    children: React.PropTypes.string.isRequired
  };

  render() {
    const style = {backgroundColor: this.props.color};
    return (
      <div className="note" style={style}>
        <span className="delete-note" onClick={this.props.onDelete}> x </span>
        {this.props.children}
      </div>
    );
  }

}

module.exports = Note;
