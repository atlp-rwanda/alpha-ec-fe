'use client';
import Image from 'next/image';
import { useState, useEffect, FormEvent } from 'react';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/hook';
import Layout from '../Layout';
import { ErrorInterface, ProductFields, getErrorForField } from '@/utils';
import { Button, ButtonStyle, Input } from '@/components/formElements';
import useToast from '@/components/alerts/Alerts';
import { RegistrationKeys } from '../../(Authentication)/register/page';
import CustomSelect from '../../../components/CustomSelect'; // Adjust the path according to your file structure

export interface FormDataInterface {
  price: string;
  name: string;
  quantity: string;
  status: string;
  bonus: string;
  categoryId?: string;
  expiryDate?: string;
  images?: File[];
}

export type ProductKeys = keyof FormDataInterface;

const Form = () => {
  const { fetchCategories, addProduct } = useAppDispatch();
  const categories = useAppSelector(state => state.categories.categories);
  const categoriesStatus = useAppSelector(state => state.categories.status);
  const { status, error } = useAppSelector(state => state.products);

  const [files, setFiles] = useState<File[]>([]);
  const [category, setCategory] = useState<string | null>(null);
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [errors, setErrors] = useState<ErrorInterface[]>([]);

  const InitialFormValues: FormDataInterface = {
    name: '',
    price: '',
    quantity: '',
    status: '',
    bonus: ''
  };
  const [formData, setFormData] =
    useState<FormDataInterface>(InitialFormValues);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleChange = (key: RegistrationKeys, value: string) => {
    setErrors([]);
    setFormData(prevFormData => {
      const updatedFormData = { ...prevFormData, [key]: value };
      return updatedFormData;
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);

    const newErrors: ErrorInterface[] = [];
    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    const productData: FormDataInterface = {
      name: formData.name,
      price: formData.price,
      quantity: formData.quantity,
      status: formData.status,
      bonus: formData.bonus,
      categoryId: category || '',
      expiryDate: expiryDate,
      images: files
    };

    addProduct(productData);
  };

  return (
    <Layout>
      <div className="md:flex md:justify-around sm:justify-around sm:flex lg:justify-around lg:flex  bg-[#e7f6f2] p-8 rounded-lg shadow-lg w-full ">
        <div className="mb-4">
          <div className="flex justify-center items-center border-2 border-dashed border-[#395b64] rounded-lg h-56 w-72 bg-gray-50">
            <div className="text-center text-black">
              <p>Drag and drop your files here</p>
              <p>or</p>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-gray-200 px-3 py-1 rounded-md"
              >
                Browse files
              </label>
            </div>
          </div>
          <div className="mt-4 flex space-x-2">
            {files.map((file, idx) => (
              <div key={idx} className="relative border rounded p-1">
                <Image
                  src={URL.createObjectURL(file)}
                  alt={`Thumbnail ${idx}`}
                  width={50}
                  height={50}
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
        <form
          className="space-y-4 sm:w-[550px] md:w-[550px]"
          onSubmit={handleSubmit}
        >
          {ProductFields.map((field, i) => (
            <div
              className="w-full mt-2 flex flex-col gap-1 animate__animated animate__fadeInDown"
              key={i}
            >
              <Input
                label={field.label}
                placeholder={field.placeholder}
                type={field.type}
                value={formData[field.key as ProductKeys] || ''}
                onChange={(e: { target: { value: any } }) =>
                  handleChange(field.key, e.target.value)
                }
                valid={getErrorForField(errors, field.key) ? false : true}
              />
              {getErrorForField(errors, field.key) && (
                <span className="text-xs text-red-600 px-2 animate__animated animate__fadeInDown">
                  {getErrorForField(errors, field.key)}
                </span>
              )}
            </div>
          ))}
          <CustomSelect
            options={categories?.data?.map(
              (cat: { id: string; name: string }) => ({
                value: cat.id,
                label: cat.name
              })
            )}
            selected={category}
            onChange={setCategory}
          />
          <input
            type="text"
            placeholder="Expiry Date"
            value={expiryDate}
            onChange={e => setExpiryDate(e.target.value)}
            className="w-full px-4 py-2 border-b-2 border-black rounded"
          />

          <div className="sm:flex sm:justify-between md:flex md:justify-between lg:flex lg:justify-between  ">
            <Button
              label="Delete"
              style={ButtonStyle.DARK}
              disabled={status === 'loading'}
              loading={status === 'loading'}
            />
            <Button
              label="Save"
              style={ButtonStyle.DARK}
              disabled={status === 'loading'}
              loading={status === 'loading'}
            />
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Form;
