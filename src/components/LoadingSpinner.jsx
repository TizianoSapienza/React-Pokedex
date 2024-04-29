import PulseLoader from 'react-spinners/ClipLoader';

const override = {
  display: "block",
  margin: "0 auto",
}
function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-full">
      <PulseLoader color="#000" loading={true} cssOverride={override} size={120} />
    </div>
  );
}

export default LoadingSpinner;