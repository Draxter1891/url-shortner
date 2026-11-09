import axios from "axios";
import { X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const ShortenerInput = ({ inputRef, fetchLinks }) => {
  const [inputUrl, setInputUrl] = useState("");

  const handleClear = () => {
    setInputUrl("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!inputUrl.trim()) {
        throw new Error("Empty input field");
      }

      const res = await axios.post("http://localhost:5173/api/url", { url: inputUrl });
      toast.success(res.data.message)
      fetchLinks();
      handleClear();
    } catch (error) {
      console.log(error.response?.data.message);
    }
  };

  return (
    <div ref={inputRef} className="mt-7 px-2 py-12">
      <form
        onSubmit={handleSubmit}
        className="
        flex
        h-17.5
        w-2/3
        mx-auto
        items-center
        gap-4
        rounded-xl
        border
        border-slate-200
        bg-white
        px-3
        shadow-[0_2px_8px_rgba(15,23,42,0.06)]
      focus-within:border-indigo-500
        focus-within:ring-2
      focus-within:ring-indigo-100
      "
      >
        {/* Input */}
        <input
          type="url"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="https:// paste-destination-url-here.com/resource/endpoint"
          className="
          min-w-0
          flex-1
          bg-transparent
          px-3
          font-mono
          text-[14px]
          text-slate-700
          outline-none
          placeholder:text-[#a6b1c5]
        "
        />
        {/* Clear */}
        <button
          type="button"
          onClick={handleClear}
          className={`
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-md
            text-slate-400
            transition-opacity
            duration-200
            hover:bg-slate-50
            hover:text-slate-600
            ${
              inputUrl
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }
          `}
          aria-label="Clear URL"
        >
          <X size={17} strokeWidth={1.8} />
        </button>
        {/* Shorten */}
        <button
          type="submit"
          className="
          h-10
          shrink-0
          rounded-lg
          bg-[#5146e5]
          px-6
          text-[13px]
          font-semibold
          text-white
          transition
          hover:bg-[#4539d3]
          active:scale-[0.98]
        "
        >
          Shorten
        </button>
      </form>
    </div>
  );
};

export default ShortenerInput;
