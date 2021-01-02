import { getImages, deleteImage } from '../utils/imageService'


export default function Index() {

  const {images, isValidating, mutate} = getImages()

  const  handleUploadDelete = async (id) => {

    if (window.confirm('Are you sure you want to delete this upload record?')) {
      await deleteImage(id)
      mutate()
    } 
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-12">

      <h2 className="p-3 font-bold text-3xl md:text-5xl">
        Image repository
      </h2>

      <section className="w-full">
        {
          !isValidating && (

            <table className="w-full text-md bg-accents-9 shadow-md text-secondary rounded mb-4">
              <tbody>
                <tr className="border-b">
                  <th className="text-left p-3 px-5">Name</th>
                  <th className="text-left p-3 px-5">Description</th>
                  <th className="text-left p-3 px-5">Images</th>
                  <th></th>
                </tr>
                {
                  images && images?.length > 0 ? images.map((upload, key) => {

                    return (
                      <tr key={key} className="border-b border-secondary hover:bg-orange-100 bg-accents-8">
                        <td className="p-3 px-5">{upload.name}</td>
                        <td className="p-3 px-5">{upload.description}</td>
                        <td className="p-3 px-5">
                          <div className="flex flex-col">
                            {
                              upload.images.map((image, key) => {
                                return (
                                  <img 
                                    key={key} 
                                    src={image.url} 
                                    alt={upload.name}
                                    className="w-24 my-4"
                                    />
                                )
                              })
                            }
                          </div>
                        </td>
                        <td className="p-3 px-5 flex justify-end items-center">
                          <button 
                            type="button" 
                            className="text-sm bg-red hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                            onClick={() => handleUploadDelete(upload.id)}
                            >
                            Delete
                          </button>
                        </td>
                      </tr>
                    )
                  }) : (
                    <tr  className="border-b border-secondary hover:bg-orange-100 bg-accents-8">
                      <td colSpan="4" className="p-3 px-5">No files uploaded yet</td>
                      
                    </tr>
                  )
                }
                
              </tbody>
            </table>
          )
        }
      </section>

    </div>
  );
}
