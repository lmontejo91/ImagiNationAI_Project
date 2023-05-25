import React, { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Modal from "react-modal";
import { AuthContext, AuthProvider } from "./utils";
import { Navbar, Footer } from "./components";
import { HomePage, ImagePage, GeneratorPage, UserProfilePage } from "./views";

Modal.setAppElement("#root"); //Esto le dice a React Modal cuál es el elemento raíz de tu aplicación para asegurarse de que los lectores de pantalla ignoren el contenido principal de la aplicación cuando el modal esté abierto.

const App = () => {

  const authContext = useContext(AuthContext);

  return (
    <div className="appContainer">
      <Navbar/>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/image-page" element={<ImagePage />} />
            {authContext.isAuthenticated() ? (
              <>
                <Route path="/generator-page/:user_id" element={<GeneratorPage />} />
                <Route path="/user-page/:user_id" element={<UserProfilePage />} />
              </>
            ) : (
              <Route
                path="/*"
                element={<Navigate to="/" replace />}
              />
            )}
          </Routes>
        </main>
        <Footer />
    </div> 
  );
};

export default App;


{/* <BrowserRouter>
      <AuthProvider>
        <Navbar/>
        <main>
          {/* <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/generator-page" element={<GeneratorPage />} />
            {/* <Route path="/generator-page/{user_id}" element={<GeneratorPage />} /> 
            <Route path="/user-page" element={<UserProfilePage />} />
            <Route path="/image-page" element={<ImagePage />} />
          </Routes> 
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/image-page" element={<ImagePage />} />
            <Route element={<AuthRoutes />} /> {/* Envolver AuthRoutes en un Route 
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </BrowserRouter> */}

    /* const AuthRoutes = () => {
  const authContext = React.useContext(AuthContext);

  return authContext.isAuthenticated() ? (
    <>
      <Route path="/generator-page" element={<GeneratorPage />} />
      <Route path="/user-page" element={<UserProfilePage />} />
    </>
  ) : (
    <Navigate to="/" replace />
  );
}; */