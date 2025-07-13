import React from 'react'
import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Signup from '../pages/Signup';
import { AuthContext } from '../context/AuthContext';

test('renders signup form and allows user to input details', async () => {
  const mockLogin = vi.fn();

  render(
    <AuthContext.Provider value={{ login: mockLogin }}>
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    </AuthContext.Provider>
  );

  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);

  await userEvent.type(nameInput, 'Test User');
  await userEvent.type(emailInput, 'test@example.com');
  await userEvent.type(passwordInput, 'password123');

  expect(nameInput.value).toBe('Test User');
  expect(emailInput.value).toBe('test@example.com');
  expect(passwordInput.value).toBe('password123');
});
