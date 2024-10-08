import { ReactNode } from 'react';

import ChallengeItem from '../components/challenge-item';
import * as S from './styles';
import { type ChallengeDetailData } from '@/apis/challenge-detail/challenge.detail.response';
import * as Base from '@/styles/baseStyles';
import { formatDate } from '@/utils/formatters';

type DescriptionSectionProps = {
  data: ChallengeDetailData;
};

export const DescriptionSection = ({
  data,
}: DescriptionSectionProps): ReactNode => {
  const challenges = data.challenges;

  const formattedStartDate = formatDate(data.startDate);
  const formattedEndDate = formatDate(data.endDate);

  return (
    <S.Wrapper>
      <S.ContentWrapper>
        <S.Text>{data.content}</S.Text>
      </S.ContentWrapper>
      <div style={{ height: '12px' }} />
      <S.ContentWrapper>
        <S.BoldText>챌린지 신청 가능 기간</S.BoldText>
        <S.Text>
          {formattedStartDate} ~ {formattedEndDate}
        </S.Text>
      </S.ContentWrapper>
      <div style={{ height: '12px' }} />
      <S.ContentWrapper>
        <S.BoldText>참여방법</S.BoldText>
        <S.Text>{data.guide}</S.Text>
      </S.ContentWrapper>

      <Base.HorizontalLine marginY={16} marginX={16} />

      <S.RowList>
        {challenges.map((item) => (
          <ChallengeItem
            key={item.id}
            challenge={item}
            maxDifficulty={data.maxDifficulty}
          />
        ))}
      </S.RowList>
    </S.Wrapper>
  );
};
