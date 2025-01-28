/* eslint-disable prettier/prettier */
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addRetailShop } from '../../../services/retailShopSerivce';
import { useNavigate } from 'react-router-dom';
import styles from "../../../style/ManStyle.module.css";


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
});

const handleBack = () => {
  navigate(-1);
};

const AddRetailShop = () => {
  const navigate = useNavigate(); // Correctly initialize the hook here

  const regions = [
    { RegionID: 1, RegionName: 'North Region' },
    { RegionID: 2, RegionName: 'South Region' },
    { RegionID: 3, RegionName: 'East Region' },
  ];

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await addRetailShop(values);
      console.log('Retail Shop added successfully:', response);
      alert('Retail Shop added successfully!');
      resetForm(); // Clear the form
      navigate('/admin/retailshoplist'); // Redirect to the retail shop list page
    } catch (error) {
      console.error('Failed to add Retail Shop:', error);
      alert('Failed to add Retail Shop. Please try again.');
    } finally {
      setSubmitting(false); // Enable the form submission button
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
          Fax: '',
          RegionId: '',
        }}
        validationSchema={retailShopValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
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

            <div className="mb-3">
              <label htmlFor="IsMainOffice">Main Office</label>
              <Field name="IsMainOffice" type="checkbox" className="form-check-input" />
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
                  <option key={region.RegionID} value={region.RegionID}>
                    {region.RegionName}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="RegionId" component="div" className="text-danger" />
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
