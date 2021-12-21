import react from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState=(props)=>{
    const notesInitial=[
        {
          "_id": "6a1bd918635695dfdf85217da280c1",
          "title": "My title",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "2021-12-18T07:45:10.244Z",
          "__v": 0
        },
        {
          "_id": "6b1bdb96sad0fb7d6f2136a438bf2",
          "title": "My titles",
          "description": "Please wake usp early",
          "tag": "personal",
          "date": "2021-12-18T10:35:12.239Z",
          "__v": 0
        }
      
       
      ]
      const [notes, setNotes] = useState(notesInitial)



      //ADD a Note
     
      const addNote=(title,description,tag)=>{
            // TODO: API Call
            console.log("Adding a new Note");
             const note={
                "_id": "6b1bdb96sad0fb7d6f2136a438bf2",
                "title": title,
                "description": description,
                "tag":tag,
                "date": "2021-12-18T10:35:12.239Z",
                "__v": 0
              };
      
          setNotes(notes.concat(note))

      }


      //Delete a Note
      const deleteNote=()=>{

        }


        // Edit a Note
        const editNote=()=>{

        }

    
    
    return(
        <NoteContext.Provider value={{notes,addNote, deleteNote,editNote}}>
            
                {props.children}
            
        </NoteContext.Provider>
    )
}

export default NoteState;