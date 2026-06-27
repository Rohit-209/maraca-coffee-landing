type Props = {
  size?: number;
  className?: string;
  rotate?: number;
};

export default function Bean({ size = 28, className = "", rotate = 0 }: Props) {
  return (
    <svg
      width={size}
      height={size * 1.4}
      viewBox="0 0 28 40"
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden
    >
      <defs>
        <radialGradient id="bean-g" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#8a5a2e" />
          <stop offset="55%" stopColor="#4a2912" />
          <stop offset="100%" stopColor="#2a1810" />
        </radialGradient>
      </defs>
      <ellipse cx="14" cy="20" rx="11" ry="18" fill="url(#bean-g)" />
      <path
        d="M14 3 Q 10 20 14 37"
        stroke="#1a0f08"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse
        cx="10"
        cy="12"
        rx="2.2"
        ry="4"
        fill="#c9a47a"
        opacity="0.25"
      />
    </svg>
  );
}
