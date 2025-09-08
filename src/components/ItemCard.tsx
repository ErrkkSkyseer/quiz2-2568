import { Card, Group, Badge, ActionIcon, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

type ExpenseProps = {
  id: string;
  name: string;
  amount: number | string;
  category: string;
  onDelete: () => void;
};

export default function ItemCard({
  id,
  name,
  amount,
  category,
  onDelete,
}: ExpenseProps) {
  return (
    <Card withBorder shadow="sm" radius="md" mb="sm" key={id}>
      {/* title */}
      <Group align="flex-start">
        <Text fw={500}>{name}</Text>
        <Text fw={500}>{amount + " Bath"}</Text>
        <Badge color="blue">{category}</Badge>
        <ActionIcon
          variant="filled"
          color="pink"
          aria-label="Settings"
          onClick={onDelete}
        >
          <IconTrash style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
      </Group>
    </Card>
  );
}
