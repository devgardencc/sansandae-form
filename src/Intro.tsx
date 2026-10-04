import logo from './assets/logo.jpg';

function Intro() {
    return (
        <section
            className="sticky top-0 flex min-h-[calc(100vh-100px)] flex-col max-[850px]:static max-[850px]:min-h-0 mb-8"
            aria-labelledby="page-title"
        >
            <div className="flex justify-between gap-5 text-[10px] font-bold tracking-[.18em] text-[#77736b] max-[480px]:text-[8px]">
                <span>SUMMIT FORM</span>
                <span>SANSANDAE</span>
            </div>
            <div className="relative mx-auto my-[clamp(42px,8vh,86px)] mb-[22px] grid aspect-square w-full max-w-[330px] place-items-center max-[850px]:my-[46px] max-[850px]:mb-[26px] max-[850px]:max-w-[260px]">
                <div
                    aria-hidden="true"
                    className="absolute h-[86%] w-[86%] rotate-[-17deg] rounded-full border border-[#d9d3c8]"
                />
                <img
                    className="relative z-10 h-[84%] w-[84%] object-cover [mix-blend-mode:multiply]"
                    src={logo}
                    alt="Логотип с изображением горы и красных флажков"
                />
            </div>
            <div className="mt-auto max-w-[420px] max-[850px]:mt-0 center max-[850px]:text-center">
                <p className="mb-[17px] text-[11px] font-bold uppercase tracking-[.13em] text-[#d73428]">
                    Собираемся выше обычного
                </p>
                <h1
                    id="page-title"
                    className="font-display text-[clamp(48px,6.3vw,80px)] font-semibold leading-[.94] tracking-[-.055em]"
                >
                    Встретимся
                    <br />
                    <em className="text-[#d73428] not-italic">у подножия</em>
                </h1>
            </div>
        </section>
    );
}

export default Intro;
