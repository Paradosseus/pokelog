import pokelogLogo from "../assets/pokelog-logo.svg";
import { useState } from "react";
import { motion } from "framer-motion";
export const PokeNavBar = (props) => {
    const [searchInput, setSearchInput] = useState("");

    console.log(searchInput)
    return (
        <>
            <div className="row-span-2 lg:col-span-2 lg:row-span-5 bg-[#FF6F40] border-4 border-black rounded-xl lg:order-1 overflow-hidden">
                <div className="py-4 hidden lg:block">
                    <img src={pokelogLogo} alt="" className="lg:w-[175px] m-auto" />
                </div>
                <div className="w-full"><input type="text" className="bg-[#2E2E2E] w-full px-4 py-2 border-black focus:outline-none text-white placeholder-slate-300" placeholder="Search pokemon..." onChange={(e) => setSearchInput(e.target.value)} /></div>
                <ul className="grid lg:block grid-cols-3 lg:grid-cols-none gap-[4px] p-2 overflow-scroll scrollbar-hide bg-[#FF6F40] h-[250px] lg:h-[610px]">
                    {props.pokemons.filter((pokemon, index) => {
                        return searchInput.toLowerCase() === '' ? pokemon : pokemon.name.toLowerCase().includes(searchInput)
                    }).map((pokemon, index) => {
                        return (
                            <li className="bg-black h-[140px] md:h-[160px] lg:h-[64px] rounded-xl relative cursor-pointer" key={pokemon.id} onClick={() => props.clickedPokemon(pokemon.id)}>
                                <div className="bg-[#ff5503] text-sm round lg:rounded-l-lg rounded-tl-lg absolute content top-0 left-0 lg:bottom-0 text-white px-2 md:text-[16px] md:px-[10px] md:py-[2px] lg:flex lg:w-[60px]"><div className="lg:m-auto">{`#${pokemon.id}`}</div></div>
                                <div className="relative mt-6 lg:mx-auto lg:w-[200px] lg:ml-[65px] lg:mt-[12px]">
                                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt="" className="w-[75px] md:w-[90px] m-auto lg:inline-block lg:w-[60px]" />
                                    <p className="capitalize text-center font-bold relative md:text-xl lg:inline-block text-white">{pokemon.name}</p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}