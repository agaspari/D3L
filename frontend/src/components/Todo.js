import React, { useEffect, useRef, useState } from "react";
import Details from "./Details";


function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const details=["Due to growing frustrations surrounding the inability for D2L to optimize group project work in our current online environment, a need has arisen for a new system or application that streamlines the process of group participation and communication while still allowing faculty the chance to oversee curriculum completion. ",
"The intention of this project is to build in functionalities like a peer to peer chat, calendar updates, and third party zoom connection in an attempt to ease the burden of group project work in a way that is convenient for both students and professors.",
" From a solely faculty perspective, the goal is to be able to effectively orient students and materials into designated groups and be able to quickly disperse information and tools as well as evaluate group progress and grade said progress. "];

//get the description of the clicked task
function openDetails(value){
  if(value=="todo-0"){
    document.getElementById('description').innerHTML = details[0];
  }
  if(value=="todo-1"){
      document.getElementById('description').innerHTML = details[1];
    }
  if(value=="todo-2"){
      document.getElementById('description').innerHTML = details[2];
    }
  }



export default function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');

  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  const wasEditing = usePrevious(isEditing);

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!newName.trim()) {
      return;
    }
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input
          id={props.id}
          className="todo-text"
          type="text"
          value={newName}
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>
      <div className="btn-group">

        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
          <input
            id={props.id}
            type="checkbox"
            defaultChecked={props.completed}
            onChange={() => props.toggleTaskCompleted(props.id)}
          />
          <label className="todo-label" htmlFor={props.id}>
            {props.name}
          </label>
        </div>
        <div className="btn-group">
        <button
          type="button"
          className="btn"
          //add details method
          //onClick
          onClick={() => openDetails(props.id)}
          >
            Details <span className="visually-hidden">{props.name}</span>
          </button>
        <button
          type="button"
          className="btn"
          onClick={() => setEditing(true)}
          ref={editButtonRef}
          >
            Edit <span className="visually-hidden">{props.name}</span>
          </button>
          <button
            type="button"
            className="btn btn__danger"
            onClick={() => props.deleteTask(props.id)}
          >
            Delete <span className="visually-hidden">{props.name}</span>
          </button>
        </div>
    </div>
  );


  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);


  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}