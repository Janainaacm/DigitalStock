import SearchIcon from "@/public/icons/SearchIcon";

interface Props {
    onOpen: () => void;
}

const SearchIconButton = ({onOpen}: Props) => {

    return (
        <button
        className="cursor-pointer"
        onClick={onOpen}
        >
            <SearchIcon/>
        </button>

    );
}
export default SearchIconButton;