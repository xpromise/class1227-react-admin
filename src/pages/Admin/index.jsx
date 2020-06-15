import React from "react";

import Visits from "./components/Visits";
import Sales from "./components/Sales";
import Search from "./components/Search";
import SearchRight from "./components/SearchRight";

export default function Admin() {
	return (
		<div>
			<Visits />
			<Sales />
			<Search />
			<SearchRight />
		</div>
	);
}
