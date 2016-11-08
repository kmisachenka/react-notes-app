const Note = React.createClass({
    render: function () {
        const style = { backgroundColor: this.props.color };
        return (
            <div className="note" style={style}> {this.props.children} </div>
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
            color: 'yellow',
            id: Date.now()
        };

        this.props.onNoteAdd(newNote);
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
        const msnry = new Masonry(grid, {
            itemSelector: '.note',
            columnWidth: 200,
            gutter: 10
        });
    },
    render: function () {
        return (
            <div className="notes-grid" ref="grid">
                {
                    this.props.notes.map(function (note) {
                        return <Note key={note.id} color={note.color} > {note.text} </Note>
                    })
                }
            </div>
        );
    }
});

const NotesApp = React.createClass({
    getInitialState: function () {
        return {
            notes: [
                {
                    id: 0,
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut scelerisque.",
                    color: "#FFD700"

                },
                {
                    id: 1,
                    text: "Ivamus venenatis cursus ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel dictum urna.",
                    color: "#20B2AA"

                },
                {
                    id: 2,
                    text: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. " +
                    "Proin venenatis rutrum lobortis. Nulla facilisi. Aliquam sed fermentum eros, et consectetur erat. " +
                    "Sed egestas diam erat, a commodo nibh venenatis in. Nam id consectetur quam, vitae sollicitudin enim.",
                    color: "#1AD2FF"

                },
                {
                    id: 3,
                    text: "Sed sed lacus ultricies, accumsan odio pellentesque, auctor mi. Mauris maximus nunc nec lectus " +
                    "bibendum, rutrum scelerisque metus mattis. Class aptent taciti sociosqu ad litora torquent per conubia " +
                    "nostra, per inceptos himenaeos. Pellentesque sodales mauris tellus, quis convallis massa tempus et.",
                    color: "#4072AB"

                },
                {
                    id: 4,
                    text: "Ut quis euismod sapien. Sed ac pellentesque purus. Maecenas malesuada lobortis felis eu " +
                    "imperdiet. Nam rutrum facilisis erat, eget congue augue dictum non. Nulla volutpat quam a elit interdum " +
                    "tincidunt. Nam semper massa enim, at mattis nunc convallis in.",
                    color: "#2FFF12"

                },
                {
                    id: 5,
                    text: "Fusce sed leo rutrum, viverra ante ac, sollicitudin erat. Vestibulum eu cursus erat. Duis " +
                    "vestibulum sit amet arcu feugiat iaculis. Cras rutrum consectetur maximus.",
                    color: "#FF12AD"

                },
                {
                    id: 6,
                    text: "Nullam aliquam enim a elit interdum dignissim. Curabitur fermentum ut dolor a pharetra. Morbi " +
                    "metus dolor, sodales sit amet arcu nec, vehicula congue quam. Pellentesque nec egestas est, vitae " +
                    "dignissim orci. Nullam est sapien, ultrices nec tincidunt quis, cursus at ante. ",
                    color: "#F012FA"

                }


            ]

        };
    },
    handleNoteAdd: function (newNote) {
        const newNotes = this.state.notes.slice();
        newNotes.unshift(newNote);
        this.setState({ notes: newNotes });
    },
    render: function () {
        return (
            <div className="notes-app">
                <h2 className="app-header">NotesApp</h2>
                <NoteEditor onNoteAdd={this.handleNoteAdd}/>
                <NotesGrid notes={this.state.notes}/>
            </div>
        );
    }
});

ReactDOM.render(
<NotesApp />,
    document.getElementById("mount-point")
);