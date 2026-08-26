export interface FacilityItem {
  id: string;
  title: string;
  category: "Academic" | "Sports" | "Safety" | "Arts";
  shortDesc: string;
  fullDesc: string;
  image: string;
  badge?: string;
  highlights?: string[];
}

export const facilitiesData: FacilityItem[] = [
  {
    id: "smart-classrooms",
    title: "Smart Classrooms",
    category: "Academic",
    shortDesc: "Interactive digital smart boards, ergonomic seating, and audio-visual tools for engaging learning.",
    fullDesc: "Our smart classrooms are equipped with modern interactive digital boards, high-speed connectivity, ergonomic seating, and advanced audio-visual equipment. Designed to make learning immersive, interactive, and engaging for every student from primary to senior secondary levels.",
    image: "/images/facilities/smart_classroom.png",
    badge: "Digital Tech",
    highlights: ["Interactive Touch Boards", "Climate Controlled", "Audio-Visual Systems"]
  },
  {
    id: "science-labs",
    title: "Advanced Science Labs",
    category: "Academic",
    shortDesc: "State-of-the-art Physics, Chemistry, and Biology labs equipped with safety apparatus.",
    fullDesc: "State-of-the-art Physics, Chemistry, and Biology laboratories equipped with modern instruments, safety apparatus, high-grade microscopes, and practical demonstration kits. Students gain hands-on experience under the expert guidance of qualified faculty.",
    image: "/images/facilities/science_lab.png",
    badge: "Practical Learning",
    highlights: ["Physics, Chem & Bio Labs", "Safety Equipment", "Qualified Demonstrators"]
  },
  {
    id: "computer-lab",
    title: "Computer & IT Center",
    category: "Academic",
    shortDesc: "Modern computer lab with individual workstations, high-speed internet, and coding tools.",
    fullDesc: "A fully equipped IT lab featuring modern desktop computers, high-speed broadband connectivity, updated software suites, and programming tools. We offer comprehensive digital literacy, coding, and STEM education to prepare students for the digital future.",
    image: "/images/facilities/computer_lab.png",
    badge: "IT & Coding",
    highlights: ["Individual Workstations", "High-Speed Fiber Net", "Coding & Tech Tools"]
  },
  {
    id: "knowledge-center",
    title: "Digital Library & Knowledge Hub",
    category: "Academic",
    shortDesc: "Extensive collection of academic books, journals, reference materials, and e-learning resources.",
    fullDesc: "A quiet, well-stocked library housing thousands of books, academic journals, reference manuals, literature, and digital learning modules. It provides a peaceful reading environment equipped with digital research stations for independent learning.",
    image: "/images/facilities/library.png",
    badge: "Knowledge Hub",
    highlights: ["10,000+ Books & Journals", "E-Learning Stations", "Quiet Study Zone"]
  },
  // {
  //   id: "sports-complex",
  //   title: "Sports Complex & Athletics",
  //   category: "Sports",
  //   shortDesc: "Spacious grounds for sports including Basketball, Volleyball, Cricket, and Athletics.",
  //   fullDesc: "Comprehensive sports infrastructure featuring a multi-purpose playfield, basketball courts, volleyball, badminton, cricket nets, and track athletics. Guided by professional sports instructors to instill teamwork, fitness, discipline, and sportsmanship.",
  //   image: "/images/facilities/sports.png",
  //   badge: "Fitness & Sports",
  //   highlights: ["Multi-Sport Ground", "Professional Coaches", "Regular Tournaments"]
  // },
  // {
  //   id: "stem-robotics",
  //   title: "STEM & Robotics Studio",
  //   category: "Academic",
  //   shortDesc: "Hands-on robotics kits, electronics modules, and 3D design workspace for innovative thinking.",
  //   fullDesc: "Dedicated STEM workspace enabling students to build, program, and innovate using robotics kits, microcontrollers, 3D modelling, and electronic circuits. Fosters critical thinking, problem-solving, and creative engineering skills.",
  //   image: "/images/facilities/robotics.png",
  //   badge: "Future Tech",
  //   highlights: ["Robotics & IoT Kits", "3D Modeling Workspace", "Innovation Workshops"]
  // },
  {
    id: "transport",
    title: "Safe Transport Facility",
    category: "Safety",
    shortDesc: "Safe and comfortable school buses covering all major routes across Kangra and nearby areas.",
    fullDesc: "Dedicated and well-maintained school buses equipped with speed governors, first aid kits, and accompanied by trained drivers and attendants. Ensures a safe, comfortable, and timely commute for students across Kangra and surrounding regions.",
    image: "/images/facilities/school_bus.png",
    badge: "Safety First",
    highlights: ["Speed Governors", "First Aid Kits", "Trained Drivers & Staff"]
  },
  {
    id: "creative-arts",
    title: "Creative Arts & Music Studio",
    category: "Arts",
    shortDesc: "Dedicated studio spaces for fine arts, painting, classical & western music, and performing arts.",
    fullDesc: "Vibrant creative spaces designed for drawing, painting, pottery, vocal music, instrumental training, and drama. Encourages artistic expression and aesthetic development alongside academic achievements.",
    image: "/images/facilities/art.png",
    badge: "Arts & Culture",
    highlights: ["Painting & Fine Arts", "Vocal & Instrumental", "Drama & Performing Arts"]
  }
];
