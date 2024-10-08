import { TABS_HEIGHT } from '@/components/common/tabs';
import { HEADER_HEIGHT } from '@/components/features/layout/top-bar';
import styled from '@emotion/styled';

export const Text = styled.span<{ fontWeight?: string; color?: string }>`
  font-size: var(--font-size-md);
  font-weight: ${(props) => props.fontWeight || null};
  color: ${(props) => props.color || null};
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 16px 0;
  /* min-height: calc(100vh - ${HEADER_HEIGHT} - ${TABS_HEIGHT}); */
`;

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  /* width: 100%; */
  margin: 0 16px;
`;

export const AvgRating = styled.p`
  font-size: var(--font-size-xl);
  font-weight: 600;
`;

export const AllReviewButton = styled.button`
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-grey-01);
  display: inline-flex;
  align-items: center;
  margin: 0 0 0 auto;
  cursor: pointer;
`;

export const Line = styled.div`
  border-top: 1px solid var(--color-green-06);
`;

export const ReviewList = styled.div`
  margin: 16px;
`;
