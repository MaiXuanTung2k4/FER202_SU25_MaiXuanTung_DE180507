import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, toggleAdminStatus } from './features/users/usersSlice';
import { createPayment, selectSuccessfulPayments } from './features/payments/paymentsSlice';

function App() {
  const dispatch = useDispatch();

  // Lấy state từ Redux
  const { list: users, isLoading: usersLoading, error: usersError } = useSelector(state => state.users);
  const { payments, isLoading: paymentsLoading, error: paymentsError } = useSelector(state => state.payments);
  const successfulPayments = useSelector(selectSuccessfulPayments);

  const [amount, setAmount] = useState('');

  // Giả lập gọi API khi load trang
  useEffect(() => {
    // ⚠️ Nếu chưa có server thật, có thể comment dòng này để tránh lỗi.
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleToggleAdmin = (userId) => {
    dispatch(toggleAdminStatus(userId));
  };

  const handleCreatePayment = () => {
    if (!amount) return alert('Nhập số tiền!');
    dispatch(createPayment({ id: Date.now(), amount: Number(amount), status: 'SUCCESS' }));
    setAmount('');
  };

  return (
    <div style={{ fontFamily: 'Arial', padding: '20px' }}>
      <h1>Redux Toolkit Demo - Users & Payments</h1>

      {/* USERS SECTION */}
      <section style={{ marginBottom: '40px' }}>
        <h2>👤 Quản lý Người dùng</h2>

        {usersLoading && <p>Đang tải danh sách người dùng...</p>}
        {usersError && <p style={{ color: 'red' }}>Lỗi: {usersError}</p>}

        <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Admin</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4">Không có người dùng nào</td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.isAdmin ? '✅' : '❌'}</td>
                  <td>
                    <button onClick={() => handleToggleAdmin(user.id)}>
                      Đổi quyền Admin
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      {/* PAYMENTS SECTION */}
      <section>
        <h2>💳 Quản lý Thanh toán</h2>

        {paymentsLoading && <p>Đang xử lý thanh toán...</p>}
        {paymentsError && <p style={{ color: 'red' }}>Lỗi: {paymentsError}</p>}

        <input
          type="number"
          placeholder="Nhập số tiền..."
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={handleCreatePayment} style={{ marginLeft: '10px' }}>
          Tạo thanh toán
        </button>

        <h3>Danh sách Thanh toán</h3>
        <ul>
          {payments.length === 0 ? (
            <li>Chưa có thanh toán nào</li>
          ) : (
            payments.map((p) => (
              <li key={p.id}>
                ID: {p.id} — Số tiền: {p.amount} — Trạng thái: {p.status}
              </li>
            ))
          )}
        </ul>

        <h3>✅ Thanh toán thành công</h3>
        <ul>
          {successfulPayments.length === 0 ? (
            <li>Không có thanh toán thành công</li>
          ) : (
            successfulPayments.map((p) => (
              <li key={p.id}>ID: {p.id} — {p.amount}đ</li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
}

export default App;
