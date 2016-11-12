import React from 'react'
import './Note.css'

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

module.exports = Note;