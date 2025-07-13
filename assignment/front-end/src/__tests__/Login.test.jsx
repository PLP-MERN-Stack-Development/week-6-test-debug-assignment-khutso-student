import React from 'react';
import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Login from '../pages/Login';
import { AuthContext } from '../context/AuthContext';

test('renders login form and allows user to input credentials', async () => {
  const mockLogin = vi.fn();

  render(
    <AuthContext.Provider value={{ login: mockLogin }}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </AuthContext.Provider>
  );

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);

  await userEvent.type(emailInput, 'test@example.com');
  await userEvent.type(passwordInput, 'password123');

  expect(emailInput.value).toBe('test@example.com');
  expect(passwordInput.value).toBe('password123');
});
