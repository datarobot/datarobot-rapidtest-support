// @ts-nocheck
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ControlledInput } from 'components/Input';
import { ControlledTextarea } from 'components/Textarea';
import ErrorMessage from 'components/ErrorMessage';
import PageHeaderV2 from 'components/PageHeaderV2';

const SuggestImprovementV2 = () => {
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const { handleSubmit, errors, register } = useForm({
    reValidateMode: 'onChange',
  });
  const { t } = useTranslation();
  // eslint-disable-next-line no-unused-vars
  const onSubmit = (data) => {
    setShowSuccessMsg(true);
  };

  return (
    <>
      <PageHeaderV2 headline="Suggest an improvement" />

      <section className="flex">
        {process.env.REACT_APP_ENABLE_CONTACT_FORM === 'false' ? (
          <section className="w-full flex flex-col place-items-center">
            <h2 className="pt-32 pb-12">Coming Soon</h2>
            <div className="text-lg text-center">
              <p className="pb-4">We're working hard to enable this feature.</p>
              <p>
                In the mean time, you can{' '}
                <a href="mailto:mack.heiser@datarobot.com?subject=rapidtestingapp.org%20Improvement%20Suggestion">
                  email support directly
                </a>
                .
              </p>
            </div>
          </section>
        ) : (
          <>
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

              <div className="btn-row end mt-4">
                <button className="btn-clear" type="button" onClick={() => {}}>
                  Cancel
                </button>

                <button className="btn-primary mr-2" type="submit">
                  Submit
                </button>
              </div>
            </form>

            <section className="w-3/5 flex justify-center items-center">
              {showSuccessMsg && (
                <p className="sub-heading text-blue">
                  Thanks for submitting your request!
                </p>
              )}
            </section>
          </>
        )}
      </section>
    </>
  );
};

export default SuggestImprovementV2;
