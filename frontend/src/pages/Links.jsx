import {
  Copy,
  ToggleLeft,
  Keyboard,
  Link as LinkIcon,
  Scissors,
} from "lucide-react";

import { useEffect, useState } from "react";
import LinkContainer from "../components/LinksContainer";
import axios from "axios";
import toast from "react-hot-toast";

const Links = ({ linksRef, fetchLinks, links }) => {

  const [isCopied, setIsCopied] = useState(false);

  //Deleting url from database
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/url/${id}`);
      fetchLinks();
      toast.success(`Url deleted successfully`, {
        style: {
          borderRadius: "20px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      toast.error("Something went wrong, please try after some time.");
      console.log(error);
    }
  };

  //Copy the recent made link
  const handleCopyRecent = async () => {
    if (!links.length) {
     return toast.error("Please create a url to copy!")
    }
    console.log(`${window.location.href}${links[0].shortCode}`)
    await navigator.clipboard.writeText(`${window.location.href}${links[0].shortCode}`);
  };

  

  return (
    <main ref={linksRef} className="min-h-[calc(100vh-60px)] bg-[#fafbff]">
      <div className="mx-auto max-w-212.5 px-4 py-7">
        {/* ================= PAGE HEADER ================= */}
        <header className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-[19px] font-bold tracking-tight text-slate-900">
              Created URLs
            </h1>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#eeecff] px-1.5 font-mono text-[10px] font-semibold text-[#5146e5]">
              {links.length}
            </span>

            <span className="text-slate-300">•</span>

            <span className="font-mono text-[11px] text-slate-500">
              Real-time sync
            </span>
          </div>

          {/* Header actions */}
          <div className="hidden items-center gap-2 sm:flex">
            <button
              onClick={handleCopyRecent}
              className="
                flex
                h-8
                items-center
                gap-2
                rounded-md
                border
                border-slate-200
                bg-white
                px-3
                font-mono
                text-[11px]
                text-slate-500
                transition
                hover:border-slate-300
                hover:text-slate-800
              "
            >
              <Copy size={13} />
              Copy recent
            </button>

            <button
              className="
                flex
                h-8
                items-center
                gap-2
                rounded-md
                border
                border-slate-200
                bg-white
                px-3
                font-mono
                text-[11px]
                text-slate-500
                transition
                hover:border-slate-300
                hover:text-slate-800
              "
            >
              <ToggleLeft size={15} />
              Toggle state
            </button>
          </div>
        </header>

        {/* ================= LINKS ================= */}
        <div className="space-y-3">
          {links.map((link) => (
            <LinkContainer key={link._id} link={link} onDelete={handleDelete} fetchLinks={fetchLinks}/>
          ))}
        </div>

        {/* Empty state */}
        {links.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-500">
              <LinkIcon size={18} />
            </div>

            <h2 className="mt-4 text-sm font-semibold text-slate-800">
              No shortened links yet
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Your created URLs will appear here.
            </p>
          </div>
        )}

        {/* ================= COMMAND SHORTCUTS ================= */}
        <div className="mt-8 flex min-h-13 items-center justify-between rounded-xl border border-slate-200 bg-white px-4">
          <div className="flex items-center gap-2">
            <Keyboard size={14} className="text-[#5146e5]" />

            <span className="text-[12px] font-semibold text-slate-800">
              Command shortcuts
            </span>
          </div>

          <div className="hidden items-center gap-5 sm:flex">
            <Shortcut keyName="↵" label="Shorten" />

            <Shortcut keyName="C" label="Copy top link" />

            <Shortcut keyName="Esc" label="Clear" />
          </div>
        </div>
      </div>
    </main>
  );
};

const Shortcut = ({ keyName, label }) => {
  return (
    <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-500">
      <span
        className="
          flex
          h-6
          min-w-6
          items-center
          justify-center
          rounded
          border
          border-slate-200
          bg-slate-50
          px-1.5
          font-semibold
          text-slate-600
        "
      >
        {keyName}
      </span>

      <span>{label}</span>
    </div>
  );
};

export default Links;
