export function Exercise2(){
//khai bao so nguyen
const numbers = [1, -20, 12, -8, 5, 7, 9, -10];

//tinh tong cac phan tu trong mang
const sum = numbers.reduce((acc, cur) => acc + cur, 0);

//khai bao mang chuoi name
const names = ["tung", "an", "binh"];

//khai bao mang people gom 10 phan tu
const people = [
  { id: 1, name: "Tùng", age: 20 },
  { id: 2, name: "An", age: 22 },
  { id: 3, name: "Bình", age: 19 },
  { id: 4, name: "Lan", age: 21 },
  { id: 5, name: "Hoa", age: 23 },
  { id: 6, name: "Nam", age: 24 },
  { id: 7, name: "Minh", age: 20 },
  { id: 8, name: "Hà", age: 22 },
  { id: 9, name: "Khánh", age: 25 },
  { id: 10, name: "Phúc", age: 18 }
];

//loc ra nhung nguoi tuoi teen
const teenList = people.filter(p =>p.age >= 13 && p.age <= 19);
    return(
        <div>

            <p> Cac phan tu cua mang la:</p>
            <ul>
                {numbers.map((number, index) => (
                    <li key={index}>{number}</li>
                ))}
            </ul>
            <p>Tong cac phan tu cua mang la: <strong>{sum}</strong></p>
            <p>So luong phan tu la: {numbers.length}</p>
            <ul>
        {names.map((name, index) => (
          <li key={index}>{name}</li>
        ))} 
      </ul>
            <p>list people:</p>
            <ul>
        {people.map((person) => (
          <li key={person.id}>
            {person.id}. {person.name} - {person.age} tuổi
          </li>
        ))}
      </ul>
      <p>Danh sách teen (13 - 19 tuổi):</p>
      <ul>
        {teenList.map((person) => (
          <li key={person.id}>
            {person.id}. {person.name} - {person.age} tuổi
          </li>
        ))}
      </ul>
        </div>
    );
}