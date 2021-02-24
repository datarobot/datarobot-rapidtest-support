// @ts-nocheck
// import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { ControlledInput } from 'components/Input';
import Modal from 'components/Modal';

import { signIn } from 'services/firebase';

const LogIn = ({ showModal, handleClose }) => {
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = ({ username, password }) => {
    signIn(username, password).then(() => {
      handleClose();
    });
  };

  return (
    <Modal
      show={showModal}
      handleClose={handleClose}
      title="Log In"
      showFooter={false}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <ControlledInput label="Email" name="username" ref={register} />
        <ControlledInput
          label="Password"
          type="password"
          name="password"
          ref={register}
        />

        <button type="submit" className="btn-primary mt-8">
          Log In
        </button>
      </form>
      {errors && errors.email && <p>ERROR!!!</p>}
    </Modal>
  );
};

export default LogIn;
