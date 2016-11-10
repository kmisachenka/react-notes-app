class Note extends React.Component {
    render () {
        const style = { backgroundColor: this.props.color };
        return (
            <div className="note" style={style}>
                <span className="delete-note" onClick={this.props.onDelete}> x </span>
                {this.props.children}
            </div>
        );
    }
}

class NoteColorPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = { colors: [{  id: '0', color: 'yellow' }, { id: '1', color: 'red' }, { id: '2', color: 'green' }] };
        this.handleColorChange = this.handleColorChange.bind(this);
    }
    handleColorChange(event) {
        this.props.onColorChange(event.target.value);
    }
    render() {
        const that = this;
        return (
            <div>
                {
                    this.state.colors.map(function (color) {
                        return <input
                            key={color.id}
                            type="radio"
                            name="color"
                            value={color.color}
                            onClick={that.handleColorChange}
                        />
                    })
                }

            </div>
        );
    }
}


class NoteEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: '', color: 'yellow', errorText: '' };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleNoteAdd = this.handleNoteAdd.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.throwError = this.throwError.bind(this);
    }
    handleTextChange(event) {
        this.setState({ errorText: '', text: event.target.value });
    }
    handleNoteAdd() {
        if (this.state.text.trim() === '') {
            this.throwError('Note message cannot be empty');
            return;
        }
        const newNote = {
            text: this.state.text,
            color: this.state.color,
            id: Date.now()
        };
        this.props.onNoteAdd(newNote);
        this.setState({text: ''});
    }
    handleColorChange(color) {
        this.setState({ color: color })
    }
    throwError(errorText) {
        this.setState({ errorText: errorText });
    }
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
                <div className="note-error">{this.state.errorText}</div>
            </div>
        );
    }
}

class NotesGrid extends React.Component {
    componentDidMount() {
        const grid = this.refs.grid;
        this.msnry = new Masonry(grid, {
            itemSelector: '.note',
            columnWidth: 200,
            gutter: 10,
            isFitWidth: true
        });
    }
    componentDidUpdate(prevProps) {
        if (this.props.notes.length !== prevProps.notes.length) {
            this.msnry.reloadItems();
            this.msnry.layout();
        }
    }
    render() {
        const onDelete = this.props.onDelete;
        return (
            <div className="notes-grid" ref="grid">
                {
                    this.props.notes.map(function (note) {
                        return <Note
                                    key={note.id}
                                    color={note.color}
                                    onDelete={onDelete.bind(null, note)}>
                                    {note.text}
                                </Note>
                    })
                }
            </div>
        );
    }
}

class NotesApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { notes: [] };
        this.handleNoteAdd = this.handleNoteAdd.bind(this);
        this.handleNoteDelete = this.handleNoteDelete.bind(this);
    }
    componentDidMount() {
        const localNotes = JSON.parse(localStorage.getItem('notes'));
        if (localNotes) {
            this.setState({ notes : localNotes });
        }
    }
    handleNoteAdd(newNote) {
        const newNotes = this.state.notes.slice();
        newNotes.unshift(newNote);
        this.setState({ notes: newNotes });
    }
    handleNoteDelete(note) {
        const noteId = note.id;
        const newNotes = this.state.notes.filter(function (note) {
            return note.id !== noteId;
        });
        this.setState({ notes: newNotes });
    }
    componentDidUpdate() {
        this._updateLocalStorage()
    }
    render() {
        return (
            <div className="notes-app">
                <h2 className="app-header">NotesApp</h2>
                <NoteEditor onNoteAdd={this.handleNoteAdd}/>
                <NotesGrid onDelete={this.handleNoteDelete} notes={this.state.notes} />
            </div>
        );
    }
    _updateLocalStorage() {
        const notes = JSON.stringify(this.state.notes);
        localStorage.setItem('notes', notes);
    }
}

ReactDOM.render(
    <NotesApp />,
    document.getElementById("mount-point")
);