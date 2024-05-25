import React,{FC,memo} from "react"
import {RecipientType} from "../../types/RecipientType"
import { Button, Card, NumberInput, TextInput } from "@mantine/core";

interface RecipientItemProps {
    item: RecipientType; // Assuming RecipientType is your item type
}

export const RecipientItem: React.FC<{ numberOfItems: number }> = ({ numberOfItems }) => {
    const items = Array.from({ length: numberOfItems }, (_, index) => index);

    return (
        <div>
            {items.map((item, index) => (
                <Card key={index} shadow="sm">
                    <p>Odbiorca {index + 1}</p>
                    <NumberInput label="Popyt" />
                    <NumberInput label="Jednostkowy koszt zakupu" />
                    <Button>Potwierdź</Button>
                </Card>
            ))}
        </div>
    );
};