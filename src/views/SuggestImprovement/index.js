// @ts-nocheck
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ControlledInput } from 'components/Input';
import { ControlledTextarea } from 'components/Textarea';
import ErrorMessage from 'components/ErrorMessage';
import PageHeader from 'components/PageHeader';

const SuggestImprovement = () => {
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const { handleSubmit, errors, register } = useForm({
    reValidateMode: 'onChange',
  });
  const { t } = useTranslation();
  // eslint-disable-next-line no-unused-vars
  const onSubmit = (data) => {
    console.log(data);
    setShowSuccessMsg(true);
  };

  return (
    <>
      <PageHeader headline="Suggest an improvement" />
      <section className="flex">
        <form className="w-2/5 mr-8" onSubmit={handleSubmit(onSubmit)}>
          <ControlledInput
            name="title"
            label="Title"
            placeholder="Name of new feautre"
            isRequired
            ref={register({
              required: {
                value: true,
                message: t('errorMessages.common.required'),
              },
            })}
          />
          <ErrorMessage errors={errors} errorKey="title" />

          <ControlledTextarea
            name="suggestion"
            label="Suggestion"
            placeholder="I'd like to see..."
            isRequired
            rows={6}
            ref={register({
              required: {
                value: true,
                message: t('errorMessages.common.required'),
              },
            })}
          />
          <ErrorMessage errors={errors} errorKey="suggestion" />

          <div className="btn-row mt-4">
            <button className="btn-primary mr-2" type="submit">
              Save Info
            </button>

            <button className="btn-clear" type="button" onClick={() => {}}>
              Cancel
            </button>
          </div>
        </form>

        <section className="w-3/5 flex justify-center items-center">
          {showSuccessMsg && (
            <p className="sub-heading text-blue">
              Thanks for submitting your request! 🥳
            </p>
          )}
        </section>
      </section>
    </>
  );
};

export default SuggestImprovement;
