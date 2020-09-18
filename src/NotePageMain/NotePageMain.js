import React from 'react';
import Note from '../Note/Note';
import ApiContext from '../ApiContext';
import axios from 'axios';
import config from '../config';
import './NotePageMain.css';

export default class NotePageMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noteRes: {id: 0, name: '', modified: '2020-09-17T23:24:51.635Z', content: ''}
    };
  }
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  handleDeleteNote = noteId => {
    this.props.history.push(`/`)
  }
  async componentDidMount() {
    try {
      let response = await axios.get(`${config.API_ENDPOINT}/notes/${this.props.match.params.noteId}`);
      response = response.data[0]
      this.setState({
        noteRes: response
      })
    } 
    catch (error) {
      window.location.reload();
    }
  }
  render() {
    let note = this.state.noteRes;
    return (
      <section className='NotePageMain'>
        <Note
          id={note.id}
          name={note.name}
          content={note.content}
          modified={note.modified}
          onDeleteNote={this.handleDeleteNote}
        />
        <div className='NotePageMain__content'>
          {note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>
    )
  }
}
