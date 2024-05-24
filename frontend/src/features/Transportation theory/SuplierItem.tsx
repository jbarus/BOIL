import React,{FC,memo} from "react"
import {RecipientType} from "../../types/RecipientType"
import { Button, Card, NumberInput, TextInput } from "@mantine/core";
import { SupplierType } from "../../types/SuplierType";

interface SuplierItemProps {
    item: SupplierType; // Assuming RecipientType is your item type
}

export const SuplierItem: React.FC<{ numberOfItems: number }> = ({ numberOfItems }) => {
    const items = Array.from({ length: numberOfItems }, (_, index) => index);

    return (
        <div>
            {items.map((item, index) => (
                <Card key={index} shadow="sm">
             Dostawca 
             <NumberInput
              label="Podaż"
              >
            
             </NumberInput>

             <NumberInput
              label="Jednostkowy koszt zakupu"
              >
            
             </NumberInput>
                    
                    <Button>
                        Potwierdź
                    </Button>
                </Card>
            ))}
        </div>
    );
};

