type Props = {
  extraClass?: string;
};

const EarphoneIcon = ({ extraClass }: Props) => (
  <svg
    className={`inline-block ${extraClass}`}
    viewBox="0 0 24 24"
    fill="none"
    width="20px"
    height="20px"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
);

export default EarphoneIcon;
