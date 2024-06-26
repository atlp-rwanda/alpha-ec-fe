'use client';

import Image from 'next/image';
import { useState, useEffect, FormEvent } from 'react';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/hook';
import Layout from '../Layout';
import { ErrorInterface, ProductFields, getErrorForField } from '@/utils';
import { Button, ButtonStyle, Input } from '@/components/formElements';
import useToast from '@/components/alerts/Alerts';
import { RegistrationKeys } from '../../(Authentication)/register/page';
// import CustomSelect from '../../../components/CustomSelect/CustomSelect';
import { fetchCategories } from '@/redux/slices/categoriesSlice';
import { addProduct } from '@/redux/slices/itemSlice';
import { updateProduct } from '@/redux/slices/updateproductSlice';
import { getProductDetails, getProducts } from '@/redux/slices/ProductSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { FormErrorInterface } from '@/utils';
import { ToastContainer } from 'react-toastify';

export interface FormDataInterface {
  price?: number;
  bonus?: number;
  name?: string;
  quantity?: number;
  description?: string;
  categoryId?: string;
  expiryDate?: string;
  images?: File[];
}

export interface allData {
  productId: string | null;
  productData: FormDataInterface;
}
export type ProductKeys = keyof FormDataInterface;

const UpdateForm = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');

  const dispatch = useAppDispatch();

  useEffect(() => {
    productId && dispatch(getProductDetails(productId));
    changeImage();
  }, [productId, dispatch]);

  const { selectedProduct } = useSelector((state: RootState) => state.products);

  const categories = useAppSelector(state => state.categories.categories);
  const categoriesStatus = useAppSelector(state => state.categories.status);
  const { status } = useAppSelector(state => state.product);
  const [files, setFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [category, setCategory] = useState<string | null>(null);
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [errors, setErrors] = useState<ErrorInterface[]>([]);
  const router = useRouter();
  const { showSuccess, showError } = useToast();

  const InitialFormValues: FormDataInterface = {
    name: '',
    bonus: 0,
    price: 0,
    quantity: 0,
    description: '',
    images: []
  };
  const [formData, setFormData] =
    useState<FormDataInterface>(InitialFormValues);

  useEffect(() => {
    if (selectedProduct != null) {
      setFormData({
        name: selectedProduct.product.name,
        bonus: Number(selectedProduct.product.bonus),
        price: selectedProduct.product.price,
        quantity: selectedProduct.product.quantity,
        description: selectedProduct.product.description
      });
      setCategory(selectedProduct.product.category?.id || null);
      setExpiryDate(selectedProduct.product.expiryDate || '');
      setExistingImages(selectedProduct.product.images || []);
    }
  }, [dispatch, selectedProduct]);

  useEffect(() => {
    dispatch(fetchCategories());
    changeImage();
  }, [dispatch]);

  const [tempNewImages, setTempNewImages] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
      setTempNewImages(newFiles);
    }
  };

  const handleRemoveExistingImage = (index: number) => {
    setExistingImages(prevImages => prevImages.filter((_, i) => i !== index));
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
    setExistingImages([]);

    const newErrors: ErrorInterface[] = [];
    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    const productData: FormDataInterface = {
      name: formData.name,
      bonus: formData.bonus,
      price: formData.price,
      quantity: formData.quantity,
      description: formData.description,
      categoryId: category || '',
      expiryDate: expiryDate,
      images: files
    };

    const formDataToSend = new FormData();
    for (const key in productData) {
      if (
        productData[key as keyof FormDataInterface] !== undefined &&
        productData[key as keyof FormDataInterface] !== null
      ) {
        formDataToSend.append(
          key,
          productData[key as keyof FormDataInterface] as Blob | string
        );
      }
    }
    existingImages.forEach((image, index) => {
      formDataToSend.append(`existingImages[${index}]`, image);
    });
    files.forEach(file => {
      formDataToSend.append(`Images`, file);
    });

    const updatedData = {
      ...formData
    };
    const formData2 = new FormData();
    for (const key in updatedData) {
      if (
        updatedData[key as keyof FormDataInterface] !== undefined &&
        updatedData[key as keyof FormDataInterface] !== null
      ) {
        formData2.append(
          key,
          updatedData[key as keyof FormDataInterface] as Blob | string
        );
      }
    }

    const data = { productId, productData };

    const result = await dispatch(updateProduct(data));

    if (updateProduct.fulfilled.match(result)) {
      showSuccess('product updated successfully!');
      dispatch(getProducts({}));
      setTimeout(() => {
        router.push('/products');
        setTempNewImages([]);
      }, 2000);
    } else if (updateProduct.rejected.match(result) && result.payload) {
      const errorMessage =
        (result.payload as FormErrorInterface).message || 'An error occurred';
      showError(errorMessage || `Updating product failed!`);
    }
  };
  const changeImage = async () => {
    const downloadedImage: string[] = [];
    const newFile: File[] = [];
    try {
      for (const cloudinaryImage of existingImages) {
        const response = await fetch(cloudinaryImage);
        const blob = await response.blob();
        const file = new File([blob], 'fileName' + Date.now(), {
          type: blob.type,
          lastModified: Date.now()
        });

        newFile.push(file);
        const newImage = new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });

        const base64Image: any = await newImage;
        //return base64Image;

        downloadedImage.push(base64Image);
      }
      // localStorage.setItem('downloadedImage',JSON.stringify(downloadedImage))
      setFiles(newFile);
      // setPictures(downloadedImage)
      // setIsImageLoading(false)
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  return (
    <Layout>
      <div className="md:flex md:justify-around sm:justify-around sm:flex lg:justify-around lg:flex bg-[#e7f6f2] p-8 rounded-lg shadow-lg w-full ">
        <div className="mb-4 pr-2 w-[300px]">
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
          <div className="mt-4 flex space-x-2 w-[100]">
            {existingImages &&
              existingImages.map((image, idx) => (
                <div key={idx} className="relative border rounded p-1">
                  <Image
                    src={image}
                    alt={`Existing Thumbnail ${idx}`}
                    width={50}
                    height={50}
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveExistingImage(idx)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  >
                    X
                  </button>
                </div>
              ))}
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
          onSubmit={e => handleSubmit(e)}
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
                value={(formData[field.key as ProductKeys] as string) || ''}
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
          {/* <CustomSelect
            options={categories?.map((cat: { id: string; name: string }) => ({
              value: cat.id,
              label: cat.name
            }))}
            selected={category}
            onChange={setCategory}
          /> */}
          <input
            type="text"
            placeholder="Expiry Date"
            value={expiryDate}
            onChange={e => setExpiryDate(e.target.value)}
            className="w-full px-4 py-2 border-b-2 border-black rounded"
          />

          <div className="sm:flex sm:justify-between md:flex md:justify-between lg:flex lg:justify-between">
            <Button
              label="update"
              style={ButtonStyle.DARK}
              disabled={status === 'loading'}
              loading={status == 'loading'}
            />
          </div>
        </form>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default UpdateForm;
function showError(arg0: any) {
  throw new Error('Function not implemented.');
}
function changeImage() {
  throw new Error('Function not implemented.');
}
