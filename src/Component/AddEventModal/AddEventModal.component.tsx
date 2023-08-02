import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import './AddEventModal.modules.css';

const AddEventModel = (prop: any) => (
    <Dialog.Root>
        <div
            onClick={() =>
                prop.handleCellClick(
                    prop.date.toISOString().slice(0, 10),
                    prop.hour.toString().padStart(2, "0") + ":00"
                )
            }
            key={prop.innerIndex}
            className="h-1"
        >
            <Dialog.Trigger asChild>
                <button className="text-white opacity-0 ">Add Event</button>
            </Dialog.Trigger>
        </div>
        <Dialog.Portal>
            <Dialog.Overlay className="DialogOverlay" />
            <Dialog.Content className="DialogContent">
                <Dialog.Title data-testid="add-event-heading" className="DialogTitle">Add Event</Dialog.Title>
                <Dialog.Description className="DialogDescription">
                    Add details to add new event.
                </Dialog.Description>
                <fieldset className="Fieldset">
                    <label className="Label" htmlFor="title">
                        Title
                    </label>
                    <input className="Input" id="name" defaultValue="Pedro Duarte" value={prop.eventTitle}
                        onChange={(e) => prop.setEventTitle(e.target.value)} />
                </fieldset>
                <fieldset className="Fieldset">
                    <label className="Label" htmlFor="Date">
                        Date
                    </label>
                    <label className="Label" htmlFor="{selectedDate}">
                        {prop.selectedDate}
                    </label>
                </fieldset>
                <fieldset className="Fieldset">
                    <label className="Label" htmlFor="Time">
                        Time
                    </label>
                    <label className="Label" htmlFor="{selectedTime}">
                        {prop.selectedTime}
                    </label>
                </fieldset>
                <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                    <Dialog.Close asChild>
                        <button data-testid="save-event" className="Button green" onClick={prop.handleSaveEvent}>Save Event</button>
                    </Dialog.Close>
                </div>
                <Dialog.Close asChild>
                    <button className="IconButton" aria-label="Close">
                        <Cross2Icon />
                    </button>
                </Dialog.Close>
            </Dialog.Content>
        </Dialog.Portal>
        {/* </Dialog.Dialog> */}
    </Dialog.Root>
);

export default AddEventModel;