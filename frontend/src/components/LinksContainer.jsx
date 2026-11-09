import {
  Link2,
  Copy,
  Pencil,
  Trash2,
  Check,
  X,
  ExternalLink,
  MousePointer2,
} from "lucide-react";
import { memo, useEffect, useState } from "react";
import toast from "react-hot-toast";

const LinkContainer = ({ link, onDelete, fetchLinks }) => {
  const [destination, setDestination] = useState(link.originalUrl);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setDestination(link.originalUrl);
  }, [link.originalUrl]);

  //Created at time formating
  const formatRelativeTime = (createdAt) => {
    const createdTime = new Date(createdAt);
    const now = new Date();

    const difference = now - createdTime;

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return "Just now";
    }

    if (minutes < 60) {
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    }

    if (hours < 24) {
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    }

    return `${days} ${days === 1 ? "day" : "days"} ago`;
  };

  //Copy the link
  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      `http://localhost:3000/${link.shortCode}`,
    );
    setCopied(true);

    toast.success("Link copied to clipboard");
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  //Redirecting to link
  const handleClick = () => {
    window.open(
      `http://localhost:3000/${link.shortCode}`,
      "_blank",
      "noopener",
      "noreferrer",
    );
    fetchLinks();
  };
  return (
    <div
      key={link._id}
      className={`
        rounded-xl
        border
        bg-white
        p-4
        transition-all
        duration-200
        border-slate-200 shadow-[0_2px_5px_rgba(15,23,42,0.04)]
      `}
    >
      {/* ================= HEADER ================= */}
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div
          className={`
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-lg
            bg-[#eeecff] text-[#5146e5]
          `}
        >
          <Link2 size={15} />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          {/* Short URL + badge */}
          <div className="flex flex-wrap items-center gap-2">
            <p
              onClick={handleClick}
              className="font-mono text-[14px] font-semibold text-[#5146e5] cursor-pointer hover:underline"
            >
              min.link/{link.shortCode}
            </p>

            <span className="text-slate-400">↗</span>
          </div>

          {/* Destination */}

          <p className="mt-1 truncate text-[13px] text-[#637896]">
            {link.originalUrl}
          </p>

          {/* Metadata */}

          <div className="mt-2 flex flex-wrap items-center gap-2 font-mono text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <MousePointer2 size={11} />
              {link.clicks.toLocaleString()} clicks
            </span>

            <span>•</span>

            <span>Created {formatRelativeTime(link.createdAt)}</span>
          </div>
        </div>

        {/* ================= ACTIONS ================= */}

        <div className="flex shrink-0 items-center gap-1">
          <button
            onClick={handleCopy}
            className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-md
                text-slate-500
                transition
                hover:bg-slate-50
                hover:text-slate-800
              "
            title="Copy"
          >
            {copied ? (
              <Check size={16} className="text-indigo-500" />
            ) : (
              <Copy size={16} />
            )}
          </button>

          <button
            onClick={() => onDelete(link._id)}
            className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-md
                text-slate-500
                transition
                hover:bg-red-50
                hover:text-red-500
              "
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(LinkContainer);
