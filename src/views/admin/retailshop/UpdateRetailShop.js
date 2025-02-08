import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllRegions } from '../../../services/regionService'
import { getRetailShopById, updateRetailShop } from '../../../services/retailShopSerivce'
import { apiImage } from '../../../constant/apiConstant'
import Swal from 'sweetalert2'
import styles from '../../../style/ManStyle.module.css'

const retailShopValidationSchema = Yup.object().shape({
  RetailShopName: Yup.string()
    .max(15, 'Name must be at most 15 characters')
    .required('Name is required'),
  Address: Yup.string()
    .max(50, 'Address must be at most 50 characters')
    .required('Address is required'),
  Email: Yup.string().email('Invalid email format').required('Email is required'),
  Phone: Yup.string()
    .matches(/^\d{10}$/, 'Phone must be exactly 10 digits')
    .required('Phone is required'),
  IsMainOffice: Yup.boolean(),
  Fax: Yup.string().max(15, 'Fax must be at most 15 characters').required('Fax is required'),
  RegionId: Yup.number().required('Region ID is required').typeError('Region ID must be a number'),
})

const UpdateRetailShop = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [regions, setRegions] = useState([])
  const [retailShop, setRetailShop] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await getAllRegions()
        setRegions(response.data)
      } catch (error) {
        console.error('Failed to fetch regions', error)
      }
    }
    fetchRegions()
  }, [])

  useEffect(() => {
    const fetchRetailShop = async () => {
      try {
        const response = await getRetailShopById(id)
        setRetailShop(response.data)
        setPreviewImage(response.data.image) // Set image preview
      } catch (error) {
        console.error('Failed to fetch Retail Shop', error)
      }
    }
    fetchRetailShop()
  }, [id])

  const handleBack = () => {
    navigate(-1)
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData()
      formData.append('RetailShopName', values.RetailShopName)
      formData.append('Address', values.Address)
      formData.append('Email', values.Email)
      formData.append('Phone', values.Phone)
      formData.append('IsMainOffice', values.IsMainOffice)
      formData.append('Status', values.Status) // This will be a boolean (true/false)
      formData.append('Fax', values.Fax)
      formData.append('RegionId', values.RegionId)
      formData.append('RetailShopId', id)

      // Only append the image if the user has selected a new one
      if (imageFile) {
        formData.append('imageFile', imageFile)
      } else {
        formData.append('keepExistingImage', 'true') // Custom flag to keep the old image
      }

      const response = await updateRetailShop(id, formData)

      // Success alert with SweetAlert
      Swal.fire({
        title: 'Success!',
        text: 'Retail Shop updated successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      })

      navigate('/admin/retailshoplist')
    } catch (error) {
      console.error('Failed to update Retail Shop:', error)

      // Error alert with SweetAlert
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update Retail Shop. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (!retailShop) return <div>Loading...</div>

  return (
    <div className="container">
      <button onClick={handleBack} className="btn btn-outline-dark mb-4">
        Back
      </button>
      <h2>Update Retail Shop</h2>
      <Formik
        initialValues={{
          RetailShopName: retailShop.retailShopName,
          Address: retailShop.address,
          Email: retailShop.email,
          Phone: retailShop.phone,
          IsMainOffice: retailShop.isMainOffice,
          Status: retailShop.status, // Make sure this is a boolean value (true/false)
          Fax: retailShop.fax,
          RegionId: retailShop.regionId || '', // Handle case where region is null
          Image: null,
        }}
        validationSchema={retailShopValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="RetailShopName">Name</label>
              <Field name="RetailShopName" className="form-control" />
              <ErrorMessage name="RetailShopName" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="Address">Address</label>
              <Field name="Address" className="form-control" />
              <ErrorMessage name="Address" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="Email">Email</label>
              <Field name="Email" className="form-control" type="email" />
              <ErrorMessage name="Email" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="Phone">Phone</label>
              <Field name="Phone" className="form-control" />
              <ErrorMessage name="Phone" component="div" className="text-danger" />
            </div>

            <div className={`mb-3 ${styles.checkboxWrapper}`}>
              <Field name="IsMainOffice">
                {({ field, form }) => (
                  <div className="d-flex align-items-center">
                    <input
                      {...field}
                      type="checkbox"
                      className={`${styles.checkbox} ${field.value ? styles.checkboxChecked : ''}`}
                    />
                    <label htmlFor="IsMainOffice" className={styles.checkboxLabel}>
                      Main Office
                    </label>
                    <ErrorMessage name="IsMainOffice" component="div" className="text-danger" />
                  </div>
                )}
              </Field>
            </div>

            <div className="mb-3">
              <label htmlFor="Fax">Fax</label>
              <Field name="Fax" className="form-control" />
              <ErrorMessage name="Fax" component="div" className="text-danger" />
            </div>

            <div className={`mb-3 ${styles.checkboxWrapper}`}>
              <Field name="Status">
                {({ field, form }) => (
                  <div className="d-flex align-items-center">
                    <input
                      {...field}
                      type="checkbox"
                      className={`${styles.checkbox} ${field.value ? styles.checkboxChecked : ''}`}
                    />
                    <label htmlFor="Status" className={styles.checkboxLabel}>
                      Status
                    </label>
                    <ErrorMessage name="Status" component="div" className="text-danger" />
                  </div>
                )}
              </Field>
            </div>

            <div className="mb-3">
              <label htmlFor="RegionId">Region</label>
              <Field as="select" name="RegionId" className="form-control">
                <option value="">Select Region</option>
                {regions.map((region) => (
                  <option key={region.regionId} value={region.regionId}>
                    {region.regionName}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="RegionId" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="Image">Image</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(event) => {
                  const file = event.currentTarget.files[0]
                  setFieldValue('Image', file)
                  setImageFile(file)

                  if (file) {
                    const imageUrl = URL.createObjectURL(file)
                    setPreviewImage(imageUrl)
                  }
                }}
              />
              <ErrorMessage name="Image" component="div" className="text-danger" />
              <div className="mt-3 d-flex justify-content-between">
                <div className="current-image" style={{ width: '45%' }}>
                  <h5>Current Image</h5>
                  <img
                    src={`${apiImage}${retailShop.image.split('/').pop()}`}
                    alt="Current Retail Shop"
                    className="img-thumbnail"
                    style={{ width: '100%' }}
                  />
                </div>
                <div className="preview-image" style={{ width: '45%' }}>
                  <h5>Preview Image</h5>
                  <img
                    src={previewImage || `${apiImage}${retailShop.image.split('/').pop()}`}
                    alt="Preview Retail Shop"
                    className="img-thumbnail"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default UpdateRetailShop
