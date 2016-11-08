const Note = React.createClass({
    render: function () {
        const style = { backgroundColor: this.props.color };
        return (
            <div className="note" style={style}>
                <span className="delete-note" onClick={this.props.onDelete}> x </span>
                {this.props.children}
            </div>
        );
    }
});

const NoteEditor = React.createClass({
    getInitialState: function () {
        return {
            text: ''
        }
    },
    handleTextChange: function (event) {
        this.setState({ text: event.target.value });
    },
    handleNoteAdd: function () {
        const newNote = {
            text: this.state.text,
            color: randomColor({luminosity: 'light'}),
            id: Date.now()
        };

        this.props.onNoteAdd(newNote);

        this.setState({ text: '' });
    },
    render: function () {
        return (
            <div className="note-editor">
                <textarea
                    placeholder="Enter your note here..."
                    rows={5}
                    className="textarea"
                    value={this.state.text}
                    onChange={this.handleTextChange}
                />
                <button className="add-button" onClick={this.handleNoteAdd}>Add</button>
            </div>
        );
    }
});

const NotesGrid = React.createClass({
    componentDidMount: function () {
        const grid = this.refs.grid;
        this.msnry = new Masonry(grid, {
            itemSelector: '.note',
            columnWidth: 200,
            gutter: 10,
            isFitWidth: true
        });
    },
    componentDidUpdate: function(prevProps) {
        if (this.props.notes.length !== prevProps.notes.length) {
            this.msnry.reloadItems();
            this.msnry.layout();
        }
    },
    render: function () {
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
});

const NotesApp = React.createClass({
    getInitialState: function () {
        return {
            notes: []
        };
    },
    componentDidMount: function () {
        const localNotes = JSON.parse(localStorage.getItem('notes'));
        if (localNotes) {
            this.setState({ notes : localNotes });
        }
    },
    handleNoteAdd: function (newNote) {
        const newNotes = this.state.notes.slice();
        newNotes.unshift(newNote);
        this.setState({ notes: newNotes });
    },
    handleNoteDelete: function (note) {
        const noteId = note.id;
        const newNotes = this.state.notes.filter(function (note) {
            return note.id !== noteId;
        });
        this.setState({ notes: newNotes });
    },
    componentDidUpdate: function () {
        this._updateLocalStorage()
    },
    render: function () {
        return (
            <div className="notes-app">
                <h2 className="app-header">NotesApp</h2>
                <NoteEditor onNoteAdd={this.handleNoteAdd}/>
                <NotesGrid onDelete={this.handleNoteDelete} notes={this.state.notes} />
            </div>
        );
    },
    _updateLocalStorage: function () {
        const notes = JSON.stringify(this.state.notes);
        localStorage.setItem('notes', notes);
    }
});

ReactDOM.render(
    <NotesApp />,
    document.getElementById("mount-point")
);