import React from 'react'
import NoteColorPicker from './NoteColorPicker.jsx'
import Noty from 'noty'
import './NoteEditor.css'

class NoteEditor extends React.Component {

  static propTypes = {
    onNoteAdd: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {text: '', color: 'yellow', errorText: ''};
  }

  handleTextChange = (event) => {
    this.setState({errorText: '', text: event.target.value});
  };

  handleNoteAdd = () => {
    if (this.state.text.trim() === '') {
      this.throwError('Note text cannot be empty');
      return;
    }
    const newNote = {
      text: this.state.text,
      color: this.state.color,
      id: Date.now()
    };
    this.props.onNoteAdd(newNote);
    this.setState({text: ''});
  };

  handleColorChange = (color) => {
    this.setState({color: color})
  };

  throwError = (errorText) => {
    Noty({text: errorText, layout: 'topCenter', theme: 'relax', type: 'error', timeout: 1500, maxVisible: 1});
  };

  render() {
    return (
      <div className="note-editor">
        <textarea
          placeholder="Enter your note here..."
          rows={5}
          className="textarea"
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <NoteColorPicker onColorChange={this.handleColorChange}/>
        <button className="add-button" onClick={this.handleNoteAdd}>Add</button>
      </div>
    );
  }

}

module.exports = NoteEditor;
