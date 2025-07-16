import { Box, Button, Container, Flex, Modal, Text, TextInput } from '@mantine/core'

function ExpenseModal({ open, setOpen,amount, description, handleExpenseInput, handleSubmit }) {
  return (
    <Modal title="Add Expense" size={600} opened={open} onClose={() => setOpen(!open)}>
        <Modal.Body>
            <Container size="lg">
                <Flex justify="space-between">
                    <TextInput label="Amount" placeholder='type amount' name="amount" value={amount} onChange={handleExpenseInput} />
                    <TextInput label="Description" placeholder='type note' name='description' value={description} onChange={handleExpenseInput} />
                </Flex>
                <Button mt="md" onClick={handleSubmit}>Create</Button>
            </Container>
        </Modal.Body>
    </Modal>
  )
}

export default ExpenseModal