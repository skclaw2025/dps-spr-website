export interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface Stat {
  id: number;
  value: number;
  suffix?: string;
  title: string;
  subtitle: string;
  color: "white" | "green";
  top: string;
  left: string;
}

export interface CircleProps {
  stat: Stat;
}

export interface CounterProps {
  end: number;
  suffix?: string;
}