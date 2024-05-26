import { NumberInput, Button, TextInput, Group } from "@mantine/core";
import { RecipientType } from "../../types/RecipientType"
import React, { useState, MouseEventHandler, useEffect } from 'react';
import { RecipientItem } from "./recipientItem";
import { SuplierItem } from "./SuplierItem";
import { SupplierType } from "../../types/SuplierType";

import { Tabela } from "./Tabela";

interface ResponseBody {
    individualProfit: number[][];        // Zakładam, że to jest tablica liczb
    optimalSolution: number[][];              // Ustaw odpowiedni typ zamiast `any`, np. tablica lub obiekt
    totalCost: number;                 // Zakładam, że to jest liczba
    totalIncome: number;               // Zakładam, że to jest liczba
    totalProfit: number;               // Zakładam, że to jest liczba
}


const BASE_API_URL = "http://localhost:8080/api/v1/mp"

export const Transportation = () => {

    const [supplierUse, setSuplierUse] = useState<number>(0);
    const [inputSuppleirUse, setinputSupplierUse] = useState<number | string>(0);

    const [recipientUse, setrecipientUse] = useState<number>(0);
    const [inputRecipientUse, setinputRecipientUse] = useState<number | string>(0);
    const [tableData, setTableData] = useState<number[][]>([]);
    const [anotherTableData, setAnotherTableData] = useState<number[][]>([]);

    const [income, setIncome] = useState<number>(0);
    const [profit, setProfit] = useState<number>(0);


    const [useTable, setUseTable] = useState<Number[][]>([])
    const [demandUse, setDemandUse] = useState<Number[]>([]);
    const [suplyUse, setSuplyUse] = useState<Number[]>([]);

    const [selectedSuppliers, setSelectedSuppliers] = useState<SupplierType[]>([]);

    const [selectedRecipients, setSelectedRecipients] = useState<RecipientType[]>([]);


    const [individualProfit, setIndividualProfit] = useState<number[][]>([]);
    const [optimalSolution, setOptimalSolution] = useState<number[][]>([]);
    const [totalCost, setTotalCost] = useState<number>(0);
    const [totalIncome, setTotalIncome] = useState<number>(0);
    const [totalProfit, setTotalProfit] = useState<number>(0);



    const handleConfirmSupplier = (supplier: SupplierType, index: number) => {

        const updatedSuppliers = [...selectedSuppliers];
        updatedSuppliers[index] = supplier;
        setSelectedSuppliers(updatedSuppliers);
        console.log(selectedSuppliers)
    };
    const handleConfirmRecipient = (recipient: RecipientType, index: number) => {

        const updatedRecipients = [...selectedRecipients];
        updatedRecipients[index] = recipient;
        setSelectedRecipients(updatedRecipients);
        console.log(selectedRecipients)
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

    //
    const handleTableDataUpdate = (data: number[][]) => {
        const suplyys = selectedSuppliers.map(suplier => suplier.supply);
        // Aktualizacja demandUse
        const demands = selectedRecipients.map(recipient => recipient.demand);

        

        setSuplyUse(suplyys)
        setDemandUse(demands)
        // Tutaj możesz zrobić, co chcesz z danymi, np. je zapisać w stanie
        console.log("Dane z tabeli:", data);
        setUseTable(data)

    };
    const generateRandomTable = (rows: number, cols: number): number[][] => {
        const table: number[][] = [];
        for (let i = 0; i < rows; i++) {
            const row: number[] = [];
            for (let j = 0; j < cols; j++) {
                row.push(Math.floor(Math.random() * 100));
            }
            table.push(row);
        }
        return table;
    };

    const   handleGenerateTable =  () => {
        //Przygotowanie danych do wysłania
        //tworzenie tabelki z odbiiorcami
      



        console.log(useTable)
        console.log("Supleies " + suplyUse + " Demands " + demandUse
        )
         fetchData()


        // Losowa tabelka jankoska
        const table = individualProfit;
        const anothertable = optimalSolution;
        setTableData(table);
        setAnotherTableData(anothertable);
        const totalCostValue = totalCost;
        const incomeValue = totalIncome;
        const profitValue = totalProfit;
        setTotalCost(totalCostValue);
        setIncome(incomeValue);
        setProfit(profitValue);
    };


    const fetchData = async () => {
        try {
            const purchusePrice = selectedSuppliers.map(suplier => suplier.unitPurchaseCost);


            const sellPrice = selectedRecipients.map(recipient => recipient.unitSellCost);

            const requestBody = {
                supplies: suplyUse,  // Załóżmy, że `suplyUse` jest już zdefiniowane
                demands: demandUse,
                transportPrice: useTable,
                sellPrice: sellPrice,
                purchasePrice: purchusePrice
            };
            console.log(JSON.stringify(requestBody));
            const response = await fetch(BASE_API_URL + '/middleman', {

                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            }

            );
            if (response.ok) {
                const initialIndividualProfit: number[][] = [];
                const initialOptimalSolution: number[][] = [];
                const initialTotalCost: number = 0;
                const initialTotalIncome: number = 0;
                const initialTotalProfit: number = 0;

                let responseBody: ResponseBody = {
                    individualProfit: initialIndividualProfit,
                    optimalSolution: initialOptimalSolution,
                    totalCost: initialTotalCost,
                    totalIncome: initialTotalIncome,
                    totalProfit: initialTotalProfit
                };



                responseBody = await response.json();
                console.log('Success');
                console.log(responseBody);
                setIndividualProfit(responseBody.individualProfit);
                setOptimalSolution(responseBody.optimalSolution)
                setTotalCost(responseBody.totalCost)
                setTotalIncome(responseBody.totalIncome)
                setTotalProfit(responseBody.totalProfit)



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
            <Group>
                <NumberInput
                    allowNegative={false}
                    label="Liczba dostawców"
                    description="Wprowadź liczbę dostawców"
                    placeholder="0"
                    onChange={handleSupplierInputChange}
                />
                <NumberInput
                    label="Liczba odbiorców"
                    description="Wprowadź liczbę odbiorców"
                    placeholder="0"
                    onChange={handleRecipientInputChange}
                />
            </Group>

            <Button
                variant="gradient"
                gradient={{ from: 'red', to: 'blue', deg: 263 }}
                onClick={recipientOnClick}
            >
                Potwierdź
            </Button>

            <Group style={{ alignItems: 'flex-start' }}>
                <SuplierItem numberOfItems={supplierUse} onConfirm={handleConfirmSupplier} />
                <RecipientItem numberOfItems={recipientUse} onConfirm={handleConfirmRecipient} />
                <div className="right-panel">
                    <Tabela rows={supplierUse} cols={recipientUse} numberOfItems={1} onTableDataUpdate={handleTableDataUpdate} />
                </div>
            </Group>



            {/* Tabela ************************* */}
            <Button onClick={handleGenerateTable}>
                Potwierdź Obliczenia
            </Button>

            {tableData.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Zysk indywidualny:</h3>
                    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid black', padding: '8px' }}>Dostawca\Odbiorca</th>
                                {Array.from({ length: recipientUse }, (_, index) => (
                                    <th key={index} style={{ border: '1px solid black', padding: '8px' }}>Odbiorca {index + 1}</th>
                                ))}
                                {tableData[0].length > recipientUse && (
                                    <th style={{ border: '1px solid black', padding: '8px' }}>Odbiorca Fikcyjny</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    <td style={{ border: '1px solid black', padding: '8px', fontWeight: 'bold' }}>
                                        Dostawca {rowIndex + 1}
                                    </td>
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex} style={{ border: '1px solid black', padding: '8px' }}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                            {tableData.length > supplierUse && (
                                <tr>
                                    <td style={{ border: '1px solid black', padding: '8px', fontWeight: 'bold' }}>Dostawca Fikcyjny</td>
                                    {tableData[0].map((_, cellIndex) => (
                                        <td key={cellIndex} style={{ border: '1px solid black', padding: '8px' }}>{tableData[supplierUse][cellIndex]}</td>
                                    ))}
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {anotherTableData.length > 0 && (
                        <div style={{ marginTop: '20px' }}>
                            <h3>Optymalny transport:</h3>
                            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th style={{ border: '1px solid black', padding: '8px' }}>Dostawca\Odbiorca</th>
                                        {Array.from({ length: recipientUse }, (_, index) => (
                                            <th key={index} style={{ border: '1px solid black', padding: '8px' }}>Odbiorca {index + 1}</th>
                                        ))}
                                    {anotherTableData[0].length > recipientUse && (
                                 <th style={{ border: '1px solid black', padding: '8px' }}>Odbiorca Fikcyjny</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {anotherTableData.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    <td style={{ border: '1px solid black', padding: '8px', fontWeight: 'bold' }}>
                                        Dostawca {rowIndex + 1}
                                    </td>
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex} style={{ border: '1px solid black', padding: '8px' }}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                            {anotherTableData.length > supplierUse && (
                                <tr>
                                    <td style={{ border: '1px solid black', padding: '8px', fontWeight: 'bold' }}>Dostawca Fikcyjny</td>
                                    {anotherTableData[0].map((_, cellIndex) => (
                                        <td key={cellIndex} style={{ border: '1px solid black', padding: '8px' }}>{anotherTableData[supplierUse][cellIndex]}</td>
                                    ))}
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <p style={{ fontWeight: 'bold' }}>Całkowity koszt: {totalCost}</p>
                    <p style={{ fontWeight: 'bold' }}>Przychód: {income}</p>
                    <p style={{ fontWeight: 'bold' }}>Zysk: {profit}</p>
                </div>
            )}
        </div>
    );
};