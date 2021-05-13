import Loading from 'components/Loading';

const LoadingOverlay = () => (
  <div className="w-full h-full flex place-items-center bg-white bg-opacity-75">
    <Loading containerClassName="h-full" />
  </div>
);

export default LoadingOverlay;
