import { useState } from 'react';
import { loginAspirante } from '../apiController/applicantsApi';
import LoginMessage from '../components/LoginMessage';

export default function LoginForm() {
  const [showloginMessage, setshowloginMessage] = useState(false);
  const [email, setEmail] = useState('');
  const [dni, setDni] = useState('');
  const [errors, setErrors] = useState({});


  const handleCancel = () => {
    setEmail('');
    setDni('');
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'Dni':
        setDni(value);
        break;
      case 'Email':
        setEmail(value);
        break;

      default:
        break;
    }
  };



  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formIsValid()) {
      return;
    }

    const formDataToSend = {
      Dni: dni,
      Email: email,
    };

    console.log('Aspirante datos formulario:', formDataToSend);

  const formData = new FormData();
  formData.append('Dni', dni);
  formData.append('Email', email);


    console.log('datos aspirante:', formData);
    try {
      const response = await loginAspirante(formData);
      console.log('Usuario encontrado:', response);
      setshowloginMessage(true);
      setTimeout(() => {
        setshowloginMessage(false);
        window.location.href = '/';
      }, 5000);

    } catch (error) {
      console.error('Error al Iniciar Sesion:', error);
    }
  };

  const formIsValid = () => {
    const errors = {};

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


    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
<div className="flex justify-center items-center h-screen">
  <form id="myForml" onSubmit={handleSubmit} encType="multipart/form-data" className="bg-white shadow-md rounded px-8 pt- pb-8 mb-4">
     <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Inicio de Sesión</h2>
    <div className="space-y-12">
      <div className="border-b border-gray-900/10 pb-12">

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
          <label htmlFor="Email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
          <div className="mt-4">
            <input id="Email" name="Email" type="email" required autoComplete="email"
              className={`block w-96 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                errors.email ? 'border-red-500' : ''
              }`}
              value={email} onChange={handleInputChange} />
            {errors.email && (
              <p className="mt-2 text-sm text-red-500">{errors.email}</p>
            )}
          </div>
        </div>

      </div>

      <div className="mt-6 flex items-center justify-center gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={handleCancel}>Cancelar</button>
        <button type="submit" id="botonl" className="rounded-md custom-link px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
      </div>

    </div>
      {showloginMessage && <LoginMessage message="Inicio de sesión exitoso!" />}
  </form>
</div>
  )
}
