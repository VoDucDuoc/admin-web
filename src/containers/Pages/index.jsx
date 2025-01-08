import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { create } from "../../actions/page.actions";
import Input from "../../components/UI/Input";
import CustomModal from "../../components/UI/Modal";
import { createCategoryOptions } from "../../helpers/util";

function Pages() {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const categoryState = useSelector((state) => state.categories);
  const [categoryId, setCategoryId] = useState("");
  const [type, setType] = useState("");
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const pageState = useSelector((state) => state.pages);
  const dispatch = useDispatch();
  useEffect(() => {
    setCategories(createCategoryOptions(categoryState.categories));
  }, [categoryState]);
  useEffect(() => {
    if (!pageState.loading) {
      setTitle("");
      setDescription("");
      setCategoryId("");
      setType("");
      setBanners([]);
      setProducts([]);
    }
  }, [pageState]);
  const handleClose = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("description", description);
    form.append("category", categoryId);
    form.append("type", type);
    banners.forEach((banner) => {
      form.append("banners", banner);
    });
    products.forEach((product) => {
      form.append("products", product);
    });
    dispatch(create(form));
    setShow(false);
  };
  const handleBannerImages = (e) => {
    setBanners([...banners, e.target.files[0]]);
  };
  const handleProductImages = (e) => {
    setProducts([...products, e.target.files[0]]);
  };
  const handleCategoryChange = (e) => {
    const category = categories.find(
      (category) => category.value === e.target.value
    );

    setCategoryId(e.target.value);
    setType(category.type);
  };
  const renderAddPage = () => {
    return (
      <CustomModal
        title="Add page"
        show={show}
        handleClose={() => setShow(false)}
        onSubmit={handleClose}
      >
        <Row>
          <Col>
            <Input
              type="select"
              value={categoryId}
              onChange={handleCategoryChange}
              placeholder="Select category"
              options={categories}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              value={title}
              placeholder="Page title"
              onChange={(e) => setTitle(e.target.value)}
              className="form-control mb-3"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              value={description}
              placeholder="Page description"
              onChange={(e) => setDescription(e.target.value)}
              className="form-control mb-3"
            />
          </Col>
        </Row>
        {banners.length > 0
          ? banners.map((banner, index) => (
              <Row key={index}>
                <Col>{banner.name}</Col>
              </Row>
            ))
          : null}
        <Row>
          <Col>
            <input
              className="form-control mb-3"
              type="file"
              name="banner"
              onChange={handleBannerImages}
            />
          </Col>
        </Row>
        {products.length > 0
          ? products.map((product, index) => (
              <Row key={index}>
                <Col>{product.name}</Col>
              </Row>
            ))
          : null}
        <Row>
          <Col>
            <input
              className="form-control mb-3"
              type="file"
              name="banner"
              onChange={handleProductImages}
            />
          </Col>
        </Row>
      </CustomModal>
    );
  };
  return (
    <>
      {pageState.loading ? (
        <p>LOADINGGGGGGGGGGGGGGGG</p>
      ) : (
        <div>
          <Button onClick={() => setShow(true)}>Add page</Button>
          {renderAddPage()}
        </div>
      )}
    </>
  );
}

export default Pages;
