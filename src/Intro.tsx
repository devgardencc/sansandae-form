import logo from './assets/logo.png';

function Intro() {
  return (
    <section
      className="sticky top-[42px] mb-8 flex min-h-[calc(100vh-100px)] flex-col max-[980px]:static max-[980px]:mb-7 max-[980px]:min-h-0"
      aria-labelledby="page-title"
    >
      <div className="flex justify-between gap-5 text-[11px] font-bold tracking-[.16em] text-muted max-[480px]:text-[9px]">
        <span>SUMMIT FORM</span>
        <span>SANSANDAE</span>
      </div>
      <div className="relative mx-auto my-[clamp(42px,8vh,86px)] mb-[22px] grid aspect-square w-full max-w-[330px] place-items-center max-[980px]:my-7 max-[980px]:mb-5 max-[980px]:max-w-[210px]">
        <div
          aria-hidden="true"
          className="absolute h-[86%] w-[86%] rotate-[-17deg] rounded-full border border-line"
        />
        <img
          className="relative z-10 h-[84%] w-[84%] object-cover [mix-blend-mode:multiply]"
          src={logo}
          alt="Логотип с изображением горы и красных флажков"
        />
      </div>
      <div className="mt-auto max-w-[420px] center max-[980px]:mt-0 max-[980px]:text-center">
        <p className="mb-[17px] text-xs font-bold uppercase tracking-[.13em] text-accent">
          Собираемся выше обычного
        </p>
        <h1
          id="page-title"
          className="font-display text-[clamp(48px,6.3vw,80px)] font-semibold leading-[.94] tracking-[-.055em]"
        >
          Встретимся
          <br />
          <em className="text-accent not-italic">у подножия</em>
        </h1>
      </div>
    </section>
  );
}

export default Intro;
