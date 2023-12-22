interface Session {
	created: number;
	desc: string;
	id: string;
	items: Item[];
	status: "new" | "active" | "completed";
	title: string;
	updated: number;
	viewers: string[];
}

interface Item {
	id: string;
	title: string;
	status: "new" | "active" | "completed";
	votes: {
		[id: string]: number;
	}
}