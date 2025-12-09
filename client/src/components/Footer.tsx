import { MdOutlineArrowOutward } from "react-icons/md";

export const Footer: React.FC = () => {
  return (
 <footer className="absolute bottom-0 left-0 flex w-screen justify-between h-fit p-2 laptop:px-6 font-sans text-darkRed">
    <a
             href="http://izabellind.com"
             className="relative max-w-1/2 tablet:max-w-full flex gap-2 items-center text-[9px] after:content-[''] after:block after:w-0 after:h-[1px] after:bg-stone-500 after:absolute after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full"
           > <MdOutlineArrowOutward />
             Design & Frontend development 2026 | Izabel Lind - itFlows
           </a>
   <p className="text-[11px] font-body hidden laptop:block">© Hagsätra Collective 2026 | All Rights Reserved</p>
   <p className="text-[10px] font-body laptop:hidden text-end">© Hagsätra Collective 2025</p>
   </footer>
  )
}


