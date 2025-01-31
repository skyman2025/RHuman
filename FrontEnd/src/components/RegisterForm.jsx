import { useState } from 'react';
import { cargaRegistro } from '../apiController/applicantsApi';
import SuccessMessage from '../components/SuccessMessage';

export default function RegisterForm() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [linkedinURL, setLinkedinURL] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [sexo, setSexo] = useState('');
  const [profesionID, setProfesionID] = useState('');
  const [estadoID, setEstadoID] = useState('');
  const [password, setPassword] = useState('');
  const [imagen, setImagen] = useState(null);

  const [errors, setErrors] = useState({});

  const handleCancel = () => {
    setNombre('');
    setApellido('');
    setDni('');
    setEmail('');
    setTelefono('');
    setLinkedinURL('');
    setFechaNacimiento('');
    setSexo('');
    setProfesionID('');
    setEstadoID('');
    setPassword('');
    setImagen(null);
    setErrors({});
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'Nombre':
        setNombre(value);
        break;
      case 'Apellido':
        setApellido(value);
        break;
      case 'Dni':
        setDni(value);
        break;
      case 'Email':
        setEmail(value);
        break;
      case 'Telefono':
        setTelefono(value);
        break;
      case 'LinkedinURL':
        setLinkedinURL(value);
        break;
      case 'FechaNacimiento':
        setFechaNacimiento(value);
        break;
      case 'Sexo':
        setSexo(value);
        break;
      case 'ProfesionID':
        setProfesionID(value);
        break;
      case 'EstadoID':
        setEstadoID(value);
        break;
      case 'Password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

    const handleFileChange = (event) => {
      const file = event.target.files[0];

      if (file) {
        if (!/\.(jpg|jpeg|png|gif)$/i.test(file.name)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            imagen: 'El archivo debe ser una imagen (PNG, JPG, GIF).',
          }));
          return;
        }

        if (file.size > 10 * 1024 * 1024) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            imagen: 'La imagen debe ser menor de 10MB.',
          }));
          return;
        }

        setImagen(file);
        setErrors((prevErrors) => ({
          ...prevErrors,
          imagen: null,
        }));
      }
    };


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formIsValid()) {
      return;
    }

    const formDataToSend = {
      Nombre: nombre,
      Apellido: apellido,
      Dni: dni,
      Email: email,
      Telefono: telefono,
      LinkedinURL: linkedinURL,
      FechaNacimiento: fechaNacimiento,
      Sexo: sexo,
      ProfesionID: profesionID,
      EstadoID: estadoID,
      Password: password,
      Imagen: imagen
    };

    console.log('Aspirante datos formulario:', formDataToSend);

  const formData = new FormData();
  formData.append('Nombre', nombre);
  formData.append('Apellido', apellido);
  formData.append('Dni', dni);
  formData.append('Email', email);
  formData.append('Telefono', telefono);
  formData.append('LinkedinURL', linkedinURL);
  formData.append('FechaNacimiento', fechaNacimiento);
  formData.append('Sexo', sexo);
  formData.append('ProfesionID', profesionID);
  formData.append('EstadoID', estadoID);
  formData.append('Password', password);
  if (imagen) {
    formData.append('Imagen', imagen);
  }

    console.log('datos aspirante:', formData);
    try {
      const response = await cargaRegistro(formData);
      console.log('Aspirante registrado:', response);

     setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        window.location.href = '/';
      }, 5000);


    } catch (error) {
      console.error('Error al registrar aspirante:', error);
    }
  };

  const formIsValid = () => {
    const errors = {};


    if (!nombre.trim()) {
        errors.nombre = 'El nombre es requerido.';
      } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(nombre)) {
        errors.nombre = 'El nombre solo puede contener letras, espacios y caracteres acentuados.';
      }

    if (!apellido.trim()) {
      errors.apellido = 'El apellido es requerido';
    }else if (!/^[A-Za-z\s]+$/.test(apellido)) {
      errors.apellido = 'El apellido solo puede contener letras y espacios.';
    }

    if (!dni.trim()) {
      errors.dni = 'El DNI es requerido';
    } else if (!/^\d{8}$/.test(dni.trim())) {
      errors.dni = 'Formato de DNI inválido (8 dígitos numéricos)';
    }
    if (!email.trim()) {
      errors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(email.trim())) {
      errors.email = 'Formato de email inválido';
    }
    if (!telefono.trim()) {
      errors.telefono = 'El teléfono es requerido';
    }else if (!/^\d{11}$/.test(telefono.trim())) {
      errors.telefono = 'Formato de Telefono inválido (11 dígitos numéricos)';
    }

    if (!linkedinURL.trim()) {
      errors.linkedinURL = 'El LinkedIn URL es requerido';
    }else if (!/^https?:\/\/[^\s]+$/.test(linkedinURL)) {
      errors.linkedinURL = 'El LinkedIn URL no es válido';
    }

    if (!fechaNacimiento.trim()) {
      errors.fechaNacimiento = 'La fecha de nacimiento es requerida';
    }
    if (!sexo.trim()) {
      errors.sexo = 'El sexo es requerido';
    }else if (!/^(m|f|otros)$/i.test(sexo)) {
    errors.sexo = 'El valor del sexo debe ser "M", "F" o "otros".';
    }

    if (!profesionID) {
      errors.profesionID = 'La profesión es requerida';
    }
    if (!estadoID) {
      errors.estadoID = 'El estado es requerido';
    }
    if (!password.trim()) {
      errors.password = 'La contraseña es requerida';
    }else if (password.length < 8) {
      errors.password = 'La contraseña debe tener al menos 8 caracteres.';
    }

    if (!imagen) {
      errors.imagen = 'La imagen es requerida.';
    } else if (!/\.(jpg|jpeg|png|gif)$/i.test(imagen.name)) {
      errors.imagen = 'El archivo debe ser una imagen (PNG, JPG, GIF).';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <form id="myForm" onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Ingresa tu Informacion Personal</h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="Nombre" className="block text-sm font-medium leading-6 text-gray-900">Nombre</label>
              <div className="mt-2">
                <input type="text" name="Nombre" id="Nombre" required autoComplete="on"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    errors.nombre ? 'border-red-500' : ''
                  }`}
                  value={nombre} onChange={handleInputChange} />
                {errors.nombre && (
                  <p className="mt-2 text-sm text-red-500">{errors.nombre}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="Apellido" className="block text-sm font-medium leading-6 text-gray-900">Apellido</label>
              <div className="mt-2">
                <input type="text" name="Apellido" id="Apellido" required autoComplete="on"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    errors.apellido ? 'border-red-500' : ''
                  }`}
                  value={apellido} onChange={handleInputChange} />
                {errors.apellido && (
                  <p className="mt-2 text-sm text-red-500">{errors.apellido}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="Dni" className="block text-sm font-medium leading-6 text-gray-900">DNI</label>
              <div className="mt-2">
                <input type="text" name="Dni" id="Dni" required autoComplete="on"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    errors.dni ? 'border-red-500' : ''
                  }`}
                  value={dni} onChange={handleInputChange} />
                {errors.dni && (
                  <p className="mt-2 text-sm text-red-500">{errors.dni}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="Telefono" className="block text-sm font-medium leading-6 text-gray-900">Teléfono</label>
              <div className="mt-2">
                <input type="text" name="Telefono" id="Telefono" required autoComplete="on"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    errors.telefono ? 'border-red-500' : ''
                  }`}
                  value={telefono} onChange={handleInputChange} />
                {errors.telefono && (
                  <p className="mt-2 text-sm text-red-500">{errors.telefono}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="Password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
              <div className="mt-2">
                <input type="password" name="Password" id="Password" required autoComplete="on"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    errors.password ? 'border-red-500' : ''
                  }`}
                  value={password} onChange={handleInputChange} />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-500">{errors.password}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="Email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
              <div className="mt-2">
                <input id="Email" name="Email" type="email" required autoComplete="email"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                  value={email} onChange={handleInputChange} />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="LinkedinURL" className="block text-sm font-medium leading-6 text-gray-900">Linkedin</label>
              <div className="mt-2">
                <input id="LinkedinURL" name="LinkedinURL" type="text" required autoComplete="on"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    errors.linkedinURL ? 'border-red-500' : ''
                  }`}
                  value={linkedinURL} onChange={handleInputChange} />
                {errors.linkedinURL && (
                  <p className="mt-2 text-sm text-red-500">{errors.linkedinURL}</p>
                )}
              </div>
            </div>

              <div className="sm:col-span-2">
              <label htmlFor="ProfesionID" className="block text-sm font-medium leading-6 text-gray-900">Profesión</label>
              <div className="mt-2">

                <select type="text" name="ProfesionID" id="ProfesionID" required autoComplete="on"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    errors.profesionID ? 'border-red-500' : ''
                  }`}
                  value={profesionID}
                  onChange={handleInputChange}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="1">Desarrollador de Software</option>
                  <option value="2">Ingeniero de Sistemas</option>
                  <option value="3">Analista de Datos</option>
                  <option value="4">Especialista en Ciberseguridad</option>
                  <option value="5">Administrador de Base de Datos</option>
                  <option value="6">Ingeniero DevOps</option>
                  <option value="7">Arquitecto de Soluciones</option>
                  <option value="8">Desarrollador Front End</option>
                  <option value="9">Desarrollador Back End</option>
                  <option value="10">Analista de Sistemas</option>
                </select>
                {errors.profesionID && (
                  <p className="mt-2 text-sm text-red-500">{errors.profesionID}</p>
                )}
              </div>
            </div>

              <div className="sm:col-span-2">
              <label htmlFor="EstadoID" className="block text-sm font-medium leading-6 text-gray-900">Estado</label>
              <div className="mt-2">

                <select type="text" name="EstadoID" id="EstadoID" required autoComplete="on"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    errors.estadoID ? 'border-red-500' : ''
                  }`}
                  value={estadoID}
                  onChange={handleInputChange}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="1">En búsqueda</option>
                  <option value="2">No disponible</option>
                  <option value="3">Con trabajo</option>
                </select>
                {errors.estadoID && (
                  <p className="mt-2 text-sm text-red-500">{errors.estadoID}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="FechaNacimiento" className="block text-sm font-medium leading-6 text-gray-900">Fecha de Nacimiento</label>
              <div className="mt-2">
                <input type="date" name="FechaNacimiento" id="FechaNacimiento" required autoComplete="on"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    errors.fechaNacimiento ? 'border-red-500' : ''
                  }`}
                  value={fechaNacimiento} onChange={handleInputChange} />
                {errors.fechaNacimiento && (
                  <p className="mt-2 text-sm text-red-500">{errors.fechaNacimiento}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="Sexo" className="block text-sm font-medium leading-6 text-gray-900">Sexo</label>
              <div className="mt-2">
                <select type="text" name="Sexo" id="Sexo" required autoComplete="on"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    errors.sexo ? 'border-red-500' : ''
                  }`}
                  value={sexo}
                  onChange={handleInputChange}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                  <option value="otros">Otros</option>
                </select>
                {errors.sexo && (
                  <p className="mt-2 text-sm text-red-500">{errors.sexo}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-full">
            <label htmlFor="imagenPerfil" className="block text-sm font-medium leading-6 text-gray-900">Foto de Perfil</label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                </svg>
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label htmlFor="imagenPerfil" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                    <span className='custom-text'>Sube un archivo de imagen</span>
                    <input id="imagenPerfil" name="Imagen" type="file" className="sr-only" onChange={handleFileChange} />
                  </label>
                  <p className="pl-1">o arrastra y suelta aquí</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF hasta 10MB</p>
                {errors.imagen && (
                  <p className="mt-2 text-sm text-red-500">{errors.imagen}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 py-10 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900"  onClick={handleCancel}>Borrar</button>
        <button type="submit" id="botonv" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm custom-link focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Registrar</button>
      </div>
      {showSuccess && <SuccessMessage message="El registro fue exitoso!" />}
    </form>
  );
}
