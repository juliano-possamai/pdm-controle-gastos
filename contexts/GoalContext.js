import { createContext, useState } from "react";

export const GoalContext = createContext();

function GoalProvider({ children }) {
	const [goals, setGoals] = useState([])

	const findGoal = (id) => {
		return goals.find((goal) => goal.id === id);
	}

	const saveGoal = (id, goal) => {
		if (!id > 0) {
			let id = goals.length + 1;
			return setGoals([...goals, { id: id, ...goal, savings: [] }]);
		}

		const index = goals.findIndex((goal) => goal.id === id);
		goals[index] = {savings: goals[index].savings, ...goal};
		setGoals([...goals])
	}

	const removeGoal = (goalId) => {
		setGoals(goals.filter((goal) => goal.id !== goalId));
	};

	const getSavings = (goalId) => {
		return findGoal(goalId).savings;
	}

	const saveSavings = (goalId, saving) => {
		const index = goals.findIndex((goal) => goal.id === goalId);
		let goal = goals[index];
		let savingId = goal.savings.length + 1;

		goals[index].savings = [...goals[index].savings, { id: savingId, ...saving }];
		setGoals([...goals])
	};

	const removeSaving = (goalId, savingId) => {
		const index = goals.findIndex((goal) => goal.id === goalId);

		goals[index].savings = goals[index].savings.filter((saving) => saving.id !== savingId);
		setGoals([...goals])
	};

	const isGoalAchieved = (goalId) => {
		const goal = findGoal(goalId);
		const totalSavings = goal.savings.reduce((acc, saving) => acc + parseFloat(saving.value), 0);
		return totalSavings >= parseFloat(goal.value);
	}

	return (
		<GoalContext.Provider value={{ goals, findGoal, isGoalAchieved, saveGoal, removeGoal, getSavings, saveSavings, removeSaving }}>
			{children}
		</GoalContext.Provider>
	);
}

export default GoalProvider;