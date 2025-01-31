const LoginMessage = ({ message }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Login Exitoso</h2>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default LoginMessage;