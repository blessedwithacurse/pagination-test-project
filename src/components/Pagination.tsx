import classnames from 'classnames'
import { usePagination, DOTS } from './usePagination'
import '../styles/Pagination.scss'

interface Props {
  totalCount: number;
  onPageChange: (page: number | string) => void
  siblingCount?: number
  currentPage: number
  pageSize: number
  className: string
}
const Pagination = (props: Props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <div
      className={classnames('pagination-container', { [className]: className })}
    >
      <span
        className={classnames('pagination-item', {
          disabled: currentPage === 1
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </span>
      {paginationRange?.map(pageNumber => {
         
        if (pageNumber === DOTS) {
          return <span className="pagination-item dots">&#8230;</span>;
        }
		
        return (
          <span
            key={pageNumber} 
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </span>
        );
      })}
      <span
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </span>
    </div>
  );
};

export default Pagination;