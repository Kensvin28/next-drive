export default function Button({
  variant,
  children,
  type = "button",
  onClick,
}: {
  variant: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn text-white ${variant}`}
    >
      {children}
    </button>
  );
}