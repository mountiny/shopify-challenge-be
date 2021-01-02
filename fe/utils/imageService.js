import { api, uploadApi } from "./api";
import Axios from "axios";
import useSWR from 'swr'

export const getImages = () => {

  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const {
    data: { data: images} = {},
    isValidating,
    mutate
  } = useSWR(`${API_URL}/uploads`, api.get)

  return {images, isValidating, mutate}

}


export const uploadImage = async (files, values) => {

  const API_URL = process.env.NEXT_PUBLIC_API_URL

  // Create Form date with needed information
  const formData = new FormData()

  // Create data object with batch information
  const data = {
    name: values.name,
    description: values.description
  }

  // Add all the files uploaded by user to FormData
  if (files.length === 1) {

    const file = files[0];
    formData.append(`files.images`, file)

  } else {

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      formData.append(`files.images`, file)
    }
  }

  // Stringify the data 
  formData.append('data', JSON.stringify(data));

  try {
    await uploadApi.post(`${API_URL}/uploads`, formData)
    return true
  } catch (error) {
    console.log('Error')
    console.log(error.response);
    return false
  }
}

export const deleteImage = async (id) => {

  const API_URL = process.env.NEXT_PUBLIC_API_URL

  try {
    await uploadApi.delete(`${API_URL}/uploads/${id}`)
    return true
  } catch (error) {
    console.log(error.response);
    return false
  }
}
