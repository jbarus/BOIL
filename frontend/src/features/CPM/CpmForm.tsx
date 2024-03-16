import { useParams } from "react-router-dom"
import { Group, TextInput, Select, Button, Text, Space, NumberInput, MultiSelect } from '@mantine/core';
import React, { useState, MouseEventHandler, useEffect } from 'react';
import { Event, Action } from "./CpmClass";
import { IconInfoCircle } from '@tabler/icons-react';




export const CpmForm = () => {
    // const{id}=useParams();

    
    // let eventName: string;
    // let actionName: string;
    // let names: string[] = [];
    // const events: Event[] = [];
    // const actions: Action[] = [];

    //useState MultiSelect początkowy
    const [eventName, setEventName] = useState("");
    const [actionName, setActionName] = useState("");
    const [nameStart, setNameStart] = useState<string[]>([]);
    const [nameEnd, setNameEnd] = useState<string[]>([]);
    const [formData, setFormData] = useState<{ name: string; time:number | string; start: string|null; end: string|null; }[]>([]);
    const [showAlert, setShowAlert] = useState(false); // State to control alert visibility
    const [fadeOut, setFadeOut] = useState(false);
    const icon = <IconInfoCircle />;

    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    //funkcja wywołująca się po zmmianie tekstu w polu tekstowym
    
    useEffect(() => {
        console.log("FormData:", formData);
    }, [formData]);
    
    const handleInputChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEventName(event.target.value);
    };

    const handleInputChangeAction = (event: React.ChangeEvent<HTMLInputElement>) => {
        setActionName(event.target.value);
    };
    
    const startOnChange = (chosed: string[]) => {
        ; console.log(chosed)

    }

    // funkcja wywołująca się po zmianie wartości w polu liczbowym
    const handleNumberInputChange = (newValue: number | string) => {
        const nowaWartosc = newValue;
        console.log('Nowa wartość siemanko:', nowaWartosc);
    };

    //klikiecie guzik 1
    // const eventOnClick = () => {
    //     let tmp: Event = new Event(eventName);
    //     let test: number = 0;
    //     for (let index = 0; index < names.length; index++) {
    //         if (names[index] == tmp.name) {
    //             test += 1
    //             break;
    //         }

    //     }

    //     if (eventName != undefined && test == 0) {
    //         events.push(tmp);
    //         names.push(tmp.name);
    //         setNameStart([...names])
    //     }
    // }
    const eventOnClick = () => {
        if (eventName && !nameStart.includes(eventName)) {
            setNameStart(prevNames => [...prevNames, eventName]);
            setNameEnd(prevNames => [...prevNames, eventName]);
            
        setShowAlert(true);
        setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
                setShowAlert(false);
                setFadeOut(false); // Reset fade-out state
            }, 1000); 
        }, 1000);
        }
    };

    const eventOnClick2 = () => {
        console.log("Button clicked with event:", eventName, "and action:", actionName);
        if (eventName && actionName && nameStart.includes(eventName) && nameEnd.includes(eventName)) {
            const newData = {
                name: eventName,
                action: actionName,
                start: eventName,
                end: eventName
            };
            setFormData(prevData => [...prevData, newData]);
        }
    };

    return (
    <div>
        <Text>Dodaj zdarzenie</Text>
        <Group>
            <TextInput
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

            {showAlert && (
                <Alert
                className={fadeOut ? 'fade-out' : ''}
                variant="light"
                color="blue"
                title="Zdarzenie dodano"
                icon={icon}
                onClose={() => setShowAlert(false)}
                onAnimationEnd={() => setShowAlert(false)}
                >
                </Alert>
            )}
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
                />
                <Select
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
            <div style={{ overflowX: 'auto' }}>
                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
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
                                <td style={{ padding: '10px' }}>{data.action}</td>
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