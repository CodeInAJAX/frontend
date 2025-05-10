import { useState } from "react";
import iconPaste from "../assets/iconPaste.png";
import iconChecklist from "../assets/iconChecklist.svg"
export default function CopyPasteBox() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("FOKUSCODING");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mb-4">
      <div className="bg-white border-2 border-dashed border-[#D1D5DB] text-sm px-3 py-2 inline-block rounded text-[#6B7280]">
        <div className="flex gap-4 items-center">
          <strong>FOKUSCODING</strong>
          <button onClick={handleCopy} className="hover:opacity-75 active:scale-95 transition cursor-pointer">
            <img src={copied ? iconChecklist : iconPaste } alt="icon" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
