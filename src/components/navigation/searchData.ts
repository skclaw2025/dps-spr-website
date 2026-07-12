import { menuItems } from "./MenuData";

export interface SearchEntry {
  title: string;
  href: string;
  section: string;
  keywords?: string;
}

/* Pages that aren't already in the menu submenus.
   Add anything else you want searchable here. */
const extraPages: SearchEntry[] = [
  { title: "Home",                   href: "/",                section: "Pages",      keywords: "home dps spr gurugram" },
  { title: "Admissions",             href: "/admissions",      section: "Admissions", keywords: "apply enrol enroll join founding batch 2027 admission" },
  { title: "Fee Structure",          href: "/fees",            section: "Admissions", keywords: "fee fees cost tuition payment" },
  { title: "Book a Visit",           href: "/visit",           section: "Admissions", keywords: "tour visit school campus appointment" },
  { title: "Scholarships",           href: "/scholarships",    section: "Admissions", keywords: "scholarship merit aid" },
  { title: "Contact Us",             href: "/contact",         section: "Pages",      keywords: "contact phone email address enquiry location map" },
  { title: "Careers",                href: "/careers",         section: "Pages",      keywords: "career jobs vacancy hiring teacher staff" },
  { title: "Sports & Facilities",    href: "/sports",          section: "Campus",     keywords: "sports ice rink skating swimming aquatics pickleball basketball tennis" },
  { title: "Science & Robotics Labs", href: "/campus#labs",    section: "Campus",     keywords: "labs robotics atl tinkering vr science physics chemistry biology" },
  { title: "Library",                href: "/campus#library",  section: "Campus",     keywords: "library books reading" },
  { title: "Performing Arts",        href: "/arts",            section: "Campus",     keywords: "music dance drama theatre arts" },
  { title: "Early Years",            href: "/kindergarten",    section: "Academics",  keywords: "kindergarten nursery pre primary early years" },
];

/* Every submenu link becomes searchable automatically */
const fromMenu: SearchEntry[] = menuItems.flatMap((m) =>
  m.submenu.map((s) => ({ title: s.title, href: s.href, section: m.title }))
);

/* merge + dedupe by href */
const seen = new Set<string>();
export const searchIndex: SearchEntry[] = [...fromMenu, ...extraPages].filter((e) => {
  if (seen.has(e.href)) return false;
  seen.add(e.href);
  return true;
});