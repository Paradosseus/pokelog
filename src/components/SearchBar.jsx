import { useState } from "react";

export const SearchBar = () => {

    const [searchInput, setSearchInput] = useState("");

    return (
        <><input type="text" className="bg-[#2E2E2E] w-full px-4 py-2 border-black focus:outline-none text-white placeholder-slate-300" placeholder="Search pokemon..." onChange={(e) => setSearchInput(e.target.value)} /></>
    )
}

