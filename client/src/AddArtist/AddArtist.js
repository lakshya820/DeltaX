import React from 'react';
import { useState } from "react";
import Axios from "axios";

import NewWindow from 'react-new-window'

function AddArtist() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [dor, setDor] = useState("");

  const [newArtist, setNewArtist] = useState("");

  const [songsList, setSongsList] = useState([]);

  const addSongs = () => {
    Axios.post("http://localhost:3000/create1", {
      name: name,
      bio: bio,
      dor: dor,
    }).then(() => {
      console.log("success");
      
      });
    };
  

  const getSongs = () => {
    Axios.get("http://localhost:3000/songs").then((response) => {
      setSongsList(response.data);
    });
  };

  const updateSongsArtist = (id) => {
    Axios.put("http://localhost:3000/update", { artist: newArtist, id: id }).then(
      (response) => {
        setSongsList(
          songsList.map((val) => {
            return val.id === id
              ? {
                  id: val.id,
                  name: val.name,
                  artist: newArtist,
                  dor: val.dor,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteSongs = (id) => {
    Axios.delete(`http://localhost:3000/delete/${id}`).then((response) => {
      setSongsList(
        songsList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  return (
    
    <div className="App">
      <div className="information">
      <h2>Adding Artist</h2>
      <div class="block">
                <label for="fname">Artist Name</label>
          <input class="fname" type="text" name="name" onChange={(event) => {
            setName(event.target.value);
          }} />
      </div>
      <div class="block">
                <label for="">Date Of Birth</label>
                <input type="text" name="name" placeholder="" onChange={(event) => {
            setDor(event.target.value);
          }}/>
         <div>
      
      <div class="block">
                <label for="">Bio</label>
                <input type="text" name="name" placeholder=""  onChange={(event) => {
            setBio(event.target.value);
          }}/>
        </div>  
        
        
        <button onClick={addSongs}>Submit</button>
      </div>
      
     
      </div>
    </div>
    </div>
    
  );
}

export default AddArtist;
