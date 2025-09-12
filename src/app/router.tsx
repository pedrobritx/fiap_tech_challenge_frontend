import { Route, Routes } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import PostRead from '../pages/PostRead';
import Admin from '../pages/Admin';
import PostCreate from '../pages/PostCreate';
import PostEdit from '../pages/PostEdit';
import Login from '../pages/Login';
import { PrivateRoute } from '../auth/PrivateRoute';

export function AppRouter() {
  return (
    <Routes>
      <Route element={<App />}>
        <Route index element={<Home />} />
        <Route path="/posts/:id" element={<PostRead />} />

        <Route path="/admin" element={<PrivateRoute />}>
          <Route index element={<Admin />} />
          <Route path="posts/new" element={<PostCreate />} />
          <Route path="posts/:id/edit" element={<PostEdit />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}

