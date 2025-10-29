// src/components/MovieForm.jsx
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Modal, Image } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';
import { initialMovieState } from '../reducers/movieReducers';

const movieCategories = [
  'Hành động',
  'Kinh dị',
  'Hài kịch',
  'Tình cảm',
  'Khoa học viễn tưởng',
  'Phiêu lưu',
  'Hoạt hình',
  'Tài liệu',
  'Âm nhạc',
  'Chiến tranh',
  'Gia đình',
  'Tâm lý'
];

const MovieFields = ({ currentMovie, handleInputChange, handleFileChange, imagePreview }) => (
  <>
    <Row className="mb-3">
      <Col md={6}>
        <Form.Group controlId="formAvatar">
          <Form.Label>Ảnh Avatar Phim</Form.Label>
          <Form.Control type="file" name="avatarFile" accept="image/*" onChange={handleFileChange} className="mb-2" />
          <Form.Control type="text" name="avatar" value={currentMovie.avatar || ''} onChange={handleInputChange} placeholder="Hoặc nhập URL hình ảnh" />
          {imagePreview && (
            <div className="mt-2">
              <Image src={imagePreview} alt="Preview" thumbnail style={{ maxWidth: '200px', maxHeight: '150px' }} />
            </div>
          )}
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group controlId="formTitle">
          <Form.Label>Tên Phim</Form.Label>
          <Form.Control type="text" name="title" value={currentMovie.title || ''} onChange={handleInputChange} placeholder="Tên phim" required />
        </Form.Group>
      </Col>
    </Row>

    <Row className="mb-3">
      <Col md={4}>
        <Form.Group controlId="formCategory">
          <Form.Label>Danh mục</Form.Label>
          <Form.Select name="genreId" value={currentMovie.genreId || ''} onChange={handleInputChange} required>
            <option value="">Chọn danh mục</option>
            {movieCategories.map((c, i) => (
              <option key={i} value={i + 1}>
                {c}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Col>
      <Col md={4}>
        <Form.Group controlId="formDuration">
          <Form.Label>Thời lượng (phút)</Form.Label>
          <Form.Control type="number" name="duration" value={currentMovie.duration || ''} onChange={handleInputChange} placeholder="Phút" required />
        </Form.Group>
      </Col>
      <Col md={4}>
        <Form.Group controlId="formYear">
          <Form.Label>Năm</Form.Label>
          <Form.Control type="number" name="year" value={currentMovie.year || ''} onChange={handleInputChange} placeholder="Năm" required />
        </Form.Group>
      </Col>
    </Row>

    <Row className="mb-3">
      <Col md={12}>
        <Form.Group controlId="formDescription">
          <Form.Label>Mô tả</Form.Label>
          <Form.Control as="textarea" rows={3} name="description" value={currentMovie.description || ''} onChange={handleInputChange} placeholder="Mô tả" />
        </Form.Group>
      </Col>
    </Row>

    <Row className="mb-3">
      <Col md={4}>
        <Form.Group controlId="formRating">
          <Form.Label>Rating</Form.Label>
          <Form.Control type="number" step="0.1" min="0" max="10" name="rating" value={currentMovie.rating || ''} onChange={handleInputChange} />
        </Form.Group>
      </Col>
      <Col md={4}>
        <Form.Group controlId="formCountry">
          <Form.Label>Country</Form.Label>
          <Form.Control type="text" name="country" value={currentMovie.country || ''} onChange={handleInputChange} />
        </Form.Group>
      </Col>
    </Row>
  </>
);

const MovieForm = () => {
  const state = useMovieState();
  const { dispatch, handleCreateOrUpdate } = useMovieDispatch();
  const { currentMovie, isEditing, showEditModal } = state;
  const [imagePreview, setImagePreview] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'UPDATE_FIELD', payload: { name, value } });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setImagePreview(imageUrl);
        dispatch({ type: 'UPDATE_FIELD', payload: { name: 'avatar', value: imageUrl } });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCloseEditModal = () => {
    dispatch({ type: 'CLOSE_EDIT_MODAL' });
    setImagePreview('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...currentMovie,
      duration: parseInt(currentMovie.duration || 0),
      year: parseInt(currentMovie.year || 0),
      rating: parseFloat(currentMovie.rating || 0)
    };
    const success = await handleCreateOrUpdate(dataToSend, isEditing !== null, isEditing);
    if (success && isEditing === null) {
      setImagePreview('');
    }
  };

  const isCreating = isEditing === null;

  return (
    <>
      <Container className="p-3 mb-4 border">
        <h3 className="mb-3">📽️ Thêm Phim Mới</h3>
        <Form onSubmit={handleSubmit}>
          <MovieFields currentMovie={isCreating ? currentMovie : initialMovieState.currentMovie} handleInputChange={isCreating ? handleInputChange : () => {}} handleFileChange={isCreating ? handleFileChange : () => {}} imagePreview={isCreating ? imagePreview : currentMovie.avatar} />
          <div className="d-flex gap-2 mt-3">
            <Button variant="success" type="submit">
              ➕ Thêm Phim
            </Button>
          </div>
        </Form>
      </Container>

      <Modal show={showEditModal} onHide={handleCloseEditModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa Phim ID: {isEditing}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <MovieFields currentMovie={currentMovie} handleInputChange={handleInputChange} handleFileChange={handleFileChange} imagePreview={imagePreview || currentMovie.avatar} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditModal}>
              Hủy
            </Button>
            <Button variant="warning" type="submit">
              Lưu Thay Đổi
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default MovieForm;
