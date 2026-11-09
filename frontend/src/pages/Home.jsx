import { Zap, ShieldCheck, Code2 } from "lucide-react";
import ShortenerInput from "../utils/ShortnerInput";

const Home = ({inputRef, fetchLinks}) => {
  return (
    <main className="min-h-[calc(100vh-70px)] bg-[#fafbff]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Dotted background */}
        <div
          className="
            pointer-events-none
            absolute inset-0
            opacity-60
            bg-[radial-gradient(#cbd5e1_0.8px,transparent_0.8px)]
            bg-size-[24px_24px]
          "
        />

        {/* Subtle bottom fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-[#fafbff] to-transparent" />

        <div className="relative mx-auto max-w-276.25 px-4">
          <div className="flex min-h-117 flex-col justify-center">
            {/* Eyebrow */}
            <div className="mb-7">
              <span
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-indigo-300
                  bg-indigo-50/70
                  px-3
                  py-1.5
                  font-mono
                  text-[12px]
                  font-medium
                  tracking-wide
                  text-indigo-600
                "
              >
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                Hyper-Performance Edge Shortener
                <span className="text-indigo-300">•</span>
                <span className="text-slate-500">v2.4 Core Engine</span>
              </span>
            </div>

            {/* Heading */}
            <h1
              className="
                max-w-155
                text-[58px]
                font-black
                leading-[1.05]
                tracking-[-2.8px]
                text-[#111827]
                sm:text-[64px]
              "
            >
              Shorter links,
              <br />
              <span className="text-[#5146e5]">instant routing.</span>
            </h1>

            {/* Description */}
            <p
              className="
                mt-7
                max-w-170
                text-[19px]
                font-normal
                leading-[1.8]
                tracking-[-0.2px]
                text-[#58708f]
              "
            >
              Transform long, messy endpoints into high-throughput branded short
              links with global sub-10ms edge latency and deep telemetry. Built
              for engineers and fast-growing teams.
            </p>

            {/* Feature highlights */}
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Feature
                icon={<Zap size={14} strokeWidth={2.5} />}
                text="Anycast HTTP/3"
              />

              <span className="text-xs text-slate-300">•</span>

              <Feature
                icon={<ShieldCheck size={14} strokeWidth={2.5} />}
                text="Zero Tracking Bloat"
              />

              <span className="text-xs text-slate-300">•</span>

              <Feature
                icon={<Code2 size={14} strokeWidth={2.5} />}
                text="Full REST API"
              />
            </div>
          </div>
        <ShortenerInput inputRef={inputRef} fetchLinks={fetchLinks}/>
        </div>
      </section>
    </main>
  );
};

const Feature = ({ icon, text }) => {
  return (
    <div className="flex items-center gap-2 font-mono text-[12px] font-medium text-[#52698a]">
      <span className="text-[#5146e5]">{icon}</span>

      <span>{text}</span>
    </div>
  );
};

export default Home;
