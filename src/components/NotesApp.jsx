import React from 'react'
import NoteEditor from './NoteEditor'
import NotesGrid from './NotesGrid'
import './NotesApp.css'

class NotesApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {notes: []};
  }

  componentDidMount() {
    const localNotes = JSON.parse(localStorage.getItem('notes'));
    if (localNotes) {
      this.setState({notes: localNotes});
    }
  }

  handleNoteAdd = (newNote) => {
    const newNotes = this.state.notes.slice();
    newNotes.unshift(newNote);
    this.setState({notes: newNotes});
  };

  handleNoteDelete = (note) => {
    const noteId = note.id;
    const newNotes = this.state.notes.filter(function (note) {
      return note.id !== noteId;
    });
    this.setState({notes: newNotes});
  };

  componentDidUpdate() {
    this._updateLocalStorage()
  }

  render() {
    return (
      <div className='notes-app'>
        <h2 className='app-header'>NotesApp</h2>
        <NoteEditor onNoteAdd={this.handleNoteAdd}/>
        <NotesGrid onDelete={this.handleNoteDelete} notes={this.state.notes}/>
      </div>
    );
  }

  _updateLocalStorage() {
    const notes = JSON.stringify(this.state.notes);
    localStorage.setItem('notes', notes);
  }

}

export default NotesApp;
