import { useParams } from "react-router-dom"
import { Group, TextInput, Select, Button, Text, Space, NumberInput, MultiSelect, ComboboxItem, Alert } from '@mantine/core';
import React, { useState, MouseEventHandler, useEffect } from 'react';
import { Event, Activity } from "../../types/CpmClass";

import { graph } from '../../utils';

const BASE_API_URL = "http://localhost:8080/api/"

export const CpmForm = () => {
    const [eventUse, setEventUse] = useState<Event[]>([]);
    const [eventUseGet, setEventUseGet] = useState<Event[]>([]);
    const [activityUse, setactivityUse] = useState<Activity[]>([]);
    const [eventName, setEventName] = useState("");
    const [actionName, setActionName] = useState("");
    const [actionTime, setActionTime] = useState<number | string>(0);
    const [actionStart, setActionStart] = useState<null | string>("");
    const [actionEnd, setActionEnd] = useState<null | string>("");
    const [nameStart, setNameStart] = useState<string[]>([]);
    const [nameEnd, setNameEnd] = useState<string[]>([]);
    const [formData, setFormData] = useState<{ name: string; time: number | string; start: string | null; end: string | null; }[]>([]);
    const [showDiagram, setShowDiagram] = useState(true);
    const [editableIndex, setEditableIndex] = useState<number | null>(null);

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

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


    const handleNumberInputChange = (newValue: number | string) => {
        setActionTime(newValue);
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
            setAlertMessage("Dodano zdarzenie");
            setShowAlert(true);

            setTimeout(() => {
                setShowAlert(false);
            }, 1000);

        }
    };

    const findEventByName = (eventName: string): Event => {
        let myObject: Event | undefined = eventUse.find(event => event.name === eventName);
        let eventbyname = myObject as Event;
        return eventbyname;
    };

    const eventOnClick2 = () => {
        console.log("Button clicked action:", actionName, "start: ", actionStart, "end: ", actionEnd);

        if (eventName && actionName && nameStart.includes(eventName) && nameEnd.includes(eventName) && actionStart !== null && actionEnd !== null && actionStart < actionEnd) {


            const actionEndString: string = actionEnd ?? "";
            const actionStartString: string = actionStart ?? "";
            const timeNumber: number = typeof actionTime === "string" ? parseFloat(actionTime) : actionTime as number;


            let tmpActivity: Activity = new Activity(actionName, timeNumber, actionStartString, actionEndString)

            const isActivityExist = activityUse.find(activity =>
                activity.name === actionName || (activity.startId === actionStart && activity.endId === actionEnd)
            );
            if (isActivityExist) {

                console.log("Ta aktywność już istnieje!");
                setAlertMessage("Ta aktywność już istnieje lub błędny wybór połączenia akcji"); 
                setShowAlert(true); 
                setTimeout(() => {
                    setShowAlert(false); 
                }, 2000);
            } else {
                
                setactivityUse(prevActivity => [...prevActivity, tmpActivity]);
                const newData = {
                    name: actionName,
                    time: actionTime,

                    start: actionStart,
                    end: actionEnd
                };
                setFormData(prevData => [...prevData, newData]);
            }




        }

        console.log(activityUse);

    };

    const handleDelete = (indexToDelete: number) => {
        const updatedFormData = [...formData];
        updatedFormData.splice(indexToDelete, 1);
        setFormData(updatedFormData);


        const updatedActivityUse = [...activityUse];
        updatedActivityUse.splice(indexToDelete, 1);
        setactivityUse(updatedActivityUse);
    };

    const handleEdit = (indexToEdit: number | undefined) => {
        if (indexToEdit !== undefined) {
            setEditableIndex(indexToEdit);
        } else {
            setEditableIndex(null);
            const updatedActivityUse = formData.map(data => {
                return new Activity(data.name, parseFloat(data.time as string), data.start as string, data.end as string);
            });
            setactivityUse(updatedActivityUse);
        }
    };

    const checkIfOneStart = (events: Event[], activities: Activity[]) => {
        const connectionsCountMap: { [key: string]: number } = {};
        activities.forEach(activity => {
            const { startId, endId } = activity;
            connectionsCountMap[endId] = connectionsCountMap[endId] ? connectionsCountMap[endId] + 1 : 1;
            connectionsCountMap[startId] = connectionsCountMap[startId] ? connectionsCountMap[startId] - 1 : -1;
        });
        const oneStart = Object.values(connectionsCountMap).filter(count => count === -1).length === 1;

        return oneStart;
    };

    const diagram_click = async () => {
        console.log("Fetching data...");
        await fetchData();
        console.log("Data fetched successfully");
        setShowDiagram(true);
        const cy = graph(activityUse, eventUseGet);
    };

    const Oblicz = async () => {
        console.log("Diagram dupa clicked");
        const oneStart = checkIfOneStart(eventUse, activityUse);

        if (oneStart) {
            await fetchData();
        } else {
            if (!oneStart) {
                console.log("Więcej niż jeden start");
                setAlertMessage("Więcej niż jeden start"); 
                setShowAlert(true); 
            }
        }
    };


    const fetchData = async () => {
        try {
            console.log(JSON.stringify(activityUse));
            const response = await fetch(BASE_API_URL + 'v1/cpm/activity', {

                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(activityUse),
            }

            );
            if (response.ok) {
                const responseBody = await response.json(); 
                console.log('Success');
                let tmp: Event[] = responseBody
                setEventUseGet(tmp);
                console.log(tmp);
            } else {
                console.error('Error ');
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div>
            <Text>Dodaj zdarzenie</Text>
            <Group>
                <NumberInput
                    onChange={handleInputChangeEvent}
                    placeholder="Nazwa"
                    allowNegative={false}
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
                {alertMessage}
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
                    allowNegative={false}
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

            <Button
                variant="gradient"
                gradient={{ from: 'red', to: 'blue', deg: 263 }}
                onClick={Oblicz}
                style={{ marginLeft: '10px' }}
            >   Oblicz
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
                                        <Button variant="outline" onClick={() => handleEdit(undefined)}>Zapisz</Button>
                                    ) : (
                                        <Button variant="outline" onClick={() => handleEdit(index)}>Edytuj</Button>
                                    )}
                                </td>
                                <td style={{ padding: '10px' }}>
                                    <Button variant="outline" onClick={() => handleDelete(index)}>Usuń</Button>
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