import { useParams } from "react-router-dom"
import { Group, TextInput, Select, Button, Text, Space, NumberInput, MultiSelect } from '@mantine/core';
import React, { useState, MouseEventHandler } from 'react';
import { Event, Action } from "./CpmClass";



export const CpmForm = () => {
    // const{id}=useParams();

    let eventName: string;
    let actionName: string;
    let names: string[] = [];
    const events: Event[] = [];
    const actions: Action[] = [];

    //useState MultiSelect początkowy
    const [nameStart, setNameStart] = useState(names)
    const [nameEnd, setNameEnd] = useState(names)
    const [eventEnd, setEventEnd] = useState(events)
    const [eventStart, setEventStart] = useState(events)
    //funkcja wywołująca się po zmmianie tekstu w polu tekstowym

    const handleInputChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nowaWartosc = event.target.value;
        if (nowaWartosc != undefined) {
            eventName = nowaWartosc
        }


    };

    const startOnChange = (chosed: string[]) => {
        ; console.log(chosed)

    }


    const handleInputChangeAction = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nowaWartosc = event.target.value;
        if (nowaWartosc != undefined) {
            actionName = nowaWartosc
        }


    };

    // funkcja wywołująca się po zmianie wartości w polu liczbowym
    const numberInputcChange = (newValue: number | string) => {
        const nowaWartosc = newValue;
        console.log('Nowa wartość siemanko:', nowaWartosc);
    };

    //klikiecie guzik 1
    const eventOnClick = () => {
        let tmp: Event = new Event(eventName);
        let test: number = 0;

        for (let index = 0; index < names.length; index++) {
            if (names[index] == tmp.name) {
                test += 1
                break;
            }

        }

        if (eventName != undefined && test == 0) {
            events.push(tmp);
            names.push(tmp.name);

            setNameStart(names)
        }




    }

    return <div>

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
        >Potwierdź</Button>
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

                onChange={numberInputcChange}
                placeholder="Wprowadz czas wykonania"
            />
            <Select

                placeholder="Zdarzenie początkowe"
                // onChange={startOnChange}
                data={["witam", "siemanko"]}
            />

            {/* <Select

                placeholder="Zdarzenie końcowe"
                value={"dupa"}
               data={nameEnd}
            /> */}
            <Select
                //label="Your favorite library"
                placeholder="Pick value"
                data={nameStart}
            />


        </Group>
        <Space h="md" />


        <Button
            variant="gradient"
            gradient={{ from: 'red', to: 'blue', deg: 263 }}

        >Potwierdź</Button>




    </div>



}