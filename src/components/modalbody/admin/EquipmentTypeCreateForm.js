/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useContext, useState } from 'react';
import BtnModalCloseSubmit from '../../button/BtnModalCloseSubmit';
import { useDispatch, useSelector } from 'react-redux';
import { createEquipmentType, handleSetEquipmentType } from '../../../redux/equipment/equipmentTypeSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { DataContext } from '../../../context/DataContext';

function EquipmentTypeCreateForm(props) {
  const dispatch = useDispatch();
  const { setIform } = useContext(DataContext);
  const equipmentType = useSelector((state) => state.equipmentTypes.equipmentType);
  const [formData, setFormData] = useState({
    typeName: '',
    provider: '',
  });

  const schema = yup.object().shape({
    typeName: yup.string().required('Type name is required'),
    provider: yup.string().required('Provider is required'),
  });

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
    setFormData({
      ...formData,
      [name]: value,
    });
    dispatch(handleSetEquipmentType({ ...equipmentType, [name]: value }));
  };

  const onSubmit = async () => {
    const resultAction = await dispatch(createEquipmentType(equipmentType));
    if (createEquipmentType.fulfilled.match(resultAction)) {
      const equipmentTypeInfo = resultAction.payload;
      localStorage.setItem('equipmentTypeInfo', JSON.stringify(equipmentTypeInfo));
    }
    if (props.client) {
      setIform('EquipmentTypeReqCreateForm');
      bootstrap.Modal.getInstance(document.getElementById('myModal')).show();
    }
  };

  return (
    <div className="equipment-type-create-form">
      <h2 className="text-center">Create New Equipment Type</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
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

        <div className="col-md-12">
          <BtnModalCloseSubmit />
        </div>
      </form>
    </div>
  );
}

export default React.memo(EquipmentTypeCreateForm);
