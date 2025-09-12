import { describe, expect, it, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../auth/AuthContext';
import { PrivateRoute } from '../auth/PrivateRoute';

function AdminPage() {
  return <div>ADMIN PAGE</div>;
}

function LoginPage() {
  return <div>LOGIN PAGE</div>;
}

describe('PrivateRoute', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('redirects to /login without token', async () => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={[{ pathname: '/admin' }] as any}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<PrivateRoute />}>
              <Route index element={<AdminPage />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    expect(await screen.findByText('LOGIN PAGE')).toBeInTheDocument();
  });
});

