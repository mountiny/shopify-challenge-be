import { api, uploadApi } from "./api";
import Axios from "axios";
import useSWR from 'swr'

export const getImages = async () => {

  const API_URL = process.env.NEXT_PUBLIC_API_URL

  try {
    const res = await api.get(`${API_URL}/upload/files`)
    return res.data
  } catch (error) {
    console.log(error);
    return false
  }
}

export const getImageById = async (id) => {

  const API_URL = process.env.NEXT_PUBLIC_API_URL

  try {
    const res = await api.get(`${API_URL}/upload/files/${id}`)
    return res.data
  } catch (error) {
    console.log(error.response.data);
    return false
  }
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

export const deleteImage = async (project, image) => {

  const API_URL = process.env.NEXT_PUBLIC_API_URL

  // Create Form date with needed information
  const formData = new FormData()
  formData.append('files', image)
  formData.append('ref', 'project')
  formData.append('refId', project.id)
  formData.append('field', 'background')

  try {
    const res = await uploadApi.delete(`${API_URL}/upload/files/${id}`, formData)
    return res.data
  } catch (error) {
    console.log(error.response);
    return false
  }
}
