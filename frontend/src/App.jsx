import { Route, Routes } from "react-router-dom";
import CreateBook from "./pages/CreateBook";
import Dashboard from "./pages/Dashboard";
import DeleteBook from "./pages/DeleteBook";
import EditBook from "./pages/EditBook";
import Login from "./pages/Login/Login";
import SignUp from "./pages/Register/SignUp";
import ShowBook from "./pages/ShowBook";
import Home from "./pages/User/Home/Home";
import PrivateRouter from "./routes/PrivateRoute";

const App=()=>{

  return(
    <>
    <Routes>
      <Route path='/dashboard' element={<PrivateRouter><Dashboard /></PrivateRouter>} />
      <Route path='/books/create' element={<CreateBook />} />
      <Route path='/books/details/:id' element={<ShowBook />} />
      <Route path='/books/edit/:id' element={<EditBook />} />
      <Route path='/books/delete/:id' element={<DeleteBook />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/' element={<Home />} />
    </Routes>
   
    </>
  )
}
export default App; 