'use client';
import { useSearchParams } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { getProductDetails } from '@/redux/slices/ProductSlice';
import { Button, ButtonStyle, Input } from '@/components/formElements';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hook';
import {
  getReviews,
  addReview,
  AddReviewInterface,
  ReviewInterface
} from '@/redux/slices/itemSlice';
import ProductsDetailsNav from '@/components/siteNavigation/ProductsDetailsNav';
import Slider from '@/components/Images/Slider';
import PageLoading from '@/components/Loading/PageLoading';
import { GetStars } from '@/components/reviews/GetStars';
import { IoAdd } from 'react-icons/io5';
import { HiMinusSmall } from 'react-icons/hi2';
import { CiHeart } from 'react-icons/ci';

interface ReviewForm {
  rating: number;
  feedback: string;
}

const Details = () => {
  const dispatch = useAppDispatch();
  const { selectedProduct, loading } = useSelector(
    (state: RootState) => state.products
  );
  const {
    reviews,
    loadingReviews: loadingReviews,
    error: reviewError
  } = useAppSelector((state: RootState) => state.product);
  const [quantity, setQuantity] = useState<number>(1);
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId'); // Replace with your actual logic to get productId

  useEffect(() => {
    if (!selectedProduct && productId && !loading) {
      dispatch(getProductDetails(productId));
    }
  }, [dispatch, productId, selectedProduct, loading]);

  useEffect(() => {
    if (productId) {
      dispatch(getReviews(productId));
    }
  }, [dispatch, productId]);

  const [reviewForm, setReviewForm] = useState<ReviewForm>({
    rating: 0,
    feedback: ''
  });

  const handleRatingChange = (value: number) => {
    setReviewForm({ ...reviewForm, rating: value });
  };

  const handleReviewChange = (event: ChangeEvent<HTMLInputElement>) => {
    setReviewForm({ ...reviewForm, feedback: event.target.value });
  };

  const handleAddReview = async () => {
    try {
      if (!productId) {
        throw new Error('Product ID is missing.');
      }

      const reviewData: AddReviewInterface = {
        productId,
        rating: reviewForm.rating,
        feedback: reviewForm.feedback
      };

      await dispatch(addReview(reviewData));

      alert('Review added successfully!');
      console.log(reviewData);

      setReviewForm({ rating: 0, feedback: '' });
    } catch (error) {
      console.error('Failed to add review:', error);
      alert('Failed to add review. Please try again.');
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return <PageLoading />;
  }

  if (!selectedProduct) {
    return <div>Product not found.</div>;
  }

  return (
    <>
      <ProductsDetailsNav />
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
              {(selectedProduct.product.price * quantity).toLocaleString()}
            </span>
          </p>
          <p className="text-lg font-normal gap-4 flex">
            Category:
            <span className="font-bold">
              {' '}
              {selectedProduct.product.category?.name || ''}
            </span>
          </p>
          <p className="text-lg font-normal gap-4 flex">
            Status:
            <span className="font-bold">
              {' '}
              {selectedProduct.product.status ? 'Available' : 'Not Available'}
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
                onClick={() => handleQuantityChange(quantity - 1)}
                className="w-12 hover:bg-black hover:text-white h-full p-2"
              />
              <input
                value={quantity}
                onChange={e => handleQuantityChange(Number(e.target.value))}
                className="w-12 bg-transparent text-center h-full"
              />
              <IoAdd
                onClick={() => handleQuantityChange(quantity + 1)}
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
      <div className="mt-20 min-w-screen bg-main-150 flex justify-between h-screen gap-30">
        <div className="w-2/3 bg-main-200 flex min-h-full flex-col">
          <div className="mt-10 flex flex-col gap-2 w-full m-10">
            <h3>Description</h3>
            <p className="w-full">{selectedProduct.product.description}</p>
          </div>
          <div className="mt-10 flex flex-col gap-2 w-full m-10">
            <h3 className="font-bold">Reviews and Ratings</h3>
            <form
              onSubmit={e => {
                e.preventDefault();
                handleAddReview();
              }}
              className="flex flex-col gap-2 w-1/3 mb-10"
            >
              <Input
                type="number"
                placeholder="Add your rating"
                label=""
                onChange={e => handleRatingChange(Number(e.target.value))}
                value={reviewForm.rating.toString()}
                valid={true}
              />
              <Input
                type="text"
                placeholder="Add your review"
                label=""
                onChange={handleReviewChange}
                value={reviewForm.feedback}
                valid={true}
              />
              <Button
                label="Submit Review"
                style={ButtonStyle.DARK}
                disabled={false}
                loading={false}
              />
            </form>
            <div>
              <span className="flex flex-row gap-4">
                {GetStars({
                  rating: selectedProduct.product.averageRatings || 0
                })}{' '}
                <div className="font-bold">
                  {selectedProduct.product.averageRatings}{' '}
                </div>
                {selectedProduct.product.reviewsCount} Reviews{' '}
              </span>
            </div>
            <div className="w-full  gap-4">
              {reviews?.map((rev: ReviewInterface, index: number) => (
                <div className=" w-full mt-2" key={index}>
                  <div className="flex flex-col gap-2 ">
                    <div className="flex flex-row ">
                      <img
                        src="https://via.placeholder.com/48"
                        alt="Reviewer's profile picture"
                        className="w-18 h-22 rounded-full"
                      />
                      <div className="flex flex-col gap-1">
                        <span className="flex flex-row gap-4">
                          <span className="font-bold">
                            {rev.reviewedBy?.name}
                          </span>

                          <span>{rev.reviewedBy?.email}</span>
                        </span>

                        <span>{GetStars({ rating: rev?.rating || 0 })}</span>
                      </div>
                    </div>
                  </div>
                  <span>{rev?.feedback}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-1/3 bg-main-300 flex min-h-full flex-col">
          <span>Seller</span>
        </div>
      </div>
    </>
  );
};

export default Details;
