import Selector from '../TableAdvancedV2/Selector';

const FloatingFilter = (props) => {
  return (
    <Selector
      gridApi={props.api}
      pageSize={props.api.paginationProxy.pageSize}
    />
  );
};

export default FloatingFilter;
