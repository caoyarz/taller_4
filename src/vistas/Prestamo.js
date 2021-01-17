/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import MaterialDatatable from "material-datatable";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2)

  },
  delete: {
    backgroundColor: "red"
  }

}));

export default function Libro() {
  const classes = useStyles();

  const { register, handleSubmit, errors, getValues, setValue, reset } = useForm(
    { defaultValues: { idPersona: "Persona *", libro: "Libro *", fecha: ''} });

  const [libros, setLibros] = useState([])
  const [accion, setAccion] = useState("Guardar")
  const [idLibro, setIdLibro] = useState(null);
  const [personas, setPersonas] = useState([])
  const [prestamos,setPrestamos] = useState([])
  var date = new Date();
  const fecha =useState(date.getFullYear() + "-" + (date.getMonth() +1) + "-" + date.getDate())

  useEffect(() => {
    cargarLibro();
    cargarPersonas();
    cargarPrestamos();
  }, []);

  const columns = [
    {
      name: 'Libro',
      field: 'libro.nombre'
    },
    {
      name: 'Persona',
      field:'persona.nombre'
    },
    {
      name: 'Fecha',
      field: 'fecha'
    }
  ];

  const options = {
    selectableRows: false,
    print: false,
    onlyOneRowCanBeSelected: false,
    textLabels: {
      body: {
        noMatch: "Lo sentimos, no se encuentran registros",
        toolTip: "Sort",
      },
      pagination: {
        next: "Siguiente",
        previous: "Página Anterior",
        rowsPerPage: "Filas por página:",
        displayRows: "de",
      },
    },
    download: false,
    pagination: true,
    rowsPerPage: 5,
    usePaperPlaceholder: true,
    rowsPerPageOptions: [5, 10, 25],
    sortColumnDirection: "desc",
  }
  const onSubmit = data => {

    if (accion == "Guardar") {
      console.log(data)
      if(data.fecha) {
        axios
          .post("http://localhost:9000/api/prestamo", data, {
            headers: {
              Accept: '*/*'
            }
          })
          .then(
            (response) => {
              if (response.status == 200) {
                alert("Registro ok")
                cargarPrestamos();
                reset();
              }
            },
            (error) => {
              alert ('Error con el registro')
              // Swal.fire(
              //   "Error",
              //   "No es posible realizar esta acción: " + error.message,
              //   "error"
              // );
            }
          )
          .catch((error) => {
            // Swal.fire(
            //   "Error",
            //   "No cuenta con los permisos suficientes para realizar esta acción",
            //   "error"
            // );
            console.log(error);
          });
        }
        else {alert('Error con el registro')}
    }
  }
  const cargarLibro = async () => {
    // const { data } = await axios.get('/api/zona/listar');

    const { data } = await axios.get("http://localhost:9000/api/libro");

    setLibros(data.libroConAutor);

  };
const cargarPersonas = async () => {
    // const { data } = await axios.get('/api/zona/listar');

    const { data } = await axios.get("http://localhost:9000/api/personas");

    setPersonas(data.persona);
  };

  const cargarPrestamos = async () => {
    // const { data } = await axios.get('/api/zona/listar');

    const { data } = await axios.get("http://localhost:9000/api/prestamo");

    setPrestamos(data.resultado);
  };
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Button
          type="button"
          fullWidth
          variant="contained"

          className={classes.submit}
          onClick={() => { reset(); setAccion("Guardar"); setIdLibro(null) }}
        >
          Nuevo
          </Button>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                inputProps={{
                  inputRef: (ref) => {
                    if (!ref) return;
                    setValue("idPersona", ref.value)
                    register({
                      name: "idPersona",
                      value: ref.value,
                    });
                  },
                }}
             >
               <MenuItem  disabled>Seleccionar una persona</MenuItem>
               {
                  personas.map((persona) => 
                    <MenuItem key={persona._id} value={persona._id} name="idautor">{persona.nombre}</MenuItem>
                  )
               }
              
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                inputProps={{
                  inputRef: (ref) => {
                    if (!ref) return;
                    setValue("libro", ref.value)
                    register({
                      name: "libro",
                      value: ref.value,
                    });
                  },
                }}
             >
               <MenuItem  disabled>Seleccionar un libro</MenuItem>
               {
                  libros.map((libro) => 
                    <MenuItem key={libro._id} value={libro._id} name="libro">{libro.nombre}</MenuItem>
                  )
               }
              
              </Select>
            </Grid>
            <Grid item xs={12}>
            <TextField
                name="fecha"
                variant="outlined"
                disabled
                fullWidth
                autoComplete="fecha"
                label="Fecha"
                inputProps={{
                  inputRef: (ref) => {
                    if (!ref) return;
                    setValue("fecha", fecha[0])
                    register({
                      name: "fecha",
                      value: ref.value,
                    });
                  },
                }}
              >{
                console.log(fecha[0])
              }
               
              </TextField>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {accion}
          </Button>
          <Grid container spacing={1}>
            <MaterialDatatable

              title={"Libros"}
              data={prestamos}
              columns={columns}
              options={options}
            />
          </Grid>
        </form>


      </div>

    </Container>
  );
}