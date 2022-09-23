
export default function CardDesafio() {
    return (
        <div className="m-6 bg-zinc-700 w-72  text-white rounded-[14px] shadow-lg shadow-black/30">
            <div className="relative">
                <img className="rounded-t-[14px]  " src="../../../public/imgDesafio.jpg" alt="" />
                <img className="absolute bottom-3 right-3" src="../../../easyDifficulty.svg" alt="" />

            </div>
            <div className="flex flex-col py-6 px-6 gap-4 items-start ">
                <span className="text-lg">Expenses chart component</span>
                <span className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam a leo ac libero placerat viverra. In sed neque vel purus.</span>

                <div className="px-6 py-1 border border-yellow-300 rounded-3xl ">
                   <p className="text-yellow-300">JS</p> 
                </div>
            </div>
        </div>
    )
}