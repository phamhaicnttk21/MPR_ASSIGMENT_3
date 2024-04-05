import React from "react";
import { useContext } from "react";
import { FlatList, TouchableOpacity, Text, StyleSheet } from "react-native";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { Button } from "react-native-web";

function AllExpenses({ navigation }) {
  const expensesCtx = useContext(ExpensesContext);

  const handleExpensePress = (expenseId) => {
    navigation.navigate("ManageExpense", { expenseId });
  };

  return (
    <>
      <ExpensesOutput
        expenses={expensesCtx.expenses}
        expensesPeriod='Total'
        fallbackText='No registered expenses found!'
        onPressItem={handleExpensePress}
      />
      <TouchableOpacity onPress={() => navigation.navigate("ManageExpense")}>
      <Text style={styles.buttonText}>Add Expense</Text>
      </TouchableOpacity>
    </>
  );
}
const styles = StyleSheet.create({
  buttonText: {
    color: 'green',
    fontSize: 18,
    fontWeight: 'bold',
     marginLeft:"35%"
  },
})
export default AllExpenses;
