import React from 'react';

function Menu() {
  return (
    <section className="py-5" id="menu">
      <div className="container">
        <h2 className="text-center mb-4">Our Menu</h2>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card">
              <img src="/images/pizza1.jpg" className="card-img-top" alt="Pizza 1" />
              <div className="card-body">
                <h5 className="card-title">Margherita</h5>
                <p className="card-text">$8</p>
                <a href="#" className="btn btn-primary">Order</a>
              </div>
            </div>
          </div>
          {/* Thêm các col-md-4 khác cho pizza khác */}
        </div>
      </div>
    </section>
  );
}

export default Menu;
