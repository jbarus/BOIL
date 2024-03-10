import { useParams } from "react-router-dom"
import { Group, TextInput, MultiSelect, Button, Text, Space, NumberInput } from '@mantine/core';
import React, { useState, MouseEventHandler } from 'react';
import { Event, Action } from "./CpmClass";



export const CpmForm = () => {
    // const{id}=useParams();

    let eventName: string;
    let names:string[];
    const events: Event[] = [];
    const actions: Action[] = [];
    //funkcja wywołująca się po zmmianie tekstu w polu tekstowym

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nowaWartosc = event.target.value;
        if (nowaWartosc != undefined) {
            eventName = nowaWartosc
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
        names.push(tmp.name);
            for (let index = 0; index < events.length; index++) {
                console.log(events[index].name)

            }
        }




    }


    const getNames = () =>{
        return names;
    }


    return <div>

        <Text>Dodaj zdarzenie</Text>


        <Group>
            <TextInput

                // id="name"
                onChange={handleInputChange}
                placeholder="Nazwa"
            // style={{ width: 'du[a' }} // Apply inline styles to make it full width
            />

            {/* <TextInput
                id="duration"
                placeholder="Czas trwania"
                style={{ width: '10%' }} // Apply inline styles to make it full width

            />

            <MultiSelect
                label="Your favorite libraries"
                placeholder="Pick value"
                data={['React', 'Angular', 'Vue', 'Svelte']}
            />*/}



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
                onChange={handleInputChange}
                style={{ width: '10%' }} // Apply inline styles to make it full width
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