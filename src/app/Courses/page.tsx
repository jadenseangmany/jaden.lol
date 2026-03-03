import Navbar from "../../components/Navbar";

export default function CoursesSection() {
  const courses = [
    {
      name: "Software Engineering",
      theme: "bg-white text-black",
      titleColor: "text-black",
      descColor: "text-gray-900",
      buttonType: "blue"
    },
    {
      name: "Machine Learning",
      theme: "bg-black text-white",
      titleColor: "text-white",
      descColor: "text-gray-300",
      buttonType: "outline"
    },
    {
      name: "Parallel Computing",
      theme: "bg-gradient-to-b from-[#0E1440] to-[#F5F5F7] text-black",
      titleColor: "text-white",
      descColor: "text-white",
      buttonType: "white"
    },
    {
      name: "Computer Architecture",
      theme: "bg-white text-black",
      titleColor: "text-black",
      descColor: "text-gray-900",
      buttonType: "blue"
    },
    {
      name: "Computer Vision",
      theme: "bg-black text-white",
      titleColor: "text-white",
      descColor: "text-gray-300",
      buttonType: "outline"
    }
  ];

  return (
    <div className="flex flex-col items-center w-full">
      {courses.map((course, idx) => (
        <div key={idx} className={`relative flex flex-col items-center justify-center min-h-[60vh] w-full ${course.theme}`}>
          <h3 className={`title-text mt-8 ${course.titleColor}`}>{course.name}</h3>
          <p className={`subtitle-text mt-2 ${course.descColor}`}>UC San Diego</p>

          <div className="flex space-x-4 mt-8">
            {course.buttonType === "blue" && (
              <>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-full text-lg font-medium hover:bg-blue-700 transition">Learn more</button>
                <button className="bg-transparent border border-blue-600 text-blue-600 px-6 py-2 rounded-full text-lg font-medium hover:bg-blue-600 hover:text-white transition">Details</button>
              </>
            )}
            {course.buttonType === "outline" && (
              <>
                <button className="bg-white text-black px-6 py-2 rounded-full text-lg font-medium hover:bg-gray-200 transition">Learn more</button>
                <button className="bg-transparent border border-white text-white px-6 py-2 rounded-full text-lg font-medium hover:bg-white hover:text-black transition">Details</button>
              </>
            )}
            {course.buttonType === "white" && (
              <>
                <button className="bg-white text-black px-6 py-2 rounded-full text-lg font-medium hover:bg-gray-200 transition">Learn more</button>
                <button className="bg-transparent border border-white text-white px-6 py-2 rounded-full text-lg font-medium hover:bg-white hover:text-black transition">Details</button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}