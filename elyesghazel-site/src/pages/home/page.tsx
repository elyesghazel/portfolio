import QuickStatsElement from "../../components/home/QuickStatsElement";

export default function HomePage() {
  return (
    <div className="hero flex flex-col items-center p-5 pt-10 gap-24 w-full lg:w-[85%]">
      <div className="title text-center">
        <h1 className="md:text-[64px] text-[28px] font-semibold">
          Creating <span className="text-gradient">beatiful</span> tech and web
          solutions.
        </h1>
        <span className="subtitle md:text-[20px] text-[16px] w-full text-(--text-subtitle)">
          On a journey to create technology that feels human and works
          flawlessly.
        </span>
      </div>
      <button className="px-8 md:py-3 py-2 max-w-fit text-[16px] text-center bg-(--primary-color) rounded-3xl hover:bg-(--primary-color-darker">
        What do i offer?
      </button>

      <QuickStatsElement />
    </div>
  );
}
