import React, { useEffect, useState } from "react";
import { BrowserRouter, } from "react-router-dom";
import './App.css';
import HostRouter from "./Host";

export default function App() {
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			await new Promise(resolve => setTimeout(resolve, 2000));
			setLoading(false);
		}

		fetchData();
	}, [])

	return (
		<BrowserRouter>
			<HostRouter />
		</BrowserRouter>
	)
}