import React, { useState } from 'react';
import styled from 'styled-components';

const AuthForm = ({ email, setEmail, password, setPassword, handleSubmit, error, isLoading }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [address, setAddress] = useState({
    roadAddress: '',
    detailAddress: ''
  });

  const handleEmailVerification = () => {
    setShowEmailVerification(true);
    // 이메일 인증코드 전송 로직
  };

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: (data) => {
        setAddress({
          ...address,
          roadAddress: data.roadAddress
        });
        setShowAddressModal(false);
      }
    }).open();
  };

  return (
    <Section>
      <Container>
        <Row>
          <Column>
            <FormSection>
              <Title>
                <span>Log In </span>
                <span>Sign Up</span>
              </Title>
              <Checkbox 
                type="checkbox" 
                id="reg-log" 
                onChange={() => setIsSignUp(!isSignUp)}
              />
              <CheckboxLabel htmlFor="reg-log" />  
              <Card3dWrap>
                <Card3dWrapper style={{
                  transform: isSignUp ? 'rotateY(180deg)' : 'rotateY(0)'
                }}>
                  <CardFront>
                    <CenterWrap>
                      <FormContent>
                        <h4>LOG IN</h4>
                        <form onSubmit={handleSubmit}>
                          <FormGroup>
                            <FormInput 
                              type="email" 
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Email"
                              required
                            />
                            <InputIcon className="uil uil-at" />
                          </FormGroup>
                          <FormGroup>
                            <FormInput 
                              type="password" 
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="Password"
                              required
                            />
                            <InputIcon className="uil uil-lock-alt" />
                          </FormGroup>
                          {error && <div className="error-message">{error}</div>}
                          <SubmitButton type="submit" disabled={isLoading}>
                            {isLoading ? "Logging in..." : "Log In"}
                          </SubmitButton>
                          <ForgotPassword href="#">
                            Forgot your ID or PASSWORD?
                          </ForgotPassword>
                        </form>
                      </FormContent>
                    </CenterWrap>
                  </CardFront>


                  <CardBack>
                    <CenterWrap>
                      <FormContent>
                        <h4>SIGN UP</h4>
                        <FormGroup>
                          <FormInput 
                            type="text" 
                            placeholder="User Name"
                          />
                          <InputIcon className="uil uil-user" />
                        </FormGroup>
                        
                        {/* 이메일 입력 및 인증 */}
                        <FormGroup>
                          <FormInput 
                            type="email" 
                            placeholder="Email"
                          />
                          <InputIcon className="uil uil-at" />
                          <VerificationButton 
                            onClick={handleEmailVerification}
                          >
                            인증코드 전송
                          </VerificationButton>
                        </FormGroup>

                        {/* 이메일 인증코드 입력 */}
                        {showEmailVerification && (
                          <FormGroup>
                            <FormInput 
                              type="text" 
                              placeholder="Verification Code"
                            />
                            <InputIcon className="uil uil-comment-alt-verify" />
                            <VerificationButton>
                              인증코드 확인
                            </VerificationButton>
                          </FormGroup>
                        )}
                        <FormGroup>
                          <FormInput 
                            type="password" 
                            placeholder="Password"
                          />
                          <InputIcon className="uil uil-lock-alt" />
                        </FormGroup>
                        {/* 전화번호 입력 */}
                        <FormGroup>
                          <FormInput 
                            type="tel" 
                            placeholder="Phone Number"
                          />
                          <InputIcon className="uil uil-phone" />
                        </FormGroup>

                        {/* 주소 입력 */}
                        <FormGroup>
                          <FormInput 
                            type="text" 
                            value={address.roadAddress}
                            placeholder="Road Address"
                            readOnly
                          />
                          <InputIcon className="uil uil-map-marker" />
                          <AddressButton 
                            onClick={handleAddressSearch}
                          >
                            주소 검색
                          </AddressButton>
                        </FormGroup>

                        {/* 상세주소 입력 */}
                        {address.roadAddress && (
                          <FormGroup>
                            <FormInput 
                              type="text" 
                              placeholder="Detail Address"
                              value={address.detailAddress}
                              onChange={(e) => setAddress({
                                ...address,
                                detailAddress: e.target.value
                              })}
                            />
                          </FormGroup>
                        )}
                        <SubmitButton>Submit</SubmitButton>
                      </FormContent>
                    </CenterWrap>
                  </CardBack>
                </Card3dWrapper>
              </Card3dWrap>
            </FormSection>
          </Column>
        </Row>
      </Container>
    </Section>
  );
};

// 먼저 기본 스타일 컴포넌트들을 정의
const Section = styled.div`
  left: 1.2px;
  top: -3px;
  position: relative;
  width: 98%;
  display: block;
  min-height: 70vh;
  // background-color: #1f2029;
  background-color:rgb(54, 81, 74);
  overflow-x: hidden;
  border-radius: 20px;
  font-family: 'Poppins', sans-serif;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 60vh;
`;

const Column = styled.div`
  width: 100%;
  text-align: center;
  padding: 10px 0; // 패딩 추가

`;

const FormSection = styled.div`
  padding: 20px 0;
  top: 2vh;
  position: relative;
`;

const Title = styled.h6`
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.2rem;
  color: #fff;
  margin: -20px auto;
  span {
    padding: 0 20px;
    text-transform: uppercase;
    font-weight: 700;
  }
`;

// CheckboxLabel을 먼저 정의
const CheckboxLabel = styled.label`
  position: relative;
  display: block;
  text-align: center;
  width: 60px;
  height: 16px;
  border-radius: 8px;
  padding: 0;
  margin: 35px auto;
  top: 10px;
  margin-left: 150px;
  cursor: pointer;
  background-color: #ffeba7;
  
  &:before {
    position: absolute;
    display: block;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    color: #ffeba7;
    background-color:rgb(14, 42, 11);
    content: '\u2196';  // → 화살표
    font-family: "unicons";
    z-index: 20;
    top: -10px;
    left: -10px;
    line-height: 36px;
    text-align: center;
    font-size: 28px; // 글자 크기 증가
    font-weight: bold; // 글자 두께 증가
    transition: all 0.5s ease;
  }
`;

// 그 다음 Checkbox 정의
const Checkbox = styled.input`
  position: absolute;
  left: -9999px;
  
  &:checked + ${CheckboxLabel} {
    &:before {
      transform: translateX(44px) rotate(-270deg);
    }
  }
`;

// 나머지 스타일 컴포넌트들...
const Card3dWrap = styled.div`
  position: relative;
  width: 600px;
  max-width: 100%;
  min-height: 500px; // 최소 높이 설정
  transform-style: preserve-3d;
  perspective: 800px;
  margin-top: 0px;
`;

const Card3dWrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 10px;
  transform-style: preserve-3d;
  transition: all 600ms ease-out;
`;

const CardFront = styled.div`
  width: 100%;
  min-height: 510px; // 최소 높이 설정
  // background-color: rgba(31, 41, 36);  // 어두운 초록색 배경
  background-color:rgb(54, 81, 74);
  background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat.svg');
  background-position: bottom center;
  background-repeat: no-repeat;
  background-size: 300%;
  position: absolute;
  border-radius: 6px;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  padding-bottom: 20px; // 하단 여백 추가
`;

const CardBack = styled(CardFront)`
  transform: rotateY(180deg);
  z-index: 0; // 뒷면의 z-index를 앞면보다 낮게 설정
`;


const CenterWrap = styled.div`
  position: absolute;
  width: 100%;
  padding: 0px 35px;
  top: 50%;
  left: 0;
  transform: translate3d(0, -50%, 35px) perspective(100px);
  z-index: 20;
  display: block;
`;

const FormGroup = styled.div`
  position: relative;
  display: block;
  margin: 0 0 5px 0; // 하단 마진 추가
  padding: 0;
`;


const FormInput = styled.input`
  padding: 13px 20px;
  padding-left: 55px;
  height: 48px;
  width: 100%;
  font-weight: 500;
  border-radius: 4px;
  font-size: 16px;
  line-height: 25px;
  letter-spacing: 0.5px;
  outline: none;
  color: #c4c3ca;
  background-color: rgba(31, 41, 36, 0.8);
  border: none;
  transition: all 200ms linear;
  box-shadow: 0 4px 8px 0 rgba(21,21,21,.2);

   &::placeholder {
    color: rgba(255,255,255,0.5);
  }

  &:focus {
    background-color: rgba(50, 205, 50, 0.2);
  }
`;

const InputIcon = styled.i`
  position: absolute;
  top: 0;
  left: 18px;
  height: 48px;
  font-size: 24px;
  line-height: 48px;
  text-align: left;
  color: #ffeba7;
  transition: all 200ms linear;
`;

const SubmitButton = styled.button`
  border-radius: 4px;
  height: 34px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  transition: all 200ms linear;
  padding: 0 30px;
  letter-spacing: 1px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: none;
  background-color: #ffeba7;
  color:rgb(11, 52, 56);
  box-shadow: 0 8px 24px 0 rgba(255,235,167,.2);
  margin-top: 10px;
  
  &:hover {
    background-color:rgb(11, 52, 56);
    color: #ffeba7;
    box-shadow: 0 8px 24px 0 rgb(11, 52, 56);
  }
`;

const ForgotPassword = styled.a`
  color: #c4c3ca;
  font-size: 14px;
  text-decoration: none;
  display: block;
  margin-top: 20px;
  
  &:hover {
    color: #ffeba7;
  }
`;

const FormContent = styled.div`
  text-align: center;
  color: #fff;
  padding: 10px 0; // 상하 패딩 추가
  
  h4 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 20px;
  }
`;

const VerificationButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  padding: 8px 12px;
  border-radius: 4px;
  background-color: #ffeba7;
  color:rgb(11, 52, 56);
  border: none;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background-color:rgb(11, 52, 56);
    color: #ffeba7;
  }
`;

const AddressButton = styled(VerificationButton)`
  // 주소 검색 버튼 스타일
`;
export default AuthForm;
