import { useState } from "react";
import projects from "../../components/projects/projects";

export default function ProjectsPage() {
  const projectData = projects();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="hero flex flex-col items-center pt-10 p-3 gap-20">
      <div className="title text-center mb-12">
        <h1 className="text-3xl md:text-[64px] font-semibold">
          See my latest projects
        </h1>
        <span className="subtitle text-[16px] md:text-[20px] w-full text-(--text-subtitle)">
          Want to see what I've built? You're in the right place.
        </span>
      </div>

      <div className="projects flex flex-col items-center gap-20 w-full">
        {projectData.map(({ featured, imagePath, title, description }, index) => (
          <div
            key={title}
            className={`project flex flex-col md:flex-row items-center justify-between gap-2 md:gap-10 w-full max-w-6xl ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <div className="image w-full md:w-3/6 rounded-xl overflow-hidden cursor-pointer">
              <img
                src={imagePath}
                alt={title}
                onClick={() => setSelectedImage(imagePath)}
                className="w-full h-full object-cover rounded-xl shadow-lg hover:scale-[102%] transition-transform"
              />
            </div>

            {/* Text Content */}
            <div className="content w-full md:w-1/2 flex flex-col gap-3">
              <div className="title">
                {featured && (
                  <span className="text-blue-500 font-medium text-sm">
                    Featured Project
                  </span>
                )}
                <h2 className="text-[22px] md:text-[32px] font-semibold">
                  {title}
                </h2>
              </div>
              <p className="bg-[rgba(255,255,255,0.05)] p-4 rounded-lg text-[14px] md:text-[16px] text-(--text-color)">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Expanded project"
            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl object-contain"
          />
          <button
            className="absolute top-20 right-6 text-white text-3xl font-bold cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
}
