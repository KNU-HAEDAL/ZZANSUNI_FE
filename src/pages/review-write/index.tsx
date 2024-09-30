import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { postReview } from '@/apis/review/review.api';
import CTA, { CTAContainer } from '@/components/common/cta';
import Textarea from '@/components/common/form/textarea';
import { StarRating } from '@/components/common/star-rating';
import TopBar from '@/components/features/layout/top-bar';
import { useChallengeStore } from '@/store/useChallengeStore';
import {
  formatRating,
  formatDifficulty,
  formatAchievement,
} from '@/utils/formatters';
import { Box, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';

const MIN_CONTENT_LENGTH = 20;

const ReviewWrite = () => {
  const { id } = useParams();
  const challengeId = Number(id);
  // const challengeGrouptitle = sessionStorage.getItem('challengeGroupTitle');
  const categoryLabel = sessionStorage.getItem('categoryLabel');
  const { challengeTitle } = useChallengeStore();
  // const challengeGroupTitle = sessionStorage.getItem('challengeGroupTitle');

  const [rating, setRating] = useState(0);
  const difficultyList = [1, 2, 3];
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    number | undefined
  >();
  const achievementList = [1, 2, 3];
  const [selectedAchievement, setSelectedAchievement] = useState<
    number | undefined
  >();
  const [content, setContent] = useState('');
  const [isContentValid, setIsContentValid] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleDifficultyClick = (difficulty: number) => {
    setSelectedDifficulty(difficulty);
  };

  const handleFeelingClick = (feeling: number) => {
    setSelectedAchievement(feeling);
  };

  // 별점, 체감 난이도, 성취감, 내용 유효성 검사 -> 버튼 상태 관리
  useEffect(() => {
    if (
      rating &&
      selectedDifficulty &&
      selectedAchievement &&
      content.trim() &&
      content.length >= MIN_CONTENT_LENGTH
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [rating, selectedDifficulty, selectedAchievement, content]);

  // 소감 내용 유효성 검사
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    // console.log(content); // test

    if (newContent.trim() && newContent.length >= MIN_CONTENT_LENGTH) {
      setIsContentValid(true);
    } else {
      setIsContentValid(false);
    }
    // console.log(isContentValid); // test
  };

  const handleSaveReview = () => {
    postReview({
      challengeId,
      content,
      rating,
      difficulty: selectedDifficulty,
      achievement: selectedAchievement,
    })
      .then(() => {
        alert('리뷰가 등록되었습니다!');
      })
      .catch((error) => {
        // API에서 받은 오류 객체일 경우
        if (error.result === 'FAIL') {
          alert(error.message || '다시 시도해주세요.');
        }
        // 예상치 못한 오류 처리
        else {
          alert('다시 시도해주세요.');
        }
      });
  };

  return (
    <>
      <TopBar title='리뷰 쓰기' backgroundColor='#fff' type='Page' />
      <Wrapper>
        <ChallengeTitleWrapper>
          <Category>{categoryLabel}</Category>
          <Title>{challengeTitle}</Title>
        </ChallengeTitleWrapper>
        <FlexBox flexDirection='column' alignItems='center' alignSelf='center'>
          <FlexBox flexDirection='row' alignItems='center'>
            <StarRating
              rating={rating}
              size={32}
              onClick={(newRating) => setRating(newRating)}
            />
            <Rating>
              <span>{rating}.0</span>&nbsp;<span>/ 5.0</span>
            </Rating>
          </FlexBox>
          <FlexBox alignSelf='center'>
            <Text fontSize='var(--font-size-sm)' color='var(--color-gray-01)'>
              {formatRating(rating)}
            </Text>
          </FlexBox>
        </FlexBox>
        <FlexBox flexDirection='column'>
          <ItemTitle>체감 난이도</ItemTitle>
          <Box as='ul' display='flex' margin='0 16px'>
            {difficultyList.map((d) => (
              <Chip
                as='li'
                key={d}
                onClick={() => handleDifficultyClick(d)}
                isSelected={selectedDifficulty === d}
              >
                {formatDifficulty(d)}
              </Chip>
            ))}
          </Box>
        </FlexBox>
        <FlexBox flexDirection='column'>
          <ItemTitle>성취감</ItemTitle>
          <Box as='ul' display='flex' margin='0 16px'>
            {achievementList.map((a) => (
              <Chip
                as='li'
                key={a}
                onClick={() => handleFeelingClick(a)}
                isSelected={selectedAchievement === a}
              >
                {formatAchievement(a)}
              </Chip>
            ))}
          </Box>
        </FlexBox>
        <FlexBox flexDirection='column'>
          <ItemTitle>소감</ItemTitle>
          <Textarea
            placeholder='챌린지 완수 후 느낀 점을 적어주세요.'
            value={content}
            onChange={handleContentChange}
            minValueLength={MIN_CONTENT_LENGTH}
            valid={isContentValid}
          />
        </FlexBox>
        <FlexBox flexDirection='column'>
          <ItemTitle>리뷰 작성 시 주의 사항</ItemTitle>
          <Text fontSize='var(--font-size-sm)' margin='0 16px'>
            해당 챌린지와 무관한 내용 또는 욕설, 도배 등의{' '}
            <Text as='span' color='var(--color-green-01)' fontWeight={600}>
              부적절한 내용은 삭제 조치
            </Text>
            될 수 있습니다.
          </Text>
        </FlexBox>

        <CTAContainer>
          <CTA
            label='등록하기'
            disabled={isButtonDisabled}
            onClick={handleSaveReview}
          />
        </CTAContainer>
      </Wrapper>
    </>
  );
};

export default ReviewWrite;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;
  gap: 16px;
`;

const ChallengeTitleWrapper = styled.div`
  margin: 16px;
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const Category = styled.div`
  font-size: var(--font-size-xs);
  color: var(--color-green-01);
`;

const Title = styled.div`
  font-size: var(--font-size-xl);
  font-weight: bold;
`;

const FlexBox = styled(Box)`
  display: flex;
`;

const ItemTitle = styled(Text)`
  font-size: var(--font-size-md);
  font-weight: 600;
  line-height: 2.5;
  margin: 0 16px;
`;

const Rating = styled.span`
  display: inline-flex;
  align-items: end;

  span:first-child {
    font-size: var(--font-size-xxl);
    font-weight: bold;
    margin-left: 10px;
    line-height: 1;
  }

  span:last-child {
    font-size: var(--font-size-sm);
    color: var(--color-gray-01);
  }
`;

const Chip = styled.button<{ isSelected: boolean }>`
  margin-right: 4px;
  padding: 4px 12px;
  border-radius: 50px;
  border: var(--color-grey-02) 1px solid;
  background-color: var(--color-white);
  color: var(--color-grey-01);
  font-size: var(--font-size-sm);
  font-weight: 600;
  text-align: center;
  ${({ isSelected }) =>
    isSelected &&
    `
        border: var(--color-green-01) 1px solid;
        color: var(--color-green-01);
    `}
`;
