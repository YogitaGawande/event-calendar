import { screen, render, fireEvent } from "@testing-library/react";
import Header from "./Header.component";

describe("<Calendar />", () => {
    it('should check if header is rendered correctly', () => {
        const handleNextClickSpy = jest.fn();
        const handlePreviousClickSpy = jest.fn();

        render(<Header displayMonth="August" displayYear={2023} handlePreviousClick={handlePreviousClickSpy} handleNextClick={handleNextClickSpy} />);
        screen.getByRole('heading', {
            name: /event calendar \- august 2023/i
        })
    })

    it('should check if next click is skipping to next week', () => {
        const handleNextClickSpy = jest.fn();
        const handlePreviousClickSpy = jest.fn();

        render(<Header displayMonth="August" displayYear={2023} handlePreviousClick={handlePreviousClickSpy} handleNextClick={handleNextClickSpy} />);
        const button = screen.getByTestId('next-click')
        fireEvent.click(button)
        expect(handleNextClickSpy).toHaveBeenCalled();
    })

    it('should check if previous click is skipping to previous week', () => {
        const handleNextClickSpy = jest.fn();
        const handlePreviousClickSpy = jest.fn();

        render(<Header displayMonth="August" displayYear={2023} handlePreviousClick={handlePreviousClickSpy} handleNextClick={handleNextClickSpy} />);
        const button = screen.getByTestId('previous-click')
        fireEvent.click(button)
        expect(handlePreviousClickSpy).toHaveBeenCalled();
    })
});