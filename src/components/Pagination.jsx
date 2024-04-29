/* eslint-disable react/prop-types */
export default function Pagination({
  currentPage,
  totalPages,
  handlePagination,
  goToPage,
  currentPageInput,
  setCurrentPageInput,
}) {
  return (
    <>
      <div className="my-auto text-black font-bold font-mono mt-2">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePagination(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-red-500 hover:bg-red-600 text-white font-bold font-mono py-2 px-4 rounded-lg mr-2"
        >
          Previous
        </button>
        <button
          onClick={() => handlePagination(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-red-500 hover:bg-red-600 text-white font-bold font-mono py-2 px-4 rounded-lg"
        >
          Next
        </button>
      </div>

      <div className="flex justify-center mt-3">
        <button
          onClick={goToPage}
          className="bg-red-500 hover:bg-red-600 text-white font-bold font-mono py-2 px-4 rounded-lg"
        >
          Go to Page
        </button>
        <input
          type="number"
          value={currentPageInput}
          onChange={(e) => setCurrentPageInput(e.target.value)}
          className="ml-2 px-1 py-1 border-2 border-red-500 rounded-lg focus:outline-none focus:border-red-600"
          min="1"
          max={totalPages}
          placeholder={`${currentPage}/${totalPages}`}
        />
      </div>
    </>
  );
}
