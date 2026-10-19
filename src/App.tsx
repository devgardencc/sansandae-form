import Form from './Form';
import Intro from './Intro';

function App() {
  return (
    <>
      <main className="mx-auto grid min-h-screen w-[min(1240px,calc(100%_-_64px))] grid-cols-[minmax(330px,0.84fr)_minmax(500px,1.16fr)] gap-[clamp(48px,8vw,132px)] py-[42px] pb-[58px] max-[980px]:block max-[980px]:w-[min(680px,calc(100%_-_36px))] max-[980px]:pt-[25px]">
        <Intro />

        <section
          className="rounded-[2px] border border-line bg-paper p-[clamp(28px,5vw,68px)] shadow-paper max-[980px]:p-[30px_22px] max-[980px]:shadow-paper-mobile"
          aria-labelledby="form-title"
        >
          <Form />
        </section>
      </main>
      <footer className="mx-auto mt-0 flex w-[min(1240px,calc(100%_-_64px))] justify-between gap-5 border-t border-line py-5 pb-[35px] text-[11px] font-bold tracking-[.16em] text-muted max-[980px]:mt-[50px] max-[980px]:w-[min(680px,calc(100%_-_36px))] max-[480px]:text-[9px]">
        <span>SUMMIT FORM</span>
        <span>GO WHERE THE AIR IS CLEAR</span>
      </footer>
    </>
  );
}

export default App;
