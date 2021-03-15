// @ts-nocheck
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { ControlledInput } from 'components/Input';
import { ControlledTextarea } from 'components/Textarea';
import ErrorMessage from 'components/ErrorMessage';
import PageHeader from 'components/PageHeader';

const Contact = () => {
  const { register, handleSubmit, errors } = useForm();
  const { t } = useTranslation();
  const onSubmit = (data) => {
    toast.success('Message sent!', { closeButton: false });
    console.log(data);
  };

  return (
    <>
      <PageHeader headline="Contact support" />

      <form
        className="bg-blue-lightest px-8 py-4 rounded w-2/5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ControlledInput
          label="Email"
          name="email"
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
        <ErrorMessage errors={errors} errorKey="email" />

        <ControlledTextarea
          label="Message"
          name="message"
          isRequired
          rows={6}
          ref={register({
            required: {
              value: true,
              message: t('errorMessages.common.required'),
            },
          })}
        />

        <ErrorMessage errors={errors} errorKey="message" />

        <div className="btn-row end mt-4">
          <button type="submit" className="btn-primary">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default Contact;
