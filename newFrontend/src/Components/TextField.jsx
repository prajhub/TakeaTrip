import React from 'react';
import { ErrorMessage, useField } from 'formik';

export const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-2">
      <label htmlFor={field.name} className='text-sm mb-2'>{label}</label>
      <input
        className={`w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-800 border rounded-lg focus:shadow-outline ${meta.touched && meta.error && 'is-invalid'}`}
        {...field} {...props}
        autoComplete="off"
      />
      <ErrorMessage component="div" name={field.name} className="error" />
    </div>
  )
}