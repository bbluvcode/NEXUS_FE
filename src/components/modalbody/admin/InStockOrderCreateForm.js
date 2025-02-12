/* eslint-disable prettier/prettier */
import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createInStockOrder } from "../../../redux/inStockOrder/inStockOrderSlice";
import { DataContext } from "../../../context/DataContext";
import BtnModalCloseSubmit from "../../button/BtnModalCloseSubmit";

// Schema validation
const schema = yup.object().shape({
  inStockRequestId: yup.number().required("Required"),
  vendorId: yup.number().required("Required"),
  employeeId: yup.number().required("Required"),
  stockId: yup.number().required("Required"),
  payer: yup.number().required("Required"),
  createDate: yup.date().required("Required"),
  instockDate: yup.date().required("Required"),
  payDate: yup.date().required("Required"),
  tax: yup.number().positive().required("Required"),
  total: yup.number().positive().required("Required"),
  currencyUnit: yup.string().max(10).required("Required"),
  isPay: yup.boolean().required("Required"),
});

const fields = [
  { name: "inStockRequestId", label: "In-Stock Request ID", type: "number" },
  { name: "vendorId", label: "Vendor ID", type: "number" },
  { name: "employeeId", label: "Employee ID", type: "number" },
  { name: "stockId", label: "Stock ID", type: "number" },
  { name: "payer", label: "Payer", type: "number" },
  { name: "createDate", label: "Create Date", type: "date" },
  { name: "instockDate", label: "In-Stock Date", type: "date" },
  { name: "payDate", label: "Pay Date", type: "date" },
  { name: "tax", label: "Tax", type: "number" },
  { name: "total", label: "Total", type: "number" },
  { name: "currencyUnit", label: "Currency Unit", type: "text" },
  { name: "isPay", label: "Payment Status", type: "checkbox" },
];

function InStockOrderCreateForm() {
  const dispatch = useDispatch();
  const { setIform } = useContext(DataContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
    defaultValues: {
      isPay: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      data.isPay = Boolean(data.isPay); // Ensure boolean
      await dispatch(createInStockOrder(data)).unwrap();
      reset(); // Reset form after successful submission
      setIform(null); // Close modal
    } catch (error) {
      console.error("Create in-stock order failed", error);
    }
  };

  return (
    <div className="in-stock-order-create-form">
      <h2 className="text-center">Create In-Stock Order</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
        {fields.map(({ name, label, type }) => (
          <div className="col-md-6" key={name}>
            <label htmlFor={name} className="form-label">{label}</label>
            <input {...register(name)} type={type} id={name} className="form-control" />
            {errors[name] && <p className="text-danger">{errors[name]?.message}</p>}
          </div>
        ))}
        <div className="col-md-12">
          <BtnModalCloseSubmit />
        </div>
      </form>
    </div>
  );
}

export default React.memo(InStockOrderCreateForm);
