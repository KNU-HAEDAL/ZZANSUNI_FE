import Logo from '@/assets/login/google.png';
// import { KAKAO_AUTH_URL } from '@/constants/URI.ts';
import * as Base from '@/styles/baseStyles';

const GoogleLogin = () => {
  const handlerLogin = () => {
    // window.location.href = KAKAO_AUTH_URL;
    alert('준비중입니다.');
  };
  return (
    <Base.Container onClick={handlerLogin} cursor='pointer'>
      <Base.Img
        width='3rem'
        textAlign='center'
        src={Logo}
        alt='Social-symbol'
      />
    </Base.Container>
  );
};

export default GoogleLogin;
