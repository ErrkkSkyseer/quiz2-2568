import { useState } from "react";
import { Button, Stack, Title, Divider, Container, Text } from "@mantine/core";
import { v4 as uuidv4 } from "uuid";

import AddExpenseModal from "../components/Modal";
import ItemCard from "../components/ItemCard";

type Expense = {
  id: string;
  name: string;
  amount: number | string;
  category: string;
};

export default function ExpenseTracker() {
  const [opened, setOpened] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const categories = ["Food", "Transport", "Entertainment"];

  const addExpense = (
    name: string,
    amount: number | string,
    category: string
  ) => {
    const newExpense: Expense = {
      id: uuidv4(),
      name,
      amount,
      category,
    };

    setExpenses((head) => [...head, newExpense]);
  };

  const removeExpense = (id: string) => {
    setExpenses(expenses.filter((exp) => exp.id != id));
  };

  const totalCost = () => {
    return expenses.reduce((acc, cur) => acc + Number(cur.amount), 0);
  };
  const catigoryCost = (category: string) => {
    return expenses
      .filter((cur) => cur.category == category)
      .reduce((acc, cur) => acc + Number(cur.amount), 0);
  };

  return (
    <Container style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <Title order={2} mb="md">
        Expense Tracker
      </Title>
      <Button onClick={() => setOpened(true)}>Add Expense Item</Button>
      {/* Type additional AddExpenseModal here. */}
      <AddExpenseModal
        opened={opened}
        onClose={() => setOpened(false)}
        onAdd={addExpense}
      />

      <Divider my="md" />
      {/* Type additional total cost here. */}
      <Title order={4}>Total cost: {totalCost().toLocaleString()} Baht</Title>
      <Stack my="sm">
        {categories.map((cati) => (
          <Text>
            {cati}: {catigoryCost(cati).toLocaleString()} Bath
          </Text>
        ))}
      </Stack>

      <Divider my="md" />
      <Stack>
        {expenses.map((expense) => (
          <ItemCard
            id={expense.id}
            name={expense.name}
            amount={expense.amount}
            category={expense.category}
            onDelete={() => removeExpense(expense.id)}
          />
        ))}
      </Stack>
    </Container>
  );
}
