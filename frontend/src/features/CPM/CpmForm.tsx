import { useParams } from "react-router-dom"
import { Group, TextInput, MultiSelect, Button, Text, Space, NumberInput } from '@mantine/core';
import React, { useState, MouseEventHandler } from 'react';
import { Event, Action } from "./CpmClass";



export const CpmForm = () => {
    // const{id}=useParams();

    let eventName: string;
    let actionName: string;
    let names: string[];
    const events: Event[] = [];
    const actions: Action[] = [];
    //funkcja wywołująca się po zmmianie tekstu w polu tekstowym

    const handleInputChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nowaWartosc = event.target.value;
        if (nowaWartosc != undefined) {
            eventName = nowaWartosc
        }


    };

    
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


    const eventonClick = () => {
        let tmp: Event = new Event(eventName);

        if (eventName != undefined) {
            events.push(tmp);
            // names.push(tmp.name);
                for (let index = 0; index < events.length; index++) {
                    console.log(events[index].name)

                }
        }




    }


    const getNames = () => {
        return names;
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
            onClick={eventonClick}
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
            <MultiSelect

                placeholder="Zdarzenie początkowe"

                data={['React', 'Angular', 'Vue', 'Svelte']}
            />

            <MultiSelect

                placeholder="Zdarzenie końcowe"
                data={['React', 'Angular', 'Vue', 'Svelte']}
            />
        </Group>
        <Space h="md" />


        <Button
            variant="gradient"
            gradient={{ from: 'red', to: 'blue', deg: 263 }}

        >Potwierdź</Button>




    </div>



}