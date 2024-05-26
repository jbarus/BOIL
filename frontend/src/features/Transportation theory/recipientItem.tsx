import React, { useState } from "react";
import { RecipientType } from "../../types/RecipientType";
import { Button, Card, NumberInput } from "@mantine/core";

interface RecipientItemProps {
  numberOfItems: number;
  onConfirm: (recipient: RecipientType, index: number) => void;
}



interface RecipientItemProps {
  numberOfItems: number;
  onConfirm: (recipient: RecipientType, index: number) => void;
}

export const RecipientItem: React.FC<RecipientItemProps> = ({ numberOfItems, onConfirm }) => {
  const items = Array.from({ length: numberOfItems }, (_, index) => index);

  const [demandUse, setDemandUse] = useState<number[]>(Array(numberOfItems).fill(0));
  const [unitPurchaseCostsUse, setUnitPurchaseCosts] = useState<number[]>(Array(numberOfItems).fill(0));

  const handleDemandInputChange = (value: number, index: number) => {
    const newDemandUse = [...demandUse];
    newDemandUse[index] = value;
    setDemandUse(newDemandUse);
  };

  const handleUnitSellCostInputChange = (value: number, index: number) => {
    const newUnitPurchaseCostsUse = [...unitPurchaseCostsUse];
    newUnitPurchaseCostsUse[index] = value;
    setUnitPurchaseCosts(newUnitPurchaseCostsUse);
  };

  const handleConfirmClick = (index: number) => {
    const recipient: RecipientType = {
      demand: demandUse[index],
      unitSellCost: unitPurchaseCostsUse[index]
    };
    onConfirm(recipient, index);
  };

  return (
    <div>
      {items.map((item, index) => (
        <Card key={index} shadow="sm">
          <p>Odbiorca {index + 1}</p>
          <NumberInput
            allowNegative={false}
            label="Popyt"
            value={demandUse[index]}
            onChange={(value) => handleDemandInputChange(Number(value) || 0, index)}
          />
          <NumberInput
            allowNegative={false}
            label="Jednostkowy koszt sprzedaży"
            value={unitPurchaseCostsUse[index]}
            onChange={(value) => handleUnitSellCostInputChange(Number(value) || 0, index)}
          />
          <Button onClick={() => handleConfirmClick(index)}>Potwierdź</Button>
        </Card>
      ))}
    </div>
  );
};