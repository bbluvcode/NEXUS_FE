/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import BtnModalCloseSubmit from '../../button/BtnModalCloseSubmit';
import { useDispatch, useSelector } from 'react-redux';
import { createEquipmentType, handleSetEquipmentType } from '../../../redux/equipment/equipmentTypeSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

function EquipmentTypeCreateForm() {
  const dispatch = useDispatch();
  const equipmentType = useSelector((state) => state.equipmentTypes.equipmentType);

  // Validation schema using Yup
  const schema = yup.object().shape({
    typeName: yup.string().required('Type name is required'),
    provider: yup.string().required('Provider is required'),
  });

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleSetEquipmentType({ ...equipmentType, [name]: value }));
  };

  const onSubmit = async () => {
    dispatch(createEquipmentType(equipmentType));
  };

  return (
    <div className="equipment-type-create-form">
      <h2 className="text-center">Create New Equipment Type</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
        {/* Type Name Field */}
        <div className="col-md-6">
          <label htmlFor="typeName" className="form-label">
            Type Name
          </label>
          <input
            {...register('typeName')}
            type="text"
            id="typeName"
            name="typeName"
            className="form-control"
            onChange={handleChange}
          />
          {errors.typeName && <p className="text-danger">{errors.typeName.message}</p>}
        </div>

        {/* Provider Field */}
        <div className="col-md-6">
          <label htmlFor="provider" className="form-label">
            Provider
          </label>
          <input
            {...register('provider')}
            type="text"
            id="provider"
            name="provider"
            className="form-control"
            onChange={handleChange}
          />
          {errors.provider && <p className="text-danger">{errors.provider.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="col-md-12">
          <BtnModalCloseSubmit />
        </div>
      </form>
    </div>
  );
}

export default React.memo(EquipmentTypeCreateForm);
