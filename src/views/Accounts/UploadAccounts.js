import FileUpload from 'components/FileUpload';
import PageHeader from 'components/PageHeader';
import { isValidAccountsList } from 'utils/validate';

const UploadSites = () => (
  <>
    <PageHeader headline="Upload a list of accounts" />

    {/* <section className="w-2/5"> */}
    <FileUpload validator={isValidAccountsList} />
    {/* </section> */}
  </>
);

export default UploadSites;
