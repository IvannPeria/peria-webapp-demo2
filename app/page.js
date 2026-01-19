"use client";
import { useState, useEffect } from "react";

/** Simple Copyable Code Block */
const CodeBlock = ({ children }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    const textToCopy = children.props?.children || children;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 bg-purple-700 text-white px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 transition"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      {children}
    </div>
  );
};

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    document.title = "Tailwind UI Playground";

    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress(scrollTop / height);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Playground state
  const [bgColor, setBgColor] = useState("bg-cyan-500");
  const [rounding, setRounding] = useState("rounded-lg");
  const [shadow, setShadow] = useState("shadow-xl shadow-cyan-300/50");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100 selection:bg-purple-500 selection:text-black">
      
      {/* Scroll Progress */}
      <div
        className="fixed top-0 left-0 h-1 bg-purple-500 z-50"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-gray-900/70 border-b border-gray-800 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold text-purple-400">Tailwind UI Playground</h1>
          <nav className="space-x-4 hidden md:flex text-gray-300">
            <a href="#intro" className="hover:text-purple-300 transition">Intro</a>
            <a href="#playground" className="hover:text-purple-300 transition">Playground</a>
            <a href="#utilities" className="hover:text-purple-300 transition">Utilities</a>
            <a href="#examples" className="hover:text-purple-300 transition">Components</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="intro" className="text-center py-24 px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
          Build Stunning UI<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400">Fast & Interactive</span>
        </h1>
        <p className="text-gray-300 max-w-xl mx-auto text-lg mb-8">
          Explore Tailwind CSS with a live playground, interactive examples, and real-time class changes.
        </p>
      </section>

      {/* Interactive Playground */}
      <section id="playground" className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-gray-900/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-gray-700 space-y-6">
          <h2 className="text-3xl font-bold text-purple-400 mb-4">Playground</h2>
          <p className="text-gray-300 mb-6">Pick classes and watch the box change instantly.</p>

          {/* Controls */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-300 uppercase">Background</h3>
              <div className="flex gap-2 flex-wrap">
                {["bg-cyan-500","bg-purple-500","bg-pink-500","bg-blue-500","bg-green-500"].map(c => (
                  <button
                    key={c}
                    className={`${c} w-8 h-8 rounded-full border-2 ${bgColor === c ? "ring-2 ring-white" : "opacity-70"} transition`}
                    onClick={() => setBgColor(c)}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-300 uppercase">Border Radius</h3>
              <div className="flex gap-2 flex-wrap">
                {["rounded-none","rounded-md","rounded-lg","rounded-full"].map(r => (
                  <button
                    key={r}
                    onClick={() => setRounding(r)}
                    className={`px-3 py-1 text-xs border border-gray-600 rounded ${rounding === r ? "bg-purple-500 text-white" : "text-gray-300"} transition`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-300 uppercase">Shadow</h3>
              <div className="flex gap-2 flex-wrap">
                {[
                  {label:"None", val:"shadow-none"},
                  {label:"Cyan Glow", val:"shadow-lg shadow-cyan-300/50"},
                  {label:"Purple Glow", val:"shadow-2xl shadow-purple-400/50"},
                ].map(s => (
                  <button
                    key={s.val}
                    onClick={() => setShadow(s.val)}
                    className={`px-3 py-1 text-xs border border-gray-600 rounded ${shadow === s.val ? "bg-purple-500 text-white" : "text-gray-300"} transition`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="flex flex-col items-center mt-8">
            <div className={`${bgColor} ${rounding} ${shadow} w-48 h-48 flex items-center justify-center font-bold text-white transition duration-500 rounded-2xl`}>
              Preview
            </div>
            <CodeBlock>
              <div className="bg-black text-green-400 p-3 mt-4 rounded font-mono text-xs border border-gray-700">
                className="{bgColor} {rounding} {shadow}"
              </div>
            </CodeBlock>
          </div>
        </div>
      </section>

      {/* Core Utilities */}
      <section id="utilities" className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-gray-900/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-gray-700 space-y-6">
          <h2 className="text-3xl font-bold text-purple-400 mb-4">Core Utilities</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-300 mb-2">Spacing</h3>
              <div className="flex flex-wrap gap-4">
                <div className="p-4 bg-purple-500 rounded text-white">p-4</div>
                <div className="m-4 p-4 bg-cyan-500 rounded text-white">m-4</div>
                <div className="px-6 py-2 bg-pink-500 rounded text-white">px-6</div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-300 mb-2">Flex</h3>
              <div className="flex justify-between items-center bg-gray-800 p-4 rounded gap-2">
                <div className="bg-purple-400 p-2 rounded text-black">1</div>
                <div className="bg-purple-400 p-2 rounded text-black">2</div>
                <div className="bg-purple-400 p-2 rounded text-black">3</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Example Components */}
      <section id="examples" className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-900/70 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-gray-700 hover:scale-105 transition transform">
            <h3 className="text-purple-400 font-bold text-lg mb-2">Button Example</h3>
            <button className="bg-gradient-to-r from-purple-500 to-cyan-500 px-4 py-2 rounded-lg text-white font-bold hover:scale-105 transition transform">
              Click Me
            </button>
          </div>
          <div className="bg-gray-900/70 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-gray-700 hover:scale-105 transition transform">
            <h3 className="text-purple-400 font-bold text-lg mb-2">Card Example</h3>
            <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-lg text-white">
              Modern Card Component
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900/90 p-12 text-center text-gray-300 border-t border-gray-800">
        <h3 className="text-2xl font-bold text-purple-400 mb-2">Keep Experimenting!</h3>
        <p>Design beautiful UIs fast with Tailwind CSS.</p>
      </footer>
    </div>
  );
}
