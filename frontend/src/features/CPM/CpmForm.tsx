import { useParams } from "react-router-dom"
import { Group, TextInput, Select, Button, Text, Space, NumberInput, MultiSelect, ComboboxItem, Alert } from '@mantine/core';
import React, { useState, MouseEventHandler, useEffect } from 'react';
import { Event, Activity } from "../../types/CpmClass";

import { graph } from '../../utils';

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
    const [showDiagram, setShowDiagram] = useState(false);
    const [editableIndex, setEditableIndex] = useState<number | null>(null);
    
    const [showAlert, setShowAlert] = useState(false);

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

            setShowAlert(true);

            setTimeout(() => {
                setShowAlert(false);
            }, 1000);

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

    const handleEdit = (index: number | undefined) => {
        if (index !== undefined) {
            setEditableIndex(index);
        } else {
            setEditableIndex(null); //null-linia nie jest edytowana
        }
        console.log("Delete clicked for index:", index);
    };
    
    const handleDelete = (index: number) => {
        const newData = [...formData];
        newData.splice(index, 1);
        setFormData(newData);
        console.log("Delete clicked for index:", index);
    };

    const diagram_click = () => {
        console.log("Diagram dupa clicked");
        //setShowDiagram(true);
        //const cy = graph(activityUse, eventUse);
        
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
            <Alert
                color="blue"
                onClose={() => setShowAlert(false)}
                className={`fade-alert ${showAlert ? 'show' : ''}`}
            >
                Event added successfully!
            </Alert>
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
                                <td style={{ padding: '10px' }}>
                                    {editableIndex === index ? (
                                        <TextInput 
                                        value={data.name} 
                                        onChange={(e) => {
                                            const newData = [...formData];
                                            newData[index].name = e.target.value;
                                            setFormData(newData);
                                        }} 
                                        />
                                    ) : (
                                        <span>{data.name}</span>
                                    )}
                                </td>
                                <td style={{ padding: '10px' }}>
                                    {editableIndex === index ? (
                                        <NumberInput 
                                        value={data.time} 
                                        onChange={(value) => {
                                            const newData = [...formData];
                                            newData[index].time = value;
                                            setFormData(newData);
                                        }} 
                                        />
                                    ) : (
                                        <span>{data.time}</span>
                                    )}
                                </td>
                                <td style={{ padding: '10px' }}>
                                    {editableIndex === index ? (
                                        <Select 
                                        value={data.start} 
                                        data={nameStart.map(name => ({ value: name, label: name }))} 
                                        onChange={(value) => {
                                            const newData = [...formData];
                                            newData[index].start = value;
                                            setFormData(newData);
                                        }} 
                                        />
                                    ) : (
                                        <span>{data.start}</span>
                                    )}
                                </td>
                                <td style={{ padding: '10px' }}>
                                    {editableIndex === index ? (
                                        <Select 
                                        value={data.end} 
                                        data={nameEnd.map(name => ({ value: name, label: name }))} 
                                        onChange={(value) => {
                                            const newData = [...formData];
                                            newData[index].end = value;
                                            setFormData(newData);
                                        }} 
                                        />
                                    ) : (
                                        <span>{data.end}</span>
                                    )}
                                </td>
                                <td style={{ padding: '10px' }}>
                                    {editableIndex === index ? (
                                        <Button variant="outline" onClick={() => handleEdit(undefined)}>Save</Button>
                                    ) : (
                                        <Button variant="outline" onClick={() => handleEdit(index)}>Edit</Button>
                                    )}
                                </td>
                                <td style={{ padding: '10px' }}>
                                    <Button variant="outline" onClick={() => handleDelete(index)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
            </table>
            </div>
            {showDiagram && <div id="cy" style={{ width: '100%', height: '400px' }}></div>}
        </div>
    );
};