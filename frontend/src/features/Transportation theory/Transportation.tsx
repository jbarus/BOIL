import { NumberInput, Button, TextInput, Group } from "@mantine/core";
import { RecipientType } from "../../types/RecipientType"
import React, { useState, MouseEventHandler, useEffect } from 'react';
import { RecipientItem } from "./recipientItem";
import { SuplierItem } from "./SuplierItem";
import { SupplierType } from "../../types/SuplierType";

import { Tabela } from "./Tabela";

export const Transportation = () => {

    const [supplierUse, setSuplierUse] = useState<number>(0);
    const [inputSuppleirUse, setinputSupplierUse] = useState<number | string>(0);

    const [recipientUse, setrecipientUse] = useState<number>(0);
    const [inputRecipientUse, setinputRecipientUse] = useState<number | string>(0);
    const [tableData, setTableData] = useState<number[][]>([]);
    const [anotherTableData, setAnotherTableData] = useState<number[][]>([]);
    const [totalCost, setTotalCost] = useState<number>(0);
    const [income, setIncome] = useState<number>(0);
    const [profit, setProfit] = useState<number>(0);

   
    const [useTable,setUseTable]=useState<Number[][]>([])
    const [useTableKosztow,setUseTableKosztow]=useState<Number[][]>([])
    const[demandUse,setDemandUse]=useState<Number[]>([]);
    const[suplyUse,setSuplyUse]=useState<Number[]>([]);

    const [selectedSuppliers, setSelectedSuppliers] = useState<SupplierType[]>([]);

    const [selectedRecipients, setSelectedRecipients] = useState<RecipientType[]>([]);

   
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

    const handleGenerateTable = () => {
//Przygotowanie danych do wysłania
//tworzenie tabelki z odbiiorcami
const suplyys = selectedSuppliers.map(suplier => suplier.supply);
// Aktualizacja demandUse
const demands = selectedRecipients.map(recipient => recipient.demand);



  const tmpSuply=suplyUse
  const tmpDemand=demandUse

  
//*************************************************************************** */
//Wiersze i KolumnyJ
const updatedTable = [...useTable]; // Skopiowanie istniejącej tablicy

// Iteracja po dostawcach
for (let i = 0; i < suplyys.length; i++) {
    // Iteracja po odbiorcach
    for (let j = 0; j < demands.length; j++) {
        // Aktualizacja wartości komórki
        updatedTable[i][j] = Number(useTable[i][j]) - Number(suplyys[i]) - Number(demands[j]);
    }
}
console.log(useTable)


        // Losowa tabelka jankoska
        const table = generateRandomTable(supplierUse, recipientUse);
        const anothertable = generateRandomTable(supplierUse, recipientUse);
        setTableData(table);
        setAnotherTableData(anothertable);
        const totalCostValue = Math.floor(Math.random() * 1000);
        const incomeValue = Math.floor(Math.random() * 1000);
        const profitValue = incomeValue - totalCostValue;
        setTotalCost(totalCostValue);
        setIncome(incomeValue);
        setProfit(profitValue);
    };

        return (
        <div>
            <Group>
                <NumberInput
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
                <SuplierItem numberOfItems={supplierUse}  onConfirm={handleConfirmSupplier}  />
                <RecipientItem numberOfItems={recipientUse} onConfirm={handleConfirmRecipient}  />
            </Group>
            
            <div className="right-panel">
                <Tabela rows={supplierUse} cols={recipientUse} numberOfItems={1}  onTableDataUpdate={handleTableDataUpdate} />
            </div>
            
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
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    <td style={{ border: '1px solid black', padding: '8px', fontWeight: 'bold' }}>Dostawca {rowIndex + 1}</td>
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex} style={{ border: '1px solid black', padding: '8px' }}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
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
                            </tr>
                        </thead>
                        <tbody>
                            {anotherTableData.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    <td style={{ border: '1px solid black', padding: '8px' , fontWeight: 'bold'}}>Dostawca {rowIndex + 1}</td>
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex} style={{ border: '1px solid black', padding: '8px' }}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
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