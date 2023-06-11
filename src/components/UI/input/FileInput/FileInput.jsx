import React from 'react'
import { useState } from 'react'

const FileInput = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleChange = (e) => {
        console.log(e.target.files[0])
        setSelectedFile(e.target.files[0])
    }

    return (
        <>
            <input
                type="file"
                onChange={handleChange}
            />
            {selectedFile &&
                <ul>
                    <li>Name: {selectedFile.name}</li>
                    <li>Type: {selectedFile.type}</li>
                    <li>Size: {selectedFile.size}</li>
                </ul>
            }
        </>
    )
}

export default FileInput