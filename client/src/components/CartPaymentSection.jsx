import { Paper, Group, Text, Divider, Button, Select } from '@mantine/core'
import { notifications } from '@mantine/notifications'

function CartPaymentSection({ calculateNetTotal, payment, setPayment, setReceiptVisible, receiptVisible, resetCart }) {

    const makePayment = async () => {
        setReceiptVisible(!receiptVisible)
        notifications.show({
            title: 'Success',
            message: 'Product has been successfully paid! 🤥',
            styles: (theme) => ({
                root: {
                  backgroundColor: theme.colors.green[6],
                //   borderColor: theme.colors.
  
                  '&::before': { backgroundColor: theme.white },
                },
  
                title: { color: theme.white },
                description: { color: theme.white },
                closeButton: {
                  color: theme.white,
                  '&:hover': { backgroundColor: theme.colors.blue[7] },
                },
              }),
        })
    }
    
  return (
        <Paper shadow="xs" p="md" radius="lg">
            <Text weight={500} size="lg" mb="sm">
            Payment
            </Text>
            <Divider my="sm" />

            <Group position="apart" mb="xs">
            <Text>Net Total</Text>
            <Text>${calculateNetTotal().toFixed(2)}</Text>
            </Group>
            <Group position="apart" mb="xs">
            <Text>Paid Amount</Text>
            <Text>{payment.paidAmount.toFixed(2)}</Text>
            </Group>
            <Group position="apart" mb="xs">
            <Text>Due Amount</Text>
            <Text>${calculateNetTotal().toFixed(2)}</Text>
            </Group>

            <Select
            label="Payment Type"
            // value={payment.paymentType}
            defaultValue="Cash"
            onChange={(value) =>
                setPayment((prev) => ({ ...prev, paymentType: value }))
            }
            data={["Cash", "Bankak", "Fawry"]}
            mb="md"
            />
            <Group position="apart">
            <Button variant="outline" color="red" onClick={() => resetCart()}>Reset</Button>
            <Button color="green" onClick={() => makePayment()}>Confirm</Button>
            </Group>
        </Paper>
    )}

export default CartPaymentSection