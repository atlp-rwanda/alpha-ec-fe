'use client';
import { useSearchParams } from 'next/navigation'; // corrected import path
import React, { ChangeEvent, Suspense, useEffect, useState } from 'react';
import { IoAdd } from 'react-icons/io5';
import { HiMinusSmall } from 'react-icons/hi2';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {
  ProductInterface,
  getProductDetails
} from '@/redux/slices/ProductSlice';
import { Button, ButtonStyle, Input } from '@/components/formElements';
import { useAppDispatch } from '@/redux/hooks/hook';
import ProductsDetailsNav from '@/components/siteNavigation/ProductsDetailsNav';
import { CiHeart } from 'react-icons/ci';
import Slider from '@/components/Images/Slider';
import PageLoading from '@/components/Loading/PageLoading';
import { GetStars } from '@/components/reviews/GetStars';

interface Review {
  rating: number;
  feedback: string;
}

const Details = () => {
  const dispatch = useAppDispatch();

  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');

  const [quantity, setQuantity] = useState<number>(1);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userReview, setUserReview] = useState<Review>({
    rating: 0,
    feedback: ''
  });

  const { selectedProduct, loading } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (productId) {
          const response = await fetch(`/api/reviews?productId=${productId}`);
          if (response.ok) {
            const data = await response.json();
            setReviews(data.reviews);
          } else {
            console.error('Failed to fetch reviews');
          }
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    if (productId) {
      dispatch(getProductDetails(productId));
      fetchReviews();
    }
  }, [productId, dispatch]);

  const handleRatingChange = (key: keyof Review, value: any) => {
    setUserReview({
      ...userReview,
      [key]: value
    });
  };

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setUserReview({
      ...userReview,
      feedback: event.target.value
    });
  };

  const handleAdd = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleRemove = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add logic to handle form submission
  };

  return (
    <>
      {loading ? (
        <PageLoading />
      ) : (
        selectedProduct && (
          <>
            <ProductsDetailsNav />
            <Suspense fallback={<div>Loading...</div>}>
              <div className="flex w-full flex-col lg:flex-row justify-between p-6 h-auto">
                <div className="w-full lg:w-2/3 flex-col items-center justify-center gap-2 relative">
                  <Slider images={selectedProduct.product.images} />
                </div>
                <div className="w-full lg:w-1/3 p-0 pt-6 lg:p-4 flex flex-col items-start gap-4 text-black">
                  <span className="flex justify-between border-b-2 border-gray-300">
                    <h2 className="text-2xl font-bold md:text-3xl">
                      {selectedProduct.product.name}
                    </h2>
                  </span>
                  <p className="text-3xl font-bold">
                    <span className="font-bold">
                      {'$'}
                      {(
                        selectedProduct.product.price * quantity
                      ).toLocaleString()}
                    </span>
                  </p>
                  <p className="text-lg font-normal gap-4 flex">
                    category:
                    <span className="font-bold">
                      {' '}
                      {selectedProduct.product.category?.name || ''}
                    </span>
                  </p>
                  <p className="text-lg font-normal gap-4 flex">
                    Status:
                    <span className="font-bold">
                      {' '}
                      {selectedProduct.product.status
                        ? 'Available'
                        : 'Not Available'}
                    </span>
                  </p>
                  <p className="text-lg font-normal gap-4 flex">
                    Bonus:
                    <span className="font-bold">
                      {' '}
                      {selectedProduct.product.bonus || '0'} %
                    </span>
                  </p>
                  <div className="flex flex-col items-start gap-4 w-full lg:flex-row lg:items-center">
                    <div className="w-1/2 max-w-52 min-w-44 lg:w-1/3 relative truncate flex justify-between items-center p-0 border border-black border-1 cursor-pointer rounded-md">
                      <HiMinusSmall
                        onClick={handleRemove}
                        className="w-12 hover:bg-black hover:text-white h-full p-2"
                      />
                      <input
                        value={quantity}
                        onChange={e => setQuantity(Number(e.target.value))}
                        className="w-12 bg-transparent text-center h-full"
                      />
                      <IoAdd
                        onClick={handleAdd}
                        className="w-12 hover:bg-black hover:text-white h-full p-2"
                      />
                    </div>
                    <span className="h-full flex items-center gap-1 cursor-pointer font-thin hover:font-light truncate">
                      <CiHeart size={28} />
                      Add to wishlist
                    </span>
                  </div>
                  <span className="xs:w-full lg:w-2/3">
                    <Button
                      disabled={false}
                      label={'Add to cart'}
                      style={ButtonStyle.DARK}
                      loading={false}
                    />
                  </span>
                </div>
              </div>
              <div className="m-20 w-1/3">
                <div className="text-lg font-bold">Reviews & Ratings</div>
                <form
                  className="flex flex-col align-middle"
                  onSubmit={handleSubmit}
                >
                  <div className="w-full mt-2 flex flex-col gap-1 animate__animated animate__fadeInDown">
                    <Input
                      label="Rating"
                      placeholder="Add your rating here"
                      type="number"
                      value={userReview.rating}
                      onChange={e =>
                        handleRatingChange(
                          'rating',
                          parseInt(e.target.value, 6)
                        )
                      }
                      valid={true} // Add validation logic if needed
                    />
                    <Input
                      label="Review"
                      placeholder="Add your review here"
                      type="text"
                      value={userReview.feedback}
                      onChange={handleCommentChange}
                      valid={false} // Add validation logic if needed
                    />
                  </div>
                  <Button
                    label="Submit"
                    style={ButtonStyle.DARK}
                    disabled={loading}
                    loading={loading}
                  />
                </form>
                <div>
                  <div></div>
                  <GetStars
                    rating={selectedProduct.product.averageRatings || 0}
                  />
                </div>
              </div>
            </Suspense>
          </>
        )
      )}
    </>
  );
};

export default Details;
