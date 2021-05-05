// @ts-nocheck
import { useAtom } from 'jotai';
import { startProgramDetails } from 'rt-store';

const Confirmation = () => {
  // eslint-disable-next-line no-unused-vars
  const [programDetails] = useAtom(startProgramDetails);

  return (
    <>
      <p className="headline my-12">Thanks for this information!</p>
      <section className="w-4/5">
        <p>
          You’ll be receiving a follow-up email from our team to talk more about
          your program specifics. In the mean time, please review the
          information below and reach out to email@email.com with any questions.
        </p>
        <p className="font-bold mt-6">CLIA waivers</p>
        <p>
          CLIA waivers are issued in varying capacities depending on each
          state’s policy. A CLIA waiver allows the operating school to conduct
          and report tests in compliance with state and federal policy. CLIA
          waivers are not frequently owned by schools or other non-health
          organizations, so there can be some complications in obtaining these
          waivers. It’s recommended that there’s a scalable plan for providing
          CLIA waivers to all schools or organizations who will be participating
          in the program. For more information on obtaining CLIA waivers, click
          here.
        </p>
        <p className="font-bold mt-6">Key Roles to involve now</p>
        <p>
          Each program requires experts to own various parts of the process.
          It’s important to involve these team members at this stage in order to
          set this program up for success. The key roles to involve and invite
          to the kickoff meeting are the following: On-the-ground operations ELR
          reporting Any supporting Doctors State or Local Health authorities
        </p>

        <p className="my-6">
          To read more about making a program successful, click here to review
          our full training materials.
        </p>
      </section>
      <section className="join-form w-3/5 mb-12">
        <p className="sub-heading text-xl mb-6">Personal information</p>
        <p className="font-bold">
          {programDetails.lastName}, {programDetails.firstName}
        </p>
        <p>{programDetails.email}</p>
        <p className="sub-heading text-xl my-6">Do you have tests?</p>
        <p>{programDetails.hasTests === 'false' ? 'No' : 'Yes'}</p>

        <p className="sub-heading text-xl my-6">
          Are you a member of state or local health authority?
        </p>
        <p>{programDetails.isLocalAuthority === 'false' ? 'No' : 'Yes'}</p>

        <p className="sub-heading text-xl my-6">
          How many tests does your program plan on doing per day?
        </p>
        <p>{programDetails.testsPerDay}</p>
      </section>
    </>
  );
};

export default Confirmation;
