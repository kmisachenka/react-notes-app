import React from 'react'
import Note from './Note.jsx'
import Masonry from 'masonry-layout'
import './NotesGrid.css'


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

module.exports = NotesGrid;