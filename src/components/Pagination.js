const Pagination = ({ handleNext, handlePrevious, pageNumber }) => {
  return (
    <div className="flex justify-center space-x-8 my-6">
      {pageNumber === 0 ? null : (
        <button
          className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-28"
          onClick={() => handlePrevious()}
        >
          Previous
        </button>
      )}
      <p className="text-3xl text-center">{pageNumber}</p>
      <button
        className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-28"
        onClick={() => handleNext()}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
