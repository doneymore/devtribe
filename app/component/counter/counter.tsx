"use client";

import { decrement, increment, incrementByAmount } from "@/app/lib/features/counter/counterSlice";
import { useAppDispatch } from "@/app/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/app/lib/hooks/useAppSelector";



export default function Counter() {
  const count = useAppSelector((state) => state?.counter?.value);
  const dispatch = useAppDispatch();

  return (
    <div className="p-6 border rounded-lg bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Redux Toolkit Counter</h2>
      <div className="text-3xl font-bold mb-4">{count}</div>
      <div className="space-x-2">
        <button
          onClick={() => dispatch(increment())}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          +
        </button>
        <button
          onClick={() => dispatch(decrement())}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          -
        </button>
        <button
          onClick={() => dispatch(incrementByAmount(5))}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          +5
        </button>
      </div>
    </div>
  );
}
