import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import ImageUploading from "react-images-uploading";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  deleteProduct,
  getProductById,
  updateProduct,
  enableProduct,
} from "../../actions/product.actions";
import { generatePictureUrl } from "../../urlConfig";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./style.css";
import { withStyles } from "@material-ui/core/styles";
import { Chip } from "@material-ui/core";

function EditProduct(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [category, setCategory] = useState();
  const [productLabels, setProductLabels] = useState([]);
  const [images, setImages] = useState([]);
  const [isReplace, setReplace] = useState(false);
  const maxNumber = 5;
  const { categories } = useSelector((state) => state.categories);
  const { product, isUpdating, isEnabling } = useSelector(
    (state) => state.products
  );
  const auth = useSelector((state) => state.auth);
  const { labels } = useSelector((state) => state.labels);

  const { register, control, handleSubmit, setValue, getValues, reset } =
    useForm();

  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
    }
  }, [dispatch, id]);
  useEffect(() => {
    if (
      categories &&
      Object.keys(categories).length > 0 &&
      product &&
      Object.keys(product).length > 0 &&
      labels.length > 0
    ) {
      const labelList = product.labels
        ? product.labels.map((name) => {
            return labels.find((l) => l.name === name);
          })
        : [];
      setProductLabels(labelList.filter((x) => !!x));
      const cate = categories.find((cate) => cate.name === product.category);
      setCategory(cate);
      reset({ ...product });
    }
  }, [reset, categories, product, labels]);

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    setImages(imageList);
  };
  // categoryInfo,

  const { fields: categoryInfo } = useFieldArray({
    control,
    name: "categoryInfo",
  });

  const onSubmit = (data) => {
    const form = new FormData();
    Object.keys(data).forEach((key, index) => {
      if (
        !["category", "categoryInfo", "productPictures", "labels"].includes(key)
      ) {
        form.append(key, data[key]);
      }
    });
    form.append("category", category.name);
    console.log(data.categoryInfo);
    for (let field of data.categoryInfo) {
      if (field.value) {
        form.append(
          "categoryInfo",
          JSON.stringify({ name: field.name, value: field.value })
        );
      }
    }
    if (productLabels.length > 0) {
      form.append("labels", JSON.stringify(productLabels.map((x) => x.name)));
    } else {
      form.append("labels", JSON.stringify([]));
    }

    if (isReplace) {
      for (let pic of images) {
        form.append("productPictures", pic.file);
      }
    }
    for (var pair of form.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    dispatch(updateProduct(id, form));
  };

  const onDelete = () => {
    dispatch(deleteProduct(id)).then(() => {
      dispatch(getProductById(id));
    });
  };

  const onEnable = () => {
    dispatch(enableProduct(id)).then(() => {
      dispatch(getProductById(id));
    });
  };

  const CustomAutocomplete = withStyles({
    tag: {
      backgroundColor: "white",
      height: 24,
      position: "relative",
      zIndex: 0,
      "& .MuiChip-label": {
        color: "currentColor",
      },
      "& .MuiChip-deleteIcon": {
        color: "white",
      },
      "&:after": {
        content: '""',
        right: 10,
        top: 6,
        height: 12,
        width: 12,
        position: "absolute",
        backgroundColor: "currentColor",
        zIndex: -1,
      },
    },
  })(Autocomplete);

  return (
    <Container>
      <div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Label className="form__title d-block">Product name:</Form.Label>
          <Form.Control
            className="form__input w-100 bg-white"
            {...register(`name`)}
            placeholder="Category name"
            readOnly={auth && auth.user.role !== "admin"}
          />
          <Row>
            <Col lg={4}>
              <Form.Label className="form__title d-block">
                Regular Price:
              </Form.Label>
              <Form.Control
                className="form__input w-100 bg-white"
                {...register(`regularPrice`)}
                placeholder="0"
                onChange={(e) => {
                  const salePrice = getValues("salePrice");
                  const result = Math.round(
                    (1 - Number(salePrice) / Number(e.target.value)) * 100
                  );
                  setValue("sale", result.toString());
                }}
                readOnly={auth && auth.user.role !== "admin"}
              />
            </Col>
            <Col lg={4}>
              <Form.Label className="form__title d-block">
                Sale Price:
              </Form.Label>
              <Form.Control
                className="form__input w-100 bg-white"
                {...register(`salePrice`)}
                placeholder="0"
                onChange={(e) => {
                  const regularPrice = getValues("regularPrice");
                  const result = Math.round(
                    (1 - Number(e.target.value) / Number(regularPrice)) * 100
                  );
                  setValue("sale", result.toString());
                }}
                readOnly={auth && auth.user.role !== "admin"}
              />
            </Col>
            <Col lg={4}>
              <Form.Label className="form__title d-block">Sale:</Form.Label>
              <InputGroup className="w-100">
                <FormControl
                  className="form__input w-75"
                  readOnly
                  {...register(`sale`)}
                  placeholder="0"
                />
                <InputGroup.Text>%</InputGroup.Text>
              </InputGroup>
            </Col>
          </Row>
          <Form.Label className="form__title d-block">Quantity:</Form.Label>
          <Form.Control
            className="form__input w-100 bg-white"
            {...register(`quantity`)}
            placeholder="0"
            readOnly={auth && auth.user.role !== "admin"}
          />
          <Form.Label className="form__title d-block">Description:</Form.Label>
          <Form.Control
            as="textarea"
            className="form__input w-100 bg-white"
            {...register(`description`)}
            placeholder="Description"
            readOnly={auth && auth.user.role !== "admin"}
          />
          {category &&
            category.filterField.map((field, index) => (
              <div key={index}>
                <Form.Label className="form__title d-block">
                  {field.name}
                </Form.Label>
                <Form.Control
                  as="textarea"
                  hidden
                  value={field.name}
                  {...register(`categoryInfo.${index}.name`)}
                  placeholder="Description"
                />
                <Form.Control
                  className="bg-white"
                  as="select"
                  {...register(`categoryInfo.${index}.value`)}
                  readOnly={auth && auth.user.role !== "admin"}
                >
                  {field.value.map((value) => (
                    <option
                      value={value}
                      key={value}
                      disabled={auth && auth.user.role !== "admin"}
                    >
                      {value}
                    </option>
                  ))}
                </Form.Control>
              </div>
            ))}
          {category &&
            category.normalField.map((field, index) => (
              <div key={index}>
                <Form.Label className="form__title d-block">
                  {field.name}
                </Form.Label>
                <Form.Control
                  hidden
                  value={field.name}
                  {...register(
                    `categoryInfo.${category.filterField.length + index}.name`
                  )}
                  placeholder="Description"
                />
                <Form.Control
                  className="form__input w-100 bg-white"
                  {...register(
                    `categoryInfo.${category.filterField.length + index}.value`
                  )}
                  placeholder="Product infomation"
                  readOnly={auth && auth.user.role !== "admin"}
                />
              </div>
            ))}
          <div style={{ margin: "20px auto" }}>
            <Controller
              render={({ field: { onChange, value } }) => (
                <CustomAutocomplete
                  multiple
                  id="tags-standard"
                  value={productLabels}
                  options={labels || []}
                  getOptionLabel={(option) => option.name}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => {
                      return (
                        <Chip
                          key={option.name}
                          variant="outlined"
                          label={option.name}
                          style={{
                            color: option.color,
                            borderColor: option.color,
                            borderRadius: 0,
                            padding: "8px auto",
                          }}
                          {...getTagProps({ index })}
                        />
                      );
                    })
                  }
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        variant="standard"
                        placeholder="Labels"
                        style={{
                          color: "red",
                        }}
                      />
                    );
                  }}
                  onChange={(_, data) => {
                    onChange();
                    setProductLabels(data);
                    return data;
                  }}
                />
              )}
              name={"labels"}
              control={control}
            />
          </div>
          <>
            <Form.Label className="form__title">Product's pictures:</Form.Label>
            {auth && auth.user.role === "admin" && (
              <Button
                variant="outline-primary"
                onClick={() => {
                  setReplace((prev) => !prev);
                }}
              >
                Toggle replace
              </Button>
            )}
            <div className="product__images">
              <div className="product__images-container">
                {Object.keys(product).length > 0 &&
                  product.productPictures &&
                  product.productPictures.map((image, index) => (
                    <div key={index}>
                      <div className="product__images-image-wrapper">
                        <img
                          src={generatePictureUrl(image)}
                          alt=""
                          width="100"
                          className="product__images-image--view"
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </>

          {isReplace && (
            <ImageUploading
              multiple
              value={images}
              onChange={onChange}
              maxNumber={maxNumber}
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                // write your building UI
                <>
                  <Form.Label className="form__title d-block">
                    Replace by below pictures:
                  </Form.Label>
                  <div className="product__images">
                    <Button
                      variant="outline-primary"
                      className="product__images--add"
                      style={isDragging ? { color: "red" } : null}
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      Click or Drop here
                    </Button>
                    <Button
                      variant="outline-danger"
                      className="product__images--remove-all"
                      onClick={onImageRemoveAll}
                    >
                      Remove all images
                    </Button>
                    <div className="product__images-container">
                      {imageList.map((image, index) => (
                        <div key={index}>
                          <div className="product__images-image-wrapper">
                            <img
                              src={image.data_url}
                              alt=""
                              width="100"
                              className="product__images-image"
                              onClick={() => onImageRemove(index)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </ImageUploading>
          )}
          <div className="mt-2">
            {auth && auth.user.role === "admin" && (
              <Button
                type="submit"
                variant="success"
                className="mr-2"
                disabled={isUpdating || isEnabling}
              >
                {isUpdating && (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                )}
                Submit
              </Button>
            )}
            {product && product.isAvailable ? (
              <>
                {auth && auth.user.role === "admin" && (
                  <Button
                    variant="danger"
                    className="mr-2"
                    onClick={onDelete}
                    disabled={isUpdating || isEnabling}
                  >
                    {isEnabling && (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    )}
                    Delete product
                  </Button>
                )}
              </>
            ) : (
              <>
                {auth && auth.user.role === "admin" && (
                  <Button
                    variant="info"
                    className="mr-2"
                    onClick={onEnable}
                    disabled={isUpdating || isEnabling}
                  >
                    {isEnabling && (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    )}
                    Enable product
                  </Button>
                )}
              </>
            )}
            <Button
              variant="secondary"
              onClick={() => {
                history.push("/products");
              }}
              disabled={isUpdating || isEnabling}
            >
              Back
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
}

export default EditProduct;
