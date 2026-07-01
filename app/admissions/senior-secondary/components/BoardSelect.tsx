"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, Check } from "lucide-react";

interface BoardSelectProps {
  value: string;
  onChange: (value: string) => void;
  errorClass?: string;
}

export default function BoardSelect({ value, onChange, errorClass = "" }: BoardSelectProps) {
  const boards = ["HPBOSE", "CBSE"];
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredBoards = boards.filter(b => b.toLowerCase().includes(search.toLowerCase()));
  const showManualEntry = search.trim().length > 0 && !boards.some(b => b.toLowerCase() === search.trim().toLowerCase());

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div 
        className={`w-full bg-white px-4 py-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${errorClass || "border-slate-200 hover:border-slate-300"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`text-sm font-medium ${value ? "text-slate-700" : "text-slate-400"}`}>
          {value || "Select or enter board"}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden flex flex-col max-h-60">
          <div className="p-3 border-b border-slate-100 flex items-center gap-2 bg-slate-50">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input 
              type="text" 
              placeholder="Search or enter custom board..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-sm outline-none bg-transparent font-medium"
              autoFocus
            />
          </div>
          <div className="overflow-y-auto flex-1 p-1">
            {showManualEntry && (
              <div 
                onClick={() => {
                  onChange(search.trim().toUpperCase());
                  setIsOpen(false);
                  setSearch("");
                }}
                className="w-full px-3 py-2.5 text-sm text-blue-700 hover:bg-blue-50 rounded-lg cursor-pointer flex items-center gap-2 border-b border-slate-100 mb-1"
              >
                <span className="font-bold">Use "{search.trim().toUpperCase()}"</span>
                <span className="text-[10px] font-bold bg-blue-100 px-1.5 py-0.5 rounded text-blue-800">Custom</span>
              </div>
            )}
            
            {filteredBoards.map((board) => (
              <div 
                key={board}
                onClick={() => {
                  onChange(board);
                  setIsOpen(false);
                  setSearch("");
                }}
                className="w-full px-3 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 rounded-lg cursor-pointer flex items-center justify-between transition-colors"
              >
                <span className={value === board ? "font-bold text-emerald-700" : ""}>{board}</span>
                {value === board && <Check className="w-4 h-4 text-[#0fa958]" />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
