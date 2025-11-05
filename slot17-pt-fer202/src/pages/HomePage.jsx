import React, { useEffect, useState } from 'react';
import { Container, Navbar, Nav, Button, Table } from 'react-bootstrap';
import { useAuthState, useAuthDispatch } from '../contexts/AuthContext';
import api from '../services/api';
import FilterBar from '../components/FilterBar';
import { useNavigate } from 'react-router-dom';

const Header = ({ user, onLogout }) => {
  return (
    <Navbar bg="light" className="mb-3">
      <Navbar.Brand>TuitionTracker</Navbar.Brand>
      <Nav className="ms-auto align-items-center">
        <div className="me-3">Signed in as <strong>{user.fullName || user.username}</strong></div>
        <Button variant="outline-danger" onClick={onLogout}>Logout</Button>
      </Nav>
    </Navbar>
  );
};

const HomePage = () => {
  const { user } = useAuthState();
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();

  const [payments, setPayments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({ search: '', semester: '', sort: '' });
  const [semesters, setSemesters] = useState([]);

  useEffect(()=>{
    fetchPayments();
  },[]);

  const fetchPayments = async () => {
    try{
      const res = await api.get('/payments');
      setPayments(res.data);
      setFiltered(res.data);
      const s = Array.from(new Set(res.data.map(p => p.semester))).filter(Boolean);
      setSemesters(s);
    }catch(err){
      console.error(err);
      alert('Failed to fetch payments. Make sure json-server is running and db.json has payments.');
    }
  };

  useEffect(()=>{
    applyFilters();
  },[filters, payments]);

  const applyFilters = () => {
    let data = [...payments];
    const q = filters.search.trim().toLowerCase();
    if(q){
      data = data.filter(p => (p.courseName && p.courseName.toLowerCase().includes(q)) || (p.semester && p.semester.toLowerCase().includes(q)));
    }
    if(filters.semester){
      data = data.filter(p => p.semester === filters.semester);
    }
    // sorts
    switch(filters.sort){
      case 'name_asc':
        data.sort((a,b)=> (a.courseName||'').localeCompare(b.courseName||''));
        break;
      case 'name_desc':
        data.sort((a,b)=> (b.courseName||'').localeCompare(a.courseName||''));
        break;
      case 'date_asc':
        data.sort((a,b)=> new Date(a.date) - new Date(b.date));
        break;
      case 'date_desc':
        data.sort((a,b)=> new Date(b.date) - new Date(a.date));
        break;
      case 'amount_asc':
        data.sort((a,b)=> (a.amount||0) - (b.amount||0));
        break;
      case 'amount_desc':
        data.sort((a,b)=> (b.amount||0) - (a.amount||0));
        break;
      default:
        break;
    }
    setFiltered(data);
  };

  const handleSortChange = (val) => {
    setFilters(prev => ({ ...prev, sort: val }));
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('pt_user');
    navigate('/login');
  };

  return (
    <>
      <Header user={user} onLogout={handleLogout} />
      <Container>
        <FilterBar filters={filters} setFilters={setFilters} semesters={semesters} onSortChange={handleSortChange} />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Course Name</th>
              <th>Semester</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="text-center">No payments found</td></tr>
            )}
            {filtered.map((p, idx) => (
              <tr key={p.id || idx}>
                <td>{idx+1}</td>
                <td>{p.courseName}</td>
                <td>{p.semester}</td>
                <td>{p.date}</td>
                <td>{p.amount}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default HomePage;
