import { Paper, Group, Text, Divider, Grid, Button, NumberInput } from '@mantine/core'

function CartOverview({ cart, updateQuantity }) {
  return (
        <Paper shadow="xs" p="md" mb="md" radius="lg">
            <Group position="apart">
            <Text weight={500} size="lg">
                Overview
            </Text>
            </Group>
            <Divider my="sm" />

            <Grid mb="md">
            <Grid.Col span={6}>
                <Text weight={500} size="sm">
                Medicine Name
                </Text>
            </Grid.Col>
            <Grid.Col span={3}>
                <Text weight={500} size="sm">
                Quantity
                </Text>
            </Grid.Col>
            <Grid.Col span={3}>
                <Text weight={500} size="sm">
                Total Price
                </Text>
            </Grid.Col>
            </Grid>
            {cart.map((item, i) => (
            <Group key={item._id}  mb="sm" >
                <Grid sx={{width: '100% !important'}}>
                <Grid.Col span={5}>
                    <Text>{item.product}</Text>
                </Grid.Col>
                <Grid.Col span={5}>
                    <Group spacing="xs">
                    <Button compact size="xs" onClick={() => updateQuantity(item._id, "increment")}>+</Button>
                    <NumberInput
                        value={item.quantity}
                        size="xs"
                        // readOnly
                        hideControls
                        style={{ width: "50px" }}
                        // onChange={(event) => }
                    />
                    <Button compact size="xs" onClick={() => updateQuantity(item._id, "decrement")}>-</Button>
                    </Group>
                </Grid.Col>
                <Grid.Col span={2}>
                    <Text>{(item.unitSalePrice).toFixed(2)}</Text>
                </Grid.Col>
                </Grid>
            </Group>
            ))}
        </Paper>
    )}

export default CartOverview