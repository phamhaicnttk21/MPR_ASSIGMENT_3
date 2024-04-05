import React from 'react';
import { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';

function RecentExpenses({ navigation }) {
  const expensesCtx = useContext(ExpensesContext);

  const handleAddExpense = () => {
    navigation.navigate('ManageExpense');
  };

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <>
      <ExpensesOutput
        expenses={recentExpenses}
        expensesPeriod="Last 7 Days"
        fallbackText="No expenses registered for the last 7 days."
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddExpense}
      >
        <Text style={styles.buttonText}>Add Expense</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    marginHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RecentExpenses;
