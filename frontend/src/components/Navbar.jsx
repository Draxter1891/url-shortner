import {
  Link2,
  Moon,
} from "lucide-react";

const Navbar = ({scrollToLinks, scrollToInput}) => {
  return (
    <nav className="w-full border-b border-slate-100 bg-white">
      <div className="mx-auto flex h-15 px-4 items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#eeecff]">
            <Link2
              size={16}
              strokeWidth={2.5}
              className="text-[#5146e5]"
            />
          </div>

          <span className="text-[15px] font-bold tracking-tight text-slate-900">
            Linko<span className="text-[#5146e5]">.link</span>
          </span>
        </a>

        {/* Navigation */}
        <div className="flex items-center gap-12 rounded-lg select-none">
          <p onClick={()=>scrollToInput()} className="font-bold text-sm cursor-pointer active:text-zinc-950 text-zinc-600 transition-all duration-150 ease-in">Shorten</p>
          <p  onClick={()=>scrollToLinks()} className="font-bold text-sm cursor-pointer active:text-zinc-950 text-zinc-600 transition-all duration-150 ease-in">Links</p>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">

          {/* Status */}
          <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-medium text-slate-500 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />

            <span>99.99% Edge</span>

            <span className="text-slate-400">Latency &lt;8ms</span>
          </div>

          {/* Dashboard */}
          <button
          onClick={()=>scrollToLinks()}
            type="button"
            className="h-8 rounded-md bg-[#5146e5] px-4 text-[12px] font-semibold text-white transition hover:bg-[#4539d3] cursor-pointer"
          >
            Dashboard
          </button>

        </div>
      </div>
    </nav>
  );
};



export default Navbar;