import React from "react";
import Counter from "./Counter";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById('app'));
//create your first component
let counter = 0
let intervalId = null
let isCountingDown  = false
let alertValue = null
const Home = ({counterValue}) => {

	const startCounter = () => {
		if(intervalId || isCountingDown ) return 

		intervalId = setInterval(() => {
			if(checkAlert()) return
			counter += 1
			renderApp(counter)
		}, 1000)
	}

	const counterDown = () => {
        if (intervalId || !isCountingDown) return;

        intervalId = setInterval(() => {
			if(checkAlert()) return
            if (counter > 0) {
                counter -= 1;
                renderApp(counter);
            } else {
                clearInterval(intervalId);
                intervalId = null;
            }
        }, 1000);
    };


	//Parar contador
	const pauseCounter = () => {
		clearInterval(intervalId)
		intervalId = null
	}

	//Resetear contador
	const resetCounter = () => {
		isCountingDown = false
		clearInterval(intervalId)
		intervalId = null
		counter = 0
		renderApp(counter)
	}

	//Resumir contador
	const resumeCounter = () => {
		if (isCountingDown) {
            counterDown(); // Reanuda la cuenta regresiva
        } else {
            startCounter(); // Reanuda el conteo ascendente
        }
	}

	//Llamar al iniciar la app
	React.useEffect(() => {
        startCounter();
        return () => clearInterval(intervalId);
    }, []);

	//Funcion cuenta regresiva
	const countdown = () => {
		isCountingDown = true
		let inputElement = document.getElementById("countdown")
		clearInterval(intervalId)
		intervalId = null
		counter = parseInt(inputElement.value)
		intervalId = setInterval(() => {
			counter === 0 ? (resetCounter(), isCountingDown = false, intervalId = null) : renderApp(counter), counter-=1, checkAlert()
		},1000)
	}

	//Funcion verificar alerta en cada actualizacion del estado
	const checkAlert = () => {
		
		if (alertValue !== null && counter === alertValue) {
            alert("¡Tiempo alcanzado!");
			clearInterval(intervalId);
            intervalId = null;
            isCountingDown = false;
			alertValue = null
			return true
        }
		return false
	}

	//Funcion alerta
	const alertFunction = () => {
		let alertElement = document.getElementById("alert")
		alertValue = parseInt(alertElement.value)
	}

	return(
		<>
			<div className="header">
				<div className="back-count-section">
					<button onClick={countdown} >Cuenta regresiva</button>
					<input id="countdown" placeholder="Ingresar numero"></input>
				</div>
				<div className="action-button-section">
					<button onClick={pauseCounter}>Parar</button>
					<button onClick={resetCounter}>Reiniciar</button>
					<button onClick={resumeCounter}>Resumir</button>
				</div>
				<div className="alert-section">
					<button onClick={alertFunction}>Crear alerta</button>
					<input id="alert" placeholder="Ingresar numero"></input>
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