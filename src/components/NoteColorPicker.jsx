import React from 'react'
import './NoteColorPicker.css'

class NoteColorPicker extends React.Component {

  static propTypes = {
    onColorChange: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      colors: [
        {id: '0', color: 'yellow'},
        {id: '1', color: 'red'},
        {id: '2', color: 'green'}
      ]
    };
  }

  handleColorChange = (event) => {
    this.props.onColorChange(event.target.value);
  };

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

module.exports = NoteColorPicker;
