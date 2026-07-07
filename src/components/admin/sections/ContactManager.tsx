'use client';

import React, { useState } from "react";
import { Mail, Trash2, Eye, Reply } from "lucide-react";

export default function ContactManager() {
  const [messages, setMessages] = useState([
    { id: 1, name: "Rahul Sharma", email: "rahul@example.com", phone: "9876543210", subject: "Admission Inquiry", date: "June 18, 2026", msg: "I want to know the fee structure for Class XI Science.", read: false },
    { id: 2, name: "Priya Singh", email: "priya.s@example.com", phone: "9988776655", subject: "Job Application", date: "June 17, 2026", msg: "I have attached my resume for the English Teacher position.", read: true },
  ]);

  return (
    <div className="space-y-6 text-slate-800">
      <div className="flex justify-between items-center">
        <h2 className="text-xl sm:text-2xl font-semibold font-serif text-slate-900">Contact Inquiries Inbox</h2>
      </div>

      <div className="space-y-3">
        {messages.map((m) => (
          <div key={m.id} className={`bg-white border rounded-xl p-4 sm:p-5 flex flex-col gap-3 transition shadow-sm ${m.read ? "border-slate-200" : "border-brand-green/30 bg-emerald-50/20"}`}>
            <div className="flex justify-between items-start gap-4">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full mt-1 ${m.read ? "bg-slate-100 text-slate-400" : "bg-brand-green text-white"}`}>
                  <Mail size={16} />
                </div>
                <div>
                  <h3 className={`text-sm font-semibold ${m.read ? "text-slate-700" : "text-slate-900"}`}>{m.subject}</h3>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">{m.name} ({m.email}) • {m.phone}</p>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase shrink-0">{m.date}</span>
            </div>
            <div className="pl-11 pr-4 text-sm text-slate-600 font-medium">
              "{m.msg}"
            </div>
            <div className="pl-11 flex gap-2 mt-2">
              <button className="text-xs font-semibold text-brand-green hover:text-white border border-brand-green hover:bg-brand-green transition px-3 py-1.5 rounded-lg flex items-center gap-1.5 bg-transparent cursor-pointer">
                <Reply size={14} /> Reply
              </button>
              <button onClick={() => setMessages(messages.map(msg => msg.id === m.id ? { ...msg, read: !msg.read } : msg))} className="text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-100 transition px-3 py-1.5 rounded-lg flex items-center gap-1.5 bg-transparent cursor-pointer">
                <Eye size={14} /> {m.read ? "Mark Unread" : "Mark Read"}
              </button>
              <button onClick={() => setMessages(messages.filter(msg => msg.id !== m.id))} className="text-xs font-semibold text-rose-600 hover:text-white border border-rose-200 hover:bg-rose-500 hover:border-rose-500 transition px-3 py-1.5 rounded-lg flex items-center gap-1.5 bg-transparent cursor-pointer ml-auto">
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
