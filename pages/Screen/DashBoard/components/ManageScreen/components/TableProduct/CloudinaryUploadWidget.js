/* eslint-disable react/react-in-jsx-scope */
import { LoadingOutlined } from '@ant-design/icons'
import { images } from 'config/images'
import { createContext, useEffect, useState } from 'react'

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext()

const CloudinaryUploadWidget = ({ uwConfig, setPublicInfo, isUploading = false }) => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Check if the script is already loaded
    if (!loaded) {
      const uwScript = document.getElementById('uw')
      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement('script')
        script.setAttribute('async', '')
        script.setAttribute('id', 'uw')
        script.src = 'https://upload-widget.cloudinary.com/global/all.js'
        script.addEventListener('load', () => setLoaded(true))
        document.body.appendChild(script)
      } else {
        // If already loaded, update the state
        setLoaded(true)
      }
    }
  }, [loaded])

  const initializeCloudinaryWidget = () => {
    if (loaded) {
      var myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error, result) => {
          if (!error && result && result.event === 'success') {
            console.log('Done! Here is the image info: ', result.info)
            setPublicInfo(result.info)
          }
        }
      )

      document.getElementById('upload_widget').addEventListener(
        'click',
        function () {
          myWidget.open()
        },
        false
      )
    }
  }

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button
        id='upload_widget'
        className='cloudinary-button'
        style={{
          backgroundColor: 'white',
          height: '70px',
          width: '100%',
          maxWidth: '80px',
          marginTop: '10px'
        }}
        onClick={initializeCloudinaryWidget}
      >
        <div className='ant-upload-text'>
          {isUploading ? (
            <LoadingOutlined />
          ) : (
            <img src={images.increase} />
          )}
        </div>
      </button>
    </CloudinaryScriptContext.Provider>
  )
}

export default CloudinaryUploadWidget
export { CloudinaryScriptContext }
