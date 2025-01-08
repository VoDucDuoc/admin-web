import React, { useEffect, useState } from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router";
import { ErrorMessage } from "@hookform/error-message";
import {
  deleteCategory,
  editCategory,
  getCategory,
  enableCategory,
} from "../../actions/category.actions";
import "./style.css";

function EditCategory(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { category, isUpdating, isDeleting, isEnabling } = useSelector(
    (state) => state.categories
  );
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getCategory(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (category && Object.keys(category).length > 0) {
      const mapperFilterField = category.filterField.reduce((result, field) => {
        const fields = field.value.map((value, index) => ({
          ...field,
          value,
        }));
        return [...result, ...fields];
      }, []);
      reset({ ...category, filterField: mapperFilterField });
    }
  }, [reset, category]);
  const {
    fields: normalField,
    append: normalAppend,
    remove: normalRemove,
  } = useFieldArray({ control, name: "normalField" });
  const {
    fields: filterField,
    append: filterAppend,
    remove: filterRemove,
  } = useFieldArray({ control, name: "filterField" });
  const onSubmit = (data) => {
    const mappedFilterField = data.filterField.reduce((acc, cur) => {
      const index = acc.findIndex((field) => field.name === cur.name);
      if (index < 0) {
        acc.push({
          ...cur,
          value: [cur.value],
        });
        return acc;
      }
      acc[index].value.push(cur.value);
      return acc;
    }, []);
    dispatch(
      editCategory({ id, ...data, filterField: mappedFilterField })
    ).then(() => {
      dispatch(getCategory(id));
    });
  };
  const onDelete = () => {
    dispatch(deleteCategory(id)).then(() => {
      dispatch(getCategory(id));
    });
  };
  const onEnable = () => {
    dispatch(enableCategory(id)).then(() => {
      dispatch(getCategory(id));
    });
  };

  const renderFilterFields = () => {
    if (filterField.length <= 0) return;
    let fname = filterField[0].name;
    return filterField.map((item, index) => {
      let s = false;
      if (fname !== item.name) {
        s = true;
        fname = item.name;
      }
      return (
        <li
          key={`${item.id}_${item.value}`}
          className={s ? "mt-3 mb-1" : "mb-1"}
        >
          <div className="d-inline-block w-25 mr-2">
            <ErrorMessage
              errors={errors}
              name={`filterField.${index}.name`}
              render={({ message }) => (
                <div className="errorMessage">{message}</div>
              )}
            />
            <input
              className="form__input w-100"
              {...register(`filterField.${index}.name`, {
                required: "This is required.",
              })}
              placeholder="Filter field"
              readOnly={auth && auth.user.role !== "admin"}
            />
          </div>
          <div className="d-inline-block w-25 mr-2">
            <ErrorMessage
              errors={errors}
              name={`filterField.${index}.value`}
              render={({ message }) => (
                <div className="errorMessage">{message}</div>
              )}
            />
            <input
              className="form__input w-100"
              {...register(`filterField.${index}.value`, {
                required: "This is required.",
              })}
              placeholder="Filter value "
              readOnly={auth && auth.user.role !== "admin"}
            />
          </div>
          {filterField.length > 1 && (
            <>
              {auth && auth.user.role === "admin" && (
                <Button
                  variant="outline-danger"
                  className="form__input--delete"
                  type="button"
                  onClick={() => {
                    filterRemove(index);
                  }}
                >
                  X
                </Button>
              )}
            </>
          )}
        </li>
      );
    });
  };

  return (
    <Container>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="form__title d-block">Category name:</p>
          <input
            className="form__input "
            {...register(`name`, { required: "This is required." })}
            placeholder="Category name"
            readOnly={auth && auth.user.role !== "admin"}
          />
          <ErrorMessage
            errors={errors}
            name="name"
            render={({ message }) => (
              <div className="errorMessage">{message}</div>
            )}
          />
          <div className="mt-3">
            <p className="form__title">Additional infomation for product</p>
            {auth && auth.user.role === "admin" && (
              <Button
                className="form__button"
                type="button"
                onClick={() => {
                  normalAppend({ name: "" });
                }}
              >
                +
              </Button>
            )}
            <ul className="form__list">
              {normalField.map((item, index) => {
                return (
                  <li key={item.id}>
                    <ErrorMessage
                      errors={errors}
                      name={`normalField.${index}.name`}
                      render={({ message }) => (
                        <div className="errorMessage">{message}</div>
                      )}
                    />
                    <input
                      className="form__input"
                      {...register(`normalField.${index}.name`, {
                        required: "This is required.",
                      })}
                      placeholder="Product info name"
                      readOnly={auth && auth.user.role !== "admin"}
                    />
                    {normalField.length > 1 && (
                      <>
                        {auth && auth.user.role === "admin" && (
                          <Button
                            variant="outline-danger"
                            className="form__input--delete"
                            type="button"
                            onClick={() => normalRemove(index)}
                          >
                            X
                          </Button>
                        )}
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="mt-3">
            <p className="form__title">Filterable Infomation </p>
            {auth && auth.user.role === "admin" && (
              <Button
                className="form__button"
                type="button"
                onClick={() => {
                  filterAppend({ name: "", value: "", type: "" });
                }}
              >
                +
              </Button>
            )}
            <ul className="form__list">{renderFilterFields()}</ul>
          </div>
          {auth && auth.user.role === "admin" && (
            <Button
              variant="success"
              className="mt-3 mr-2"
              type="submit"
              disabled={isUpdating || isDeleting}
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
          {category && category.isAvailable ? (
            <>
              {auth && auth.user.role === "admin" && (
                <Button
                  variant="danger"
                  className="mt-3 mr-2"
                  onClick={onDelete}
                  disabled={isDeleting || isEnabling}
                >
                  {isDeleting && (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  )}
                  Delete Category
                </Button>
              )}
            </>
          ) : (
            <>
              {auth && auth.user.role === "admin" && (
                <Button
                  variant="info"
                  className="mt-3 mr-2"
                  onClick={onEnable}
                  disabled={isDeleting || isEnabling}
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
                  Enable Category
                </Button>
              )}
            </>
          )}
          <Button
            variant="secondary"
            className="mt-3"
            onClick={() => {
              history.push("/categories");
            }}
            disabled={isUpdating || isDeleting}
          >
            Back
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default EditCategory;
