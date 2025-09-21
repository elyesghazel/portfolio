import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-dark text-light">
        <div className="text-center">
          <h1 className="fs-1 fw-semibold">Elyes Ghazel a Software Engineer</h1>
          <p className="text-muted-foreground text-lg">
            I'm a software engineer and this website is currently in production.
          </p>
          <p className="text-muted-foreground text-lg">
            If you have questions, feel free to contact me:{" "}
            <a
              href="mailto:info@elyesghazel.ch"
              className="text-primary text-decoration-underline"
            >
              info@elyesghazel.ch
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
