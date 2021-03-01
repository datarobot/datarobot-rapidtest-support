import FileUpload from 'components/FileUpload';
import PageHeader from 'components/PageHeader';
import { isValidSitesList } from 'utils/validate';

const UploadSites = () => (
  <>
    <PageHeader headline="Upload a list of sites" />

    {/* <section className="w-2/5"> */}
    <FileUpload validator={isValidSitesList} />
    {/* </section> */}
  </>
);

export default UploadSites;
