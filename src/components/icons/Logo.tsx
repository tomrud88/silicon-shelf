export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 220"
      role="img"
      aria-label="SiliconShelf"
      className={className}
      style={{ width: "210px", height: "80px" }}
    >
      <g transform="translate(0,145)">
        <text
          x="0"
          y="0"
          fontSize="96"
          fontWeight="850"
          letterSpacing="0.4"
          fontFamily="Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif"
        >
          <tspan fill="#FD893C">Silicon</tspan>
          <tspan fill="#FFFFFF">Shelf</tspan>
        </text>
      </g>
    </svg>
  );
}
