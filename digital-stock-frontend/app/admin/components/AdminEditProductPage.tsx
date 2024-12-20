type Props = {
  onProducts: () => void;
};

const EditProductPage = ({onProducts}: Props) => {
  return (
    <>
      <div className="p-6">
        <div className="flex justify-between">
          <h1 className="text-xl text-gray-700">
            <svg
              className="h-5 w-5 text-gray-900"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1="3" y1="21" x2="21" y2="21" />
              <path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4" />
              <path d="M5 21v-10.15" /> <path d="M19 21v-10.15" />
              <path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" />
            </svg>
            Add new product
          </h1>
          <button
          className="text-gray-700 text-md px-12 py-2 bg-blue-400"
          >
            <svg
              className="h-5 w-5 text-gray-700"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <path d="M5 12l5 5l10 -10" />
            </svg>
             Add new product
          </button>
        </div>
      </div>
    </>
  );
};
export default EditProductPage;
