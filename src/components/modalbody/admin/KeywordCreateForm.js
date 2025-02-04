/* eslint-disable react/prop-types */ /* eslint-disable prettier/prettier */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import BtnModalCloseSubmit from '../../button/BtnModalCloseSubmit';
import { createKeyword } from '../../../redux/others/keyWordSlice';

function KeywordCreateForm() {
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    words: yup
      .string()
      .min(3, 'Word must be at least 3 characters')
      .max(12, 'Word must be less than 12 characters')
      .required('Word is required'),
    status: yup
      .string()
      .oneOf(['true', 'false'], 'Status is required')
      .required('Status is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      words: '',
      status: 'false',
    },
  });

  const onSubmit = (data) => {
    data.status = data.status === 'true'; // Convert string to boolean
    dispatch(createKeyword(data));
  };

  return (
    <div className="keyword-create-form">
      <h2 className="text-center">Register New Keyword</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="words" className="form-label">
            Full Name
          </label>
          <input
            {...register('words')}
            type="text"
            id="words"
            className="form-control"
          />
          {errors.words && <p className="text-danger">{errors.words.message}</p>}
        </div>
        <div className="col-md-6">
          <label className="form-label">Status</label>
          <div className="form-check">
            <input
              {...register('status')}
              type="radio"
              id="status-true"
              value="true"
              className="form-check-input"
            />
            <label htmlFor="status-true" className="form-check-label">
              Active
            </label>
          </div>
          <div className="form-check">
            <input
              {...register('status')}
              type="radio"
              id="status-false"
              value="false"
              className="form-check-input"
            />
            <label htmlFor="status-false" className="form-check-label">
              Inactive
            </label>
          </div>
          {errors.status && <p className="text-danger">{errors.status.message}</p>}
        </div>

        <div className="col-md-12">
          <BtnModalCloseSubmit />
        </div>
      </form>
    </div>
  );
}

export default React.memo(KeywordCreateForm);
