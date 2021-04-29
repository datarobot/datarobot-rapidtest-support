// @ts-nocheck
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import ErrorMessage from 'components/ErrorMessage';
import Input from 'components/Input';
// import Select from 'components/Select';
import Radio from 'components/Radio';

import { YES_NO_RADIOS } from 'rt-constants';
import Button, { KIND } from 'components/Button';

const NoProgramForm = ({ onSubmit }) => {
  const { control, errors, handleSubmit } = useForm();
  const { t } = useTranslation();

  return (
    <section>
      <form className="w-full mr-2" onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="mb-8">
          <p className="sub-heading text-xl mb-6">Personal information</p>
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: t('errorMessages.common.required'),
              },
            }}
            render={({ onChange, value }) => (
              <Input
                name="firstName"
                placeholder="First Name"
                onChange={onChange}
                value={value}
                isRequired
              />
            )}
          />
          <ErrorMessage errors={errors} errorKey="firstName" />

          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: t('errorMessages.common.required'),
              },
            }}
            render={({ onChange, value }) => (
              <Input
                name="lastName"
                placeholder="Last Name"
                onChange={onChange}
                value={value}
                className="mt-2"
                isRequired
              />
            )}
          />
          <ErrorMessage errors={errors} errorKey="lastName" />

          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: t('errorMessages.common.required'),
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: t('errorMessages.email.invalid'),
              },
            }}
            render={({ onChange, value }) => (
              <Input
                name="email"
                placeholder="Email Address"
                onChange={onChange}
                value={value}
                className="mt-2"
                isRequired
              />
            )}
          />
          <ErrorMessage errors={errors} errorKey="email" />
        </fieldset>

        <fieldset className="mb-8">
          <p className="sub-heading text-xl mb-6">Do you have tests?</p>
          <Controller
            name="hasTests"
            control={control}
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: t('errorMessages.common.required'),
              },
            }}
            render={({ onChange }) => (
              <Radio
                values={YES_NO_RADIOS}
                name="hasTests"
                onChange={onChange}
                wrapperClass="flex w-1/3 justify-between"
              />
            )}
          />
          <ErrorMessage errors={errors} errorKey="hasTests" />
        </fieldset>
        <fieldset className="mb-8">
          <p className="sub-heading text-xl mb-6">
            Are you a member of state or local health authority?
          </p>
          <Controller
            name="isLocalAuthority"
            control={control}
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: t('errorMessages.common.required'),
              },
            }}
            render={({ onChange }) => (
              <Radio
                values={YES_NO_RADIOS}
                name="isLocalAuthority"
                onChange={onChange}
                wrapperClass="flex w-1/3 justify-between"
              />
            )}
          />
          <ErrorMessage errors={errors} errorKey="isLocalAuthority" />
          {/* UNCOMMENT THIS WHEN THERE IS SOMETHING MORE THAN SCHOOL DISTRICT  */}
          {/* <Controller
            name="authorityType"
            control={control}
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: t('errorMessages.common.required'),
              },
            }}
            render={({ onChange }) => (
              <Select
                options={[
                  { value: 'schoolDistrict', label: 'School District' },
                ]}
                name="authorityType"
                onChange={onChange}
                disabled
                value={'schoolDistrict'}
                className="mt-4"
              />
            )}
          /> */}
        </fieldset>

        <fieldset className="mb-8">
          <p className="sub-heading text-xl mb-6">
            How many tests does your program plan on doing per day?
          </p>

          <Controller
            name="testsPerDay"
            control={control}
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: t('errorMessages.common.required'),
              },
            }}
            render={({ onChange }) => (
              <Input
                name="testsPerDay"
                onChange={onChange}
                className="mt-4"
                placeholder="Number of tests"
                type="number"
              />
            )}
          />
          <ErrorMessage errors={errors} errorKey="testsPerDay" />
        </fieldset>

        <Button
          kind={KIND.PRIMARY}
          type="submit"
          label="Request Test Admin Account"
        />
      </form>
    </section>
  );
};

export default NoProgramForm;
