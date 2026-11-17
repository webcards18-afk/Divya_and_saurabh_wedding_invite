/**
 * Divya & Saurabh — Royal Indian Wedding Invitation Configuration
 * Extracted accurately from client invitation references & video assets.
 */

export const weddingData = {
  // Couple Details
  bride: "Divya",
  groom: "Saurabh",
  brideFull: "Divya Arora",
  groomFull: "Saurabh Banga",
  
  // Parents & Family
  brideParents: "Mrs. Sangeeta Arora & Mr. Hirdesh Arora",
  brideGrandparents: "Late Smt. Amritbai & Late Shri Ramdhan",
  groomParents: "Smt. Kamal Banga & Late Shri Krishan Kumar Banga",
  
  // Main Wedding Ceremony Date & Time (for Countdown)
  weddingDate: "2026-12-11T19:00:00+05:30",
  displayWeddingDate: "Friday, 11th December 2026",
  weddingTime: "7:00 PM Onwards Followed by Dinner",
  
  // Main Wedding Venue
  mainVenue: "Imperial Garden by Tivoli",
  mainAddress: "GT Karnal Road, Alipur Village, New Delhi – 110036",
  mainMapUrl: "https://maps.app.goo.gl/hnb9zjWbb91PFhCK6",

  // Background Music
  musicUrl: "/music.mp3",

  // All Sequential Wedding Events (matching 2-vid through 6-vid)
  events: [
    {
      id: "sukhmani",
      videoIndex: 2,
      videoSrc: "/2-vid.mp4",
      title: "Sukhmani Sahib Path",
      date: "Sunday, 6th December 2026",
      shortDate: "6th December 2026",
      time: "11:30 AM Onwards",
      note: "Followed by Lunch",
      venueName: "Shyam Niwas",
      venueAddress: "B1/257, UGF, Paschim Vihar, New Delhi – 110063",
      mapUrl: "https://maps.app.goo.gl/6cShUkH8pry7p7ou7?g_st=ac",
      badgeColor: "from-amber-500/20 to-amber-700/30",
    },
    {
      id: "sagan",
      videoIndex: 3,
      videoSrc: "/3-vid.mp4",
      title: "Sagan Ceremony",
      date: "Wednesday, 9th December 2026",
      shortDate: "9th December 2026",
      time: "7:30 PM Onwards",
      note: "An evening of royal traditions & celebrations",
      venueName: "The Mahanta Boutique Hotel & Resort",
      venueAddress: "Opposite PNB Zonal Branch, Partapur, Meerut",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=The+Mahanta+Boutique+Hotel+%26+Resort+Partapur+Meerut",
      badgeColor: "from-yellow-500/20 to-amber-600/30",
    },
    {
      id: "cocktail",
      videoIndex: 4,
      videoSrc: "/4-vid.mp4",
      title: "Cocktail & Mehndi",
      date: "Thursday, 10th December 2026",
      shortDate: "10th December 2026",
      time: "5:30 PM Onwards",
      note: "Music, henna & celebratory toasts",
      venueName: "Wedding Opera",
      venueAddress: "B-9, Ring Road, Dr. Lohia Industrial Area, Tri Nagar, Delhi – 110035",
      mapUrl: "https://maps.app.goo.gl/mQjhxvytt9iNPwAj7",
      badgeColor: "from-emerald-600/20 to-teal-800/30",
    },
    {
      id: "haldi",
      videoIndex: 5,
      videoSrc: "/5-vid.mp4",
      title: "Haldi & Chooda Ceremony",
      date: "Friday, 11th December 2026",
      shortDate: "11th December 2026",
      time: "9:30 AM Onwards",
      note: "Auspicious turmeric blessings & bridal chooda",
      venueName: "Shyam Niwas",
      venueAddress: "B1/257, UGF, Paschim Vihar, New Delhi – 110063",
      mapUrl: "https://maps.app.goo.gl/6cShUkH8pry7p7ou7?g_st=ac",
      badgeColor: "from-yellow-400/20 to-amber-500/30",
    },
    {
      id: "wedding",
      videoIndex: 6,
      videoSrc: "/6-vid.mp4",
      title: "Wedding Ceremony",
      date: "Friday, 11th December 2026",
      shortDate: "11th December 2026",
      time: "7:00 PM Onwards",
      note: "Followed by Dinner",
      venueName: "Imperial Garden by Tivoli",
      venueAddress: "GT Karnal Road, Alipur Village, New Delhi – 110036",
      mapUrl: "https://maps.app.goo.gl/hnb9zjWbb91PFhCK6",
      badgeColor: "from-rose-600/20 to-red-800/30",
    },
  ],

  // Blessings & RSVP (matching 7-vid)
  closing: {
    videoIndex: 7,
    videoSrc: "/7-vid.mp4",
    nieceMessage: "My Bua's big day! Come celebrate with us!",
    nieceAuthor: "Presha",
    rsvpSide: "Dadke & Nanke",
    contacts: [
      {
        name: "Vijay Arora",
        phone: "+91 97110 50005",
        rawPhone: "9711050005",
      },
      {
        name: "Gaurav Arora",
        phone: "+91 97580 48145",
        rawPhone: "9758048145",
      },
    ],
  },
};

/** Navigation anchors */
export const navSections = [
  { id: "home", label: "Opening" },
  { id: "sukhmani", label: "Path" },
  { id: "countdown", label: "Countdown" },
  { id: "sagan", label: "Sagan" },
  { id: "cocktail", label: "Cocktail" },
  { id: "haldi", label: "Haldi" },
  { id: "wedding", label: "Wedding" },
  { id: "rsvp", label: "RSVP" },
];

/** Backward compatibility references */
export const clips = {
  one: { src: "/1-vid.mp4", poster: "" },
  two: { src: "/2-vid.mp4", poster: "" },
  three: { src: "/3-vid.mp4", poster: "" },
  four: { src: "/4-vid.mp4", poster: "" },
  five: { src: "/5-vid.mp4", poster: "" },
  six: { src: "/6-vid.mp4", poster: "" },
  seven: { src: "/7-vid.mp4", poster: "" },
};
