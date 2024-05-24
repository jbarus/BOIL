import React, { useState } from 'react';
import { Table } from '@mantine/core';
import {SuplierItem} from './SuplierItem';
import { NumberInput, Button, TextInput, Group } from "@mantine/core";
interface TabelaProps {
    rows: number;
    cols: number;
    numberOfItems: number;
}

export const Tabela: React.FC<TabelaProps> = ({ rows, cols, numberOfItems }) => {
    const [data, setData] = useState<number[][][]>(
        Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => Array(numberOfItems * 2).fill(0))
        )
    );

    return (
        <Table>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, colIndex) => (
                            <td key={colIndex}>
                               <NumberInput
            
            description="Cena transportu"
            placeholder="0"
          
        >
        </NumberInput>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};


