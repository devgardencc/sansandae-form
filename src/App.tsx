import Form from './Form';
import Intro from './Intro';

function App() {
    return (
        <>
            <main className="mx-auto grid min-h-screen w-[min(1240px,calc(100%_-_64px))] grid-cols-[minmax(330px,0.84fr)_minmax(500px,1.16fr)] gap-[clamp(48px,8vw,132px)] py-[42px] pb-[58px] max-[850px]:block max-[850px]:w-[min(680px,calc(100%_-_36px))] max-[850px]:pt-[25px]">
                <Intro />

                <section
                    className="border border-[#d9d3c8] bg-[#fbfaf7] p-[clamp(28px,5vw,68px)] shadow-[18px_18px_0_rgba(217,211,200,0.48)] max-[850px]:p-[30px_22px] max-[850px]:shadow-[10px_10px_0_rgba(217,211,200,0.48)]"
                    aria-labelledby="form-title"
                >
                    <Form />
                </section>
            </main>
            <footer className="mx-auto mt-0 flex w-[min(1240px,calc(100%_-_64px))] justify-between gap-5 border-t border-[#d9d3c8] py-5 pb-[35px] text-[10px] font-bold tracking-[.18em] text-[#77736b] max-[850px]:mt-[50px] max-[850px]:w-[min(680px,calc(100%_-_36px))] max-[480px]:text-[8px]">
                <span>SUMMIT FORM</span>
                <span>GO WHERE THE AIR IS CLEAR</span>
            </footer>
        </>
    );
}

export default App;
