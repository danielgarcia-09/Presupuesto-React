
import { Fragment, useState } from "react";
import Error from "./Error";
import PropTypes from 'prop-types';

const Pregunta = ({ guardarPresupuesto, guardarRestante, actualizarForm }) => {

    // * Definir State
    const [ cantidad, guardarCantidad ] = useState(0);
    const [ error, guardarError ] = useState(false);

    // * Funcion que lee el presupuesto
    const definirPresupuesto = e => {
        guardarCantidad( parseInt(e.target.value, 10) );
    }

    // * Submit para definir el presupuesto
    const agregarPresupuesto = e => {
        
        //todo| Esto previene que el form use metodo get o post y que la pag recargue
        e.preventDefault();

        //? Validar
        if ( cantidad < 1 || isNaN( cantidad ) ) {
            guardarError(true);
            return;
        }

        //? Si se pasa la validacion
        guardarError(false);

        guardarPresupuesto( cantidad );
        guardarRestante( cantidad );
        actualizarForm( false );
    }

    return ( 
        <Fragment>
            <h2>Coloca tu presupuesto</h2>

            { error ? <Error mensaje="El presupuesto es incorrecto" /> : null}

            <form
                onSubmit={ agregarPresupuesto }
            >
                <input 
                    type="number"
                    className="u-full-width"
                    placeholder="Coloca tu presupuesto"
                    onChange={ definirPresupuesto }
                    //? onChange={ e=> guardarCantidad( parseInt(e.target.value, 10) ) }
                />

                <input 
                    type="submit"
                    className="button-primary u-full-width"
                    value="Definir Presupuesto"
                />
            </form>
        </Fragment>
     );
}

Pregunta.propTypes = {
    guardarPresupuesto: PropTypes.func.isRequired,
    guardarRestante: PropTypes.func.isRequired,
    actualizarForm: PropTypes.func.isRequired
}
 
export default Pregunta;