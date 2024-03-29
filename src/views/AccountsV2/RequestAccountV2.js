// @ts-nocheck
import { useEffect, useState } from 'react';
import cls from 'classnames';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import Captcha from 'components/Captcha';
import Input, { ControlledInput } from 'components/Input';
import ErrorMessage from 'components/ErrorMessage';
import PageHeaderV2 from 'components/PageHeaderV2';
import Select from 'components/Select';
import Button from 'components/Button';

import { LIVE_PROGRAMS } from 'rt-constants';

import { addAccount, getPrograms } from 'services/api';
import { get, set, sortArrayOfObjects } from 'utils';

import './AccountsV2.css';

const RequestAccountV2 = () => {
  const history = useHistory();
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [programList, setProgramList] = useState([]);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(get('program'));

  const { handleSubmit, errors, register, control } = useForm({
    defaultValues: {},
  });
  const { t } = useTranslation();

  const onSubmit = (data) => {
    addAccount(data)
      .then(() => {
        setShowSuccessMsg(true);
        toast.success('Your request was submitted successfully.', {
          onClose: history.goBack(),
        });
      })
      .catch(() => {
        toast.error('Something went wrong!');
      });
  };

  const handleCaptchaSuccess = () => {
    setCaptchaVerified(true);
  };

  const handleCaptchaError = () => {
    toast.error('CAPTCHA challenge failed.');
  };

  const buildProgramList = async () => {
    const programs = await getPrograms();

    const programArr = [];

    for (const key in programs) {
      if (Object.hasOwnProperty.call(programs, key)) {
        const prog = programs[key][0];
        programArr.push({ value: key, label: `${key} - ${prog.name}` });
      }
    }

    setProgramList(programArr.sort(sortArrayOfObjects('label')));
  };

  useEffect(() => {
    buildProgramList();
  }, []);

  const handleProgramChange = (state) => {
    if (!LIVE_PROGRAMS.includes(state)) {
      toast.info('That program has not been implemented yet.', {
        autoClose: 5000,
      });
      return;
    }
    set('program', state);
    set('api', process.env[`REACT_APP_${state}_SERVER_URL`]);
    setSelectedProgram(state);
    window.location.reload(true);
  };

  return (
    <>
      <PageHeaderV2 headline="Request an account" />
      <section className="flex mb-4">
        <form
          className={cls('w-full request-form', { isSuccess: showSuccessMsg })}
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="sub-heading my-2">What program are you in?</p>

          <Controller
            control={control}
            name="state"
            defaultValue={selectedProgram || get('program') || ''}
            rules={{
              required: {
                value: true,
                message: t('errorMessages.common.required'),
              },
            }}
            render={({ onChange, value }) => (
              <Select
                v2
                name="state"
                options={programList}
                isRequired
                onChange={(e) => {
                  onChange(e);
                  handleProgramChange(e.target.value);
                }}
                value={value}
                className="w-2/5"
              />
            )}
          />
          <ErrorMessage errors={errors} errorKey="state" />

          <p className="sub-heading mb-2 mt-8">Personal Info</p>

          <div className="form-grid">
            <fieldset className="form">
              <ControlledInput
                v2
                name="first_name"
                label="First name"
                isRequired
                ref={register({
                  required: {
                    value: true,
                    message: t('errorMessages.common.required'),
                  },
                })}
              />
              <ErrorMessage errors={errors} errorKey="first_name" />

              <ControlledInput
                v2
                name="last_name"
                label="Last name"
                isRequired
                ref={register({
                  required: {
                    value: true,
                    message: t('errorMessages.common.required'),
                  },
                })}
              />
              <ErrorMessage errors={errors} errorKey="last_name" />

              <ControlledInput
                v2
                name="email_address"
                label="Email address"
                isRequired
                ref={register({
                  required: {
                    value: true,
                    message: t('errorMessages.common.required'),
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: t('errorMessages.email.invalid'),
                  },
                })}
              />
              <ErrorMessage errors={errors} errorKey="email_address" />

              <Controller
                control={control}
                name="phone_number_office"
                label="Phone number"
                defaultValue=""
                // eslint-disable-next-line no-unused-vars
                render={({ onChange, value }) => (
                  <Input
                    v2
                    name="phone_number_office"
                    label="Phone number"
                    placeholder="(000) 000-0000"
                    mask="(999) 999-9999"
                    optional
                    onChange={({ target }) => {
                      const x = target.value
                        .replace(/\D/g, '')
                        .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
                      // eslint-disable-next-line no-param-reassign
                      target.value = !x[2]
                        ? x[1]
                        : `(${x[1]}) ${x[2]}${x[3] ? `-${x[3]}` : ''}`;
                      onChange(target.value);
                    }}
                  />
                )}
              />

              <div className="mt-4">
                <Captcha
                  handleSuccess={handleCaptchaSuccess}
                  handleError={handleCaptchaError}
                />
              </div>

              <div className="btn-row end mt-4">
                <Button v2 outline small type="button" onClick={() => {}}>
                  Cancel
                </Button>

                <Button
                  v2
                  primary
                  small
                  className="ml-4"
                  type="submit"
                  disabled={!captchaVerified}
                >
                  Request Account
                </Button>
              </div>
            </fieldset>
          </div>
        </form>
        <section
          className={cls('request-success', { isSuccess: showSuccessMsg })}
        >
          <div className="text-center">
            <p className="sub-heading mb-6">
              Thanks for submitting your request!
            </p>
            <p>Someone will contact you shortly.</p>
          </div>
        </section>
      </section>
    </>
  );
};

export default RequestAccountV2;
