import React from "react";
import Counter from "./Counter";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById('app'));
//create your first component
let counter = 0
let intervalId = null
const Home = ({counterValue}) => {

	const startCounter = () => {
		if(intervalId) return 

		intervalId = setInterval(() => {
			counter += 1
			renderApp(counter)
		}, 1000)
	}


	//Funcion parar contador
	const pauseCounter = () => {
		clearInterval(intervalId)
		intervalId = null
	}

	const resetCounter = () => {
		clearInterval(intervalId)
		intervalId = null
		counter = 0
		renderApp(counter)
	}

	const resumeCounter = () => {
		startCounter()
	}

	React.useEffect(() => {
        startCounter();
        return () => clearInterval(intervalId);
    }, []);


	return(
		<>
			<div className="header">
				<div className="back-count-section">
					<button>Cuenta regresiva</button>
					<input placeholder="Ingresar numero"></input>
				</div>
				<div className="action-button-section">
					<button onClick={pauseCounter}>Parar</button>
					<button onClick={resetCounter}>Reiniciar</button>
					<button onClick={resumeCounter}>Resumir</button>
				</div>
				<div className="alert-section">
					<button>Crear alerta</button>
					<input placeholder="Ingresar numero"></input>
				</div>
			</div>
			<div className="main">
				<section className="section">
					<div style={{ textAlign: "center"}}>
					<Counter value={counterValue} />
					</div>
				</section>
			</div>
		</>
	)
};

const renderApp = (counterValue) => {
    root.render(<Home counterValue={counterValue} />);
};

renderApp(counter);