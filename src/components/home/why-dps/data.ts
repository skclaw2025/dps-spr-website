import { Feature, Stat } from "./types";

export const features: Feature[] = [
  {
    id: 1,
    icon: "building",
    title: "Delhi Public School Society",
    description: "Legacy of excellence in education since 1949.",
  },

  {
    id: 2,
    icon: "book",
    title: "CBSE Curriculum",
    description: "Academic excellence with future-ready learning.",
  },

  {
    id: 3,
    icon: "globe",
    title: "Global Learning",
    description: "International outlook with Indian values.",
  },

  {
    id: 4,
    icon: "sparkles",
    title: "Experiential Learning",
    description: "Hands-on education beyond classrooms.",
  },

  {
    id: 5,
    icon: "trophy",
    title: "Sports & Co-curricular",
    description: "Developing champions in every field.",
  },
];

export const stats: Stat[] = [
  {
    id: 1,
    value: 5,
    title: "Acres",
    subtitle: "Area",
    color: "white",
    top: "20%",
    left: "25%",
  },

  {
    id: 2,
    value: 15,
    suffix: ":1",
    title: "Teacher",
    subtitle: "Student Ratio",
    color: "white",
    top: "50%",
    left: "25%",
  },

  {
    id: 3,
    value: 25,
    suffix: "+",
    title: "Sports",
    subtitle: "Activities",
    color: "white",
    top: "20%",
    left: "65%",
  },

  {
    id: 4,
    value: 100,
    suffix: "%",
    title: "CBSE",
    subtitle: "Curriculum",
    color: "white",
    top: "50%",
    left: "65%",
  },
];