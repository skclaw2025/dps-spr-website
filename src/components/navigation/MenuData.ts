import { MainMenuItem } from "./MenuTypes";

export const menuItems: MainMenuItem[] = [
  {
    id: "about",
    title: "Who We Are",
    image: "/images/menu/about.jpg",

    submenu: [
      { title: "About DPS", href: "/about" },
      { title: "Vision & Mission", href: "/about/vision" },
      { title: "Leadership", href: "/about/leadership" },
      { title: "Our Campus", href: "/campus" },
      { title: "Our History", href: "/history" },
    ],
  },

  {
    id: "academics",
    title: "How We Learn",
    image: "/images/menu/academics.jpg",

    submenu: [
      { title: "Pre Primary", href: "/academics/pre-primary" },
      { title: "Primary School", href: "/academics/primary" },
      { title: "Middle School", href: "/academics/middle" },
      { title: "Senior School", href: "/academics/senior" },
      { title: "Curriculum", href: "/curriculum" },
    ],
  },

  {
    id: "student",
    title: "Student Experiences",
    image: "/images/menu/student.jpg",

    submenu: [
      { title: "Sports", href: "/sports" },
      { title: "Performing Arts", href: "/arts" },
      { title: "Music", href: "/music" },
      { title: "Clubs", href: "/clubs" },
      { title: "Leadership", href: "/leadership" },
    ],
  },

  {
    id: "community",
    title: "Community Belonging",
    image: "/images/menu/community.jpg",

    submenu: [
      { title: "Parents", href: "/parents" },
      { title: "Alumni", href: "/alumni" },
      { title: "School Community", href: "/community" },
      { title: "Events", href: "/events" },
    ],
  },

  {
    id: "admission",
    title: "Join DPS",
    image: "/images/menu/admission.jpg",

    submenu: [
      { title: "Admission Process", href: "/admissions" },
      { title: "Fee Structure", href: "/fees" },
      { title: "Book a Visit", href: "/visit" },
      { title: "Apply Online", href: "/apply" },
      { title: "Scholarships", href: "/scholarships" },
    ],
  },
];