'use client';
import { useSearchParams } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { getProductDetails, showSideNav } from '@/redux/slices/ProductSlice';
import { Button, ButtonStyle, Input } from '@/components/formElements';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hook';
import {
  getReviews,
  addReview,
  AddReviewInterface,
  ReviewInterface,
  addReply
} from '@/redux/slices/itemSlice';
import ProductsDetailsNav from '@/components/siteNavigation/ProductsDetailsNav';
import Slider from '@/components/Images/Slider';
import PageLoading from '@/components/Loading/PageLoading';
import { GetStars } from '@/components/reviews/GetStars';
import { IoAdd } from 'react-icons/io5';
import { HiMinusSmall } from 'react-icons/hi2';
import { CiHeart } from 'react-icons/ci';
import Image from 'next/image';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { string } from 'joi';
import { indexOf } from 'lodash';

interface ReviewForm {
  rating: number;
  feedback: string;
}

interface ReplyForm {
  reviewId: string;
  reply: string;
}

const Details = () => {
  const dispatch = useAppDispatch();
  const { selectedProduct, loading } = useSelector(
    (state: RootState) => state.products
  );

  const { role } = useSelector((state: RootState) => state.user);

  const {
    reviews,
    loadingReviews: loadingReviews,
    error: reviewError
  } = useAppSelector((state: RootState) => state.product);

  const [quantity, setQuantity] = useState<number>(1);
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');

  const [displayedReviews, setDisplayedReviews] = useState<number>(5); // State for displayed reviews

  useEffect(() => {
    if (!selectedProduct && productId && !loading) {
      dispatch(getProductDetails(productId));
    }
  }, [dispatch, productId, selectedProduct, loading]);

  useEffect(() => {
    dispatch(showSideNav(false));
    if (productId) {
      dispatch(getReviews(productId));
    }
  }, [dispatch, productId]);

  const [reviewForm, setReviewForm] = useState<ReviewForm>({
    rating: 0,
    feedback: ''
  });

  const [expandedReplies, setExpandedReplies] = useState<{
    [key: string]: boolean;
  }>({});
  const [replyInputVisible, setReplyInputVisible] = useState<{
    [key: string]: boolean;
  }>({});
  const [newReply, setNewReply] = useState<{
    [key: string]: string;
  }>({});

  const handleToggleReplyInput = (reviewId: string) => {
    setReplyInputVisible(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
  };

  const handleReplyChange = (
    event: ChangeEvent<HTMLInputElement>,
    reviewId: string
  ) => {
    setNewReply(prev => ({
      ...prev,
      [reviewId]: event.target.value
    }));
  };

  const handleReplySubmit = async (reviewId: string) => {
    try {
      if (!productId) {
        throw new Error('Product ID is missing.');
      }

      const replyData: ReplyForm = {
        reviewId,
        reply: newReply[reviewId]
      };

      dispatch(
        addReply({ reviewId: replyData.reviewId, feedback: replyData.reply })
      );

      setNewReply(prev => ({
        ...prev,
        [reviewId]: ''
      }));

      setReplyInputVisible(prev => ({
        ...prev,
        [reviewId]: true
      }));
    } catch (error) {
      console.error('Failed to add reply:', error);
      alert('Failed to add reply. Please try again.');
    }
  };

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

      dispatch(getReviews(productId));

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

  const handleLoadMore = () => {
    setDisplayedReviews(prev => prev + 5);
  };

  const handleLoadLess = () => {
    setDisplayedReviews(prev => Math.max(5, prev - 5));
  };

  if (loading) {
    return <PageLoading />;
  }

  if (!selectedProduct) {
    return <div>Product not found.</div>;
  }

  const Replies = ({ replies }: { replies: Array<any> }) => {
    return (
      <div className="ml-4">
        {replies.map((reply, index) => (
          <div className="w-full flex flex-col gap-2" key={index}>
            <div className="flex flex-row gap-2">
              <div className="w-12 h-12 truncate rounded-full bg-main-300 text-white">
                {reply.repliedBy.photoUrl ? (
                  <Image
                    width={100}
                    height={100}
                    alt=""
                    src={reply.repliedBy.photoUrl}
                    className="w-18 h-22 rounded-full"
                  />
                ) : (
                  <span className="font-bold text-2xl w-full p-1 h-full flex items-center justify-center">
                    {reply.repliedBy?.name.slice(0, 1)}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <span className="flex flex-row gap-4">
                  <span className="font-bold">{reply.repliedBy?.name}</span>
                  <span className="text-sm font-light">
                    {reply.repliedBy?.email}
                  </span>
                </span>
              </div>
            </div>
            <span>{reply.feedback}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <ProductsDetailsNav />
      <div className="w-full flex flex-col">
        <div className="flex w-full flex-col lg:flex-row justify-between p-6 h-auto ">
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
        <div className="mt-20 w-full bg-main-150 flex justify-between gap-30">
          <div className="w-2/3 first-letter:flex min-h-full flex-col">
            <div className="mt-10 flex flex-col gap-2 w-full m-10">
              <h3 className="font-bold">Reviews and Ratings</h3>
              {
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
              }
              <div>
                <span className="flex flex-row gap-4">
                  {GetStars({
                    rating: selectedProduct.product.averageRatings || 0
                  })}{' '}
                  <div className="font-bold">
                    {selectedProduct?.product?.averageRatings
                      ? Math.round(selectedProduct?.product?.averageRatings)
                      : 0}{' '}
                  </div>
                  {selectedProduct.product.reviewsCount} Reviews{' '}
                </span>
              </div>
              <div className="w-1/2 flex flex-col gap-4 ">
                {reviews &&
                  reviews
                    .slice(0, displayedReviews)
                    .map((rev: ReviewInterface, index: number) => (
                      <div
                        className=" w-full mt-2 flex flex-col gap-2"
                        key={index}
                      >
                        <div className="flex flex-col gap-2 ">
                          <div className="flex flex-row gap-2">
                            <div className="w-12 h-12 truncate rounded-full bg-main-300 text-white ">
                              {rev.reviewedBy?.photoUrl !== null ? (
                                <Image
                                  width={100}
                                  height={100}
                                  alt=""
                                  src={rev.reviewedBy?.photoUrl}
                                  className="w-18 h-22 rounded-full"
                                />
                              ) : (
                                <span className="font-bold text-2xl w-full p-1 h-full flex items-center justify-center">
                                  {rev.reviewedBy?.name.slice(0, 1)}
                                </span>
                              )}
                            </div>
                            <div className="flex flex-col">
                              <span className="flex flex-row gap-4">
                                <span className="font-bold">
                                  {rev.reviewedBy?.name}
                                </span>

                                <span className="text-sm font-light">
                                  {rev.reviewedBy?.email}
                                </span>
                              </span>

                              <span>
                                {GetStars({ rating: rev.rating || 0 })}
                              </span>
                            </div>
                          </div>
                        </div>
                        <span>{rev.feedback}</span>
                        <div className="flex flex-col mr-auto mb-0 font-bold">
                          <button
                            onClick={() =>
                              setExpandedReplies({
                                ...expandedReplies,
                                [rev.id]: !expandedReplies[rev.id]
                              })
                            }
                            className="text-blue-500 "
                          >
                            {expandedReplies[rev.id]
                              ? 'Hide Replies'
                              : 'Replies>'}
                          </button>
                          {rev.replies.map((reply, index) => (
                            <div
                              className="w-full flex flex-col gap-2"
                              key={index}
                            >
                              {expandedReplies[rev.id] && (
                                <>
                                  {/* ... (existing code) */}
                                  <Replies replies={rev.replies} />
                                </>
                              )}
                            </div>
                          ))}
                          {expandedReplies[rev.id] && (
                            <button
                              onClick={() => handleToggleReplyInput(rev.id)}
                              className="text-blue-500"
                            >
                              {replyInputVisible[rev.id]
                                ? 'Cancel Reply'
                                : 'Reply'}
                            </button>
                          )}
                          {replyInputVisible[rev.id] && (
                            <div className="flex flex-col gap-2 mt-2">
                              <Input
                                type="text"
                                value={newReply[rev.id] || ''}
                                onChange={e => handleReplyChange(e, rev.id)}
                                placeholder="Type your reply here..."
                                valid={true}
                                label="Reply"
                              />
                              <button
                                onClick={() => handleReplySubmit(rev.id)}
                                className="text-blue-500 bg-blue-500 p-2 rounded"
                              >
                                Submit Reply
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
              </div>
              {reviews && reviews.length > displayedReviews && (
                <button
                  onClick={handleLoadMore}
                  className="text-blue-500 w-1/4 h-10 border-2 "
                >
                  View more Review
                </button>
              )}
              {displayedReviews > 5 && (
                <button
                  onClick={handleLoadLess}
                  className="text-blue-500 w-1/4 h-10 border-2 "
                >
                  View less Review
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Details;
