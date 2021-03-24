/* eslint-disable no-unused-vars */
// @ts-nocheck
import { useEffect, useRef, useState } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

import Checkbox from 'components/Checkbox';
import Loading from 'components/Loading';
import SuccessCheck from 'components/Notifications/SuccessCheck';

import { verifyCaptcha } from 'services/api';

import './Captcha.css';

const Captcha = ({ handleSuccess, handleError }) => {
  const [captchaToken, setCaptchaToken] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const captchaRef = useRef(null);

  const handleCaptchaChange = () => {
    captchaRef.current.execute();
  };

  useEffect(() => {
    if (captchaToken) {
      setIsSuccess(true);
      handleSuccess();
      // setIsLoading(true);
      // verifyCaptcha(captchaToken)
      //   .then((resp) => {
      //     if (resp.status === 200) {
      //       setIsLoading(false);
      //       setIsSuccess(true);
      //       handleSuccess();
      //     }
      //   })
      //   .catch(() => handleError());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [captchaToken]);

  return (
    <section className="captcha-container">
      <HCaptcha
        sitekey={process.env.REACT_APP_HCAPTCHA_KEY}
        onVerify={setCaptchaToken}
        onError={handleError}
        ref={captchaRef}
        size="invisible"
      />
      <div className="flex items-center">
        {!isSuccess && isLoading && (
          <Loading size={24} containerClassName="captcha-loader" />
        )}
        {isSuccess && !isLoading && <SuccessCheck persist size={24} />}
        {!isLoading && !isSuccess && (
          <Checkbox onChange={handleCaptchaChange} />
        )}
        <p
          className="text-sm text-blue ml-2 cursor-pointer"
          onClick={handleCaptchaChange}
        >
          I'm a human.
        </p>
      </div>
    </section>
  );
};

export default Captcha;
