// exercise3.jsx
export function Exercise3() {
  // Bài 6: Sort + slice
  const companies = [
    { name: "Company A", category: "Finance", start: 1990, end: 2005 },
    { name: "Company B", category: "Retail", start: 1985, end: 2010 },
    { name: "Company C", category: "Auto", start: 2000, end: 2020 },
    { name: "Company D", category: "Tech", start: 1995, end: 2008 },
    { name: "Company E", category: "Retail", start: 1999, end: 2004 }
  ];

  // sắp xếp theo end tăng dần
  const sortedCompanies = [...companies].sort((a, b) => a.end - b.end);
  const top3Companies = sortedCompanies.slice(0, 3);

  // Bài 7: Spread vs Rest
  const company0New = { ...companies[0], start: companies[0].start + 1 };

  const concatAll = (...arrays) => arrays.reduce((acc, cur) => [...acc, ...cur], []);

  const concatResult = concatAll([1, 2], [3], [4, 5]);

  // Bài 8: Reduce nâng cao
  const ages = [33, 12, 20, 16, 19, 22, 14, 18];

  const stats = ages.reduce(
    (acc, age) => {
      acc.total += age;
      acc.min = Math.min(acc.min, age);
      acc.max = Math.max(acc.max, age);

      if (age >= 13 && age <= 19) {
        acc.buckets.teen += 1;
      } else if (age >= 20) {
        acc.buckets.adult += 1;
      }

      return acc;
    },
    {
      total: 0,
      min: Infinity,
      max: -Infinity,
      buckets: { teen: 0, adult: 0 }
    }
  );

  return (
    <div>
      <>Exercise 3</>

      <>Bài 6: Sort + Slice</>
      <ul>
        {top3Companies.map((c, i) => (
          <li key={i}>
            {c.name} - {c.end}
          </li>
        ))}
      </ul>

      <>Bài 7: Spread vs Rest</>
      <p>Original company[0]: {companies[0].name} - {companies[0].start}</p>
      <p>New company0New: {company0New.name} - {company0New.start}</p>
      <p>Kết quả concatAll([1,2],[3],[4,5]): [{concatResult.join(", ")}]</p>

      <>Bài 8: Reduce nâng cao</>
      <p>Total: {stats.total}, Min: {stats.min}, Max: {stats.max}</p>
      <p>Buckets: Teen = {stats.buckets.teen}, Adult = {stats.buckets.adult}</p>
    </div>
  );
}
