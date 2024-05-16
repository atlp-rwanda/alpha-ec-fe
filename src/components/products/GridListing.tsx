'use client';

import React, { useEffect } from 'react';
import ProductCard from './ProductCard';
import Image from 'next/image';
import {
  ProductDataInterface,
  getProducts,
  deleteProduct
} from '@/redux/slices/ProductSlice';
import Pagination from '../pagination/Pagination';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hook';
import { useRouter, useSearchParams } from 'next/navigation';
import { RootState } from '@/redux/store';
import { USER_ROLE, setAuthToken } from '@/redux/slices/userSlice';
import { GetStars } from '../reviews/GetStars';
import { IoIosCloseCircle } from 'react-icons/io';
import { CiEdit } from 'react-icons/ci';
import { HiOutlineHome } from 'react-icons/hi2';
import Link from 'next/link';
import NotFound from '../Loading/ProductNotFound';
interface GridListingProps {
  data: ProductDataInterface;
}

const GridListing: React.FC<GridListingProps> = ({ data }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { products, totalItems, totalPages, from } = data;

  const items = Math.ceil(totalItems / totalPages);
  const currentPage =
    parseInt(searchParams.get('page') || '1') || Math.ceil(from / items);

  const dispatch = useAppDispatch();

  const setNewPage = (page: number) => {
    const currentParams = new URLSearchParams(window.location.search);
    const newParams = new URLSearchParams();
    currentParams.forEach((value, key) => newParams.append(key, value));
    newParams.set('page', page.toString());

    const queryString = newParams.toString();
    const queryParamsObject: Record<string, string> = {};
    newParams.forEach((value, key) => {
      queryParamsObject[key] = value;
    });

    router.push(`?${queryString}`);
    dispatch(getProducts(queryParamsObject));
    return;
  };

  const { role } = useAppSelector((state: RootState) => state.user);
  const { userRole } = useAppSelector((state: RootState) => state.otp);
  const { showSuccess, showError } = useToast();
  const { success } = useAppSelector((state: RootState) => state.products);
  const loggedIn = userRole || role || 'buyer';

  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [productList, setProductList] = useState(products);

  const confirmDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (deleteId) {
      const resultAction = await dispatch(deleteProduct(deleteId));
      if (success) {
        await dispatch(getProducts({}));
        toast.success('Product deleted successfully');
      } else {
        toast.error('Failed to delete product');
      }
      setShowModal(false);
      setDeleteId(null);
    }
  };

  const handleproduct = (e: React.MouseEvent, productId: string) => {
    router.push(`/dashboard/update-item?productId=${productId}`);
  };
  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
    setDeleteId(null);
  };

  return (
    <>
      <div className="flex justify-between  gap-4 min-w-screen  w-full z-0 pl-2">
        <section className="w-full pt-0 flex flex-col gap-2 b ">
          <div className="mt-2 flex justify-between w-full h-min py-2 px-2 fixed z-40 bg-main-100">
            <h2 className="text-base font-bold flex gap-2 items-center">
              <Link href={'/'}>
                <HiOutlineHome
                  size={24}
                  className="hover:underline cursor-pointer text-sm hover:text-main-200"
                />
              </Link>
              <span>Products</span>
            </h2>
          </div>

          <div className="w-full p-1 rounded-lg overflow-y-auto">
            {loggedIn === USER_ROLE.SELLER ? (
              <table className="min-w-full text-sm text-left">
                <thead>
                  <tr>
                    <th className="p-2 w-min">Image</th>
                    <th className="hidden md:table-cell p-2 truncate">Name</th>
                    <th className="p-2 truncate">Price</th>
                    <th className="p-2 truncate">Quantity</th>
                    <th className="hidden md:table-cell p-2 truncate">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="gap-2">
                  {products &&
                    products.map((product, i) => (
                      <tr
                        key={i}
                        className="cursor-pointer text-gray-700 hover:bg-accent-200 hover:text-accent-900 bg-white rounded-md text-lg p-2 mb-2 border-b border-main-200"
                      >
                        <td className="hidden md:table-cell p-2 font-bold h-full overflow-hidden items-center">
                          <Image
                            fill
                            src={product.images[0]}
                            alt="Product image"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                            className="object-cover transition-transform duration-300 hover:scale-125"
                          />
                        </td>
                        <td className="p-2 truncate font-bold">
                          <p className="font-bold text-sm md:text-sm lg:text-lg uppercase truncate">
                            {product.name}
                          </p>
                          <GetStars rating={product.averageRatings || 0} />
                        </td>
                        <td className="p-2 truncate text-sm md:text-sm lg:text-lg font-bold">
                          $ {product.price.toLocaleString()}
                        </td>
                        <td className="p-2 truncate">{product.quantity}</td>
                        <td className="hidden p-2 font-bold h-full gap-4 overflow-hidden items-center mt-1 md:flex ">
                          <button onClick={e => handleproduct(e, product.id)}>
                            <CiEdit
                              size={34}
                              className="hover:bg-green-500 rounded-lg "
                            />
                          </button>
                          <button onClick={() => handleDeleteClick(product.id)}>
                            <IoIosCloseCircle
                              size={34}
                              className="hover:bg-red-500 rounded-lg "
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <div className="w-full grid gap-3 rounded-xl overflow-y-auto auto-fit-grid">
                {products &&
                  products.map((product, index) => (
                    <ProductCard product={product} key={index} />
                  ))}
              </div>
            )}
          </div>
          {totalPages > 1 && (
            <div className="mt-1 flex justify-between items-center self-center">
              <Pagination
                totalItems={totalItems}
                itemsPerPage={totalItems / totalPages}
                currentPage={currentPage}
                onPageChange={(page: number) => setNewPage(page)}
              />
            </div>
          )}
        </section>
      </div>
      <ToastContainer />
    </>
  );
};

export default GridListing;
