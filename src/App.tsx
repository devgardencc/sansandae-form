import './App.css';
import Form from './Form';
import Intro from './Intro';

function App() {
    return (
        <>
            <main className="page-shell">
                <Intro />

                <section className="form-panel" aria-labelledby="form-title">
                    <Form />
                </section>
            </main>
            <footer className="page-footer">
                <span>SUMMIT FORM</span>
                <span>GO WHERE THE AIR IS CLEAR</span>
            </footer>
        </>
    );
}

export default App;
