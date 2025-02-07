/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addRetailShop } from '../../../services/retailShopSerivce';
import { useNavigate } from 'react-router-dom';
import { getAllRegions } from '../../../services/regionService';
import Swal from 'sweetalert2'; // Import SweetAlert2
import styles from '../../../style/ManStyle.module.css';

const retailShopValidationSchema = Yup.object().shape({
  RetailShopName: Yup.string()
    .max(15, 'Name must be at most 15 characters')
    .required('Name is required'),
  Address: Yup.string()
    .max(50, 'Address must be at most 50 characters')
    .required('Address is required'),
  Email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  Phone: Yup.string()
    .matches(/^\d{10}$/, 'Phone must be exactly 10 digits')
    .required('Phone is required'),
  IsMainOffice: Yup.boolean(),
  Fax: Yup.string()
    .max(15, 'Fax must be at most 15 characters')
    .required('Fax is required'),
  RegionId: Yup.number()
    .required('Region ID is required')
    .typeError('Region ID must be a number'),
  Image: Yup.mixed().required('Image is required'),
});

const AddRetailShop = () => {
  const navigate = useNavigate();
  const [regions, setRegions] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await getAllRegions();
        setRegions(response.data);
      } catch (error) {
        console.error('Failed to fetch regions', error);
      }
    };
    fetchRegions();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();
      formData.append('RetailShopName', values.RetailShopName);
      formData.append('Address', values.Address);
      formData.append('Email', values.Email);
      formData.append('Phone', values.Phone);
      formData.append('IsMainOffice', values.IsMainOffice);
      formData.append('Status', values.Status);
      formData.append('Fax', values.Fax);
      formData.append('RegionId', values.RegionId);
      if (imageFile) {
        formData.append('imageFile', imageFile);
      }

      const response = await addRetailShop(formData);
      console.log('Retail Shop added successfully:', response);
      
      // Replace alert with SweetAlert
      Swal.fire({
        title: 'Success!',
        text: 'Retail Shop added successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      resetForm();
      setImageFile(null);
      navigate('/admin/retailshoplist');
    } catch (error) {
      console.error('Failed to add Retail Shop:', error);
      
      // Replace alert with SweetAlert
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add Retail Shop. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <button onClick={handleBack} className="btn btn-outline-dark mb-4">
        Back
      </button>
      <h2>Add Retail Shop</h2>
      <Formik
        initialValues={{
          RetailShopName: '',
          Address: '',
          Email: '',
          Phone: '',
          IsMainOffice: false,
          status: true,
          Fax: '',
          RegionId: '',
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
                {({ field }) => (
                  <div className="d-flex align-items-center">
                    <input
                      {...field}
                      type="checkbox"
                      className={`${styles.checkbox} ${field.value ? styles.checkboxChecked : ''}`}
                    />
                    <label htmlFor="IsMainOffice" className={styles.checkboxLabel}>
                      Main Office
                    </label>
                  </div>
                )}
              </Field>
              <ErrorMessage name="IsMainOffice" component="div" className="text-danger" />
            </div>

            <div className={`mb-3 ${styles.checkboxWrapper}`}>
              <Field name="Status">
                {({ field }) => (
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
              <label htmlFor="Fax">Fax</label>
              <Field name="Fax" className="form-control" />
              <ErrorMessage name="Fax" component="div" className="text-danger" />
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
                  const file = event.currentTarget.files[0];
                  setFieldValue('Image', file);
                  setImageFile(file);

                  // Tạo URL xem trước ảnh
                  if (file) {
                    const imageUrl = URL.createObjectURL(file);
                    setPreviewImage(imageUrl);
                  }
                }}
              />
              <ErrorMessage name="Image" component="div" className="text-danger" />

              {previewImage && (
                <div className="mt-3">
                  <img src={previewImage} alt="Preview" className="img-thumbnail" style={{ width: '30%' }} />
                </div>
              )}
            </div>

            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddRetailShop;
