export function Exercise1(){
        const double = x => x*2;
        const issPositive = x => x > 0;
    return (
        <div>
        <p>Hello <strong>Exercise 1</strong></p>
        <h2>Chi tiết bài tập 1</h2>
        <p>Mam double(5): {double(5)}</p>
        <p>issPositive 5: {issPositive(5)? "So Duong": "So Am"}</p>
        </div>


    );
}