import Skeleton from 'react-loading-skeleton';

const Wrapper = ({ children }) => <div className="mb-3">{children}</div>;

const Empty = ({ isLoading }) => (
  <>
    {isLoading ? (
      <>
        <Skeleton height={48} wrapper={Wrapper} />
        <Skeleton count={10} height={24} wrapper={Wrapper} />
      </>
    ) : (
      <div className="flex flex-1 h-full justify-center items-center">
        <p className="sub-heading">No data to display</p>
      </div>
    )}
  </>
);

export default Empty;
