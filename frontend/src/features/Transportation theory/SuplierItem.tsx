import React,{useState,useEffect} from "react"
import {RecipientType} from "../../types/RecipientType"
import { Button, Card, NumberInput, TextInput } from "@mantine/core";
import { SupplierType } from "../../types/SuplierType";

interface SuplierItemProps {
    numberOfItems: number;
    onConfirm: (supplier: SupplierType, index: number) => void;
  }
  
  export const SuplierItem: React.FC<SuplierItemProps> = ({ numberOfItems, onConfirm }) => {
    const items = Array.from({ length: numberOfItems }, (_, index) => index);
  
    // Use arrays to maintain separate state for each supplier
    const [supplies, setSupplies] = useState<number[]>(Array(numberOfItems).fill(0));
    const [unitPurchaseCosts, setUnitPurchaseCosts] = useState<number[]>(Array(numberOfItems).fill(0));
  
    const handleSupplyInputChange = (value: number, index: number) => {
      const newSupplies = [...supplies];
      newSupplies[index] = value;
      setSupplies(newSupplies);
    };
  
    const handleUnitPurchaseCostInputChange = (value: number, index: number) => {
      const newUnitPurchaseCosts = [...unitPurchaseCosts];
      newUnitPurchaseCosts[index] = value;
      setUnitPurchaseCosts(newUnitPurchaseCosts);
    };
  
    const handleConfirmClick = (index: number) => {
      const supplier: SupplierType = {
        supply: supplies[index],
        unitPurchaseCost: unitPurchaseCosts[index]
      };
      onConfirm(supplier, index);
    };
  
    return (
      <div>
        {items.map((item, index) => (
          <Card key={index} shadow="sm">
            <p>Dostawca {index + 1}</p>
            <NumberInput
              label="Podaż"
              value={supplies[index]}
              onChange={(value) => handleSupplyInputChange(Number(value), index)}
            />
            <NumberInput
              label="Jednostkowy koszt zakupu"
              value={unitPurchaseCosts[index]}
              onChange={(value) => handleUnitPurchaseCostInputChange(Number(value), index)}
            />
            <Button onClick={() => handleConfirmClick(index)}>Potwierdź</Button>
          </Card>
        ))}
      </div>
    );
  };