// import { LANDING_PAGE_LINKS } from 'rt-constants';

import './HomeV2.css';
import Button from '../../components/Button';

const HomeV2 = () => {
  // const { TESTING_OTHERS, GETTING_TESTED } = LANDING_PAGE_LINKS;

  return (
    <div className="HomeV2">
      <section className="flex py-8">
        <div className="w-1/2">
          <div className="badge">Testing program at K-12 schools</div>
          <h1>Keep students and teachers safe</h1>
          <Button className="mt-4" v2 primary>
            Join a Program
          </Button>
        </div>
        <div className="w-1/2 text-center">[picture]</div>
      </section>
      <section className="flex py-8">
        <div className="w-1/2 text-center">[picture]</div>
        <div className="w-1/2">
          <div className="badge">About RAPIDTEST</div>
          <h1 className="mb-4">Why it’s important</h1>
          <p>
            As the COVID-19 pandemic continues, finding ways to safely reopen
            schools for in-person learning is a pressing need. Schools provide a
            critical outlet for children through education, safety, nutrition,
            behavioral health care and important social interaction.
          </p>
        </div>
      </section>
      <section className="flex py-8">
        <div className="w-1/2">
          <div className="badge">PLAYBOOK</div>
          <h1 className="mb-4">Training materials</h1>
          <p>
            The information found in the training materials will outline the
            steps required to successfully develop an application-supported
            testing program at K-12 schools that keeps teachers and children
            safe.
          </p>
          <Button className="mt-4" v2 primary>
            View guide
          </Button>
        </div>
        <div className="w-1/2 text-center">[picture]</div>
      </section>
      <section className="py-8 w-full text-center">
        <div className="badge">ONSITE TESTING GUIDANCE</div>
        <h1 className="mb-4">How it works</h1>
        <p>
          Conducting rapid COVID-19 antigen tests at schools for assurance and
          symptom-induced testing is a cost effective, easy, and reliable way to
          ensure student and staff safety.
        </p>
      </section>
      <section className="flex p-8 w-full inverted rounded-xl">
        <div className="w-1/2 text-center">[picture]</div>
        <div className="w-1/2">
          <div className="badge">PLAYBOOK</div>
          <h1 className="mb-4">Training materials</h1>
          <p>
            The information found in the training materials will outline the
            steps required to successfully develop an application-supported
            testing program at K-12 schools that keeps teachers and children
            safe.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomeV2;
