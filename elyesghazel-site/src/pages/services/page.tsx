import React from "react";
import services from "../../components/services/services";

export default function ServicesPage() {
  const serviceData = services();

  return (
    <div className="hero flex flex-col items-center gap-28 pt-10 lg:w-[85%] p-3">
      <div className="title text-center">
        <h1 className="text-[32px] md:text-[64px] font-semibold">
          What I can do for <span className="text-gradient">You</span>
        </h1>
        <span className="subtitle text-[18px] md:text-[20px] w-full text-(--text-subtitle)">
          Here's what I bring to the table
          <br />
          (besides coffee).
        </span>
      </div>

      <div className="service-cards grid grid-cols-1 xl:grid-cols-2 gap-4 lg:w-[90%]">
        {serviceData.map(({ title, usp, cta, link, tags }) => (
          <div
            key={title}
            className="card flex flex-col justify-between px-6 md:px-9 py-5
                       border-2 border-[rgba(255,255,255,0.36)] rounded-xl
                       bg-(--service-card-background)
                       hover:bg-(--service-card-background-highlight)
                       hover:scale-[101%] transition-all"
          >
            <div className="top flex flex-col gap-2">
              <div className="tags flex flex-row flex-wrap gap-3">{tags}</div>
              <h1 className="text-[18px] md:text-2xl font-medium">{title}</h1>
            </div>

            <div className="usp flex flex-col md:flex-row justify-between w-full py-5 gap-5">
              {usp.map((item, index) => (
                <div key={index} className="flex flex-col gap-2 md:w-2/5">
                  <div className="title flex flex-row items-center justify-start gap-2">
                    {React.createElement(item.icon, { size: 20 })}
                    <h1 className="text-[14px] md:text-xl font-medium">
                      {item.title}
                    </h1>
                  </div>
                  <span className="text-[11px] md:text-sm text-(--text-subtitle)">
                    {item.description}
                  </span>
                </div>
              ))}
            </div>

            <a
              href={link}
              className="cta w-fit px-4 py-2 rounded-md bg-blue-600 text-white
                         hover:bg-blue-800 transition text-sm"
            >
              {cta}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
