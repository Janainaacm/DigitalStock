const UploadIcon = ({extraclass = ""}) => {
  return (
    <svg
      className="h-5 w-5"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {" "}
      <path stroke="none" d="M0 0h24v24H0z" />{" "}
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />{" "}
      <polyline points="7 9 12 4 17 9" />{" "}
      <line x1="12" y1="4" x2="12" y2="16" />
    </svg>
  );
};
export default UploadIcon;
