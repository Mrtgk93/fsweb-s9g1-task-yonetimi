import React from "react";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";

export default function TaskHookForm(props) {
  const { kisiler, submitFn } = props;

  const {
    register,
    reset,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    defaultValues: { title: "", description: "", people: [] },
  });

  const onSubmit = (data) => {
    console.log(data);
    toast(`${data.title} görevi eklendi`);
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
                    required: "en az 1 kişi seç",
                    validate: {
                      maxKisi: (kisiler) =>
                        kisiler.length <= 3 || "lütfen en fazla 3 kişi seçin",
                    },
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
