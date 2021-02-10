import { fireEvent, render } from '../utils/test-utils';

import Pagination from './Pagination';

const paginationData = {
  handleNext: jest.fn(),
  handlePrevious: jest.fn(),
  pageNumber: 5,
};

describe('Pagination', () => {
  it('renders as expected', () => {
    const { container, getAllByRole, getByText } = render(
      <Pagination pageNumber={paginationData.pageNumber} />
    );

    expect(container.firstChild).toMatchSnapshot();
    expect(getByText(paginationData.pageNumber)).toBeTruthy();
    expect(getAllByRole('button')).toHaveLength(2);
    expect(getByText('Next')).toBeTruthy();
    expect(getByText('Previous')).toBeTruthy();
  });

  it('does not render Previous button when pageNumber equals zero', () => {
    const { queryByText } = render(<Pagination pageNumber={0} />);

    expect(queryByText('Previous')).toBeFalsy();
  });

  it('calls handleNext when Next is clicked', () => {
    const { getByText } = render(
      <Pagination
        pageNumber={paginationData.pageNumber}
        handleNext={paginationData.handleNext}
        handlePrevious={paginationData.handlePrevious}
      />
    );

    const node = getByText('Next');

    fireEvent.click(node);

    expect(paginationData.handleNext).toHaveBeenCalled();
    expect(paginationData.handlePrevious).not.toHaveBeenCalled();
  });

  it('calls handleNext when Previous is clicked', () => {
    const { getByText } = render(
      <Pagination
        pageNumber={paginationData.pageNumber}
        handleNext={paginationData.handleNext}
        handlePrevious={paginationData.handlePrevious}
      />
    );

    const node = getByText('Previous');

    fireEvent.click(node);

    expect(paginationData.handleNext).not.toHaveBeenCalled();
    expect(paginationData.handlePrevious).toHaveBeenCalled();
  });
});
