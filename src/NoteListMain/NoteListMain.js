import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Note from '../Note/Note';
import CircleButton from '../CircleButton/CircleButton';
import ApiContext from '../ApiContext';
import { getNotesForFolder } from '../notes-helpers';
import axios from 'axios';
import config from '../config';
import './NoteListMain.css';

export default class NoteListMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folderRes: [{id: 0, name: '', modified: 'asd'}]
    };
  }
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext
  async componentDidMount() {
      try {
        let response = await axios.get(`${config.API_ENDPOINT}/folders/${this.props.match.params.folderId}`);
        response = response.data
        this.setState({
          folderRes: response
        })
        sessionStorage.setItem('folderId', this.props.match.params.folderId);
      } 
      catch (error) {
        window.location.reload();
      }
  }
  async componentDidUpdate() {
    let folderId = sessionStorage.getItem('folderId');
    if(this.props.match.params.folderId === undefined){
    }
    else if(folderId !== this.props.match.params.folderId){
      this.componentDidMount();
      sessionStorage.setItem('folderId', this.props.match.params.folderId);
    }
  }
  render() {
    let { folderId } = 0;
    if(this.props.match.params.folderId) {
      folderId = this.props.match.params.folderId;
      return (
        <section className='NoteListMain'>
          <ul>
            {this.state.folderRes.map(note =>
              <li key={note.id}>
                <Note
                  id={note.id}
                  name={note.name}
                  modified={note.modified}
                />
              </li>
            )}
          </ul>
          <div className='NoteListMain__button-container'>
            <CircleButton
              tag={Link}
              to='/add-note'
              type='button'
              className='NoteListMain__add-note-button'
            >
              <FontAwesomeIcon icon='plus' />
              <br />
              Note
            </CircleButton>
          </div>
        </section>
      )
    }
    else {
      const { notes=[] } = this.context
      const notesForFolder = getNotesForFolder(notes, folderId)
      return (
        <section className='NoteListMain'>
          <ul>
            {notesForFolder.map(note =>
              <li key={note.id}>
                <Note
                  id={note.id}
                  name={note.name}
                  modified={note.modified}
                />
              </li>
            )}
          </ul>
          <div className='NoteListMain__button-container'>
            <CircleButton
              tag={Link}
              to='/add-note'
              type='button'
              className='NoteListMain__add-note-button'
            >
              <FontAwesomeIcon icon='plus' />
              <br />
              Note
            </CircleButton>
          </div>
        </section>
      )
    }
    
  }
}
