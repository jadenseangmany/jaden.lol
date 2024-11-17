// src/components/JobCard.tsx
export default function JobCard({
    title,
    subtitle,
    gradient,
  }: {
    title: string;
    subtitle: string;
    gradient: string;
  }) {
    return (
      <div className={`py-16 text-center text-white ${gradient}`}>
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="mt-4">{subtitle}</p>
        <button className="mt-6 bg-blue-500 px-4 py-2 rounded-full">
          Learn more
        </button>
      </div>
    );
  }
  