import { Text } from '@chakra-ui/react';
import styled from '@emotion/styled';

const Caution = () => {
  return (
    <Wrapper>
      <Text fontSize='var(--font-size-sm)' fontWeight='600' margin='0 0 8px 0'>
        유의 사항
      </Text>
      <Text
        as='ul'
        listStyleType='disc'
        listStylePosition='inside'
        fontSize='var(--font-size-xs)'
      >
        <li>모든 스탬프를 모으면 챌린지를 완수하게 됩니다.</li>
        <li>
          스탬프는 하루 1개로 제한됩니다. (동일 챌린지를 하루에 여러 번
          인증하더라도 1회만 인정됩니다.)
        </li>
        <li>
          명시된 횟수를 초과한 경우 챌린지 완수로 인정되나 추가 인증에 대한
          스탬프나 포인트는 제공되지 않습니다.
        </li>
        <li>
          사진 조작, 타인의 계정 이용 등의 부정 행위 적발 시 해당 계정은 강제
          탈퇴되며 추후 서비스 이용에 제한이 있을 수 있습니다.
        </li>
        <li>스탬프가 정상 인증되지 않는 경우 운영 측으로 문의해주세요.</li>
      </Text>
    </Wrapper>
  );
};

export default Caution;

const Wrapper = styled.div`
  padding: 24px 16px;
  background-color: var(--color-class-01);
  color: var(--color-black);
  text-align: left;
`;