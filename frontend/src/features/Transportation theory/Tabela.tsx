import React, { useState } from 'react';
import { Table } from '@mantine/core';
import { SuplierItem } from './SuplierItem';
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
        <div className="right-panel"> {/* Add right-panel class here */}
            <Table>
                <thead>
                    <tr>
                        <th></th> {/* Empty cell for the corner */}
                        {Array.from({ length: cols }).map((_, colIndex) => (
                            <th key={colIndex}>Odbiorca nr {colIndex + 1}</th> 
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: rows }).map((_, rowIndex) => (
                        <tr key={rowIndex}>
                            <td>Dostawca nr {rowIndex + 1}</td> 
                            {Array.from({ length: cols }).map((_, colIndex) => (
                                <td key={`${rowIndex}-${colIndex}`}>
                                    <NumberInput
                                        description="Cena transportu"
                                        placeholder="0"
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};
