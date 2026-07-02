"use client";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";

export type EllieMood = "wave" | "climb" | "happy" | "sit" | "wink" | "walk";

interface Props {
  mood?:      EllieMood;
  size?:      number;
  className?: string;
  onClick?:   () => void;
}

export default function EllieSVG({
  mood = "wave", size = 200, className = "", onClick,
}: Props) {
  const [blink,   setBlink]   = useState(false);
  const [earFlap, setEarFlap] = useState(false);
  const tailCtrl = useAnimationControls();

  useEffect(() => {
    const t = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 160);
    }, 3000 + Math.random() * 1500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (mood === "wave" || mood === "happy") {
      const t = setInterval(() => setEarFlap((e) => !e), 550);
      return () => clearInterval(t);
    }
  }, [mood]);

  useEffect(() => {
    tailCtrl.start({
      rotate: [0, 20, -20, 14, -14, 0],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    });
  }, [tailCtrl]);

  const trunkAngle =
    mood === "wave"  ? -35 :
    mood === "happy" ? -50 :
    mood === "wink"  ? -20 :
    mood === "climb" ?  12 :
    mood === "sit"   ?   0 : 6;

  const bodyY =
    mood === "sit"   ?  16 :
    mood === "climb" ? -10 :
    mood === "happy" ? -14 : 0;

  return (
    <motion.div
      className={`select-none ${className}`}
      style={{ width: size, height: size * 1.12, cursor: onClick ? "pointer" : "default" }}
      onClick={onClick}
      whileHover={onClick ? { scale: 1.05 } : {}}
      whileTap={onClick  ? { scale: 0.97 } : {}}
    >
      <svg viewBox="0 0 200 224" width={size} height={size * 1.12} fill="none">

        {/* Shadow */}
        <motion.ellipse cx="100" cy="214" rx="44" ry="7"
          fill="rgba(0,0,0,0.09)"
          animate={{ opacity: mood === "climb" ? 0 : 1 }}
        />

        <motion.g
          animate={{ y: bodyY }}
          transition={{ type: "spring", stiffness: 160, damping: 14 }}
        >

          {/* Tail */}
          <motion.path
            d="M148 150 Q166 140 162 126 Q158 112 166 106"
            stroke="#7C5FBE" strokeWidth="5.5" strokeLinecap="round" fill="none"
            animate={tailCtrl}
            style={{ originX: "148px", originY: "150px" }}
          />
          <circle cx="166" cy="106" r="5.5" fill="#A98FD8" />

          {/* Back legs */}
          <motion.g
            animate={{ rotate: mood === "walk" ? [0, 14, 0, -14, 0] : 0 }}
            transition={{ duration: 0.55, repeat: mood === "walk" ? Infinity : 0 }}
          >
            <rect x="118" y="170" width="24" height="34" rx="12" fill="#8FC4DC" />
            <rect x="116" y="196" width="28" height="11" rx="5.5" fill="#78B0CC" />
          </motion.g>

          {/* Body */}
          <ellipse cx="100" cy="150" rx="54" ry="45" fill="#A8D8EA" />
          <ellipse cx="100" cy="162" rx="40" ry="28" fill="#8FC4DC" opacity="0.38" />
          <ellipse cx="96" cy="154" rx="30" ry="23" fill="#C6E8F5" />

          {/* Front legs */}
          <motion.g
            animate={{ rotate: mood === "walk" ? [0, -14, 0, 14, 0] : 0 }}
            transition={{ duration: 0.55, repeat: mood === "walk" ? Infinity : 0 }}
            style={{ originX: "68px", originY: "170px" }}
          >
            <rect x="56" y="170" width="24" height="34" rx="12" fill="#A8D8EA" />
            <rect x="54" y="196" width="28" height="11" rx="5.5" fill="#8FC4DC" />
          </motion.g>

          {/* DPS uniform jacket */}
          <path
            d="M70 130 Q85 120 100 118 Q115 120 130 130 L134 148 Q116 140 100 138 Q84 140 66 148 Z"
            fill="#006C33" opacity="0.88"
          />
          {/* Gold tie */}
          <path d="M96 120 L100 118 L104 120 L102 142 L100 144 L98 142 Z" fill="#FFD700" />
          {/* DPS badge circle */}
          <circle cx="86" cy="133" r="5.5" fill="#FFD700" />
          <text x="86" y="136.5" textAnchor="middle" fontSize="5.5" fill="#004F24" fontWeight="bold" fontFamily="Arial">D</text>

          {/* Left ear */}
          <motion.ellipse cx="60" cy="90" rx="23" ry="27"
            fill="#8FC4DC"
            animate={{ ry: earFlap ? 23 : 27, rx: earFlap ? 26 : 23 }}
            transition={{ duration: 0.22 }}
          />
          <motion.ellipse cx="60" cy="90" rx="14" ry="19"
            fill="#F4BABA"
            animate={{ ry: earFlap ? 15 : 19, rx: earFlap ? 16 : 14 }}
            transition={{ duration: 0.22 }}
          />

          {/* Head */}
          <ellipse cx="100" cy="88" rx="43" ry="39" fill="#A8D8EA" />
          <ellipse cx="100" cy="96" rx="31" ry="23" fill="#C6E8F5" />

          {/* Right ear */}
          <motion.ellipse cx="140" cy="90" rx="23" ry="27"
            fill="#8FC4DC"
            animate={{ ry: earFlap ? 23 : 27, rx: earFlap ? 26 : 23 }}
            transition={{ duration: 0.22 }}
          />
          <motion.ellipse cx="140" cy="90" rx="14" ry="19"
            fill="#F4BABA"
            animate={{ ry: earFlap ? 15 : 19, rx: earFlap ? 16 : 14 }}
            transition={{ duration: 0.22 }}
          />

          {/* Left eye */}
          <ellipse cx="83" cy="80" rx="9.5" ry={blink ? 1.5 : 9.5} fill="white" />
          {!blink && <circle cx="85.5" cy="80" r="5.8" fill="#1F2937" />}
          {!blink && <circle cx="87.5" cy="77.5" r="2.2" fill="white" />}
          {/* Lashes */}
          {!blink && <>
            <line x1="76" y1="72" x2="73.5" y2="67.5" stroke="#1F2937" strokeWidth="1.6" strokeLinecap="round"/>
            <line x1="80.5" y1="70" x2="79.5" y2="65.5" stroke="#1F2937" strokeWidth="1.6" strokeLinecap="round"/>
            <line x1="85" y1="70" x2="85" y2="65" stroke="#1F2937" strokeWidth="1.6" strokeLinecap="round"/>
          </>}

          {/* Right eye — winks */}
          {mood === "wink" ? (
            <path d="M108 80 Q117 75 126 80"
              stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          ) : (
            <>
              <ellipse cx="117" cy="80" rx="9.5" ry={blink ? 1.5 : 9.5} fill="white" />
              {!blink && <circle cx="119.5" cy="80" r="5.8" fill="#1F2937" />}
              {!blink && <circle cx="121.5" cy="77.5" r="2.2" fill="white" />}
            </>
          )}

          {/* Rosy cheeks */}
          <circle cx="76" cy="96" r="8.5" fill="#F9A8A8" opacity="0.44" />
          <circle cx="124" cy="96" r="8.5" fill="#F9A8A8" opacity="0.44" />

          {/* Trunk */}
          <motion.g
            style={{ originX: "100px", originY: "110px" }}
            animate={{ rotate: trunkAngle }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
          >
            <path
              d="M89 110 Q80 122 78 136 Q76 148 87 152 Q96 156 98 148 Q100 141 96 137"
              stroke="#A8D8EA" strokeWidth="15" strokeLinecap="round" fill="none"
            />
            <path
              d="M89 110 Q80 122 78 136 Q76 148 87 152 Q96 156 98 148 Q100 141 96 137"
              stroke="#8FC4DC" strokeWidth="10" strokeLinecap="round" fill="none"
            />
          </motion.g>

          {/* Smile */}
          {mood !== "climb" && (
            <path
              d={mood === "happy" ? "M86 102 Q100 115 114 102" : "M88 102 Q100 110 112 102"}
              stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" fill="none"
            />
          )}

          {/* Wave / happy arm */}
          {(mood === "wave" || mood === "happy") && (
            <motion.g
              animate={{ rotate: mood === "wave" ? [0, 28, 0, 28, 0] : [0, 38, 0] }}
              transition={{
                duration: mood === "wave" ? 1.3 : 0.55,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ originX: "130px", originY: "136px" }}
            >
              <path
                d="M128 136 Q148 114 156 100"
                stroke="#A8D8EA" strokeWidth="15" strokeLinecap="round" fill="none"
              />
              <path
                d="M128 136 Q148 114 156 100"
                stroke="#8FC4DC" strokeWidth="10" strokeLinecap="round" fill="none"
              />
              <circle cx="156" cy="100" r="11" fill="#A8D8EA" />
              <circle cx="156" cy="100" r="7.5" fill="#C6E8F5" />
            </motion.g>
          )}

          {/* Climb arms */}
          {mood === "climb" && (
            <>
              <path d="M128 122 Q146 108 152 96"
                stroke="#A8D8EA" strokeWidth="15" strokeLinecap="round" fill="none" />
              <path d="M128 122 Q146 108 152 96"
                stroke="#8FC4DC" strokeWidth="10" strokeLinecap="round" fill="none" />
              <circle cx="152" cy="96" r="11" fill="#A8D8EA" />
              <path d="M72 132 Q56 150 54 162"
                stroke="#A8D8EA" strokeWidth="15" strokeLinecap="round" fill="none" />
              <circle cx="54" cy="162" r="11" fill="#A8D8EA" />
            </>
          )}

          {/* Stars on happy */}
          {mood === "happy" && (
            <>
              {[[-30,-34],[30,-32],[-36,-12],[38,-8],[-18,-46],[20,-44]].map(([dx,dy],i) => (
                <motion.text
                  key={i}
                  x={100+dx} y={88+dy}
                  textAnchor="middle" fontSize="10"
                  animate={{ scale:[1,1.35,1], opacity:[0.55,1,0.55] }}
                  transition={{ duration:1.3, delay:i*0.18, repeat:Infinity }}
                  style={{ transformOrigin:`${100+dx}px ${88+dy}px` }}
                >✨</motion.text>
              ))}
            </>
          )}

        </motion.g>
      </svg>
    </motion.div>
  );
}
