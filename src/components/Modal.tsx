import { useState } from "react";
import {
  Modal,
  TextInput,
  NumberInput,
  Select,
  Button,
  Stack,
} from "@mantine/core";

type AddExpenseModalProps = {
  opened: boolean;
  onClose: () => void;
  onAdd: (name: string, amount: number | string, category: string) => void;
};

export default function AddExpenseModal({
  opened,
  onClose,
  onAdd,
}: AddExpenseModalProps) {
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<string | number>(0);
  const [category, setCategory] = useState<string | null>(null);
  const categories = ["Food", "Transport", "Entertainment"];

  const handleSubmit = () => {
    if (!name.trim() || amount == 0 || !category) return;

    onAdd(name, amount, category);
    setName("");
    setAmount(0);
    setCategory(null);
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Add Expense">
      <Stack>
        <TextInput
          label="Expense Name"
          withAsterisk
          description="Expense Name"
          error={name.trim() == "" ? "Expense name is require" : ""}
          placeholder="E.g., Coca-Cola"
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
        />

        <NumberInput
          label="Amount"
          withAsterisk
          description="Amount"
          clampBehavior="strict"
          min={0}
          error={amount == 0 ? "Amount is required" : ""}
          value={amount}
          onChange={(event) => setAmount(Number(event))}
        />

        <Select
          label="Category"
          description="Category"
          placeholder="Select Category"
          error={!category ? "Category is required" : ""}
          value={category}
          data={categories}
          onChange={(event) => setCategory(event)}
        />

        <Button onClick={handleSubmit}>Submit</Button>
      </Stack>
    </Modal>
  );
}
