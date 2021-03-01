import FileUpload from 'components/FileUpload';
import PageHeader from 'components/PageHeader';

const UploadSites = () => (
  <>
    <PageHeader headline="Upload a list of sites" />

    {/* <section className="w-2/5"> */}
    <FileUpload />
    {/* </section> */}
  </>
);

export default UploadSites;
