// @ts-nocheck
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Icon from 'components/Icon';
import Input from 'components/Input';
import RequestAccountModal from 'components/Modals/RequestAccount';

import './Other.css';

const Other = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  // const [authenticated] = useAtom(authenticatedAtom);

  const handleToggleModal = () => setShowModal(!showModal);

  return (
    <>
      <div>
        <div className="grid grid-cols-2">
          <section>
            <h1 className="text-3xl pt-12 pb-2 font-bold">
              {t('home.welcome')}
            </h1>
            <p>{t('home.subtext')}</p>
          </section>
          <section className="flex items-center pt-12 col-auto">
            <Input
              type="search"
              value=""
              onChange={() => {}}
              placeholder="I’m looking for..."
              className="border-r-0 rounded-l"
            />
            <button className="px-4 py-2 rounded-r bg-blue text-white font-bold border-blue-dark border border-l-0">
              <Icon iconName="search" />
            </button>
          </section>
        </div>

        <div className="cards pt-8 grid grid-cols-3 grid-rows-2 gap-4 auto-rows-max">
          <button
            onClick={handleToggleModal}
            type="button"
            className="card first bg-green col-span-2"
          >
            <p className="text-3xl font-bold pb-4">Request an account</p>
            <p className="max-w-md text-left">
              Sometimes horses cough and fart at the same time, so stay out of
              the range of its butt muscle because a horses butt muscle is
              thick.
            </p>
            <p className="pt-4 font-bold">What's this?</p>
          </button>
          <div className="card bg-red">
            <p className="text-xl font-bold pb-4">Request a program</p>
            <p>
              It's OK to get rib grease on your face, because you're allowing
              people to see that you're proud of these ribs.
            </p>
            <p className="pt-4 font-bold">What's this?</p>
          </div>

          <div className="card bg-orange">
            <p className="text-xl font-bold pb-4">Training Materials</p>
            <p>
              You ever roasted doughnuts? I would like to give you a backstage
              pass to my imagination.
            </p>
            <p className="pt-4 font-bold">What's this?</p>
          </div>
          <div className="card bg-blue-light">
            <p className="text-xl font-bold pb-4">View the FAQ</p>
            <p>You gotta go through it to see there ain't nothing to it.</p>
            <p className="pt-4 font-bold">What's this?</p>
          </div>
          <div className="card bg-blue-grey">
            <p className="text-xl font-bold pb-4">Contact Support</p>
            <p>I wrestled a bear once. A 750lbs black bear.</p>
            <p className="pt-4 font-bold">What's this?</p>
          </div>
        </div>
      </div>

      <RequestAccountModal
        showModal={showModal}
        handleClose={handleToggleModal}
      />
    </>
  );
};

export default Other;
