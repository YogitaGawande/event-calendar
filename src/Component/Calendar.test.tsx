import { act, fireEvent, getAllByDisplayValue, render, screen, waitFor } from '@testing-library/react';
import Calendar from './Calendar.component';
describe("<Calendar />", () => {
  test("Should render component correctly", async () => {
    await act( async () => render(<Calendar/>));
  });
});