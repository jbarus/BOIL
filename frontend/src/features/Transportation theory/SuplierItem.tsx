import React,{useState,useEffect} from "react"
import {RecipientType} from "../../types/RecipientType"
import { Button, Card, NumberInput, TextInput } from "@mantine/core";
import { SupplierType } from "../../types/SuplierType";

interface SuplierItemProps {
    numberOfItems: number;
    onConfirm: (supplier: SupplierType, index: number) => void; // Dodaj onConfirm do propsów
  }
  
  export const SuplierItem: React.FC<SuplierItemProps> = ({ numberOfItems, onConfirm }) => { // Dodaj onConfirm do deklaracji komponentu
    const items = Array.from({ length: numberOfItems }, (_, index) => index);
  
    const [supplyUse, setSupply] = useState<number>();
    const [unitPurchaseCostsUse, setUnitPurchaseCosts] = useState<number>();

    const handleSuplyInputChange = (value: number, index: number) => {
      setSupply(value);
    };
  
    const handleUnitPurchaseCostInputChange = (value: number, index: number) => {
      setUnitPurchaseCosts(value);
    };
  
    const handleConfirmClick = (index: number) => {
        const supplier: SupplierType = {
            supply: Number(supplyUse),
            unitPurchaseCost: Number(unitPurchaseCostsUse)
          };
      onConfirm(supplier, index); // Wywołaj przekazaną funkcję onConfirm
    };
  
    return (
      <div>
        {items.map((item, index) => (
          <Card key={index} shadow="sm">
            <p>Dostawca {index + 1}</p>
            <NumberInput label="Podaż" onChange={(value) => handleSuplyInputChange(Number(value), index)} />
            <NumberInput label="Jednostkowy koszt zakupu" onChange={(value) => handleUnitPurchaseCostInputChange(Number(value), index)} />
            
            <Button 
            onClick={() => handleConfirmClick( index)}
            >Potwierdź</Button>
          </Card>
        ))}
      </div>
    );
  };
