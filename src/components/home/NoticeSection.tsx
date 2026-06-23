import React from 'react';

const notices = [
  { id: 1, day: '22', month: 'JUN', title: 'Admissions Open for Session 2026-27' },
  { id: 2, day: '22', month: 'JUN', title: 'Admissions Open for Session 2026-27' },
  { id: 3, day: '22', month: 'JUN', title: 'Admissions Open for Session 2026-27' },
  { id: 4, day: '22', month: 'JUN', title: 'Admissions Open for Session 2026-27' },
];

export default function BoardNotices() {
  return (
    <section className="w-full bg-slate-50 py-20 px-6 flex justify-center font-sans">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-between gap-16">
        
        {/* Left Typography - Modern Sans-serif with Gradient */}
        <div className="flex flex-col text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05]">
          <span className="text-slate-900">OFFICIAL</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-400">
            BOARD
          </span>
          <span className="text-slate-900">NOTICES</span>
          <p className="text-slate-500 text-base font-medium mt-6 max-w-sm tracking-normal">
            Stay updated with our latest campus announcements and schedules.
          </p>
        </div>

        {/* Right List - Sleek Interactive Cards */}
        <div className="flex flex-col w-full lg:w-[550px] gap-4">
          {notices.map((notice) => (
            <div 
              key={notice.id} 
              className="group flex items-center bg-white p-3 pr-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-100 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              {/* Date Box */}
              <div className="flex flex-col items-center justify-center bg-emerald-50 rounded-xl p-3 min-w-[70px]">
                <span className="text-2xl font-black text-emerald-600 leading-none">{notice.day}</span>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-1">{notice.month}</span>
              </div>
              
              {/* Title */}
              <p className="ml-5 text-slate-700 font-medium text-sm group-hover:text-emerald-600 transition-colors">
                {notice.title}
              </p>
            </div>
          ))}
          
          {/* Modern Button */}
          <button className="mt-4 w-fit bg-slate-900 text-white px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-emerald-500 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25">
            View All Notices
          </button>
        </div>

      </div>
    </section>
  );
}