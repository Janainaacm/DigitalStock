
const LoadingPage = () => {

    return (
        <div className="h-full w-full flex items-center justify-center">
          <div
            className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          ></div>
          <p className="ml-3">Loading...</p>
        </div>
      );
}
export default LoadingPage;