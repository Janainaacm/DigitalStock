type Props = {
  extraClass?: string;
};

const WatchIcon = ({ extraClass }: Props) => (
  <svg
    className={`inline-block ${extraClass}`}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" />
    <rect x="6" y="6" width="12" height="12" rx="3" />
    <path d="M9 18v3h6v-3" />
    <path d="M9 6v-3h6v3" />
  </svg>
);

export default WatchIcon;
