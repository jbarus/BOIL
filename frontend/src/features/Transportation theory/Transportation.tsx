import { NumberInput,Button, TextInput } from "@mantine/core";
import { RecipientType } from "../../types/RecipientType"
import React, { useState, MouseEventHandler, useEffect } from 'react';
import { RecipientItem } from "./recipientItem";
export const Transportation = () => {

   
    const [numberUse, setNumberUse] = useState<number>(0);
    const [inputRecipientUse, setinputRecipientUse] = useState<number|string >(0);



    const recipientOnClick = () => {
        let test:number
        
  setNumberUse(Number(inputRecipientUse))

        };
    

    const handleNumberInputChange = (newValue: number |string) => {
        setinputRecipientUse(newValue);
    };

    return <div>
        

        <NumberInput
            label="Liczba dostawców"
            description="Wprowadź liczbę dostawców"
            placeholder="0"
            onChange={handleNumberInputChange}
        >
        </NumberInput>
        <Button
                variant="gradient"
                gradient={{ from: 'red', to: 'blue', deg: 263 }}
                onClick={recipientOnClick}
            >Potwierdź
            </Button>

        <RecipientItem numberOfItems={numberUse} />
    </div>
}