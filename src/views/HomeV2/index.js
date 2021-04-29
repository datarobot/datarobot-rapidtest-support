import { Link } from 'react-router-dom';

import HomePageCard from 'components/HomePageCard';

import { LANDING_PAGE_LINKS, ROUTES } from 'rt-constants';

import gettingTested from 'assets/images/getting-tested.svg';
import testingOthers from 'assets/images/testing-others.svg';

import './HomeV2.css';

const HomeV2 = () => {
  const { TESTING_OTHERS, GETTING_TESTED } = LANDING_PAGE_LINKS;

  return (
    <>
      <div className="hero flex mt-12">
        <section className="w-3/5 flex flex-col content-between items-between justify-between">
          <h1 className="headline text-blue">
            Testing program at K-12 schools that keeps teachers and children
            safe
          </h1>

          <p className="my-6 text-lg">
            Reopen your schools. Rollout a COVID-19 testing program using
            RapidTest and send reports to the relevant health authorities.
          </p>

          <div className="btn-row my-6">
            <Link
              to={ROUTES.JOIN.path}
              className="btn-primary mr-6 py-3"
              role="button"
            >
              Join an existing program
            </Link>
            <Link
              to={ROUTES.JOIN.path}
              className="btn-clear py-3"
              role="button"
            >
              Learn how to start a program in your state
            </Link>
          </div>
        </section>
      </div>

      <div className="flex mt-12">
        <HomePageCard
          title="I'm testing others"
          subTitle="Information for health workers and school personnel"
          icon={testingOthers}
          links={TESTING_OTHERS}
        />
        <HomePageCard
          title="I'm getting tested"
          subTitle="Information for Parents and Students"
          icon={gettingTested}
          links={GETTING_TESTED}
        />
      </div>

      <article className="my-12">
        <h3 className="font-bold text-blue text-2xl mb-4">About</h3>
        <section className="two-column">
          As the COVID-19 pandemic continues, finding ways to safely reopen
          schools for in-person learning is a pressing need. Schools provide a
          critical outlet for children through education, safety, nutrition,
          behavioral health care and important social interaction. Incredible
          efforts have been made to transition to virtual learning for education
          continuity, but in-person instruction remains essential for children,
          their families, and communities. Returning children to in-person
          learning environments requires ensuring staff and student safety.
          Conducting rapid COVID-19 antigen tests at schools for assurance and
          symptom-induced testing is a cost effective, easy, and reliable way to
          ensure student and staff safety. Utilizing rapid COVID-19 antigen
          tests requires adherence to state and federal reporting regulations.
          These regulations instruct test administrators to report all test
          results to the relevant health authorities in a timely manner. Schools
          are encouraged to use sponsored technologies that ease administrative
          burdens and comply with reporting requirements. The information found
          in this implementation guide will outline the steps required to
          successfully develop an application-supported testing program at K-12
          schools that keeps teachers and children safe.
        </section>
      </article>
    </>
  );
};

export default HomeV2;
