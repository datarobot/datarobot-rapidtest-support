// @ts-nocheck

import { useForm } from 'react-hook-form';
import { useAtom } from 'jotai';
import { ControlledInput } from 'components/Input';

import PageHeader from 'components/PageHeader';

import { signIn } from 'services/firebase';
import { userAtom } from 'store';

const LogIn = ({ location, history }) => {
  const { handleSubmit, register, errors } = useForm();
  const [, setUserInfo] = useAtom(userAtom);
  const onSubmit = ({ username, password }) => {
    signIn(username, password).then((info) => {
      setUserInfo(info);
      if (location?.state?.from) {
        history.push(location.state.from);
      } else {
        history.push('/');
      }
    });
  };

  return (
    <>
      <PageHeader headline="Log In" />
      <form onSubmit={handleSubmit(onSubmit)} className="w-2/5">
        <ControlledInput
          label="Email"
          name="username"
          ref={register}
          autoFocus
        />
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
    </>
  );
};

export default LogIn;
