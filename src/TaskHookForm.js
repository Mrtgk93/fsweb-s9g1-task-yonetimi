import React from "react";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";

export default function TaskHookForm(props) {
  const { kisiler, submitFn } = props;

  const {
    register,
    reset,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
    submitFn({
      ...data,
      id: nanoid(5),
      status: "yapılacak",
    });
  };

  return (
    <div>
      <form className="taskForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-line">
          <label className="input-label" htmlFor="title">
            Başlık
          </label>
          <input
            className="input-text"
            id="title"
            type="text"
            name="title"
            {...register("title", {
              required: "Task başlığı yazmalısnız",
              minLength: {
                value: 3,
                message: "task başlığı en az 3 karakter olmalı",
              },
            })}
          />
          {errors.title && <p>{errors.title.message}</p>}
        </div>

        <div className="form-line">
          <label className="input-label" htmlFor="description">
            Açıklama
          </label>
          <textarea
            className="input-textarea"
            rows="3"
            id="description"
            name="description"
            {...register("description", {
              required: "Task açıklaması yazmalısınız",
              minLength: {
                value: 10,
                message: "Task açıklaması en az 10 karakterolmalı",
              },
            })}
          ></textarea>
          {errors.description && <p>{errors.description.message}</p>}
        </div>

        <div className="form-line">
          <label className="input-label">İnsanlar</label>
          <div>
            {kisiler.map((p) => (
              <label className="input-checkbox" key={p}>
                <input
                  type="checkbox"
                  id="people"
                  name="people"
                  value={p}
                  {...register("people", {
                    required: "1 kişi sec",
                    max: { value: 3, message: "en fazla 3 kişi seç" },
                  })}
                />
                {p}
              </label>
            ))}
            {errors.people && <p>{errors.people.message}</p>}
          </div>
        </div>

        <div className="form-line">
          <button className="submit-button" type="submit" disabled={!isValid}>
            Kaydet
          </button>
        </div>
      </form>
    </div>
  );
}
