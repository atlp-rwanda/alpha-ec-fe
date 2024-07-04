'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useAppDispatch } from '@/redux/hooks/hook';
import { showSideNav, getProducts } from '@/redux/slices/ProductSlice';
import { USER_ROLE } from '@/redux/slices/userSlice';
import ProductLoading from '@/components/Loading/ProductsLoading';
import Image from 'next/image';
import { GetStars } from '@/components/reviews/GetStars';
import { CiEdit } from 'react-icons/ci';
import { IoIosCloseCircle } from 'react-icons/io';
import NotFound from '@/components/Loading/ProductNotFound';
import Pagination from '@/components/pagination/Pagination';

const Home: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(showSideNav(true));
    dispatch(getProducts({ page: 1 }));
  }, [dispatch]);

  const { data, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const { role } = useSelector((state: RootState) => state.user);
  const { userRole } = useSelector((state: RootState) => state.otp);

  const loggedIn = userRole || role || 'buyer';

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

  if (loading) return <ProductLoading />;
  if (error) return <div>Error: {error.message}</div>;

  if (data && loggedIn === USER_ROLE.SELLER) {
    const { products, totalItems, totalPages, from } = data;
    const items = Math.ceil(totalItems / totalPages);
    const currentPage =
      parseInt(
        new URLSearchParams(window.location.search).get('page') || '1'
      ) || Math.ceil(from / items);

    return (
      <div className="flex justify-between gap-4 min-w-screen w-full z-0 pl-2">
        <section className="w-full flex flex-col gap-0 pt-0">
          <div className="w-full p-1 rounded-lg overflow-y-auto mt-10">
            {products?.length === 0 ? (
              <NotFound />
            ) : (
              <table className="min-w-full text-sm text-left mt-2">
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
                            width={120}
                            height={120}
                            src={product.images[0]}
                            alt="Product image"
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
                        <td className="hidden p-2 font-bold h-full gap-4 overflow-hidden items-center mt-1 md:flex">
                          <CiEdit size={34} />
                          <IoIosCloseCircle size={34} />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
          {totalPages > 1 && (
            <div className="mt-1 flex justify-between items-center self-end">
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
    );
  }

  return <div>No products found.</div>;
};

export default Home;
