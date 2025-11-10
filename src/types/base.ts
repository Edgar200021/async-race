export type Nullable<T> = T | null;

export type SetNumberType =
	| {
			type: "increment";
	  }
	| {
			type: "decrement";
	  }
	| {
			type: "bulk";
			number: number;
	  };
