import { useEffect, useState } from "react";
import Pregunta from "./components/Pregunta";
import Formulario from "./components/Formulario";
import Listado from "./components/Listado";
import ControlPresupuesto from "./components/ControlPresupuesto";

function App() {

  //* State Presupuesto, Restante, Mostrar Form y Gastos 
  const [ presupuesto, guardarPresupuesto ] = useState(0);
  let [ restante, guardarRestante ] = useState(0);
  const [ mostrar_form, actualizarForm ] = useState(true);
  const [ gastos, guardarGastos ] = useState([]);
  const [ gasto, guardarGasto ] = useState({});
  const [ crear_gasto, guardarCrearGasto ] = useState(false);

  //* Use Effect para revisar el valor de gasto automaticamente
  useEffect( () => {
    //* Si crear gasto es true se agrega
     if( crear_gasto ) {

        //? Agrega el nuevo presupuesto
        guardarGastos([
          ...gastos,
          gasto
        ]);

        //? Resta del presupuesto actual
        guardarRestante(restante - gasto.cantidad)

        //? Desactivar gasto
        guardarCrearGasto(false);
     }
  }, [gasto, crear_gasto, gastos, restante])

  return (
    <div className="container">
      <header>
        <h1>Gasto Semanal</h1>

        <div className="contenido-principal">

          { mostrar_form ? 
            (
              <Pregunta 
                guardarPresupuesto={ guardarPresupuesto }
                guardarRestante={ guardarRestante }
                actualizarForm={ actualizarForm }
              />
            ) : 
            (
              <div className="row">
                <div className="one-half column">
                    { restante > 0 ? 
                      (
                        <Formulario 
                          guardarGasto={ guardarGasto }
                          guardarCrearGasto={ guardarCrearGasto }
                        />
                      )
                      : null  
                    }
                </div>

                <div className={restante > 0 ? "one-half column" : ""}>
                    <Listado 
                      gastos={ gastos }
                    />
                    
                    <ControlPresupuesto 
                      presupuesto={ presupuesto }
                      restante={ restante }
                    />

                    { restante > 0 ? null : <button  className="button-primary u-full-width" onClick={ ()=> window.location.reload() }>Reiniciar</button> }
                </div>
              </div>
            )
          }
          
        </div>
      </header>

      
    </div>
  );
}

export default App;
