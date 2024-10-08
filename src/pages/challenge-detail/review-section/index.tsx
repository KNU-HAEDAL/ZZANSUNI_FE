import { useState, useEffect } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import * as S from './styles';
import { getReview, getChallegeAvgScore } from '@/apis/review/review.api';
import { type ReviewData } from '@/apis/review/review.response';
import EmptyState from '@/components/common/empty-state';
import { StarRating } from '@/components/common/star-rating';
import ReviewItem from '@/pages/review/components/review-item';
import { RouterPath } from '@/routes/path';
import * as Base from '@/styles/baseStyles';
import { formatToFixed, formatWithComma } from '@/utils/formatters';

interface ReviewSectionProps {
  id: number;
  category: string;
  title: string;
}

export const ReviewSection = ({ id, category, title }: ReviewSectionProps) => {
  const DATA_SIZE = 5; // 가져올 리뷰 개수
  const [reviewList, setReviewList] = useState<ReviewData[]>([]);
  const [avgRating, setAvgRating] = useState<number | undefined>();
  const [formattedAvgRating, setFormattedAvgRating] = useState<string>('0.0'); // 소수점 한 자리까지 포맷팅된 별점 평균
  const [formattedTotalRatings, setFormattedTotalRatings] = useState(''); // 쉼표 포맷팅된 별점(리뷰) 개수
  const navigate = useNavigate();

  useEffect(() => {
    // 평균 별점 가져오기
    getChallegeAvgScore({ challengeGroupId: id })
      .then((res) => {
        setAvgRating(res.averageRating);
        setFormattedAvgRating(formatToFixed(res.averageRating));

        // 모든 별점 개수 합 구하여 저장
        const total = Object.values(res.ratingCount).reduce(
          (acc, value) => acc + value,
          0
        );
        setFormattedTotalRatings(formatWithComma(total));
      })
      .catch((error) => {
        console.error('Error fetching average score:', error);
      });

    // 리뷰 리스트 가져오기
    getReview({ challengeGroupId: id, page: 0, size: DATA_SIZE })
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setReviewList((prevReviewList) => [...prevReviewList, ...res.data]);
        } else {
          console.log('리뷰 데이터 없음');
        }
      })
      .catch((error) => {
        console.error('Error fetching reviews:', error);
      });
  }, [id]);

  return (
    <S.Wrapper>
      {reviewList.length > 0 ? (
        // 리뷰 있을 때
        <>
          <S.RatingContainer className='RatingContainer'>
            <S.AvgRating>{formattedAvgRating}</S.AvgRating>
            {avgRating && <StarRating rating={avgRating} />}
            <S.AllReviewButton
              onClick={() =>
                navigate(
                  `/${RouterPath.challenge}/review?id=${id}&category=${category}&title=${title}`
                )
              }
            >
              {formattedTotalRatings}개 모두 보기{' '}
              <IoIosArrowForward style={{ marginLeft: '4px' }} />
            </S.AllReviewButton>
          </S.RatingContainer>

          <S.ReviewList className='review-list'>
            {reviewList.map((review, index) => (
              <div key={index}>
                <ReviewItem item={review} />
                {index < reviewList.length - 1 && (
                  <Base.HorizontalLine marginY={16} />
                )}
                {/* 마지막 요소 뒤에는 Line을 넣지 않음 */}
              </div>
            ))}
          </S.ReviewList>
        </>
      ) : (
        // 리뷰 없을 때
        <EmptyState>
          <p>아직 리뷰가 없습니다.</p>
          <p>
            챌린지를 완료하고 <span className='highlight'>첫 번째 리뷰어</span>
            가 되어보세요!
          </p>
        </EmptyState>
      )}
    </S.Wrapper>
  );
};
