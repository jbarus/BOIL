import React, { useState, useEffect } from 'react';
import { Table, NumberInput, Button, Group, TextInput } from '@mantine/core';



interface TabelaProps {
    rows: number;
    cols: number;
    numberOfItems: number;
    onTableDataUpdate: (data: number[][]) => void;
}

export const Tabela: React.FC<TabelaProps> = ({ rows, cols, numberOfItems, onTableDataUpdate }) => {
    const [data, setData] = useState<number[][]>([]);

    useEffect(() => {
        setData(
            Array.from({ length: rows }, () =>
                Array.from({ length: cols }, () => 0)
            )
        );
    }, [rows, cols, numberOfItems]);

    const handleInputChange = (rowIndex: number, colIndex: number, value: number) => {
        setData(prevData => {
            const newData = prevData.map((row, i) =>
                row.map((col, j) => (i === rowIndex && j === colIndex ? value : col))
            );
            return newData;
        });
    };

    const handleConfirmClick = () => {
        // Przekazanie danych do rodzica
        onTableDataUpdate(data);
    };

    return (
        <div className="right-panel">
            <Table>
                <thead>
                    <tr>
                        <th></th>
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
                                        description={`Cena transportu`}
                                        placeholder="0"
                                        value={data[rowIndex]?.[colIndex] || 0}
                                        onChange={(value) => handleInputChange(rowIndex, colIndex, Number(value) || 0)}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button onClick={handleConfirmClick}>
                Potwierdź
            </Button>
        </div>
    );
};