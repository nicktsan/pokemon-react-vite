import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function PokeSearchBar() {
    const navigate = useNavigate();
    // inputValue updates on every keystroke
    const [inputValue, setInputValue] = useState("");
    // searchName gets updated after debouncing (300ms)
    const [searchName, setSearchName] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => {
            setSearchName(inputValue);
        }, 300);
        return () => clearTimeout(handler);
    }, [inputValue]);
    return (
        <div>
            <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter" && inputValue.trim() !== "") {
                    navigate(`/search/${inputValue}`);
                }
            }}
            placeholder="Enter Pokemon name"
            />
            <button onClick={() => navigate(`/search/${inputValue}`)}>Search</button>
        </div>
    );
}

export default PokeSearchBar;
