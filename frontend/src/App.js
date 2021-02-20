import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';
import { DropzoneDialog } from 'material-ui-dropzone'
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

function App() {
  const [upload, setUpload] = useState({
    open: false,
    files: []
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [gallery, setGallery] = useState([])

  const fetchImages = async () => {
    const { data } = await axios.get('/api/gallery')
    setGallery(data)
  }

  useEffect(() => {

    fetchImages()
  }, [])

  const handleFileSave = async (files) => {
    setLoading(true)
    setUpload({ files: files, open: false })

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
    const formData = new FormData()
    formData.append('image', files[0])
    try {
      await axios.post('/api/gallery', formData, config)

      fetchImages()
    } catch (error) {
      setMessage(error.message)
    }
    setLoading(false)

  }

  return (
    <div className="App">
      <header>
        <label htmlFor="">Image Gallery</label>
      </header>

      <h1>Welcome to the image gallery</h1>

      {loading && "Loading..."}
      {message && message}



      <div className='itemsContainer'>

        {
          gallery && gallery.map(el => <div className="item"><img key={el._id} src={el.image} alt={el.image} /></div>)
        }
      </div>


      <Fab color="primary" aria-label="add" onClick={() => setUpload({ ...upload, open: true })}>
        <AddIcon />
      </Fab>

      <DropzoneDialog
        open={upload.open}
        filesLimit={1}
        clearOnUnmount={false}
        // onChange={(files) => console.log('Files:', files)}
        onSave={handleFileSave}
        submitButtonText="Add image"
        acceptedFiles={['image/jpeg', 'image/png']}
        showPreviews={true}
        maxFileSize={1000000}
        onClose={() => setUpload({ ...upload, open: false })}
      />
    </div>
  );
}

export default App;
