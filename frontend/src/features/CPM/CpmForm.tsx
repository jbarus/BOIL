import { useParams } from "react-router-dom"
import { Group, TextInput, Select, Button, Text, Space, NumberInput, MultiSelect, ComboboxItem, Alert } from '@mantine/core';
import React, { useState, MouseEventHandler, useEffect } from 'react';
import { Event, Activity } from "../../types/CpmClass";





export const CpmForm = () => {
    // const{id}=useParams();





    //useState MultiSelect początkowy
    const [eventUse, setEventUse] = useState<Event[]>([]);
    const [activityUse, setactivityUse] = useState<Activity[]>([]);
    const [eventName, setEventName] = useState("");
    const [actionName, setActionName] = useState("");
    const [actionTime, setActionTime] = useState<number | string>(0);
    const [actionStart, setActionStart] = useState<null | string>("");
    const [actionEnd, setActionEnd] = useState<null | string>("");
    const [nameStart, setNameStart] = useState<string[]>([]);
    const [nameEnd, setNameEnd] = useState<string[]>([]);
    const [formData, setFormData] = useState<{ name: string; time: number | string; start: string | null; end: string | null; }[]>([]);
    const [diagramclick, setdiagramclick] = useState(false);

    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    //funkcja wywołująca się po zmmianie tekstu w polu tekstowym

    useEffect(() => {
        console.log("FormData:", formData);
    }, [formData]);

    const handleInputChangeEvent = (newValue: number | string) => {

        const stringValue: string = newValue.toString();
        setEventName(stringValue);
    };

    const handleInputChangeAction = (event: React.ChangeEvent<HTMLInputElement>) => {
        setActionName(event.target.value);
    };

    const startOnChange = (value: string | null, option: ComboboxItem) => {
        setActionStart(value)

    }

    const endOnChange = (value: string | null, option: ComboboxItem) => {
        setActionEnd(value)

    }

    // funkcja wywołująca się po zmianie wartości w polu liczbowym
    const handleNumberInputChange = (newValue: number | string) => {
        setActionTime(newValue);
        console.log('Nowa wartość siemanko:', actionTime);
    };

    const eventOnClick = () => {
        if (eventName && !nameStart.includes(eventName)) {
            const tmp = new Event(eventName);

            if (eventName == "1") {
                tmp.start = 1;
            }
            setEventUse(prevEvents => [...prevEvents, tmp]);
            setNameStart(prevNames => [...prevNames, eventName]);
            setNameEnd(prevNames => [...prevNames, eventName]);





        }
    };

    const findEventByName = (eventName: string): Event => {
        let myObject: Event | undefined = eventUse.find(event => event.name === eventName);
        let eventbyname=myObject as Event;
        return  eventbyname;
    };

    const eventOnClick2 = () => {
        //console.log("Button clicked with event:", eventName, "and action:", actionName);

        if (eventName && actionName && nameStart.includes(eventName) && nameEnd.includes(eventName)) {
            const actionEndString: string = actionEnd ?? "";
            const actionStartString: string = actionStart ?? "";
            const timeNumber: number = typeof actionTime === "string" ? parseFloat(actionTime) : actionTime as number;


            let tmpActivity:Activity= new Activity(actionName,timeNumber,actionStartString,actionEndString )

            setactivityUse(prevActivity => [...prevActivity, tmpActivity]);
            const newData = {
                name: actionName,
                time: actionTime,

                start: actionStart,
                end: actionEnd
            };
            setFormData(prevData => [...prevData, newData]);
           

        }
        console.log("hejka tu lenka");
        console.log(activityUse);

    };

    const diagram_click = () => {
        console.log("Button clicked after the second click");
        // Add your desired functionality here
    };

    return (
        <div>
            <Text>Dodaj zdarzenie</Text>
            <Group>
                <NumberInput
                    onChange={handleInputChangeEvent}
                    placeholder="Nazwa"
                />



            </Group>
            <Space h="md" />
            <Button
                variant="gradient"
                gradient={{ from: 'red', to: 'blue', deg: 263 }}
                onClick={eventOnClick}
            >Potwierdź
            </Button>

            <Space h="md" />

            {/* Dodawanie  nowejo czynności */}
            <Group>
                {/* Text field z nazwą */}
                <TextInput
                    id="name"
                    placeholder="Nazwa"
                    onChange={handleInputChangeAction}
                    style={{ width: '10%' }}
                />

                {/* Text field z czasem wykonania */}
                <NumberInput

                    onChange={handleNumberInputChange}
                    placeholder="Wprowadz czas wykonania"
                />
                <Select
                    placeholder="Zdarzenie początkowe"
                    data={nameStart.map(name => ({ value: name, label: name }))}
                    onChange={startOnChange}
                />
                <Select
                    onChange={endOnChange}
                    placeholder="Zdarzenie końcowe"
                    data={nameEnd.map(name => ({ value: name, label: name }))}
                />
            </Group>
            <Space h="md" />
            <Button
                variant="gradient"
                gradient={{ from: 'red', to: 'blue', deg: 263 }}
                onClick={eventOnClick2}
            >   Potwierdź
            </Button>
            <Space h="md" />
            <Button
                variant="gradient"
                gradient={{ from: 'red', to: 'blue', deg: 263 }}
                onClick={diagram_click}
            >   Diagram  
            </Button>
            <div style={{ overflowX: 'auto', maxHeight: '300px', overflowY: 'auto' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%', borderBottom: '4px solid black' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
                        <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Nazwa</th>
                        <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Czas</th>
                        <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Zdarzenie początkowe</th>
                        <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Zdarzenie końcowe</th>
                    </tr>
                </thead>
                <tbody>
                    {formData.map((data, index) => (
                        <tr key={index} style={{ borderBottom: '1px solid #dee2e6' }}>
                            <td style={{ padding: '10px' }}>{data.name}</td>
                            <td style={{ padding: '10px' }}>{data.time}</td>
                            <td style={{ padding: '10px' }}>{data.start}</td>
                            <td style={{ padding: '10px' }}>{data.end}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
};