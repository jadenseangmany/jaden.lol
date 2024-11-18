export default function JobCard({
  title,
  subtitle,
  gradient = '',
  buttonStyle = 'bg-blue-500 text-white',
  children,
}: JobCardProps) {
  return (
    <div
      className={`relative flex flex-col items-center justify-start min-h-[60vh] w-full max-w-4xl mx-auto p-6 overflow-hidden ${gradient}`}
    >
      {/* Background */}
      {children}

      {/* Content */}
      <h3 className="title-text">{title}</h3>
      <p className="subtitle-text">{subtitle}</p>
      <button className={`mt-5 px-6 py-2 rounded-full ${buttonStyle}`}>
        Learn more
      </button>
    </div>
  );
}
