import { NumberInput, Button, TextInput, Group } from "@mantine/core";
import { RecipientType } from "../../types/RecipientType"
import React, { useState, MouseEventHandler, useEffect } from 'react';
import { RecipientItem } from "./recipientItem";
import { SuplierItem } from "./SuplierItem";
import { Tabela } from "./Tabela";
export const Transportation = () => {



    //Use state do pobierania liczby dostawców
    const [supplierUse, setSuplierUse] = useState<number>(0);
    const [inputSuppleirUse, setinputSupplierUse] = useState<number | string>(0);

    const [recipientUse, setrecipientUse] = useState<number>(0);
    const [inputRecipientUse, setinputRecipientUse] = useState<number | string>(0);

    const recipientOnClick = () => {
        let test: number

        setSuplierUse(Number(inputSuppleirUse))
        setrecipientUse(Number(inputRecipientUse))
    };


    const handleSupplierInputChange = (newValue: number | string) => {
        setinputSupplierUse(newValue);
    };

    const handleRecipientInputChange = (newValue: number | string) => {
        setinputRecipientUse(newValue);
    };

    return <div>

        <Group>  <NumberInput
            label="Liczba dostawców"
            description="Wprowadź liczbę dostawców"
            placeholder="0"
            onChange={handleSupplierInputChange}
        >
        </NumberInput>

            <NumberInput
                label="Liczba dostawców"
                description="Wprowadź liczbę dostawców"
                placeholder="0"
                onChange={handleRecipientInputChange}
            >
            </NumberInput>
        </Group>

        <Button
            variant="gradient"
            gradient={{ from: 'red', to: 'blue', deg: 263 }}
            onClick={recipientOnClick}
        >Potwierdź
        </Button>
<Group>
        <Group style={{ alignItems: 'flex-start' }} >
            <SuplierItem numberOfItems={supplierUse} />
            <RecipientItem numberOfItems={recipientUse} />

            
        </Group>
        <Tabela rows={supplierUse} cols={recipientUse} numberOfItems={3} />
        </Group>
        <Button>
            Potwierdź Obliczenia
        </Button>
    </div>
}