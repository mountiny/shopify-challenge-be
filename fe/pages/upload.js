import React, { useCallback, useEffect, useState, useRef } from 'react';
import Link from "next/link";
import { useDropzone } from 'react-dropzone'
import { useForm } from "react-hook-form";
import { uploadImage } from '../utils/imageService'


export default function Upload() {

  const [imageError, setImageError] = useState(false)
  const [message, setMessage] = useState({type: "", content: ""})

  const [fileLoading, setFileLoading] = useState(false)

  const [uploading, setUploading] = useState(false)
  const { handleSubmit, register, reset } = useForm();

  const [files, setFiles] = useState([]);

   /**
   * Handle the file being uploaded by user
   */
  const onDrop = useCallback((acceptedFiles) => { 

    if(acceptedFiles.length > 0) {

      // reset the image error
      imageError && setImageError(null)
      setFileLoading(false)

      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    } 
    
  }, [])


  /**
   * Handle submit of the image and scale
   */
  const onSubmit = async (values) => {

    if (uploading) return

    setUploading(true)
    setImageError(false)
    setMessage({type: "", content: ""})

    if (files.length === 0) {
      setImageError(true);
      setMessage({type: "error", content: "You have not selected any image!"})
      return
    } 

    try {
      await uploadImage(files, values)

      setMessage({type: "success", content: "The images have been uploaded successfully."})
      reset()
      setFiles([])

    } catch (e) {
      console.log('Upload error')
      setUploading(false)
      setImageError(true)
      setMessage({type: "error", content: "Something went wrong with the upload. Please, try again later!"})

      return
    }

    setUploading(false)

  }

   /** 
   * Initialize dropzone instance
   * 
   * accept: Any image format
   * allow multiples
   * onDrop is handler function
   * maximum file size set to 10MB
   */
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    multiple: true,
    maxFiles: 5,
    onDrop,
    maxSize: 10000000
  })
  
  const acceptedFileItems = files.map((file, key) => {
    return (
      <div key={key} className="bg-accents-8 rounded-lg p-4 flex justify-center items-center">
        <img src={file.preview} />
      </div>
    )
  });

  return (
    <div className="grid grid-cols-1 gap-6">
      <div>

        {
          message.type !== "" ?
          message.type === "error" ? (
            <section className="flex justify-between py-4 px-4 mb-8 rounded-lg bg-white font-bold border-4 border-red text-red">
              <div>
                {message.content}
              </div>
            </section>
          ) : (
            <section className="flex justify-between py-4 px-4 mb-8 rounded-lg bg-accents-8 font-bold text-secondary">
              <div>
                {message.content}
              </div>
              <div>
                <Link href="/">
                  <a className="py-2 px-4 bg-accents-2 text-primary rounded-lg hover:bg-accents-0 transition-colors duration-200">
                    Manage all images
                  </a>
                </Link>
              </div>
            </section>
          ) : (
            <>
            </>
          )
        }
        
        <section className="mb-6">
          <h2 className="mb-3 text-xl font-bold">Upload the Images</h2>
          <p>
            You can upload a batch of up to 5 images. Name it and add some description to it so you can find it in future more easily.
          </p>
        </section>

        <section className="flex flex-col justify-start">
          <div className="max-w-lg flex items-center my-4">
            <input
              type="text"
              className="rounded-lg bg-accents-7 py-2 px-4 placeholder-secondary text-black"
              id="name"
              name="name"
              placeholder="Name of the batch"
              ref={register()}
            />
          </div>
          <div className="max-w-lg my-4">
            <textarea 
              className="w-full rounded-lg bg-accents-7 py-2 px-4 placeholder-secondary text-black"
              name="description"
              id="description"
              placeholder='Description of the photos'
              rows="5"
              ref={register()}
              >
            </textarea>
          </div>
        </section>

        <section className="w-full relative">
          <form className={`h-full w-full relative flex flex-col justify-between items-stretch flex-1`} onSubmit={handleSubmit(onSubmit)}>
            <div 
              className={`w-full rounded-lg border-4 border-accents-7 bg-accents-2 my-8 p-4 ${files.length !== 0 ? 'py-8' : 'py-20'}`}
              {...getRootProps()}
              >
              <div 
                className="text-center"
                >
                <input {...getInputProps()} />
                {
                  files.length !== 0 
                  ? (
                    <>
                      <h3>If you want to choose different images, drag them over here or <span className='cursor-pointer text-primary font-medium underline'>click to browse</span>.</h3>
                    </>
                  ) : (
                    <>
                      <h3 className="pb-4 text-2xl font-medium">Drag up to 5 images over here or <span className='cursor-pointer text-primary font-medium underline'>click to browse</span>.</h3>
                      {
                        fileLoading && <h3 className="pb-4 text-2xl">Loading...</h3>
                      }
                    </>
                  )
                }
              </div>
            </div>
            <div className="mx-auto w-full">
              {
                files.length !== 0 && (
                  <div className="grid w-full grid-cols-2 md:grid-cols-3 gap-6 py-12">
                    {acceptedFileItems}
                  </div>
                )
              }
            </div>
            <div className={`flex mt-4`}>
              <button
                type='submit'
                className={`btn flex-1 max-w-xl bg-accents-8 py-4 text-secondary font-bold text-uppercase px-6 rounded-lg ${files.length !== 0 && "disabled"}`}
                disabled={files.length !== 0 ? false : true}
                >
                  {
                    uploading ? (
                      "Uploading"
                    ) : (
                      "Upload"
                    )
                  }
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
