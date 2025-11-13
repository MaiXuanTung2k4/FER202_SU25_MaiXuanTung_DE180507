export default function TotalCard({ total }) {
  return (
    <h5 className="text-center mt-3">
      💸 Total Expenses: <b>{total.toLocaleString()} ₫</b>
    </h5>
  );
}
