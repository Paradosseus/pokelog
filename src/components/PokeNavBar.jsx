import pokelogLogo from "../assets/pokelog-logo.svg";

export const PokeNavBar = (props) => {
    return (
        <>
            <div className="row-span-2 lg:col-span-2 lg:row-span-5 bg-[#FF6F40] border-4 border-black rounded-xl lg:order-1 overflow-hidden">
                <div className="py-4 hidden lg:block">
                    <img src={pokelogLogo} alt="" className="lg:w-[175px] m-auto" />
                </div>
                <div className="hidden lg:block"><input type="text" className="bg-[#2E2E2E] w-full p-2 border-black focus:outline-none text-white placeholder-slate-300" placeholder="Search pokemon..." /></div>
                <div className="grid grid-cols-3 lg:grid-cols-1 gap-4 p-2 overflow-auto scrollbar-hide bg-[#FF6F40] h-[350px] lg:h-screen">
                    {props.pokemons.map((pokemon, index) => {
                        return (
                            <div className="bg-black h-[140px] md:h-[160px] lg:h-[85px] rounded-lg relative" key={index + 1} onClick={() => props.clickedPokemon(index + 1)}>
                                <div className="bg-[#ff5503] text-sm round rounded-tl-lg absolute content top-0 left-0 lg:bottom-0 text-white px-2 md:text-[16px] md:px-[10px] md:py-[2px] lg:flex lg:w-[60px]"><div className="lg:m-auto">{`#${index + 1}`}</div></div>
                                <div className="relative mt-6 lg:mx-auto lg:w-[200px] lg:ml-[65px] lg:mt-[12px]">
                                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} alt="" className="w-[75px] md:w-[90px] m-auto lg:inline-block lg:w-[60px]" />
                                    <p className="capitalize text-center font-bold relative md:text-xl lg:inline-block text-white">{pokemon.name}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}