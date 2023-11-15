import styled from 'styled-components';
import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const Item = styled.span`
  margin: 0 5px;
  padding: 5px;
  cursor: pointer;
  &.disabled {
    cursor: not-allowed;
    color: #aaa;
  }
  &.selected {
    font-weight: bold;
    color: #333;
  }
  &.dots {
    margin: 0 5px;
  }
`;

const Arrow = styled.span`
  cursor: pointer;
`;

interface Props {
  totalCount: number;
  onPageChange: (page: number | string) => void;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  className: string;
}

const Pagination = (props: Props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage =
    paginationRange && paginationRange[paginationRange.length - 1];

  return (
    <Container className={classnames('pagination-container', { [className]: className })}>
      <Arrow
        className={classnames('pagination-item', {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        &lt;
      </Arrow>
      {paginationRange?.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return <Item key={pageNumber + index} className="pagination-item dots">&#8230;</Item>;
        }

        return (
          <Item
            key={pageNumber}
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </Item>
        );
      })}
      <Arrow
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        &gt;
      </Arrow>
    </Container>
  );
};

export default Pagination;