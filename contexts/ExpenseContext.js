import { createContext, useState } from "react";

export const ExpenseContext = createContext();

function ExpenseProvider({ children }) {
	const [expenses, setExpenses] = useState([])

	const save = (id, expense) => {
		if (!id > 0) {
			return setExpenses([...expenses, {id: id, ...expense}]);
		}

		const index = expenses.findIndex((exp) => exp.id === id);
		expenses[index] = expense;
	};

	const remove = (expenseId) => {
		setExpenses(expenses.filter((expense) => expense.id !== expenseId));
	};

	const getCategories = () => {
		return [
			{ label: 'Moradia', value: 'moradia' },
			{ label: 'Alimentação', value: 'alimentacao' },
			{ label: 'Transporte', value: 'transporte' },
			{ label: 'Saúde', value: 'saude' },
			{ label: 'Entretenimento', value: 'entretenimento' },
			{ label: 'Outros gastos', value: 'outrosGastos' }
		];
	};

	return (
		<ExpenseContext.Provider value={{ expenses, save, remove, getCategories }}>
			{children}
		</ExpenseContext.Provider>
	);
}

export default ExpenseProvider;