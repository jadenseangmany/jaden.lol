// src/components/ProjectCard.tsx
export default function ProjectCard({
    title,
    subtitle,
    backgroundColor,
  }: {
    title: string;
    subtitle: string;
    backgroundColor: string;
  }) {
    return (
      <div className={`p-6 rounded-lg shadow-md ${backgroundColor}`}>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-sm mt-2">{subtitle}</p>
        <button className="mt-4 bg-blue-500 px-4 py-2 text-white rounded-full">
          Learn more
        </button>
      </div>
    );
  }
  