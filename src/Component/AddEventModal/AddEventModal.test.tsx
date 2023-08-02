import { screen, render, fireEvent } from "@testing-library/react";
import AddEventModal from "./AddEventModal.component";

describe("<AddEventModal />", () => {
    const handleCellClickSpy = jest.fn();
    const setEventTitleSpy = jest.fn();
    const handleSaveEventSpy = jest.fn();
    render(<AddEventModal innerIndex={1} date={2023} hour={'10:00'} eventTitle={'Event 1'} selectedDate={'2023-08-02'} selectedTime={'10:00'} handleSaveEvent={handleSaveEventSpy} setEventTitle={setEventTitleSpy} handleCellClick={handleCellClickSpy} />);
    it('should check if modal is rendered correctly', () => {
        screen.getByText('Add Event');
    });
});