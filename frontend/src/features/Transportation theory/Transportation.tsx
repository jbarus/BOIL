import { NumberInput, Button, TextInput, Group } from "@mantine/core";
import { RecipientType } from "../../types/RecipientType"
import React, { useState, MouseEventHandler, useEffect } from 'react';
import { RecipientItem } from "./recipientItem";
import { SuplierItem } from "./SuplierItem";
import { SupplierType } from "../../types/SuplierType";
import { Tabela } from "./Tabela";
export const Transportation = () => {



    //Use state do pobierania liczby dostawców
    const [supplierUse, setSuplierUse] = useState<number>(0);
    const [inputSuppleirUse, setinputSupplierUse] = useState<number | string>(0);

    const [recipientUse, setrecipientUse] = useState<number>(0);
    const [inputRecipientUse, setinputRecipientUse] = useState<number | string>(0);

    const [suppliers, setSuppliers] = useState<SupplierType[]>([]);
    const [unitPurchaseCosts, setUnitPurchaseCosts] = useState<number[]>([]);

    const handleSuplierDataUpdate = (data: SupplierType[]) => {
        setSuppliers(data);
    };

    const handleUnitPurchaseCostUpdate = (data: number[]) => {
        setUnitPurchaseCosts(data);
    };

    const calculateOnClick = () => {
        // Tutaj możesz przetwarzać lub wykorzystywać dane suppliers i unitPurchaseCosts
        console.log("Dostawcy:", suppliers);
        console.log("Koszty zakupu jednostkowego:", unitPurchaseCosts);
    };

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


    const handleTableDataUpdate = (data: number[][]) => {
        // Tutaj możesz zrobić, co chcesz z danymi, np. je zapisać w stanie
        console.log("Dane z tabeli:", data);
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
        <SuplierItem numberOfItems={supplierUse}  />

            <RecipientItem numberOfItems={recipientUse} />

            
        </Group>
        <Tabela rows={supplierUse} cols={recipientUse} numberOfItems={1} onTableDataUpdate={handleTableDataUpdate} />
        </Group>
        <Button>
            Potwierdź Obliczenia
        </Button>
    </div>
}