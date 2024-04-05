import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';

import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';

function ManageExpense({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext);
  const [expense, setExpense] = useState(null);

  const expenseId = route.params?.expenseId;

  useEffect(() => {
    if (expenseId) {
      const selectedExpense = expensesCtx.expenses.find(
        (expense) => expense.id === expenseId
      );
      setExpense(selectedExpense);
    } else {
      // Clear expense data when adding a new expense
      setExpense(null);
    }
  }, [expenseId, expensesCtx.expenses]);

  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedAmount, setUpdatedAmount] = useState('');

  useEffect(() => {
    if (expense) {
      setUpdatedDescription(expense.description);
      setUpdatedAmount(expense.amount.toString());
    } else {
      // Clear input fields when adding a new expense
      setUpdatedDescription('');
      setUpdatedAmount('');
    }
  }, [expense]);

  const updateExpenseHandler = () => {
    if (expense) {
      expensesCtx.updateExpense(expenseId, {
        description: updatedDescription,
        amount: parseFloat(updatedAmount),
      });
    } else {
      // Add new expense
      expensesCtx.addExpense({
        description: updatedDescription,
        amount: parseFloat(updatedAmount),
        date: new Date(), // You may adjust this according to your requirements
      });
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Expense Description"
        value={updatedDescription}
        onChangeText={(text) => setUpdatedDescription(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Expense Amount"
        value={updatedAmount}
        onChangeText={(text) => setUpdatedAmount(text)}
      />
      <Button title="Save Expense" onPress={updateExpenseHandler} />
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary50,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
});
