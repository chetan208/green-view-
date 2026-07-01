"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Search, Check } from "lucide-react";

const bankData: Record<string, string> = {
	"AXIS BANK": "AXIS",
	"BANK OF AMERICA": "BOA",
	"BANK OF INDIA": "BOI",
	"YES BANK": "YESBANK",
	"THE ANDHRA PRADESH STATE COOPERATIVE BANK LIMITED": "APCOB",
	"THE NASIK MERCHANTS COOPERATIVE BANK LIMITED": "NAMCOBANK",
	"APNA SAHAKARI BANK LIMITED": "APNABANK",
	"AUSTRALIA AND NEW ZEALAND BANKING GROUP LIMITED": "ANZ",
	"CAPITAL SMALL FINANCE BANK LIMITED": "CAPITALBANK",
	"BANK OF MAHARASHTRA": "BOM",
	"JALGAON JANATA SAHAKARI BANK LIMITED": "JJSBL",
	"JANATA SAHAKARI BANK LIMITED": "JANATABANK",
	"KALLAPPANNA AWADE ICHALKARANJI JANATA SAHAKARI BANK LIMITED": "IJSBANK",
	"THE MUMBAI DISTRICT CENTRAL COOPERATIVE BANK LIMITED": "MDCCBANK",
	"PRIME COOPERATIVE BANK LIMITED": "PRIMEBANK",
	"THE THANE BHARAT SAHAKARI BANK LIMITED": "THANEBHARATBANK",
	"THE A.P. MAHESH COOPERATIVE URBAN BANK LIMITED": "APMAHESHBANK",
	"BANK OF TOKYO MITSUBISHI LIMITED": "MUFG",
	"THE GUJARAT STATE COOPERATIVE BANK LIMITED": "GSCBANK",
	"KARNATAKA VIKAS GRAMEENA BANK": "KVGBANK",
	"THE MUNICIPAL COOPERATIVE BANK LIMITED": "MUNICIPALBANK",
	"NAGPUR NAGARIK SAHAKARI BANK LIMITED": "NNSBANK",
	"THE KANGRA CENTRAL COOPERATIVE BANK LIMITED": "KCCB",
	"THE RAJASTHAN STATE COOPERATIVE BANK LIMITED": "RSCB",
	"THE SURAT DISTRICT COOPERATIVE BANK LIMITED": "SUDICOBANK",
	"THE VISHWESHWAR SAHAKARI BANK LIMITED": "VISHWESHWARBANK",
	"WOORI BANK": "WOORIBANK",
	"SUTEX COOPERATIVE BANK LIMITED": "SUTEXBANK",
	"BARCLAYS BANK": "BARCLAYS",
	"GURGAON GRAMIN BANK": "SHGB",
	"COMMONWEALTH BANK OF AUSTRALIA": "COMMBANK",
	"PRATHAMA BANK": "PRATHAMABANK",
	"NORTH MALABAR GRAMIN BANK": "KERALAGBANK",
	"THE VARACHHA COOPERATIVE BANK LIMITED": "VARACHHABANK",
	"SBER BANK": "SBERBANK",
	"TUMKUR GRAIN MERCHANTS COOPERATIVE BANK LIMITED": "TGMCBANK",
	"VASAI VIKAS SAHAKARI BANK LIMITED": "VASAIVIKASBANK",
	"VASAI VIKAS SAHAKARI BANK LTD": "VASAIVIKASBANK",
	"BASSEIN CATHOLIC COOPERATIVE BANK LIMITED": "BCCB",
	"WESTPAC BANKING CORPORATION": "WESTPAC",
	"ANDHRA PRAGATHI GRAMEENA BANK": "APGB",
	"SUMITOMO MITSUI BANKING CORPORATION": "SMBC",
	"THE SEVA VIKAS COOPERATIVE BANK LIMITED": "SEVAVIKASBANK",
	"THE THANE DISTRICT CENTRAL COOPERATIVE BANK LIMITED": "THANEDISTRICTBANK",
	"JP MORGAN BANK": "JPMORGAN",
	"THE GADCHIROLI DISTRICT CENTRAL COOPERATIVE BANK LIMITED": "GDCCBANK",
	"THE AKOLA DISTRICT CENTRAL COOPERATIVE BANK": "AKOLADCC",
	"THE KURMANCHAL NAGAR SAHAKARI BANK LIMITED": "KURMANCHALBANK",
	"THE JALGAON PEOPELS COOPERATIVE BANK LIMITED": "JPCBANK",
	"PARIBAS": "BNPPARIBAS",
	"NATIONAL AUSTRALIA BANK LIMITED": "NAB",
	"SAHEBRAO DESHMUKH COOPERATIVE BANK LIMITED": "SDCBANK",
	"BANK INTERNASIONAL INDONESIA": "MAYBANK",
	"SOLAPUR JANATA SAHAKARI BANK LIMITED": "SJSBBANK",
	"INDUSTRIAL AND COMMERCIAL BANK OF CHINA LIMITED": "ICBC",
	"UNITED OVERSEAS BANK LIMITED": "UOB",
	"ZILA SAHAKRI BANK LIMITED GHAZIABAD": "ZSBL",
	"JANASEVA SAHAKARI BANK BORIVLI LIMITED": "JANASEVABANK",
	"RAJGURUNAGAR SAHAKARI BANK LIMITED": "RAJGURUNAGARBANK",
	"CANARA BANK": "CANARABANK",
	"NAGAR URBAN CO OPERATIVE BANK": "NUCB",
	"AKOLA JANATA COMMERCIAL COOPERATIVE BANK": "AKOLAJANATABANK",
	"BHARATIYA MAHILA BANK LIMITED": "BMB",
	"HSBC BANK OMAN SAOG": "HSBC",
	"THE KANGRA COOPERATIVE BANK LIMITED": "KANGRABANK",
	"THE ZOROASTRIAN COOPERATIVE BANK LIMITED": "ZOROASTRIANBANK",
	"SHIKSHAK SAHAKARI BANK LIMITED": "SHIKSHAKBANK",
	"THE HASTI COOP BANK LTD": "HASTIBANK",
	"CATHOLIC SYRIAN BANK LIMITED": "CSB",
	"KERALA GRAMIN BANK": "KERALAGBANK",
	"PRAGATHI KRISHNA GRAMIN BANK": "PRAGATHIKRISHNABANK",
	"DEPOSIT INSURANCE AND CREDIT GUARANTEE CORPORATION": "DICGC",
	"DEVELOPMENT BANK OF SINGAPORE": "DBS",
	"DOHA BANK": "DOHABANK",
	"DOHA BANK QSC": "DOHABANK",
	"EXPORT IMPORT BANK OF INDIA": "EXIMBANK",
	"JANAKALYAN SAHAKARI BANK LIMITED": "JKSBL",
	"TJSB SAHAKARI BANK LIMITED": "TJSBBANK",
	"TJSB SAHAKARI BANK LTD": "TJSBBANK",
	"THE COSMOS CO OPERATIVE BANK LIMITED": "COSMOSBANK",
	"SURAT NATIONAL COOPERATIVE BANK LIMITED": "SURATNATIONALBANK",
	"CENTRAL BANK OF INDIA": "CENTRALBANK",
	"IDFC BANK LIMITED": "IDFC",
	"INDUSTRIAL BANK OF KOREA": "IBK",
	"SBM BANK MAURITIUS LIMITED": "SBM",
	"NATIONAL BANK OF ABU DHABI PJSC": "NBAD",
	"KEB HANA BANK": "KEBHANA",
	"THE PANDHARPUR URBAN CO OP. BANK LTD. PANDHARPUR": "PANDHARPURBANK",
	"SAMARTH SAHAKARI BANK LTD": "SAMARTHBANK",
	"SHIVALIK MERCANTILE CO OPERATIVE BANK LTD": "SHIVALIKBANK",
	"HIMACHAL PRADESH STATE COOPERATIVE BANK LTD": "HPSCB",
	"DEOGIRI NAGARI SAHAKARI BANK LTD. AURANGABAD": "DEOGIRIBANK",
	"CHINATRUST COMMERCIAL BANK LIMITED": "CHINATRUST",
	"PT BANK MAYBANK INDONESIA TBK": "MAYBANK",
	"MAHARASHTRA GRAMIN BANK": "MAHAGRAMIN",
	"EQUITAS SMALL FINANCE BANK LIMITED": "EQUITAS",
	"AIRTEL PAYMENTS BANK LIMITED": "AIRTEL",
	"CITI BANK": "CITIBANK",
	"CITIZEN CREDIT COOPERATIVE BANK LIMITED": "CITIZENCREDITBANK",
	"CITY UNION BANK LIMITED": "CUB",
	"CORPORATION BANK": "CORPBANK",
	"CREDIT AGRICOLE CORPORATE AND INVESTMENT BANK CALYON BANK": "CACIB",
	"DENA BANK": "DENABANK",
	"DEUSTCHE BANK": "DB",
	"DCB BANK LIMITED": "DCB",
	"DHANALAKSHMI BANK": "DHANBANK",
	"DOMBIVLI NAGARI SAHAKARI BANK LIMITED": "DNSBANK",
	"FIRSTRAND BANK LIMITED": "FIRSTRAND",
	"HDFC BANK": "HDFC",
	"HSBC BANK": "HSBC",
	"ICICI BANK LIMITED": "ICICI",
	"IDBI BANK": "IDBI",
	"INDIAN BANK": "INDIANBANK",
	"INDIAN OVERSEAS BANK": "IOB",
	"INDUSIND BANK": "INDUSIND",
	"JANASEVA SAHAKARI BANK LIMITED": "JANASEVABANK",
	"KAPOL COOPERATIVE BANK LIMITED": "KAPOLBANK",
	"KARNATAKA BANK LIMITED": "KARNATAKABANK",
	"KARUR VYSYA BANK": "KVB",
	"KOTAK MAHINDRA BANK LIMITED": "KOTAK",
	"MAHANAGAR COOPERATIVE BANK": "MAHANAGARBANK",
	"MAHARASHTRA STATE COOPERATIVE BANK": "MSCBANK",
	"MASHREQBANK PSC": "MASHREQBANK",
	"MIZUHO BANK LTD": "MIZUHOBANK",
	"NEW INDIA COOPERATIVE BANK LIMITED": "NEWINDIABANK",
	"NKGSB COOPERATIVE BANK LIMITED": "NKGSB",
	"NUTAN NAGARIK SAHAKARI BANK LIMITED": "NUTANBANK",
	"ORIENTAL BANK OF COMMERCE": "OBC",
	"PARSIK BANK": "GPPARSIKBANK",
	"PUNJAB AND MAHARSHTRA COOPERATIVE BANK": "PMC",
	"PUNJAB AND SIND BANK": "PSB",
	"PUNJAB NATIONAL BANK": "PNB",
	"RAJKOT NAGRIK SAHAKARI BANK LIMITED": "RNSB",
	"RESERVE BANK OF INDIA": "RBI",
	"SHINHAN BANK": "SHINHAN",
	"SOCIETE GENERALE": "SOCIETEGENERALE",
	"SOUTH INDIAN BANK": "SOUTHINDIANBANK",
	"STANDARD CHARTERED BANK": "SC",
	"STATE BANK OF BIKANER AND JAIPUR": "SBBJ",
	"STATE BANK OF HYDERABAD": "SBHYD",
	"STATE BANK OF INDIA": "SBI",
	"STATE BANK OF MAURITIUS LIMITED": "SBMGROUP",
	"STATE BANK OF MYSORE": "SBM",
	"STATE BANK OF PATIALA": "SBP",
	"STATE BANK OF TRAVANCORE": "SBT",
	"SYNDICATE BANK": "SYNDICATEBANK",
	"TAMILNAD MERCANTILE BANK LIMITED": "TMBL",
	"THE BANK OF NOVA SCOTIA": "SCOTIABANK",
	"AHMEDABAD MERCANTILE COOPERATIVE BANK": "AMCOBANK",
	"BHARAT COOPERATIVE BANK MUMBAI LIMITED": "BHARATBANK",
	"FEDERAL BANK": "FEDERALBANK",
	"THE GREATER BOMBAY COOPERATIVE BANK LIMITED": "GREATERBANK",
	"JAMMU AND KASHMIR BANK LIMITED": "JKBANK",
	"KALUPUR COMMERCIAL COOPERATIVE BANK": "KALUPURBANK",
	"THE KARANATAKA STATE COOPERATIVE APEX BANK LIMITED": "KARNATAKAAPEX",
	"KALYAN JANATA SAHAKARI BANK": "KALYANJANATA",
	"LAXMI VILAS BANK": "LVB",
	"THE MEHSANA URBAN COOPERATIVE BANK": "MUCBANK",
	"THE NAINITAL BANK LIMITED": "NAINITALBANK",
	"RBL BANK LIMITED": "RBL",
	"THE ROYAL BANK OF SCOTLAND": "RBS",
	"SARASWAT COOPERATIVE BANK LIMITED": "SARASWATBANK",
	"THE SHAMRAO VITHAL COOPERATIVE BANK": "SVCBANK",
	"THE SURATH PEOPLES COOPERATIVE BANK LIMITED": "SPCBL",
	"THE TAMIL NADU STATE APEX COOPERATIVE BANK": "TNSCBANK",
	"THE WEST BENGAL STATE COOPERATIVE BANK": "WBSCB",
	"UCO BANK": "UCOBANK",
	"UNION BANK OF INDIA": "UNIONBANK",
	"UNITED BANK OF INDIA": "UNITEDBANK",
	"VIJAYA BANK": "VIJAYABANK",
	"BANK OF BARODA": "BOB"
};

interface BankSelectProps {
  value: string;
  onChange: (value: string) => void;
  errorClass?: string;
}

export default function BankSelect({ value, onChange, errorClass = "" }: BankSelectProps) {
  const [banks, setBanks] = useState<string[]>(Object.keys(bankData));
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

  const filteredBanks = banks.filter(b => b.toLowerCase().includes(search.toLowerCase()));
  const showManualEntry = search.trim().length > 0 && !banks.some(b => b.toLowerCase() === search.trim().toLowerCase());

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div 
        className={`w-full px-4 py-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all bg-white ${errorClass || "border-slate-200 hover:border-slate-300"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`text-sm font-medium ${value ? "text-slate-700" : "text-slate-400"}`}>
          {value || "Select or enter bank name"}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden flex flex-col max-h-60">
          <div className="p-3 border-b border-slate-100 flex items-center gap-2 bg-slate-50">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input 
              type="text" 
              placeholder="Search or enter manually..."
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
                <span className="text-[10px] font-bold bg-blue-100 px-1.5 py-0.5 rounded text-blue-800">Custom Bank</span>
              </div>
            )}
            
            {filteredBanks.map((bank) => (
              <div 
                key={bank}
                onClick={() => {
                  onChange(bank);
                  setIsOpen(false);
                  setSearch("");
                }}
                className="w-full px-3 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 rounded-lg cursor-pointer flex items-center justify-between transition-colors"
              >
                <span className={value === bank ? "font-bold text-emerald-700" : ""}>{bank}</span>
                {value === bank && <Check className="w-4 h-4 text-[#0fa958]" />}
              </div>
            ))}
            
            {filteredBanks.length === 0 && !showManualEntry && (
              <div className="px-3 py-6 text-center text-xs text-slate-400 font-medium">
                Type to search or add a custom bank
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
